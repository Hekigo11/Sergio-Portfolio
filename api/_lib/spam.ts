import { createHash } from "node:crypto";
import type { VercelRequest } from "@vercel/node";
import { sql } from "./db";

// Comments are a live public feed — short bursts of quick replies are normal
// traffic, so the window stays tight. Contact is a one-off formal action;
// nobody legitimately sends a second message inside a minute, so its window
// is longer and correspondingly harder to abuse for free email sends.
const COMMENT_RATE_LIMIT_WINDOW_SECONDS = 30;
const CONTACT_RATE_LIMIT_WINDOW_SECONDS = 60;
const URL_PATTERN = /https?:\/\/|www\./gi;

const FALLBACK_SALT = "portfolio";
let warnedAboutSalt = false;

export function hashIp(req: VercelRequest): string {
  const forwarded = req.headers["x-forwarded-for"];
  const ip = Array.isArray(forwarded)
    ? forwarded[0]
    : (forwarded?.split(",")[0] ?? req.socket.remoteAddress ?? "unknown");
  const salt = process.env.IP_HASH_SALT;
  // A missing salt doesn't fail the request — this is a public comment box on
  // a personal site, not a system worth 500ing over a forgotten env var — but
  // it does mean every stored IP hash is salted with a string sitting in the
  // open-source repo, which is exactly as reversible as storing the IP in the
  // clear. Warn loudly once per cold start so it surfaces in Vercel's function
  // logs immediately rather than staying a silent, permanent weakness.
  if (!salt && !warnedAboutSalt) {
    warnedAboutSalt = true;
    console.error(
      "IP_HASH_SALT is not set — falling back to a public default salt. " +
        "Stored IP hashes are effectively unsalted until this is set in the " +
        "deployment's environment variables.",
    );
  }
  return createHash("sha256")
    .update(`${salt ?? FALLBACK_SALT}:${ip.trim()}`)
    .digest("hex");
}

// Basic content guard: bodies stuffed with links or absurdly long are almost
// always spam; a real comment or message doesn't need either.
export function looksLikeSpam(message: string): boolean {
  const linkCount = message.match(URL_PATTERN)?.length ?? 0;
  return linkCount >= 2 || message.length > 2000;
}

// Two literal branches rather than an interpolated table name: the `sql`
// tagged template parameterizes values, not identifiers, so building the
// query from a variable table name would mean falling back to raw string
// concatenation for something SQL-shaped. Both tables here are fixed literals
// this file itself controls — never user input — so there's nothing dynamic
// that actually needs to be dynamic.
export async function isCommentRateLimited(ipHash: string): Promise<boolean> {
  const rows = await sql`
    SELECT 1 FROM comments
    WHERE ip_hash = ${ipHash}
      AND created_at > now() - (${COMMENT_RATE_LIMIT_WINDOW_SECONDS} || ' seconds')::interval
    LIMIT 1
  `;
  return rows.length > 0;
}

export async function isContactRateLimited(ipHash: string): Promise<boolean> {
  const rows = await sql`
    SELECT 1 FROM contact_submissions
    WHERE ip_hash = ${ipHash}
      AND created_at > now() - (${CONTACT_RATE_LIMIT_WINDOW_SECONDS} || ' seconds')::interval
    LIMIT 1
  `;
  return rows.length > 0;
}
