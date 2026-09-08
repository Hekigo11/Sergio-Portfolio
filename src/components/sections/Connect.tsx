import { AnimatePresence, motion } from "motion/react";
import { type FormEvent, useState } from "react";
import { useComments } from "../../hooks/useComments";
import { formatRelativeTime } from "../../lib/formatRelativeTime";
import { postComment, submitContact } from "../../lib/api";
import MetaLabel from "../ui/MetaLabel";
import SectionHeading from "../ui/SectionHeading";
import { DecorField, MarkerTick, MaskedArt } from "../decor";
import cloudTwo from "../../assets/cloud-2.svg";

interface ConnectProps {
  darkMode: boolean;
}

const CONTACT_EMAIL = "jdeguzmansergio@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/jasper-sergio-9496542bb/";
const GITHUB_URL = "https://github.com/Hekigo11";
const PHONE_DISPLAY = "+63 967 745 5508";
const PHONE_HREF = "tel:+639677455508";
const RESUME_URL = new URL(
  "../../assets/SERGIO_Resume_2026.pdf",
  import.meta.url,
).href;

const EASING = [0.22, 1, 0.36, 1] as const;

interface ThemeClasses {
  cardClasses: string;
  muted: string;
  line: string;
  surfaceBg: string;
  accentHover: string;
  errorText: string;
  fieldClasses: string;
}

// One line of the correspondence directory: label in the margin, value in the
// column, ruled off from the next — a ledger row rather than a floating chip.
function ContactRow({
  label,
  value,
  href,
  theme,
  disabled,
}: {
  label: string;
  value: string;
  href?: string;
  theme: ThemeClasses;
  disabled?: boolean;
}) {
  const { muted, accentHover } = theme;
  const rowClasses =
    "flex flex-col gap-1 border-b border-border py-3.5 sm:flex-row sm:items-baseline sm:gap-6";

  if (disabled || !href) {
    return (
      <div className={`${rowClasses} opacity-60`}>
        <MetaLabel className="shrink-0 sm:w-20">{label}</MetaLabel>
        <span className={`truncate text-sm font-semibold ${muted}`}>{value}</span>
      </div>
    );
  }

  const opensNewTab = href.startsWith("http") || href.endsWith(".pdf");

  return (
    <a
      href={href}
      target={opensNewTab ? "_blank" : undefined}
      rel={opensNewTab ? "noreferrer" : undefined}
      className={`group ${rowClasses} transition`}
    >
      <MetaLabel className="shrink-0 sm:w-20">{label}</MetaLabel>
      <span
        className={`truncate text-sm font-semibold text-ink transition ${accentHover}`}
      >
        {value}
      </span>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="hidden h-3.5 w-3.5 shrink-0 text-ink-faint transition group-hover:text-accent sm:ml-auto sm:block"
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
    </a>
  );
}

