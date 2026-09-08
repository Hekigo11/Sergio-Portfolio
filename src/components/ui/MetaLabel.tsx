import type { HTMLAttributes } from "react";

type MetaLabelSize = "xs" | "sm" | "custom";
type MetaLabelElement = "span" | "p" | "div" | "h3" | "h4" | "dt";

interface MetaLabelProps extends HTMLAttributes<HTMLElement> {
  size?: MetaLabelSize;
  as?: MetaLabelElement;
}

// The journal's annotation register: mono, uppercase, widely tracked. Reserved
// for data and field labels — dates, counts, stack names, form labels.
const sizes: Record<MetaLabelSize, string> = {
  xs: "text-[10px] tracking-[0.22em]",
  sm: "text-xs tracking-[0.2em]",
  custom: "",
};

export function MetaLabel({
  size = "xs",
  as: Component = "span",
  className = "",
  children,
  ...rest
}: MetaLabelProps) {
  return (
    <Component
      className={`font-mono font-medium text-ink-muted uppercase ${sizes[size]} ${className}`}
      {...rest}
    >
      {children}
    </Component>
  );
}

export default MetaLabel;
