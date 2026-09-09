const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

// Replaces Resend for the one thing that's actually free without owning a
// domain: relaying a form submission to the site owner's own inbox. Web3Forms
// is the verified sender here, not this deployment, so no DNS records or
// CONTACT_FROM_EMAIL are needed — only an access key, created once at
// web3forms.com and tied to a destination inbox chosen there, not per
// request. CONTACT_TO_EMAIL has no effect on this path; it's documentation
// of where the key was pointed, not a live setting.
//
// What this cannot do, on any free relay, anywhere: send arbitrary mail *to*
// the visitor on the site's behalf. A form-to-owner relay only ever proves
// the owner's own inbox opted in when the key was created — sending to a
// stranger who submitted a form is exactly the abuse surface every provider
// gates behind a verified domain, this one included. That is why there is no
// `sendContactAutoReply` counterpart in this file: the visitor confirmation
// email that api/contact.ts used to send is gone until a real domain is
// verified with an ESP (see the archived api/_lib/email.ts in git history).
export async function relayContactSubmission(params: {
  name: string;
  email: string;
  message: string;
}): Promise<void> {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    console.error(
      "Contact notification skipped: WEB3FORMS_ACCESS_KEY is not set in " +
        "this deployment's environment variables.",
    );
    return;
  }

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
      // Web3Forms' own field name, unabbreviated and without an underscore —
      // confirmed against their docs rather than guessed.
      replyto: params.email,
      subject: `New portfolio message from ${params.name}`,
      message: params.message,
      // Their honeypot convention: a hidden field real visitors never fill,
      // sent empty here since this request never passes through their HTML
      // form at all — the honeypot that matters already ran in contact.ts.
      botcheck: "",
    }),
  });

  // Their docs did not resolve to a confirmed failure-response shape after
  // several attempts, so this checks both plausible ones rather than assume
  // either: a non-2xx status, or a 200 carrying `success: false` in the body
  // — the exact shape that made the Resend integration's failures invisible
  // before that was fixed. Whichever one Web3Forms actually uses, this
  // catches it and the caller's existing rejection-logging sees it.
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
