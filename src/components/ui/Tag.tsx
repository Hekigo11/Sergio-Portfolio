import type { ReactNode } from "react";

interface TagProps {
  children: ReactNode;
  // `badge` is a specimen label (role, honor); `stack` is a literal token
  // (a language, a library) and keeps its own casing.
  variant?: "badge" | "stack";
  tone?: "default" | "brass";
  // `custom` drops the built-in size/padding so a caller can scale it
  // (the coverflow card sizes everything against --fit).
  size?: "sm" | "custom";
  className?: string;
}

const shapes = {
  badge: "rounded-full font-semibold tracking-wide uppercase",
  stack: "rounded-md font-medium",
};

const tones = {
  default: "border-border text-ink-muted",
  brass: "border-brass/40 bg-brass/10 text-brass",
};

export function Tag({
  children,
  variant = "badge",
  tone = "default",
  size = "sm",
  className = "",
}: TagProps) {
  const sizing =
    size === "custom"
      ? ""
      : variant === "badge"
        ? "px-3 py-1 text-[11px]"
        : "px-2.5 py-1 text-xs";

  return (
    <span
      className={`inline-flex w-fit items-center border font-mono ${shapes[variant]} ${tones[tone]} ${sizing} ${className}`}
    >
      {children}
    </span>
  );
}

export default Tag;
