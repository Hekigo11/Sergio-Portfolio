import { useEffect, useState } from "react";
import MetaLabel from "./ui/MetaLabel";

interface WordCarouselProps {
  words: string[];
  darkMode: boolean;
  intervalMs?: number;
}

const WordCarousel = ({
  words,
  darkMode: _darkMode,
  intervalMs = 2600,
}: WordCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (words.length <= 1) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % words.length);
    }, intervalMs);
    return () => window.clearInterval(timer);
  }, [words.length, intervalMs]);

  return (
    <div className="flex flex-col items-center gap-6">
      <p
        key={activeIndex}
        className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl"
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
            className={`h-1.5 w-1.5 rounded-full transition-colors ${
              index === activeIndex ? "bg-accent" : "bg-border-strong"
            }`}
          />
        ))}
      </div>
      <MetaLabel size="sm">Focus</MetaLabel>
    </div>
  );
};

export default WordCarousel;
