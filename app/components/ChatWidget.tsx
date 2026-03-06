"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { RESUME_TEXT } from "@/app/lib/resume-text";
import { GITHUB_USERNAME } from "@/app/lib/constants";
import { type RagChunk, buildChunks, buildIndex, retrieve } from "@/app/lib/rag";

interface Message {
  role: "user" | "assistant";
  text: string;
  escalate?: boolean;
}

interface GitHubRepoSummary {
  fork: boolean;
  description: string | null;
  name: string;
  language: string | null;
  topics: string[];
  stargazers_count: number;
}

// Client-side rate limit: max 20 messages per hour stored in localStorage.
const RATE_KEY = "chat_ts";
const RATE_MAX = 20;
const RATE_WINDOW_MS = 3_600_000;

function isClientRateLimited(): boolean {
  try {
    const stored = localStorage.getItem(RATE_KEY);
    const now = Date.now();
    const timestamps: number[] = stored ? JSON.parse(stored) : [];
    const recent = timestamps.filter((t) => now - t < RATE_WINDOW_MS);
    if (recent.length >= RATE_MAX) return true;
    recent.push(now);
    localStorage.setItem(RATE_KEY, JSON.stringify(recent));
    return false;
  } catch {
    return false;
  }
}

const INITIAL_MESSAGES: Message[] = [
  {
    role: "assistant",
    text: "Hi there! I'm Sif, Chinthana's AI assistant. Ask me anything about his background, skills, or projects.",
  },
  {
    role: "assistant",
    text: "Disclaimer: I'm an experimental AI tool. My responses are generated automatically and may not be fully accurate. Please verify important details directly with Chinthana.",
  },
];

function SifIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="none"
      className="w-6 h-6"
    >
      <circle cx="16" cy="16" r="12" fill="currentColor" opacity="0.15" />
      <path
        d="M10 20 Q16 10 22 20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="12" cy="14" r="1.5" fill="currentColor" />
      <circle cx="20" cy="14" r="1.5" fill="currentColor" />
      <path
        d="M16 6 L17.5 10 L16 9 L14.5 10 Z"
        fill="currentColor"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5"
    >
      <path
        fillRule="evenodd"
        d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function buildSystemPrompt(context: string): string {
  return (
    `You are Sif, a warm and professional AI assistant on Chinthana Wimalasuriya's portfolio website. ` +
    `Your goal is to leave visitors with a genuinely positive impression of Chinthana by highlighting ` +
    `his skills, achievements, and character in an honest and enthusiastic way. ` +
    `Be polite, friendly, and confident. Keep every response brief and to the point — two to three sentences at most. ` +
    `Use only the retrieved context below to answer; never invent details. ` +
    `If a question is outside the context or requires Chinthana's direct involvement ` +
    `(scheduling, availability, salary, references, etc.), respond with exactly one word: ESCALATE\n\nContext:\n${context}`
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [ragReady, setRagReady] = useState(false);
  const ragIndexRef = useRef<RagChunk[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Fetch GitHub repos and build the RAG vector index on mount.
  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) return;

    fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=50&type=public`,
      { headers: { Accept: "application/vnd.github.v3+json" } }
    )
      .then((r) => (r.ok ? r.json() : []))
      .then(async (repos: GitHubRepoSummary[]) => {
        const chunks = buildChunks(RESUME_TEXT, repos);
        const index = await buildIndex(chunks, apiKey);
        ragIndexRef.current = index;
        setRagReady(true);
      })
      .catch(() => {
        // Fallback: build index from resume only, without embeddings.
        ragIndexRef.current = buildChunks(RESUME_TEXT, []).map((c) => ({
          ...c,
          embedding: [],
        }));
      });
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const userText = input.trim();
    if (!userText || loading) return;

    if (isClientRateLimited()) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "You've reached the hourly message limit. Please try again later.",
        },
      ]);
      return;
    }

    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setLoading(true);

    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      if (!apiKey) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", text: "Chat is not configured yet. Please check back later." },
        ]);
        return;
      }

      const history = messages
        .filter((m) => !m.escalate)
        .slice(-6)
        .map((m) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.text }],
        }));

      // RAG: retrieve the most relevant chunks for this query.
      let context: string;
      if (ragReady && ragIndexRef.current.length > 0) {
        const retrieved = await retrieve(userText, ragIndexRef.current, apiKey);
        context = retrieved.join("\n\n---\n\n");
      } else {
        // Fallback: concatenate all chunk texts (no embedding similarity used).
        context = ragIndexRef.current.length
          ? ragIndexRef.current.map((c) => c.text).join("\n\n")
          : RESUME_TEXT;
      }

      const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
      const requestBody = JSON.stringify({
        system_instruction: { parts: [{ text: buildSystemPrompt(context) }] },
        contents: [...history, { role: "user", parts: [{ text: userText }] }],
        generationConfig: { maxOutputTokens: 700, temperature: 0.5 },
      });

      // Retry once after a short delay on 429.
      let res = await fetch(GEMINI_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: requestBody,
      });
      if (res.status === 429) {
        await new Promise((r) => setTimeout(r, 3000));
        res = await fetch(GEMINI_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: requestBody,
        });
      }

      if (!res.ok) {
        let reason = "";
        try {
          const errData = await res.json();
          reason = errData?.error?.message ?? "";
        } catch { /* ignore */ }

        const text =
          res.status === 429
            ? "The chat quota is currently exhausted. Please try again tomorrow, or contact Chinthana directly."
            : `Something went wrong${reason ? `: ${reason}` : ` (${res.status})`}. Please try again.`;
        setMessages((prev) => [...prev, { role: "assistant", text }]);
        return;
      }

      const data = await res.json();
      const text: string =
        data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? "";

      if (!text) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", text: "Sorry, I couldn't get a response." },
        ]);
        return;
      }

      if (text.toUpperCase() === "ESCALATE") {
        setMessages((prev) => [...prev, { role: "assistant", text: "", escalate: true }]);
      } else {
        setMessages((prev) => [...prev, { role: "assistant", text }]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "Something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div
          className="flex flex-col overflow-hidden rounded-2xl shadow-2xl"
          style={{ width: "320px", background: "#0f172a", border: "1px solid #334155" }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{ background: "#1e293b", borderBottom: "1px solid #334155" }}
          >
            <div className="flex items-center gap-2">
              <span style={{ color: "#38bdf8" }}>
                <SifIcon />
              </span>
              <span className="text-sm font-semibold" style={{ color: "#e2e8f0" }}>
                Sif
              </span>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{ color: "#94a3b8" }}
              aria-label="Close chat"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Messages */}
          <div
            className="flex flex-col gap-2 overflow-y-auto p-3"
            style={{ maxHeight: "400px" }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.escalate ? (
                  <div
                    className="rounded-xl px-3 py-2 text-xs leading-relaxed"
                    style={{
                      maxWidth: "85%",
                      background: "#1e293b",
                      border: "1px solid #334155",
                      color: "#94a3b8",
                    }}
                  >
                    That&apos;s a great question for Chinthana directly.{" "}
                    <a
                      href="mailto:chinthana.w@siu.edu?subject=Question%20from%20Portfolio"
                      className="font-semibold underline"
                      style={{ color: "#38bdf8" }}
                    >
                      Send an email
                    </a>
                  </div>
                ) : (
                  <div
                    className="rounded-xl px-3 py-2 text-xs leading-relaxed"
                    style={{
                      maxWidth: "85%",
                      ...(m.role === "user"
                        ? { background: "#38bdf8", color: "#0f172a" }
                        : {
                            background: "#1e293b",
                            color: "#e2e8f0",
                            border: "1px solid #334155",
                          }),
                    }}
                  >
                    {m.text}
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div
                  className="rounded-xl px-3 py-2 text-xs"
                  style={{
                    background: "#1e293b",
                    color: "#94a3b8",
                    border: "1px solid #334155",
                  }}
                >
                  Thinking...
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="flex gap-2 p-2"
            style={{ borderTop: "1px solid #334155" }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              maxLength={500}
              className="flex-1 rounded-lg px-3 py-1.5 text-xs outline-none"
              style={{
                background: "#1e293b",
                border: "1px solid #334155",
                color: "#e2e8f0",
              }}
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="rounded-full px-3 py-1.5 text-xs font-semibold transition-opacity disabled:opacity-40"
              style={{ background: "#38bdf8", color: "#0f172a" }}
            >
              Send
            </button>
          </form>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="relative overflow-hidden flex items-center gap-2 px-4 py-3 rounded-full backdrop-blur-xl bg-[#38bdf8]/20 border border-[#38bdf8]/40 shadow-[inset_0_1px_0_rgba(56,189,248,0.25),0_4px_24px_rgba(56,189,248,0.2),0_2px_12px_rgba(0,0,0,0.4)] text-[#e2e8f0] transition-all duration-200 hover:scale-105 hover:bg-[#38bdf8]/30"
        aria-label={open ? "Close Sif" : "Ask Sif"}
      >
        <span className="absolute inset-0 rounded-full bg-gradient-to-b from-white/[0.10] to-transparent pointer-events-none" aria-hidden="true" />
        <span className="relative flex items-center gap-2">
          {open ? <CloseIcon /> : <SifIcon />}
          {!open && <span className="text-sm font-semibold pr-1">Ask Sif</span>}
        </span>
      </button>
    </div>
  );
}
