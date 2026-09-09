interface CarouselDotsProps {
  count: number;
  activeIndex: number;
  onSelect: (index: number) => void;
  /** Names the group of controls, e.g. "Focus areas". */
  label: string;
  /** Names one control, e.g. `(i) => \`Go to image ${i + 1}\``. */
  itemLabel: (index: number) => string;
  /** `ink` sits on the page; `media` sits on top of a photograph. */
  tone?: "ink" | "media";
  className?: string;
}

// The position marker shared by every carousel in the journal (focus areas,
// visitor notes, a project's image plate). Three copies of the same six-pixel
// dot had drifted into three different hover, focus, and hit-target
// behaviours, so it owns them here instead.
//
// Two things it fixes by construction. The button is padded to a ~26px target
// around a 6px dot — the bare dot was a 6px tap target. And the set is a group
// of buttons with `aria-current`, not `role="tablist"`/`role="tab"`: there are
// no tab panels here, and a screen reader promised tabs then given none has
// been told the wrong thing about the control.
export function CarouselDots({
  count,
  activeIndex,
  onSelect,
  label,
  itemLabel,
  tone = "ink",
  className = "",
}: CarouselDotsProps) {
  const onMedia = tone === "media";

  return (
    <div
      role="group"
      aria-label={label}
      className={`flex items-center ${className}`}
    >
      {Array.from({ length: count }, (_, index) => {
        const active = index === activeIndex;
        return (
          <button
            key={index}
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onSelect(index);
            }}
            aria-label={itemLabel(index)}
            aria-current={active ? "true" : undefined}
            className={`group flex items-center justify-center rounded-full p-2.5 ${
              onMedia ? "focus-on-media" : ""
            }`}
          >
            <span
              // Scale, not width: the marker grows without asking the row to
              // reflow, and the transition list is explicit so it never
              // inherits a transform easing meant for something else.
              className={`block h-1.5 w-1.5 rounded-full transition-[transform,background-color] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                active ? "scale-125" : ""
              } ${
                onMedia
                  ? `shadow-[0_0_3px_rgba(0,0,0,0.7)] ${
                      active ? "bg-white" : "bg-white/50 group-hover:bg-white/80"
                    }`
                  : active
                    ? "bg-accent"
                    : "bg-border-strong group-hover:bg-ink-faint"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}

export default CarouselDots;
