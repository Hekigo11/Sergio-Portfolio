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

const TRANSITION_MS = 700;
const EASING_TRAVEL = "cubic-bezier(0.22, 1, 0.36, 1)";

export function SpatialCanvas({
  activeSection,
  sections,
  darkMode,
}: SpatialCanvasProps) {
  const activePosition = sections[activeSection];

  return (
    <div className="relative h-[calc(100vh-4rem)] w-full overflow-hidden">
      <div
        className="absolute inset-0 will-change-transform motion-reduce:transition-none"
        style={{
          transform: `translate3d(${activePosition.x * -1}px, ${activePosition.y * -1}px, 0)`,
          transition: `transform ${TRANSITION_MS}ms ${EASING_TRAVEL}`,
        }}
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
      </div>
    </div>
  );
}

export default SpatialCanvas;
