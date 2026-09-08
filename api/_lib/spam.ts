import { createHash } from "node:crypto";
import type { VercelRequest } from "@vercel/node";
import { sql } from "./db";

const RATE_LIMIT_WINDOW_SECONDS = 30;
const URL_PATTERN = /https?:\/\/|www\./gi;

export function hashIp(req: VercelRequest): string {
  const forwarded = req.headers["x-forwarded-for"];
  const ip = Array.isArray(forwarded)
    ? forwarded[0]
    : (forwarded?.split(",")[0] ?? req.socket.remoteAddress ?? "unknown");
  const salt = process.env.IP_HASH_SALT ?? "portfolio";
  return createHash("sha256").update(`${salt}:${ip.trim()}`).digest("hex");
}

// Basic content guard: bodies stuffed with links or absurdly long are almost
// always spam; a real comment or message doesn't need either.
export function looksLikeSpam(message: string): boolean {
  const linkCount = message.match(URL_PATTERN)?.length ?? 0;
  return linkCount >= 2 || message.length > 2000;
}

export async function isRateLimited(ipHash: string): Promise<boolean> {
  const rows = await sql`
    SELECT 1 FROM comments
    WHERE ip_hash = ${ipHash}
      AND created_at > now() - (${RATE_LIMIT_WINDOW_SECONDS} || ' seconds')::interval
    LIMIT 1
  `;
  return rows.length > 0;
}
