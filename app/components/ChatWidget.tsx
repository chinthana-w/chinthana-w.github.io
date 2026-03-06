"use client";

import { useState, useRef, useEffect, FormEvent } from "react";

interface Message {
  role: "user" | "assistant";
  text: string;
  escalate?: boolean;
}

const INITIAL_MESSAGES: Message[] = [
  {
    role: "assistant",
    text: "Hi! I can answer questions about Chinthana's background, skills, and projects.",
  },
  {
    role: "assistant",
    text: "Disclaimer: this is an experimental AI tool. Responses are generated automatically and may not be fully accurate. Always verify important details directly with Chinthana.",
  },
];

function ChatBubbleIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6"
    >
      <path
        fillRule="evenodd"
        d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 0 1-3.476.383.39.39 0 0 0-.297.17l-2.755 4.133a.75.75 0 0 1-1.248 0l-2.755-4.133a.39.39 0 0 0-.297-.17 48.9 48.9 0 0 1-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97Z"
        clipRule="evenodd"
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

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageToken, setPageToken] = useState<string | null>(null);
  const [tokenLoading, setTokenLoading] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Fetch a short-lived HMAC token so the server can verify the request
  // originated from this page, not an external script.
  useEffect(() => {
    fetch("/api/chat-token")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => setPageToken(typeof d.token === "string" ? d.token : null))
      .catch(() => {})
      .finally(() => setTokenLoading(false));
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const userText = input.trim();
    if (!userText || loading) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userText,
          token: pageToken,
          history: messages
            .filter((m) => !m.escalate)
            .slice(-6)
            .map((m) => ({ role: m.role, text: m.text })),
        }),
      });

      const data: { reply?: string; escalate?: boolean; error?: string } =
        await res.json();

      if (data.escalate) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", text: "", escalate: true },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            text: data.reply ?? "Sorry, I couldn't get a response.",
          },
        ]);
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
          style={{ width: "320px", background: "#1e293b", border: "1px solid #334155" }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{ background: "#0f172a", borderBottom: "1px solid #334155" }}
          >
            <div className="flex items-center gap-2">
              <span style={{ color: "#38bdf8" }}>
                <ChatBubbleIcon />
              </span>
              <span className="text-sm font-semibold" style={{ color: "#e2e8f0" }}>
                Ask about Chinthana
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
            style={{ maxHeight: "280px" }}
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
                      background: "#0f172a",
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
                            background: "#0f172a",
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
                    background: "#0f172a",
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
                background: "#0f172a",
                border: "1px solid #334155",
                color: "#e2e8f0",
              }}
            />
            <button
              type="submit"
              disabled={!input.trim() || loading || tokenLoading}
              className="rounded-lg px-3 py-1.5 text-xs font-semibold transition-opacity disabled:opacity-40"
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
        className="flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-105"
        style={{ background: "#38bdf8", color: "#0f172a" }}
        aria-label={open ? "Close chat" : "Chat with assistant"}
      >
        {open ? <CloseIcon /> : <ChatBubbleIcon />}
      </button>
    </div>
  );
}
