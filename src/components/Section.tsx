import { forwardRef, useEffect, useRef, type ReactNode } from "react";
import { useScrollFlowRegistry } from "../scroll/scrollFlowContext";
import { useSectionScrollFlow } from "../scroll/useSectionScrollFlow";

interface SectionProps {
  id: string;
  label: string;
  position: { x: number; y: number };
  darkMode: boolean;
  visible: boolean;
  children?: ReactNode;
  className?: string;
  /** Full section id order, for computing this section's neighbors. */
  sectionOrder?: string[];
  /** Scrolling past this section's top/bottom edge navigates to a neighbor. */
  onNavigate?: (id: string) => void;
}

const filler = [
  "Placeholder line so this section can scroll.",
  "More placeholder content to extend the height.",
  "Swap this for real content later.",
  "Keep scrolling, nothing to see here yet.",
  "Spatial portfolio placeholder copy.",
  "Placeholder line so this section can scroll.",
  "More placeholder content to extend the height.",
  "Swap this for real content later.",
  "Keep scrolling, nothing to see here yet.",
  "Spatial portfolio placeholder copy.",
  "Placeholder line so this section can scroll.",
  "More placeholder content to extend the height.",
  "Swap this for real content later.",
  "Keep scrolling, nothing to see here yet.",
  "Spatial portfolio placeholder copy.",
];

export const Section = forwardRef<HTMLElement, SectionProps>(function Section(
  {
    id,
    label,
    position,
    darkMode: _darkMode,
    visible,
    children,
    className = "",
    sectionOrder,
    onNavigate,
  },
  ref,
) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const registry = useScrollFlowRegistry();

  // Entering a section starts it over — vertically, and for any horizontal
  // region inside it. Resetting only the vertical scroll would leave a
  // carousel parked at its far end, where it reports nothing to do and the
  // reader scrolls straight through into the next section.
  useEffect(() => {
    if (!visible) return;
    scrollContainerRef.current?.scrollTo({ top: 0 });
    registry?.resetConsumers(id);
  }, [visible, id, registry]);

  useSectionScrollFlow({
    containerRef: scrollContainerRef,
    sectionId: id,
    enabled: visible && Boolean(sectionOrder && onNavigate),
    onNext: () => {
      if (!sectionOrder || !onNavigate) return;
      const next = sectionOrder[sectionOrder.indexOf(id) + 1];
      if (next) onNavigate(next);
    },
    onPrev: () => {
      if (!sectionOrder || !onNavigate) return;
      const prev = sectionOrder[sectionOrder.indexOf(id) - 1];
      if (prev) onNavigate(prev);
    },
  });

  return (
    <section
      ref={ref}
      id={id}
      aria-hidden={!visible}
      // The other three sections are still mounted, parked thousands of pixels
      // off-camera. Without `inert` their links, fields, and cards stay in the
      // tab order, so tabbing out of the navbar walks the focus ring off the
      // edge of the world — visible nowhere, and pulling the section's own
      // scroller around as it goes. `aria-hidden` alone silences a screen
      // reader without taking anything out of the tab order.
      inert={!visible}
      className={`absolute ${className}`}
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      <div
        ref={scrollContainerRef}
        className="flex h-[calc(100vh-4rem)] w-screen flex-col overflow-y-auto overscroll-contain text-ink"
      >
        {children ?? (
          <>
            <div className="flex min-h-[60vh] items-center justify-center">
              <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
                {label}
              </h2>
            </div>

            <div className="mx-auto flex w-full max-w-2xl flex-col gap-4 px-6 pb-20">
              {filler.map((line) => (
                <p key={line} className="text-ink-muted">
                  {line}
                </p>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
});

export default Section;
