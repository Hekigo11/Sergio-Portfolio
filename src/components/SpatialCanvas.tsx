import { motion, useReducedMotion } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";
import {
  SECTION_SPAN,
  useTravelBurst,
  type Travel,
} from "../spatial/journey";
import { ScrollFlowProvider } from "../scroll/ScrollFlowProvider";
import Section from "./Section";
import About from "./sections/About";
import Connect from "./sections/Connect";
import Home from "./sections/Home";
import Projects from "./sections/Projects";

/** A section's address on the canvas, in whole viewports away from Home. */
export interface SectionCell {
  col: number;
  row: number;
}

interface SpatialCanvasProps {
  activeSection: string;
  sections: Record<string, SectionCell & { label: string }>;
  /** The journey in flight, which sets how long this pan takes. */
  travel: Travel | null;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  /** Scrolling past a section's top/bottom edge navigates to a neighbor. */
  onNavigate: (id: string) => void;
}

// Fallback for the first pan of a session, before any journey exists.
const TRANSITION_SECONDS = 0.7;
const EASING_TRAVEL = [0.22, 1, 0.36, 1] as const;

// The header the canvas sits under; the canvas is `100vh` minus this.
const HEADER_HEIGHT = 64;

export function SpatialCanvas({
  activeSection,
  sections,
  travel,
  darkMode,
  onToggleDarkMode,
  onNavigate,
}: SpatialCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const sectionOrder = Object.keys(sections);

  // Promoting this layer costs GPU memory proportional to the canvas extent,
  // and the extent is now several viewports across in both axes. `will-change`
  // therefore lives only for the length of a pan — which is also the rule the
  // rest of the site follows. It is applied in the same commit that starts the
  // animation (both come from the same navigation), so the layer is already
  // promoted on the first frame rather than part-way through it.
  const panning = useTravelBurst(
    travel,
    travel ? travel.durationSeconds * 1000 + 80 : undefined,
  );

  // Section coordinates are SECTION_SPAN viewports apart, measured, rather
  // than a fixed pixel grid. Fixed coordinates broke at both ends of the
  // range: past about
  // 1800px wide the neighbouring section's box overlapped the active one and
  // bled into the edge of the screen, and on a phone that same 1800px step was
  // 4.6 screen-widths of travel inside the same 0.7s a laptop spends crossing
  // 1.4 — one pan read as a glide at a desk and a whip-pan in the hand.
  //
  // Because the step is a *multiple of the viewport* rather than a pixel
  // count, SECTION_SPAN can be raised as far as the design wants without any
  // device-specific consequence: the empty canvas between sections paints
  // nothing, the clip below means nothing off-screen is rasterised, and every
  // device travels the same number of its own screens.
  //
  // Seeded from the window so the very first paint is already correct: the
  // canvas is exactly `100vw` by `100vh - 4rem`, and nothing can scroll, so
  // there is no scrollbar to account for.
  const [step, setStep] = useState(() => ({
    x: (typeof window === "undefined" ? 0 : window.innerWidth) * SECTION_SPAN,
    y:
      (typeof window === "undefined" ? 0 : window.innerHeight - HEADER_HEIGHT) *
      SECTION_SPAN,
  }));

  useLayoutEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      const x = entry.contentRect.width * SECTION_SPAN;
      const y = entry.contentRect.height * SECTION_SPAN;
      // ResizeObserver reports the initial size on observe, which the seed
      // above already matched — return the same object so that first callback
      // does not re-render, and so a resize that changes only one axis does
      // not re-target the camera on the other.
      setStep((prev) => (prev.x === x && prev.y === y ? prev : { x, y }));
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const positionOf = (cell: SectionCell) => ({
    x: cell.col * step.x,
    y: cell.row * step.y,
  });

  const activePosition = positionOf(sections[activeSection]);

  return (
    <ScrollFlowProvider>
      <div
        ref={canvasRef}
        className="relative h-[calc(100vh-4rem)] w-full overflow-hidden"
      >
        <motion.div
          className={`absolute inset-0 ${panning ? "will-change-transform" : ""}`}
          animate={{ x: -activePosition.x, y: -activePosition.y }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : {
                  // Longer journeys take longer, but not proportionally — see
                  // journeyDuration. Holding one fixed duration across a canvas
                  // this wide would make the diagonal to Connect a blur.
                  duration: travel?.durationSeconds ?? TRANSITION_SECONDS,
                  ease: EASING_TRAVEL,
                }
          }
        >
          {Object.entries(sections).map(([id, section]) => (
            <Section
              key={id}
              id={id}
              label={section.label}
              position={positionOf(section)}
              darkMode={darkMode}
              visible={id === activeSection}
              sectionOrder={sectionOrder}
              onNavigate={onNavigate}
            >
              {id === "home" ? (
                <Home darkMode={darkMode} onToggleDarkMode={onToggleDarkMode} />
              ) : id === "about" ? (
                <About darkMode={darkMode} />
              ) : id === "projects" ? (
                <Projects darkMode={darkMode} />
              ) : id === "connect" ? (
                <Connect darkMode={darkMode} />
              ) : undefined}
            </Section>
          ))}
        </motion.div>
      </div>
    </ScrollFlowProvider>
  );
}

export default SpatialCanvas;
