import { useEffect, useRef } from "react";
import Section from "./Section";

export interface SectionPosition {
  x: number;
  y: number;
}

interface SpatialCanvasProps {
  activeSection: string;
  sections: Record<string, SectionPosition & { label: string }>;
  darkMode: boolean;
}

const TRANSITION_MS = 500;
const TRAVEL = 0.55;
const EASING_TRAVEL = "cubic-bezier(0.22, 1, 0.36, 1)";
const EASING_FADE = "ease-out";

export function SpatialCanvas({
  activeSection,
  sections,
  darkMode,
}: SpatialCanvasProps) {
  const refs = useRef<Record<string, HTMLElement | null>>({});
  const prevRef = useRef<string | null>(null);

  useEffect(() => {
    const prev = prevRef.current;
    prevRef.current = activeSection;

    if (prev === null || prev === activeSection) return;

    const from = sections[prev];
    const to = sections[activeSection];
    const tx = (to.x - from.x) * TRAVEL;
    const ty = (to.y - from.y) * TRAVEL;

    const prevEl = refs.current[prev];
    const nextEl = refs.current[activeSection];
    if (!prevEl || !nextEl) return;

    prevEl.style.visibility = "visible";
    prevEl.style.zIndex = "0";
    nextEl.style.zIndex = "1";

    const travelOpts = {
      duration: TRANSITION_MS,
      easing: EASING_TRAVEL,
      composite: "add",
      fill: "forwards",
    } as KeyframeAnimationOptions;

    const fadeOut = prevEl.animate(
      [{ opacity: 1 }, { opacity: 0 }],
      {
        duration: TRANSITION_MS,
        easing: EASING_FADE,
        fill: "forwards",
      },
    );

    const travelIn = nextEl.animate(
      [
        { transform: `translate(${tx}px, ${ty}px)` },
        { transform: "translate(0px, 0px)" },
      ],
      travelOpts,
    );

    const travelOut = prevEl.animate(
      [
        { transform: "translate(0px, 0px)" },
        { transform: `translate(${-tx}px, ${-ty}px)` },
      ],
      travelOpts,
    );

    const cleanup = () => {
      fadeOut.cancel();
      travelIn.cancel();
      travelOut.cancel();
      prevEl.style.visibility = "hidden";
      prevEl.style.zIndex = "-1";
    };

    travelIn.onfinish = cleanup;
    travelIn.oncancel = cleanup;

    return cleanup;
  }, [activeSection, sections]);

  return (
    <div className="relative h-[calc(100vh-4rem)] w-full overflow-hidden">
      {Object.entries(sections).map(([id, section]) => (
        <Section
          key={id}
          ref={(el) => {
            refs.current[id] = el;
          }}
          id={id}
          label={section.label}
          darkMode={darkMode}
          visible={id === activeSection}
        />
      ))}
    </div>
  );
}

export default SpatialCanvas;
