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

export async function sendContactNotification(params: {
  name: string;
  email: string;
  message: string;
}) {
  if (!resend || !TO) return;
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
  if (!resend) return;
  await resend.emails.send({
    from: FROM,
    to: params.email,
    subject: "Thanks for reaching out",
    text: `Hi ${params.name},\n\nThanks for your message — I've received it and will get back to you soon.\n\nJasper`,
  });
}
