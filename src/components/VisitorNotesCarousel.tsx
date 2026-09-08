import { useEffect, useState } from "react";
import type { Comment } from "../lib/api";

interface VisitorNotesCarouselProps {
  comments: Comment[];
  darkMode: boolean;
  intervalMs?: number;
}

// Mirrors WordCarousel's auto-advance + dot pattern, applied to visitor
// comments instead of focus-area words.
const VisitorNotesCarousel = ({
  comments,
  darkMode,
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

  const muted = darkMode ? "text-slate-400" : "text-slate-600";
  const active = comments[activeIndex];
  if (!active) return null;

  return (
    <div className="flex flex-col items-center gap-6">
      <p
        key={active.id}
        className={`line-clamp-3 min-h-[4.5rem] max-w-xl text-xl leading-8 font-medium sm:text-2xl ${
          darkMode ? "text-slate-100" : "text-slate-900"
        }`}
      >
        “{active.message}”
      </p>
      <p className={`text-sm font-semibold ${muted}`}>— {active.name}</p>
      <div className="flex items-center gap-2" role="tablist" aria-label="Visitor notes">
        {comments.map((comment, index) => (
          <button
            key={comment.id}
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            aria-label={`Note from ${comment.name}`}
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
        Latest from visitors
      </span>
    </div>
  );
};

export default VisitorNotesCarousel;
