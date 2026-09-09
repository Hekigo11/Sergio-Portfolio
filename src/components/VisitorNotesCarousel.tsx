import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import type { Comment } from "../lib/api";
import CarouselDots from "./ui/CarouselDots";
import MetaLabel from "./ui/MetaLabel";

interface VisitorNotesCarouselProps {
  comments: Comment[];
  darkMode: boolean;
  intervalMs?: number;
}

const EASING = [0.22, 1, 0.36, 1] as const;

// Mirrors WordCarousel's auto-advance + dot pattern, applied to visitor
// comments instead of focus-area words.
const VisitorNotesCarousel = ({
  comments,
  darkMode: _darkMode,
  intervalMs = 5000,
}: VisitorNotesCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setActiveIndex(0);
  }, [comments]);

  useEffect(() => {
    if (comments.length <= 1 || shouldReduceMotion) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % comments.length);
    }, intervalMs);
    return () => window.clearInterval(timer);
  }, [comments.length, intervalMs, shouldReduceMotion]);

  const active = comments[activeIndex];
  if (!active) return null;

  return (
    <div className="flex flex-col items-center gap-6">
      {/* One note replaces another: it crosses over rather than cutting, and
          the pair never overlaps mid-sentence. */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, transition: { duration: 0.14 } }}
          transition={{ duration: 0.34, ease: EASING }}
          className="flex flex-col items-center gap-6"
        >
          <p className="line-clamp-3 min-h-18 max-w-xl font-display text-xl leading-8 text-ink italic sm:text-2xl">
            “{active.message}”
          </p>
          <p className="text-sm font-semibold text-ink-muted">— {active.name}</p>
        </motion.div>
      </AnimatePresence>
      <CarouselDots
        count={comments.length}
        activeIndex={activeIndex}
        onSelect={setActiveIndex}
        label="Visitor notes"
        itemLabel={(index) => `Note from ${comments[index].name}`}
      />
      <MetaLabel size="sm">Latest from visitors</MetaLabel>
    </div>
  );
};

export default VisitorNotesCarousel;
