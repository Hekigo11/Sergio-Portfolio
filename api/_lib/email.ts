import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

// CONTACT_FROM_EMAIL must be on a domain verified with Resend. Until one is
// verified, Resend's shared "onboarding@resend.dev" sender only delivers to
// the account's own inbox — fine for CONTACT_TO_EMAIL, not for auto-replies
// to arbitrary senders.
const FROM = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";
const TO = process.env.CONTACT_TO_EMAIL;

// Both send functions used to skip silently when config was missing — a
// clean early `return`, not a throw. That is invisible everywhere: the
// promise still resolves, so contact.ts's `Promise.allSettled` sees
// "fulfilled" and never logs anything, and a genuinely absent Resend key
// produces zero requests in Resend's own dashboard — indistinguishable, from
// the outside, between "not configured" and "configured and quietly firing
// into the void". Logged once per cold start (not per request, so a burst of
// submissions doesn't spam the log) with the exact variable name missing, so
// the next test submission's Vercel function log says the truth outright
// instead of leaving both ends — this codebase and Resend's dashboard —
// looking equally blank.
let warnedMissingKey = false;
let warnedMissingTo = false;

export async function sendContactNotification(params: {
  name: string;
  email: string;
  message: string;
}) {
  if (!resend) {
    if (!warnedMissingKey) {
      warnedMissingKey = true;
      console.error(
        "Contact notification skipped: RESEND_API_KEY is not set in this " +
          "deployment's environment variables.",
      );
    }
    return;
  }
  if (!TO) {
    if (!warnedMissingTo) {
      warnedMissingTo = true;
      console.error(
        "Contact notification skipped: CONTACT_TO_EMAIL is not set in this " +
          "deployment's environment variables.",
      );
    }
    return;
  }
  await resend.emails.send({
    from: FROM,
    to: TO,
    replyTo: params.email,
    subject: `New portfolio message from ${params.name}`,
    text: `${params.message}\n\n— ${params.name} <${params.email}>`,
  });
}

export async function sendContactAutoReply(params: {
  name: string;
  email: string;
}) {
  if (!resend) {
    if (!warnedMissingKey) {
      warnedMissingKey = true;
      console.error(
        "Contact auto-reply skipped: RESEND_API_KEY is not set in this " +
          "deployment's environment variables.",
      );
    }
    return;
  }
  await resend.emails.send({
    from: FROM,
    to: params.email,
    subject: "Thanks for reaching out",
    text: `Hi ${params.name},\n\nThanks for your message — I've received it and will get back to you soon.\n\nJasper`,
  });
}
