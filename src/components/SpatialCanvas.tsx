import { motion, useReducedMotion } from "motion/react";
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

const TRANSITION_SECONDS = 0.7;
const EASING_TRAVEL = [0.22, 1, 0.36, 1] as const;

export function SpatialCanvas({
  activeSection,
  sections,
  darkMode,
}: SpatialCanvasProps) {
  const activePosition = sections[activeSection];
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative h-[calc(100vh-4rem)] w-full overflow-hidden">
      <motion.div
        className="absolute inset-0 will-change-transform"
        animate={{ x: -activePosition.x, y: -activePosition.y }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : { duration: TRANSITION_SECONDS, ease: EASING_TRAVEL }
        }
      >
        {Object.entries(sections).map(([id, section]) => (
          <Section
            key={id}
            id={id}
            label={section.label}
            position={section}
            darkMode={darkMode}
            visible={id === activeSection}
          />
        ))}
      </motion.div>
    </div>
  );
}

export default SpatialCanvas;
