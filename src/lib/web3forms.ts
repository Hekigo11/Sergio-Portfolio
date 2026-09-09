const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

// Runs in the browser, not the Vercel function — Web3Forms rejects a
// server-to-server call with 403 by design (their own anti-spam measure,
// confirmed from their troubleshooting docs; lifting it needs a paid plan).
// So unlike every other secret in this project, this key is meant to be
// public: it ships in the client bundle via `VITE_`, and Web3Forms says so
// themselves — "don't worry, this can be public." It is not a bypass of
// api/contact.ts's honeypot, rate limit, or spam filter: this only ever runs
// from Connect's form after that endpoint has already returned success, so a
// bot or a rate-limited sender never reaches this call at all.
export async function relayContactNotification(params: {
  name: string;
  email: string;
  message: string;
}): Promise<void> {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as
    | string
    | undefined;
  // Not configured: the message is already durable in Postgres via
  // api/contact.ts by the time this would run, so there is nothing to do
  // here but skip quietly — the visitor's submission was not lost.
  if (!accessKey) return;

  const response = await fetch(WEB3FORMS_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: accessKey,
      name: params.name,
      email: params.email,
      // Web3Forms' own field name for this, unabbreviated, no underscore.
      replyto: params.email,
      subject: `New portfolio message from ${params.name}`,
      message: params.message,
      // Their honeypot convention. Sent empty: the honeypot that actually
      // matters already ran server-side in api/contact.ts before this
      // function is ever called.
      botcheck: "",
    }),
  });

  // Their docs never resolved to a confirmed failure-response shape, so this
  // checks both plausible ones: a non-2xx status, or a 200 carrying
  // `success: false` in the body — the exact shape that made an earlier
  // provider's failures invisible here until that was fixed.
  const body = (await response.json().catch(() => null)) as {
    success?: boolean;
    message?: string;
  } | null;
  if (!response.ok || body?.success === false) {
    throw new Error(
      `Web3Forms rejected the submission: ${body?.message ?? response.statusText}`,
    );
  }
}
