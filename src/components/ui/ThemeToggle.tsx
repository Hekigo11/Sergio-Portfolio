import { motion, useReducedMotion } from "motion/react";

const EASING = [0.22, 1, 0.36, 1] as const;

function SunIcon({ className }: { className: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      className={className}
    >
      <circle cx="12" cy="12" r="4.25" />
      <path d="M12 2.5v2.25M12 19.25v2.25M4.4 4.4l1.6 1.6M18 18l1.6 1.6M2.5 12h2.25M19.25 12h2.25M4.4 19.6l1.6-1.6M18 6l1.6-1.6" />
    </svg>
  );
}

function MoonIcon({ className }: { className: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M20 14.2A8.25 8.25 0 0 1 9.8 4a8.25 8.25 0 1 0 10.2 10.2Z" />
    </svg>
  );
}

type ThemeToggleSize = "sm" | "md";

const SIZES: Record<ThemeToggleSize, { track: string; knob: string; icon: string }> = {
  // Home's toggle sits beside a small directional chevron rather than
  // carrying nav chrome around it, so it reads at one notch smaller.
  sm: { track: "h-7 w-12", knob: "h-5 w-5", icon: "h-3 w-3" },
  md: { track: "h-8 w-14", knob: "h-6 w-6", icon: "h-3.5 w-3.5" },
};

interface ThemeToggleProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  size?: ThemeToggleSize;
}

// The one theme-toggle control, used by the navbar and by Home's own copy of
// it (see DESIGN.md's Named Rules — both toggles answer a press the same way,
// which only holds if they are one component rather than two hand-rolled
// copies that can drift). A pill track with a solid `bg-accent` knob carrying
// a drawn sun/moon glyph that slides via Motion `layout`.
export function ThemeToggle({
  darkMode,
  onToggleDarkMode,
  size = "md",
}: ThemeToggleProps) {
  const shouldReduceMotion = useReducedMotion();
  const { track, knob, icon } = SIZES[size];

  // The knob slides on a spring; the glyph inside it used to swap on the same
  // frame, which read as a hard cut in the middle of a smooth travel. It
  // cross-fades and turns a few degrees instead — the lamp changing, not a
  // different lamp. Reduced motion keeps the fade and drops the turn.
  const glyph = (visible: boolean, turn: number) => ({
    opacity: visible ? 1 : 0,
    rotate: shouldReduceMotion ? 0 : visible ? 0 : turn,
  });

  return (
    <button
      type="button"
      onClick={onToggleDarkMode}
      aria-label="Toggle dark mode"
      aria-pressed={darkMode}
      className={`flex items-center rounded-full border border-border bg-surface p-1 hover:border-border-strong active:border-accent/60 ${track} ${
        darkMode ? "justify-end" : "justify-start"
      }`}
    >
      <motion.span
        layout
        transition={{ type: "spring", visualDuration: 0.2, bounce: 0.2 }}
        className={`relative flex items-center justify-center rounded-full bg-accent text-accent-ink ${knob}`}
      >
        <motion.span
          aria-hidden="true"
          initial={false}
          animate={glyph(!darkMode, -50)}
          transition={{ duration: 0.22, ease: EASING }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <SunIcon className={icon} />
        </motion.span>
        <motion.span
          aria-hidden="true"
          initial={false}
          animate={glyph(darkMode, 50)}
          transition={{ duration: 0.22, ease: EASING }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <MoonIcon className={icon} />
        </motion.span>
      </motion.span>
      <span className="sr-only">
        {darkMode ? "Switch to light mode" : "Switch to dark mode"}
      </span>
    </button>
  );
}

export default ThemeToggle;
