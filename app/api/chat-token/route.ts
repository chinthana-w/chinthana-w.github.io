import { NextRequest, NextResponse } from "next/server";
import { createHmac } from "crypto";

/** Generates a HMAC token for the current 5-minute time window. */
export function makeToken(secret: string, window: number): Buffer {
  return createHmac("sha256", secret).update(String(window)).digest();
}

export function currentWindow(): number {
  return Math.floor(Date.now() / 1000 / 300);
}

export async function GET(req: NextRequest) {
  const secret = process.env.CHAT_HMAC_SECRET;
  if (!secret) {
    // Not configured: return a placeholder so the widget still works in dev.
    return NextResponse.json({ token: "dev" });
  }

  const allowedOrigin = process.env.CHAT_ALLOWED_ORIGIN;
  if (allowedOrigin) {
    const origin = req.headers.get("origin");
    if (origin !== allowedOrigin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  }

  const token = makeToken(secret, currentWindow()).toString("hex");
  return NextResponse.json({ token });
}
