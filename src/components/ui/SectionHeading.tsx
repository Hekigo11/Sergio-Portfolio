import type { ReactNode } from "react";

interface SectionHeadingProps {
  children: ReactNode;
  description?: ReactNode;
  size?: "md" | "lg";
  className?: string;
}

// Chapter head: display serif title, optional standfirst, closed by the hairline
// rule that opens every content region in the journal.
export function SectionHeading({
  children,
  description,
  size = "md",
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={className}>
      <h2
        className={`font-display font-bold tracking-tight text-ink ${
          size === "lg" ? "text-4xl sm:text-5xl" : "text-3xl sm:text-4xl"
        }`}
      >
        {children}
      </h2>
      {description && (
        <p className="mt-4 max-w-2xl text-base leading-7 text-ink-muted">
          {description}
        </p>
      )}
      <div className="mt-6 h-px w-full bg-border" />
    </div>
  );
}

export default SectionHeading;
