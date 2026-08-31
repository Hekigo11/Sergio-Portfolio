import { forwardRef } from "react";

interface SectionProps {
  id: string;
  label: string;
  darkMode: boolean;
  visible: boolean;
  className?: string;
}

const filler = [
  "Placeholder line so this section can scroll.",
  "More placeholder content to extend the height.",
  "Swap this for real content later.",
  "Keep scrolling, nothing to see here yet.",
  "Spatial portfolio placeholder copy.",
  "Placeholder line so this section can scroll.",
  "More placeholder content to extend the height.",
  "Swap this for real content later.",
  "Keep scrolling, nothing to see here yet.",
  "Spatial portfolio placeholder copy.",
  "Placeholder line so this section can scroll.",
  "More placeholder content to extend the height.",
  "Swap this for real content later.",
  "Keep scrolling, nothing to see here yet.",
  "Spatial portfolio placeholder copy.",
];

export const Section = forwardRef<HTMLElement, SectionProps>(function Section(
  { id, label, darkMode, visible, className = "" },
  ref,
) {
  return (
    <section
      ref={ref}
      id={id}
      aria-hidden={!visible}
      className={`absolute left-1/2 top-1/2 ${className}`}
      style={{
        visibility: visible ? "visible" : "hidden",
        transform: "translate(-50%, -50%)",
        zIndex: visible ? 1 : -1,
      }}
    >
      <div
        className={
          darkMode
            ? "flex h-[calc(100vh-4rem)] w-screen flex-col overflow-y-auto overscroll-contain bg-slate-950"
            : "flex h-[calc(100vh-4rem)] w-screen flex-col overflow-y-auto overscroll-contain bg-slate-50"
        }
      >
        <div className="flex min-h-[60vh] items-center justify-center">
          <h2
            className={
              darkMode
                ? "text-4xl font-bold tracking-tight text-slate-100 sm:text-5xl"
                : "text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl"
            }
          >
            {label}
          </h2>
        </div>

        <div className="mx-auto flex w-full max-w-2xl flex-col gap-4 px-6 pb-20">
          {filler.map((line) => (
            <p
              key={line}
              className={darkMode ? "text-slate-400" : "text-slate-500"}
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
});

export default Section;
