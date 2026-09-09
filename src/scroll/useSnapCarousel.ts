import { useRef } from "react";
import type { HorizontalConsumer } from "./scrollFlowContext";

// Roughly one deliberate mouse-wheel click, or a sustained trackpad push, per
// card. Low values here make the row bolt across several cards in a single
// flick — the travel should feel stepped and readable, not flung.
const TRIGGER_THRESHOLD = 120;
const RESET_IDLE_MS = 150;
// Long enough for the smooth scroll to settle before the next card can be
// requested, so a continuous gesture advances at a readable pace.
const LOCKOUT_MS = 650;

interface Options {
  /** The element that must be fully on screen before paging begins. Defaults
   * to the row, but a row is usually only part of its section — gating on the
   * whole section is what makes the reader finish the descent first. */
  gateRef?: React.RefObject<HTMLElement | null>;
}

// Builds a HorizontalConsumer that pages a `snap-x` row one card at a time,
// producing an L-shaped motion: the reader scrolls down until the section has
// fully arrived, the row then takes the wheel and travels across, and once it
// runs out the wheel goes back to the page.
//
// It never nudges `scrollLeft` incrementally: a `snap-mandatory` container
// fights small position changes and pulls straight back to the nearest snap
// point, so per-tick nudges visually do nothing. Jumping to a card's own
// `offsetLeft` lands on a position the snap machinery already agrees with.
export function useSnapCarousel(
  ref: React.RefObject<HTMLElement | null>,
  { gateRef }: Options = {},
): HorizontalConsumer {
  const accumRef = useRef(0);
  const lastWheelAtRef = useRef(0);
  const lockedUntilRef = useRef(0);

  const nextCard = (
    deltaY: number,
    viewport: DOMRect,
  ): HTMLElement | undefined => {
    const el = ref.current;
    if (!el) return undefined;

    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) return undefined;

    // The row's real scroll boundary is authoritative — never card indices.
    // The last card's offsetLeft is almost always greater than maxScroll (a
    // row cannot scroll far enough to put its final card at the left edge),
    // so `scrollTo` clamps, and at that clamped position the *nearest* card
    // is the second to last. Index arithmetic alone would therefore keep
    // proposing a target the row can never reach and would hold the wheel
    // forever, making the next section unreachable by scrolling.
    if (deltaY > 0 && el.scrollLeft >= maxScroll - 1) return undefined;
    if (deltaY < 0 && el.scrollLeft <= 1) return undefined;

    // Only page once the reader has actually arrived. Gating on the row alone
    // fires while the section's heading and lower padding are still cut off,
    // so the descent stalls early; gating on the whole section means the
    // vertical travel finishes first and the corner of the L lands where the
    // section is properly framed.
    const gate = gateRef?.current ?? el;
    const rect = gate.getBoundingClientRect();
    const settled =
      rect.height > viewport.height
        ? rect.top <= viewport.top + 1 && rect.bottom >= viewport.bottom - 1
        : rect.top >= viewport.top - 1 && rect.bottom <= viewport.bottom + 1;
    if (!settled) return undefined;

    const cards = Array.from(el.children) as HTMLElement[];
    if (cards.length === 0) return undefined;

    const current = cards.reduce((closest, card) =>
      Math.abs(card.offsetLeft - el.scrollLeft) <
      Math.abs(closest.offsetLeft - el.scrollLeft)
        ? card
        : closest,
    );
    return cards[cards.indexOf(current) + (deltaY > 0 ? 1 : -1)];
  };

  return {
    canConsume: (deltaY, viewport) => nextCard(deltaY, viewport) !== undefined,
    consume: (deltaY, viewport) => {
      const el = ref.current;
      const target = nextCard(deltaY, viewport);
      if (!el || !target) return;

      const now = performance.now();
      if (now < lockedUntilRef.current) return;

      if (now - lastWheelAtRef.current > RESET_IDLE_MS) accumRef.current = 0;
      lastWheelAtRef.current = now;
      accumRef.current += Math.abs(deltaY);
      if (accumRef.current < TRIGGER_THRESHOLD) return;

      accumRef.current = 0;
      lockedUntilRef.current = now + LOCKOUT_MS;
      el.scrollTo({ left: target.offsetLeft, behavior: "smooth" });
    },
    // Re-entering the section starts the row over. Without this, a row left
    // at its far end simply reports "nothing to do" on the next visit and the
    // L is skipped — the reader scrolls straight past into the next section.
    reset: () => {
      accumRef.current = 0;
      lockedUntilRef.current = 0;
      ref.current?.scrollTo({ left: 0, behavior: "auto" });
    },
  };
}
