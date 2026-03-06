import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { timingSafeEqual } from "crypto";
import { makeToken, currentWindow } from "@/app/api/chat-token/route";

// ---------------------------------------------------------------------------
// Origin check
// ---------------------------------------------------------------------------
function isAllowedOrigin(req: NextRequest): boolean {
  const allowed = process.env.CHAT_ALLOWED_ORIGIN;
  if (!allowed) return true; // skip in local dev when env var is absent
  return req.headers.get("origin") === allowed;
}

// ---------------------------------------------------------------------------
// HMAC page-token check
// ---------------------------------------------------------------------------
function isValidPageToken(token: unknown): boolean {
  const secret = process.env.CHAT_HMAC_SECRET;
  if (!secret) return true; // skip in local dev when env var is absent
  if (typeof token !== "string" || !/^[0-9a-f]{64}$/.test(token)) return false;
  const provided = Buffer.from(token, "hex");
  const w = currentWindow();
  // Accept current window and the previous one to tolerate edge-of-window loads.
  for (const win of [w, w - 1]) {
    const expected = makeToken(secret, win);
    if (provided.length === expected.length && timingSafeEqual(provided, expected))
      return true;
  }
  return false;
}

// ---------------------------------------------------------------------------
// IP rate limiting (best-effort; module-level, per serverless instance)
// Max 10 requests per IP per 60 seconds.
// ---------------------------------------------------------------------------
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 10;
const ipLog = new Map<string, number[]>();
let lastCleanup = Date.now();

function isRateLimited(req: NextRequest): boolean {
  // Periodic cleanup to prevent unbounded map growth.
  const now = Date.now();
  if (now - lastCleanup > RATE_WINDOW_MS) {
    lastCleanup = now;
    for (const [ip, ts] of ipLog) {
      const fresh = ts.filter((t) => now - t < RATE_WINDOW_MS);
      if (fresh.length === 0) ipLog.delete(ip);
      else ipLog.set(ip, fresh);
    }
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  const ts = (ipLog.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (ts.length >= RATE_MAX) return true;
  ts.push(now);
  ipLog.set(ip, ts);
  return false;
}

/** Strips LaTeX markup from resume.tex and returns readable plain text. */
function parseResumeText(): string {
  const filePath = path.join(process.cwd(), "docs", "resume.tex");
  const raw = fs.readFileSync(filePath, "utf-8");

  return raw
    .replace(/\\documentclass[\s\S]*?\\begin\{document\}/, "")
    .replace(/\\end\{document\}/, "")
    .replace(/\\textbf\{([^}]*)\}/g, "$1")
    .replace(/\\textit\{([^}]*)\}/g, "$1")
    .replace(/\\emph\{([^}]*)\}/g, "$1")
    .replace(/\\href\{[^}]*\}\{([^}]*)\}/g, "$1")
    .replace(/\\section\{([^}]*)\}/g, "\n\n=== $1 ===\n")
    .replace(/\\item\s*/g, "\n- ")
    .replace(/\\\\/g, "\n")
    .replace(/\\hfill/g, "  |  ")
    .replace(/\\vspace\{[^}]*\}/g, "\n")
    .replace(/\\noindent\s*/g, "")
    .replace(/\\begin\{[^}]*\}/g, "")
    .replace(/\\end\{[^}]*\}/g, "")
    .replace(/\\&/g, "&")
    .replace(/\$\s*\|\s*\$/g, " | ")
    .replace(/\\[a-zA-Z]+\{([^}]*)\}/g, "$1")
    .replace(/\\[a-zA-Z]+(\[[^\]]*\])?\s*/g, "")
    .replace(/[{}]/g, "")
    .replace(/\$[^$]*\$/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

const SYSTEM_PROMPT = `You are a helpful assistant on Chinthana Wimalasuriya's personal portfolio website. Answer questions about Chinthana's background, skills, experience, education, and projects using only the resume provided.

Guidelines:
- Keep answers concise and professional (2-4 sentences max).
- If the question cannot be answered from the resume, or requires Chinthana's direct involvement (scheduling, availability, salary, references, etc.), respond with exactly one word: ESCALATE
- Do not make up information not present in the resume.

Resume:
{RESUME}`;

interface HistoryMessage {
  role: string;
  text: string;
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Not configured" }, { status: 500 });
  }

  if (!isAllowedOrigin(req)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  if (isRateLimited(req)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: { message?: unknown; history?: unknown; token?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!isValidPageToken(body.token)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { message, history } = body;

  if (!message || typeof message !== "string" || message.length > 500) {
    return NextResponse.json({ error: "Invalid message" }, { status: 400 });
  }

  const safeHistory: HistoryMessage[] = Array.isArray(history)
    ? history
        .slice(-6)
        .filter(
          (m) =>
            m &&
            typeof m.role === "string" &&
            typeof m.text === "string" &&
            ["user", "assistant"].includes(m.role) &&
            m.text.length <= 1000
        )
    : [];

  const resumeText = parseResumeText();
  const systemPrompt = SYSTEM_PROMPT.replace("{RESUME}", resumeText);

  const contents = [
    ...safeHistory.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.text }],
    })),
    { role: "user", parts: [{ text: message }] },
  ];

  const geminiRes = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents,
        generationConfig: { maxOutputTokens: 300, temperature: 0.5 },
      }),
    }
  );

  if (!geminiRes.ok) {
    return NextResponse.json(
      { error: "AI service unavailable" },
      { status: 502 }
    );
  }

  const data = await geminiRes.json();
  const text: string =
    data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? "";

  if (!text) {
    return NextResponse.json(
      { error: "No response from model" },
      { status: 502 }
    );
  }

  if (text.toUpperCase() === "ESCALATE") {
    return NextResponse.json({ escalate: true });
  }

  return NextResponse.json({ reply: text });
}
