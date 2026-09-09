import { useEffect, useRef } from "react";
import { useScrollFlowRegistry } from "./scrollFlowContext";
import { MAX_JOURNEY_SECONDS } from "../spatial/journey";

// A mouse wheel click is usually one ~100px deltaY tick, so this fires on the
// first deliberate tick at a boundary. A trackpad sends many small deltas per
// gesture, making this "keep pushing for about this much" rather than a
// hair-trigger on the first pixel of inertial scroll.
const TRIGGER_THRESHOLD = 70;
// A gap this long between events means a new gesture, not a pause in the same
// one — the accumulator starts over rather than carrying stale intent.
const RESET_IDLE_MS = 150;
// Covers the camera pan plus a buffer, so one gesture cannot chain through two
// sections in a single motion. The pan is no longer one fixed length — it
// scales with how far the journey actually is — so this takes the longest a
// journey can run rather than a number that happened to match the old 0.7s.
// Locking out for the worst case costs a little dead time after a short hop
// and is the only version that cannot let a fast scroll skip a section.
const LOCKOUT_MS = MAX_JOURNEY_SECONDS * 1000 + 150;

interface Options {
  containerRef: React.RefObject<HTMLElement | null>;
  sectionId: string;
  enabled: boolean;
  onNext: () => void;
  onPrev: () => void;
}

// The single wheel listener for the active section, resolving every tick in
// one fixed order:
//
//   1. a registered horizontal region that is on screen with room to move
//   2. a nested vertical scroller with room (Connect's comment feed)
//   3. this section's own vertical scroll
//   4. navigate to the neighbouring section
//
// Because the order is fixed and evaluated in one place, behaviour depends on
// where the reader is in the page — not on where the cursor happens to hover.
export function useSectionScrollFlow({
  containerRef,
  sectionId,
  enabled,
  onNext,
  onPrev,
}: Options) {
  const registry = useScrollFlowRegistry();
  const accumRef = useRef(0);
  const lastWheelAtRef = useRef(0);
  const lockedUntilRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !enabled) return;

    const handleWheel = (event: WheelEvent) => {
      // A primarily-horizontal gesture is never vertical-flow input — leave it
      // alone entirely, and don't disturb the accumulator.
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      if (event.deltaY === 0) return;

      const now = performance.now();
      if (now < lockedUntilRef.current) {
        event.preventDefault();
        return;
      }

      // 1. Horizontal regions in this section get first claim. The section's
      // own box is the viewport they measure themselves against — read once,
      // and only when there is actually a consumer to ask.
      const consumers = registry?.consumersFor(sectionId) ?? [];
      if (consumers.length > 0) {
        const viewport = container.getBoundingClientRect();
        for (const consumer of consumers) {
          if (!consumer.canConsume(event.deltaY, viewport)) continue;
          event.preventDefault();
          accumRef.current = 0;
          consumer.consume(event.deltaY, viewport);
          return;
        }
      }

      // 2. A nested vertical scroller still moving is doing its own job.
      if (nestedScrollerHasRoom(event.target as Element | null, container, event.deltaY)) {
        accumRef.current = 0;
        return;
      }

      // 3. This section's own scroll, while it has anywhere left to go.
      const atBottom =
        container.scrollHeight - container.clientHeight - container.scrollTop <= 1;
      const atTop = container.scrollTop <= 0;
      if (event.deltaY > 0 && !atBottom) {
        accumRef.current = 0;
        return;
      }
      if (event.deltaY < 0 && !atTop) {
        accumRef.current = 0;
        return;
      }

      // 4. Nothing left to scroll — chain to the neighbouring section.
      if (now - lastWheelAtRef.current > RESET_IDLE_MS) accumRef.current = 0;
      lastWheelAtRef.current = now;
      accumRef.current += Math.abs(event.deltaY);
      if (accumRef.current < TRIGGER_THRESHOLD) return;

      event.preventDefault();
      accumRef.current = 0;
      lockedUntilRef.current = now + LOCKOUT_MS;
      if (event.deltaY > 0) onNext();
      else onPrev();
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [containerRef, sectionId, enabled, onNext, onPrev, registry]);
}

// Walks from the event's target up to (but not including) `stopAt`. True if
// any element on that path is vertically scrollable and still has room in the
// wheel's direction — meaning the event belongs to it.
function nestedScrollerHasRoom(
  target: Element | null,
  stopAt: Element,
  deltaY: number,
): boolean {
  let node = target;
  while (node && node !== stopAt) {
    const style = getComputedStyle(node);
    const canScrollY = style.overflowY === "auto" || style.overflowY === "scroll";
    if (canScrollY && node.scrollHeight > node.clientHeight) {
      const atBottom = node.scrollHeight - node.clientHeight - node.scrollTop <= 1;
      const atTop = node.scrollTop <= 0;
      if (deltaY > 0 && !atBottom) return true;
      if (deltaY < 0 && !atTop) return true;
    }
    node = node.parentElement;
  }
  return false;
}