function ContactForm({ theme }: { theme: ThemeClasses }) {
  const { muted, fieldClasses, errorText } = theme;
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("submitting");
    setError(null);
    try {
      await submitContact({
        name: String(data.get("name") ?? ""),
        email: String(data.get("email") ?? ""),
        message: String(data.get("message") ?? ""),
        company: String(data.get("company") ?? ""),
      });
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 py-10 text-center">
        <span
          className="flex h-9 w-9 items-center justify-center rounded-full border border-accent/40 text-accent"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
        <p className="font-display text-lg font-bold text-ink">
          Message sent — thanks!
        </p>
        <p className={`text-sm ${muted}`}>I'll get back to you soon.</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className={`mt-2 font-mono text-xs font-medium tracking-wide uppercase underline-offset-4 hover:underline ${muted}`}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-4">
      {/* Honeypot — hidden from real visitors, bots fill every field they can find. */}
      <input
        type="text"
        name="company"
        hidden
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <MetaLabel>Name</MetaLabel>
          <input required name="name" maxLength={100} className={fieldClasses} />
        </label>
        <label className="flex flex-col gap-2">
          <MetaLabel>Email</MetaLabel>
          <input required type="email" name="email" className={fieldClasses} />
        </label>
      </div>
      <label className="flex flex-1 flex-col gap-2">
        <MetaLabel>Message</MetaLabel>
        <textarea
          required
          name="message"
          maxLength={2000}
          rows={5}
          className={`${fieldClasses} flex-1 resize-none`}
        />
      </label>
      {status === "error" && <p className={`text-sm ${errorText}`}>{error}</p>}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="min-h-11 self-start rounded-full bg-accent px-6 py-2.5 text-sm font-semibold tracking-tight text-accent-ink transition hover:bg-accent-hover disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

function CommentComposer({
  theme,
  onPosted,
}: {
  theme: ThemeClasses;
  onPosted: (comment: { id: number; name: string; message: string; created_at: string }) => void;
}) {
  const { muted, fieldClasses, errorText } = theme;
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("submitting");
    setError(null);
    try {
      const comment = await postComment({
        name: String(data.get("name") ?? ""),
        message: String(data.get("message") ?? ""),
        company: String(data.get("company") ?? ""),
      });
      onPosted(comment);
      form.reset();
      setStatus("idle");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        type="text"
        name="company"
        hidden
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          required
          name="name"
          maxLength={80}
          placeholder="Name"
          className={`${fieldClasses} sm:w-40`}
        />
        <input
          required
          name="message"
          maxLength={500}
          placeholder="Leave a note…"
          className={`${fieldClasses} flex-1`}
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="min-h-11 shrink-0 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold tracking-tight text-accent-ink transition hover:bg-accent-hover disabled:opacity-60"
        >
          {status === "submitting" ? "Posting…" : "Post"}
        </button>
      </div>
      {status === "error" && <p className={`text-sm ${errorText}`}>{error}</p>}
      <p className={`text-xs ${muted}`}>Public — visible to anyone who visits.</p>
    </form>
  );
}

function CommentsFeed({ theme }: { theme: ThemeClasses }) {
  const { muted, line } = theme;
  const { comments, loading, error, prepend } = useComments();

  return (
    <div className="mt-6 flex min-h-0 flex-1 flex-col">
      <CommentComposer theme={theme} onPosted={prepend} />
      <div className={`mt-5 min-h-0 flex-1 overflow-y-auto border-t pt-4 ${line}`}>
        {loading && <p className={`text-sm ${muted}`}>Loading notes…</p>}
        {!loading && error && <p className={`text-sm ${muted}`}>{error}</p>}
        {!loading && !error && comments.length === 0 && (
          <p className={`text-sm ${muted}`}>No notes yet — be the first to say hello.</p>
        )}
        <ul className="flex flex-col">
          <AnimatePresence initial={false}>
            {comments.map((comment) => (
              <motion.li
                key={comment.id}
                layout
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: EASING }}
                className={`border-b py-4 first:pt-0 last:border-b-0 ${line}`}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-display text-base font-bold tracking-tight text-ink">
                    {comment.name}
                  </span>
                  <MetaLabel className="shrink-0 tabular-nums">
                    {formatRelativeTime(comment.created_at)}
                  </MetaLabel>
                </div>
                <p className={`mt-2 text-sm leading-6 ${muted}`}>{comment.message}</p>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
}

const Connect = ({ darkMode: _darkMode }: ConnectProps) => {
  const theme: ThemeClasses = {
    cardClasses: "border-border bg-surface text-ink",
    muted: "text-ink-muted",
    line: "border-border",
    surfaceBg: "bg-surface",
    accentHover: "group-hover:text-accent",
    errorText: "text-danger",
    fieldClasses:
      "min-h-11 w-full rounded-lg border border-border bg-transparent px-3.5 py-2.5 text-sm text-ink outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20",
  };

  return (
    <section className="relative flex flex-col px-6 pt-10 pb-10 lg:h-full lg:overflow-hidden lg:px-8 lg:pt-14 lg:pb-8">
      <DecorField className="hidden lg:block">
        <MaskedArt
          src={cloudTwo}
          className="absolute top-6 left-[3%] w-48 text-ink-faint opacity-28 aspect-744/214"
        />
        <MarkerTick
          rotate={8}
          className="absolute top-12 right-[8%] h-6 w-6 text-ink-faint opacity-60"
        />
      </DecorField>
      <SectionHeading
        size="lg"
        className="mx-auto w-full max-w-6xl shrink-0"
        description="Reach out directly, or leave a note below for anyone passing through."
      >
        Connect
      </SectionHeading>

      <div className="mx-auto mt-10 grid w-full max-w-6xl flex-1 gap-6 lg:min-h-0 lg:grid-cols-2">
        <div
          className={`flex flex-col rounded-xl border p-6 lg:min-h-0 lg:overflow-y-auto lg:p-8 ${theme.cardClasses}`}
        >
          <div className="border-t border-border">
            <ContactRow
              label="Email"
              value={CONTACT_EMAIL}
              href={`mailto:${CONTACT_EMAIL}`}
              theme={theme}
            />
            <ContactRow
              label="LinkedIn"
              value="jasper-sergio"
              href={LINKEDIN_URL}
              theme={theme}
            />
            <ContactRow
              label="GitHub"
              value="Hekigo11"
              href={GITHUB_URL}
              theme={theme}
            />
            <ContactRow
              label="Phone"
              value={PHONE_DISPLAY}
              href={PHONE_HREF}
              theme={theme}
            />
            <ContactRow
              label="Résumé"
              value="View / Download"
              href={RESUME_URL}
              theme={theme}
            />
          </div>
          <div className="mt-8 flex flex-1 flex-col">
            <ContactForm theme={theme} />
          </div>
        </div>

        <div
          className={`flex flex-col rounded-xl border p-6 lg:min-h-0 lg:p-8 ${theme.cardClasses}`}
        >
          <h3 className="font-display text-xl font-bold tracking-tight text-ink">
            Notes from visitors
          </h3>
          <p className={`mt-2 text-sm leading-6 ${theme.muted}`}>
            The five most recent also show up on the homepage.
          </p>
          <CommentsFeed theme={theme} />
        </div>
      </div>
    </section>
  );
};

export default Connect;
