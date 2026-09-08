import { useEffect, useState } from "react";
import type { Comment } from "../lib/api";
import MetaLabel from "./ui/MetaLabel";

interface VisitorNotesCarouselProps {
  comments: Comment[];
  darkMode: boolean;
  intervalMs?: number;
}

// Mirrors WordCarousel's auto-advance + dot pattern, applied to visitor
// comments instead of focus-area words.
const VisitorNotesCarousel = ({
  comments,
  darkMode: _darkMode,
  intervalMs = 5000,
}: VisitorNotesCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [comments]);

  useEffect(() => {
    if (comments.length <= 1) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % comments.length);
    }, intervalMs);
    return () => window.clearInterval(timer);
  }, [comments.length, intervalMs]);

  const active = comments[activeIndex];
  if (!active) return null;

  return (
    <div className="flex flex-col items-center gap-6">
      <p
        key={active.id}
        className="line-clamp-3 min-h-18 max-w-xl font-display text-xl leading-8 text-ink italic sm:text-2xl"
      >
        “{active.message}”
      </p>
      <p className="text-sm font-semibold text-ink-muted">— {active.name}</p>
      <div className="flex items-center gap-2" role="tablist" aria-label="Visitor notes">
        {comments.map((comment, index) => (
          <button
            key={comment.id}
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            aria-label={`Note from ${comment.name}`}
            onClick={() => setActiveIndex(index)}
            className={`h-1.5 w-1.5 rounded-full transition-colors ${
              index === activeIndex ? "bg-accent" : "bg-border-strong"
            }`}
          />
        ))}
      </div>
      <MetaLabel size="sm">Latest from visitors</MetaLabel>
    </div>
  );
};

export default VisitorNotesCarousel;
