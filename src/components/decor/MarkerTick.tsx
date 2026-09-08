interface MarkerTickProps {
  className?: string;
  rotate?: number;
}

// A small crosshair — the field-journal habit of marking one exact point
// (a plotted position, an observation) rather than a generic UI dot.
export function MarkerTick({ className = "", rotate = 0 }: MarkerTickProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
    >
      <g
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        transform={rotate ? `rotate(${rotate} 12 12)` : undefined}
      >
        <path d="M12 2v6M12 16v6M2 12h6M16 12h6" />
        <circle cx="12" cy="12" r="2.5" fill="none" />
      </g>
    </svg>
  );
}

export default MarkerTick;
