import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import CarouselDots from "./ui/CarouselDots";
import MetaLabel from "./ui/MetaLabel";

interface WordCarouselProps {
  words: string[];
  darkMode: boolean;
  intervalMs?: number;
}

const EASING = [0.22, 1, 0.36, 1] as const;

const WordCarousel = ({
  words,
  darkMode: _darkMode,
  intervalMs = 2600,
}: WordCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  // Auto-advance is movement the visitor did not ask for; under reduced motion
  // the first focus area stays put and the dots are how you read the rest.
  useEffect(() => {
    if (words.length <= 1 || shouldReduceMotion) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % words.length);
    }, intervalMs);
    return () => window.clearInterval(timer);
  }, [words.length, intervalMs, shouldReduceMotion]);

  return (
    <div className="flex flex-col items-center gap-6">
      {/* The word used to change on a bare `key` remount — a hard cut with
          nothing explaining that one word had replaced another. It crosses
          over instead, out faster than in, and `mode="wait"` keeps the two
          words from ever overlapping in the same line. */}
      <div className="flex min-h-10 items-center sm:min-h-11">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={activeIndex}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.14 } }}
            transition={{ duration: 0.3, ease: EASING }}
            className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl"
            aria-live="polite"
          >
            {words[activeIndex]}
          </motion.p>
        </AnimatePresence>
      </div>
      <CarouselDots
        count={words.length}
        activeIndex={activeIndex}
        onSelect={setActiveIndex}
        label="Focus areas"
        itemLabel={(index) => words[index]}
      />
      <MetaLabel size="sm">Focus</MetaLabel>
    </div>
  );
};

export default WordCarousel;
