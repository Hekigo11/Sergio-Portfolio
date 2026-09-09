import type { VercelRequest, VercelResponse } from "@vercel/node";
import { ensureSchema, sql } from "./_lib/db";
import { sendContactAutoReply, sendContactNotification } from "./_lib/email";
import { hashIp, isContactRateLimited, looksLikeSpam } from "./_lib/spam";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body = req.body ?? {};
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  // Hidden honeypot field — real visitors never fill it in. Fake a success
  // response so bots don't learn to look elsewhere.
  const honeypot = typeof body.company === "string" ? body.company.trim() : "";
  if (honeypot) return res.status(200).json({ ok: true });

  if (!name || name.length > 100) {
    return res.status(400).json({ error: "Name is required." });
  }
  if (!EMAIL_PATTERN.test(email)) {
    return res.status(400).json({ error: "A valid email is required." });
  }
  if (!message || message.length > 2000) {
    return res.status(400).json({ error: "Message is required." });
  }

  // Checked before the DB insert and the two Resend sends below — the actual
  // cost of an unthrottled flood, so the limit has to sit ahead of them, not
  // just ahead of the honeypot-adjacent validation above.
  await ensureSchema();
  const ipHash = hashIp(req);
  if (await isContactRateLimited(ipHash)) {
    return res
      .status(429)
      .json({ error: "You're sending messages too quickly — try again shortly." });
  }

  if (looksLikeSpam(message)) {
    return res.status(400).json({ error: "Message could not be sent." });
  }

  await sql`
    INSERT INTO contact_submissions (name, email, message, ip_hash)
    VALUES (${name}, ${email}, ${message}, ${ipHash})
  `;

  const [notification, autoReply] = await Promise.allSettled([
    sendContactNotification({ name, email, message }),
    sendContactAutoReply({ name, email }),
  ]);
  if (notification.status === "rejected") {
    console.error("Contact notification email failed", notification.reason);
  }
  if (autoReply.status === "rejected") {
    console.error("Contact auto-reply email failed", autoReply.reason);
  }

  return res.status(200).json({ ok: true });
}
