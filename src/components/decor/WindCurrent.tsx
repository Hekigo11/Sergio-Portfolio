type CurrentVariant = "drift" | "swell" | "veer" | "eddy";

interface WindCurrentProps {
  className?: string;
  variant?: CurrentVariant;
  strokeWidth?: number;
  dashed?: boolean;
}

// Four authored strokes, not generated ones — each has its own character and
// its own asymmetry. Every path starts left of the viewBox and ends right of
// it, so a current always reads as passing through the frame rather than as a
// squiggle floating inside it.
const CURVES: Record<CurrentVariant, string> = {
  drift: "M -20 260 C 180 180, 380 300, 600 240 S 1000 140, 1220 200",
  swell: "M -20 320 C 220 340, 320 120, 600 180 S 980 320, 1220 160",
  veer: "M -20 120 C 260 60, 420 260, 700 220 S 1060 300, 1220 340",
  eddy: "M -20 200 C 160 120, 300 300, 460 240 C 620 180, 700 320, 900 260 S 1140 180, 1220 220",
};

// A single long ink stroke — the light theme's counterpart to the star: air
// moving across the page. Colour and opacity come from the caller's
// `className` (drawn in `currentColor`), and `non-scaling-stroke` keeps the
// line hairline-thin no matter how far the curve is stretched across a
// viewport.
export function WindCurrent({
  className = "",
  variant = "drift",
  strokeWidth = 1.25,
  dashed = false,
}: WindCurrentProps) {
  return (
    <svg
      viewBox="0 0 1200 400"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
    >
      <path
        d={CURVES[variant]}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={dashed ? "2 10" : undefined}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export default WindCurrent;
