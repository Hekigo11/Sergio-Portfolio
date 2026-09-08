import { useEffect, useRef } from "react";

// Mirrors useScrollChainNavigation's cadence: a deliberate amount of
// accumulated wheel input before acting, and a lockout so one gesture can't
// fire twice while the previous jump is still animating.
const TRIGGER_THRESHOLD = 40;
const RESET_IDLE_MS = 150;
const LOCKOUT_MS = 450;

interface Options {
  /** Where the wheel listener attaches — the full section, not just the row.
   * A `snap-x` row is usually much shorter than the section around it, and a
   * user scrolling the page with the cursor at a natural, unmoving position
   * has no reason to be hovering that exact narrow band — listening only on
   * the row itself misses most real gestures and falls straight through to
   * section-chain navigation instead of paging the cards. */
  hitAreaRef: React.RefObject<HTMLElement | null>;
  /** The actual `overflow-x-auto` element being paged. */
  scrollRef: React.RefObject<HTMLElement | null>;
  enabled?: boolean;
}

// Redirects a vertical wheel gesture, anywhere over the section, into paging
// a `snap-x` row one card at a time. This does NOT nudge `scrollLeft`
// directly — a `snap-mandatory` container fights small incremental position
// changes and pulls straight back to the nearest snap point, so a per-tick
// nudge visually does nothing. Jumping to each card's own offsetLeft via
// `scrollTo` instead cooperates with the snap machinery rather than
// fighting it.
//
// Only ever claims the event while there's a card to move to in the wheel's
// direction. At either end it does nothing and lets the event bubble
// untouched — at the first card that's normal page scroll continuing
// upward; at the last card that's the handoff to scroll-chain navigation on
// the ancestor Section.
export function useWheelSnapScroll({ hitAreaRef, scrollRef, enabled = true }: Options) {
  const accumRef = useRef(0);
  const lastWheelAtRef = useRef(0);
  const lockedUntilRef = useRef(0);

  useEffect(() => {
    const hitArea = hitAreaRef.current;
    if (!hitArea || !enabled) return;

    const handleWheel = (event: WheelEvent) => {
      // A real horizontal gesture already scrolls the row on its own —
      // only step in for a plain vertical wheel.
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      if (event.deltaY === 0) return;

      const el = scrollRef.current;
      if (!el) return;

      // The hit area is deliberately wider than the row (see above), but
      // that must not make horizontal paging kick in before the row itself
      // has actually scrolled into view — e.g. while the cursor sits over
      // the section heading and the row is still below the viewport. Only
      // claim the event once the row has any on-screen presence at all;
      // otherwise let normal vertical scroll continue uninterrupted.
      const rect = el.getBoundingClientRect();
      const rowOnScreen = rect.bottom > 0 && rect.top < window.innerHeight;
      if (!rowOnScreen) {
        accumRef.current = 0;
        return;
      }

      const maxScroll = el.scrollWidth - el.clientWidth;
      if (maxScroll <= 0) return;

      const cards = Array.from(el.children) as HTMLElement[];
      if (cards.length === 0) return;

      const current = cards.reduce((closest, card) =>
        Math.abs(card.offsetLeft - el.scrollLeft) <
        Math.abs(closest.offsetLeft - el.scrollLeft)
          ? card
          : closest,
      );
      const target = cards[cards.indexOf(current) + (event.deltaY > 0 ? 1 : -1)];

      if (!target) {
        accumRef.current = 0;
        return;
      }

      const now = performance.now();
      event.preventDefault();
      event.stopPropagation();

      if (now < lockedUntilRef.current) return;

      if (now - lastWheelAtRef.current > RESET_IDLE_MS) accumRef.current = 0;
      lastWheelAtRef.current = now;
      accumRef.current += Math.abs(event.deltaY);
      if (accumRef.current < TRIGGER_THRESHOLD) return;

      accumRef.current = 0;
      lockedUntilRef.current = now + LOCKOUT_MS;
      el.scrollTo({ left: target.offsetLeft, behavior: "smooth" });
    };

    hitArea.addEventListener("wheel", handleWheel, { passive: false });
    return () => hitArea.removeEventListener("wheel", handleWheel);
  }, [hitAreaRef, scrollRef, enabled]);
}
