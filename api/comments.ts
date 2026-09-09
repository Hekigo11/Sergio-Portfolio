import type { VercelRequest, VercelResponse } from "@vercel/node";
import { ensureSchema, sql } from "./_lib/db";
import { hashIp, isCommentRateLimited, looksLikeSpam } from "./_lib/spam";

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 50;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await ensureSchema();

  if (req.method === "GET") {
    const requested = Number(req.query.limit);
    const limit = Number.isFinite(requested)
      ? Math.min(Math.max(1, requested), MAX_LIMIT)
      : DEFAULT_LIMIT;

    const rows = await sql`
      SELECT id, name, message, created_at
      FROM comments
      WHERE hidden = false
      ORDER BY created_at DESC
      LIMIT ${limit}
    `;
    return res.status(200).json({ comments: rows });
  }

  if (req.method === "POST") {
    const body = req.body ?? {};
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";
    // Hidden honeypot — a filled value means a bot filled the whole form out.
    const honeypot = typeof body.company === "string" ? body.company.trim() : "";
    if (honeypot) return res.status(200).json({ ok: true });

    if (!name || name.length > 80) {
      return res.status(400).json({ error: "Name is required." });
    }
    if (!message || message.length > 500) {
      return res.status(400).json({ error: "Comment is required." });
    }

    const ipHash = hashIp(req);
    if (await isCommentRateLimited(ipHash)) {
      return res
        .status(429)
        .json({ error: "You're posting too quickly — try again shortly." });
    }

    const hidden = looksLikeSpam(message);
    const rows = await sql`
      INSERT INTO comments (name, message, ip_hash, hidden)
      VALUES (${name}, ${message}, ${ipHash}, ${hidden})
      RETURNING id, name, message, created_at
    `;
    return res.status(201).json({ comment: rows[0] });
  }

  res.setHeader("Allow", "GET, POST");
  return res.status(405).json({ error: "Method not allowed" });
}
