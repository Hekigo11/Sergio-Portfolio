import type { ReactNode } from "react";

interface DecorFieldProps {
  children: ReactNode;
  className?: string;
}

// The safe mounting contract for every decorative placement: fills its
// `relative` ancestor exactly and clips anything inside to that box, so a
// shape positioned or transformed off-center can never grow a scrolling
// ancestor's scrollable area (the same class of bug the coverflow track
// works around for its own cards). Fully inert — no pointer events, and
// invisible to assistive tech — so it can never interfere with scrolling,
// navigation, or interaction regardless of what's placed inside it.
export function DecorField({ children, className = "" }: DecorFieldProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
}

export default DecorField;
