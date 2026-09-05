import { useEffect, useState } from "react";

interface WordCarouselProps {
  words: string[];
  darkMode: boolean;
  intervalMs?: number;
}

const WordCarousel = ({ words, darkMode, intervalMs = 2600 }: WordCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (words.length <= 1) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % words.length);
    }, intervalMs);
    return () => window.clearInterval(timer);
  }, [words.length, intervalMs]);

  const muted = darkMode ? "text-slate-400" : "text-slate-600";

  return (
    <div className="flex flex-col items-center gap-6">
      <p
        key={activeIndex}
        className="text-3xl font-semibold tracking-tight sm:text-4xl"
        aria-live="polite"
      >
        {words[activeIndex]}
      </p>
      <div className="flex items-center gap-2" role="tablist" aria-label="Focus areas">
        {words.map((word, index) => (
          <button
            key={word}
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            aria-label={word}
            onClick={() => setActiveIndex(index)}
            className={`h-2 w-2 rounded-full transition-colors ${
              index === activeIndex
                ? darkMode
                  ? "bg-slate-100"
                  : "bg-slate-900"
                : darkMode
                  ? "bg-slate-700"
                  : "bg-slate-300"
            }`}
          />
        ))}
      </div>
      <span className={`text-xs font-medium uppercase tracking-wide ${muted}`}>
        Focus
      </span>
    </div>
  );
};

export default WordCarousel;
