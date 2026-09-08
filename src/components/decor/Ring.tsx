interface RingProps {
  className?: string;
  /** Ellipse flatness: 100 is a true circle, lower is a squashed ring. */
  flatten?: number;
  rotate?: number;
}

// A full, thin elliptical outline — the plain "circle" mark in the
// vocabulary, distinct from OrbitalArc's partial sweep.
export function Ring({ className = "", flatten = 100, rotate = 0 }: RingProps) {
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
        transform={rotate ? `rotate(${rotate} 50 50)` : undefined}
      />
    </svg>
  );
}

export default Ring;
