import { forwardRef, useEffect, useRef, type ReactNode } from "react";

interface SectionProps {
  id: string;
  label: string;
  position: { x: number; y: number };
  darkMode: boolean;
  visible: boolean;
  children?: ReactNode;
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
  { id, label, position, darkMode, visible, children, className = "" },
  ref,
) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visible) {
      scrollContainerRef.current?.scrollTo({ top: 0 });
    }
  }, [visible]);

  return (
    <section
      ref={ref}
      id={id}
      aria-hidden={!visible}
      className={`absolute ${className}`}
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      <div
        ref={scrollContainerRef}
        className={
          darkMode
            ? "flex h-[calc(100vh-4rem)] w-screen flex-col overflow-y-auto overscroll-contain bg-slate-950"
            : "flex h-[calc(100vh-4rem)] w-screen flex-col overflow-y-auto overscroll-contain bg-slate-50"
        }
      >
        {children ?? (
          <>
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
          </>
        )}
      </div>
    </section>
  );
});

export default Section;
