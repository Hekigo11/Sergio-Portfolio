interface TrajectoryLineProps {
  className?: string;
  /** How far the midpoint bows away from a straight line, in viewBox units. */
  bow?: number;
  dashed?: boolean;
}

// A fine, gently bowed line — a plotted path or bearing line, never a
// straight structural rule. Kept visually distinct from the system's
// hairline `border-t`/`h-px` dividers (which are always straight and always
// full-width) so it never reads as a misplaced layout boundary.
export function TrajectoryLine({
  className = "",
  bow = 14,
  dashed = false,
}: TrajectoryLineProps) {
  return (
    <svg
      viewBox="0 0 100 32"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
    >
      <path
        d={`M 1 28 Q 50 ${28 - bow} 99 4`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeDasharray={dashed ? "1 5" : undefined}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export default TrajectoryLine;
