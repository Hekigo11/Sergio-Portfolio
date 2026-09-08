---
version: 1
slug: "src-components-sections-connect-tsx"
primary_target: "src/components/sections/Connect.tsx"
related_targets: ["src/components/sections/Home.tsx"]
---

## Scope

New surface: Connect section (`src/components/sections/Connect.tsx`), the fourth stop on the spatial canvas (already reserved at x:-2000, y:-1000 in App.tsx, currently unimplemented). Covers two jobs: a contact form (Persuade/Operate) and a public comments/guestbook feed (Operate), inside the site's overall Experience-mode shell. A secondary surface, the Home carousel showing the 5 latest comments, is included in scope since it consumes the same comments data.

Audience: recruiters/hiring managers deciding to reach out; peers/collaborators forming a general impression. Job: make contacting Jasper obvious and low-friction; make it visible that real people already do. Proof/content: real contact channels (email, LinkedIn, GitHub, résumé — to be supplied, not fabricated); comments are genuine visitor-submitted, not seeded/fake. Constraints: must inherit the established visual system (slate/violet/cyan, Inter, bordered stacked full-bleed sections, About/Projects' motion and card conventions) — this is an established world, not a new one.

## Direction contract

THESIS: Reaching out and seeing who else already has are one motion, not two errands — the form and the comment feed share one viewport, refusing the site's own habit (About, Projects) of one job per full-bleed screen.

OWN-WORLD: Slate-950/slate-50 surface, Inter, bold tracking-tight headlines, violet-600/300 as the single accent (matches nav's active-link color; cyan stays reserved for Projects' badges so Connect reads as its own room on the same floor); bordered rounded-2xl panels like Projects' cards; border-t dividers between stacked regions; uppercase tracking-wide micro-labels; motion.div fade/slide-in at [0.22,1,0.36,1] as used in About's Experience rows.

STORY: A visitor who scrolled this far already wants to act. They see direct contact channels and a form on one side, and evidence that real people already reached out on the other — so acting feels normal, not like shouting into a void.

FIRST VIEWPORT: Two-column grid on desktop, one viewport, no scroll to see both panels. Left: oversized headline, contact chips (email/LinkedIn/GitHub/résumé), contact form below in a bordered panel. Right: a bordered comments panel — composer on top, feed below, newest first. Mobile: stacked, form panel first, comments panel second.

FORM: Split dashboard — dealt lead (index 6 of 7) of my own ranked structural candidates for this surface, locked by the user over the two other dealt options (console-log motif, guestbook-ledger framing) and the standing classic-contact-page exit. Seed key 27026ffc. Code-led: no image generation tool is available in this harness, so the ambition here (not a comp) is the contract this ambition lives in this FIRST VIEWPORT block and the signature interaction below, audited in behavior at finish.

SIGNATURE INTERACTION: Submitting the form flashes an inline success state in place (no redirect), so the visitor stays on the split screen and can immediately look at the comments panel; a freshly posted comment animates into the top of the feed with the same fade/slide-in used in About's Experience rows.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Unresolved decisions

- Exact contact channels/values (email, LinkedIn, GitHub, résumé link) — pending from user, not fabricated.
- Comment moderation model: immediate + basic spam guard (rate-limit, honeypot, length/link filter), per user's choice — no pre-approval queue.
- Home carousel: latest 5 non-hidden comments, reusing the WordCarousel/ProjectImageCarousel auto-advance idiom.
- Backend: Node, deployed as Vercel serverless functions (`/api`), per user's hosting answer. DB: Vercel Postgres (Neon) for comments + contact submissions. Email: Resend for notify-me + auto-reply.
