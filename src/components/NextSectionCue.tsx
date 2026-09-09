import MetaLabel from "./ui/MetaLabel";

interface NextSectionCueProps {
  /** The destination's own canvas label, e.g. "Projects". */
  label: string;
  onNavigate: () => void;
}

// The bottom of a section is a dead end on a touch device. The scroll chain
// that carries a reader from one section into the next is driven by `wheel`
// events (see useSectionScrollFlow), which a touchscreen never fires — so
// before this, the drawer menu was the only way off a section on a phone,
// and reaching the end of Home simply stopped.
//
// Shaped as a ledger row rather than a new invention: mono label in the
// margin, the value beside it, a chevron at the edge. That is the same idiom
// Connect's contact directory already uses for "this row takes you
// somewhere", so the one genuinely new control on the site still reads as
// something the reader has met before. The destination is set in the display
// serif because it is a section title — the same voice it will be wearing a
// moment later at the top of the page it leads to.
export function NextSectionCue({ label, onNavigate }: NextSectionCueProps) {
  return (
    <div className="hidden shrink-0 px-6 pb-10 sm:px-10 touch:block">
      <button
        type="button"
        onClick={onNavigate}
        aria-label={`Next section: ${label}`}
        className="press group mx-auto flex w-full max-w-6xl items-center gap-6 border-t border-border py-5 text-left active:bg-accent/5"
      >
        <MetaLabel className="shrink-0">Next</MetaLabel>
        <span className="font-display text-lg font-bold tracking-tight text-ink">
          {label}
        </span>
        {/* Down, not the section's actual travel direction. The canvas sends
            you up to About and right to Projects, but this control means
            "keep reading" — an arrow that pointed up here would describe the
            camera rather than the gesture. */}
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="ml-auto h-4 w-4 shrink-0 rotate-90 text-ink-faint transition-colors group-active:text-accent"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>
    </div>
  );
}

export default NextSectionCue;
