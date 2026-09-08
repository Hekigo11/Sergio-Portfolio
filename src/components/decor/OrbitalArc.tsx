interface OrbitalArcProps {
  className?: string;
  /** Portion of the ellipse's circumference drawn, in percent (0–100). */
  sweep?: number;
  /** Where the visible sweep starts, in percent around the ellipse. */
  offset?: number;
  /** Ellipse flatness: 100 is a true circle, lower is a squashed orbit. */
  flatten?: number;
  rotate?: number;
}

// A partial elliptical orbit, drawn with stroke-dasharray against a
// pathLength-normalized ellipse so the sweep is a plain percentage rather
// than hand-computed arc-path geometry. Color and opacity come entirely
// from the caller's `className` (currentColor) — the mark carries no
// built-in hue, so it stays theme-aware for free via the token it inherits.
export function OrbitalArc({
  className = "",
  sweep = 38,
  offset = 0,
  flatten = 62,
  rotate = 0,
}: OrbitalArcProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
    >
      <ellipse
        cx="50"
        cy="50"
        rx="48"
        ry={flatten / 2}
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        pathLength={100}
        strokeDasharray={`${sweep} ${100 - sweep}`}
        strokeDashoffset={-offset}
        transform={rotate ? `rotate(${rotate} 50 50)` : undefined}
      />
    </svg>
  );
}

export default OrbitalArc;
