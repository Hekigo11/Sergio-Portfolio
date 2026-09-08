import { AnimatePresence, motion } from "motion/react";
import { type FormEvent, useState } from "react";
import { useComments } from "../../hooks/useComments";
import { formatRelativeTime } from "../../lib/formatRelativeTime";
import { postComment, submitContact } from "../../lib/api";

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
  darkMode: boolean;
  cardClasses: string;
  muted: string;
  line: string;
  surfaceBg: string;
  accentHover: string;
  errorText: string;
  fieldClasses: string;
}

function ContactChip({
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
  const { muted, line, surfaceBg, accentHover } = theme;
  const labelEl = (
    <span className={`text-[10px] font-medium uppercase tracking-[0.22em] ${muted}`}>
      {label}
    </span>
  );

  if (disabled || !href) {
    return (
      <div
        className={`flex flex-col rounded-xl border px-4 py-3 ${line} ${surfaceBg} opacity-60`}
      >
        {labelEl}
        <span className={`mt-1 block truncate text-sm font-semibold ${muted}`}>
          {value}
        </span>
      </div>
    );
  }

  const opensNewTab = href.startsWith("http") || href.endsWith(".pdf");

  return (
    <a
      href={href}
      target={opensNewTab ? "_blank" : undefined}
      rel={opensNewTab ? "noreferrer" : undefined}
      className={`group flex flex-col rounded-xl border px-4 py-3 transition hover:-translate-y-0.5 ${line} ${surfaceBg}`}
    >
      {labelEl}
      <span className={`mt-1 block truncate text-sm font-semibold transition ${accentHover}`}>
        {value}
      </span>
    </a>
  );
}

function ContactForm({ theme }: { theme: ThemeClasses }) {
  const { muted, fieldClasses, errorText, darkMode } = theme;
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
      <div className="flex flex-1 flex-col items-center justify-center gap-2 py-10 text-center">
        <span className="text-3xl" aria-hidden="true">
          ✓
        </span>
        <p className="text-lg font-semibold">Message sent — thanks!</p>
        <p className={`text-sm ${muted}`}>I'll get back to you soon.</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className={`mt-2 text-xs font-medium uppercase tracking-wide underline-offset-4 hover:underline ${muted}`}
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
        <label className="flex flex-col gap-1.5">
          <span className={`text-[10px] font-medium uppercase tracking-[0.22em] ${muted}`}>
            Name
          </span>
          <input required name="name" maxLength={100} className={fieldClasses} />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className={`text-[10px] font-medium uppercase tracking-[0.22em] ${muted}`}>
            Email
          </span>
          <input required type="email" name="email" className={fieldClasses} />
        </label>
      </div>
      <label className="flex flex-1 flex-col gap-1.5">
        <span className={`text-[10px] font-medium uppercase tracking-[0.22em] ${muted}`}>
          Message
        </span>
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
        className={`self-start rounded-full px-6 py-2.5 text-sm font-semibold tracking-tight transition disabled:opacity-60 ${
          darkMode
            ? "bg-violet-500 text-slate-950 hover:bg-violet-400"
            : "bg-violet-600 text-white hover:bg-violet-500"
        }`}
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
  const { muted, fieldClasses, errorText, darkMode } = theme;
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
          className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold tracking-tight transition disabled:opacity-60 ${
            darkMode
              ? "bg-violet-500 text-slate-950 hover:bg-violet-400"
              : "bg-violet-600 text-white hover:bg-violet-500"
          }`}
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
        <ul className="flex flex-col gap-4">
          <AnimatePresence initial={false}>
            {comments.map((comment) => (
              <motion.li
                key={comment.id}
                layout
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: EASING }}
                className={`border-b pb-4 last:border-b-0 last:pb-0 ${line}`}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-sm font-semibold tracking-tight">
                    {comment.name}
                  </span>
                  <span className={`shrink-0 text-xs tabular-nums ${muted}`}>
                    {formatRelativeTime(comment.created_at)}
                  </span>
                </div>
                <p className={`mt-1.5 text-sm leading-6 ${muted}`}>{comment.message}</p>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
}

const Connect = ({ darkMode }: ConnectProps) => {
  const theme: ThemeClasses = {
    darkMode,
    cardClasses: darkMode
      ? "border-slate-700 bg-slate-900 text-slate-100"
      : "border-slate-200 bg-white text-slate-900",
    muted: darkMode ? "text-slate-300" : "text-slate-600",
    line: darkMode ? "border-slate-800" : "border-slate-200",
    surfaceBg: darkMode ? "bg-slate-900" : "bg-white",
    accentHover: darkMode ? "group-hover:text-violet-300" : "group-hover:text-violet-600",
    errorText: darkMode ? "text-rose-400" : "text-rose-600",
    fieldClasses: `w-full rounded-lg border bg-transparent px-3.5 py-2.5 text-sm outline-none transition focus:ring-2 ${
      darkMode
        ? "border-slate-700 focus:border-violet-400 focus:ring-violet-400/25"
        : "border-slate-300 focus:border-violet-500 focus:ring-violet-500/20"
    }`,
  };

  return (
    <section className="flex flex-col px-6 pt-10 pb-10 lg:h-full lg:overflow-hidden lg:px-8 lg:pt-14 lg:pb-8">
      <div className="mx-auto w-full max-w-6xl shrink-0">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">Connect</h2>
        <p className={`mt-3 max-w-2xl text-base leading-7 ${theme.muted}`}>
          Reach out directly, or leave a note below for anyone passing through.
        </p>
      </div>

      <div className="mx-auto mt-8 grid w-full max-w-6xl flex-1 gap-6 lg:min-h-0 lg:grid-cols-2">
        <div
          className={`flex flex-col rounded-2xl border p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] lg:min-h-0 lg:overflow-y-auto ${theme.cardClasses}`}
        >
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <ContactChip label="Email" value={CONTACT_EMAIL} href={`mailto:${CONTACT_EMAIL}`} theme={theme} />
            <ContactChip label="LinkedIn" value="jasper-sergio" href={LINKEDIN_URL} theme={theme} />
            <ContactChip label="GitHub" value="Hekigo11" href={GITHUB_URL} theme={theme} />
            <ContactChip label="Phone" value={PHONE_DISPLAY} href={PHONE_HREF} theme={theme} />
            <ContactChip label="Résumé" value="View / Download" href={RESUME_URL} theme={theme} />
          </div>
          <div className={`mt-6 flex-1 border-t pt-6 ${theme.line}`}>
            <ContactForm theme={theme} />
          </div>
        </div>

        <div
          className={`flex flex-col rounded-2xl border p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] lg:min-h-0 ${theme.cardClasses}`}
        >
          <h3 className="text-lg font-semibold tracking-tight">Notes from visitors</h3>
          <p className={`mt-1 text-sm ${theme.muted}`}>
            The five most recent also show up on the homepage.
          </p>
          <CommentsFeed theme={theme} />
        </div>
      </div>
    </section>
  );
};

export default Connect;
