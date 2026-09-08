import { useEffect, useRef } from "react";

// A mouse wheel click is usually one ~100px deltaY tick — this fires on the
// first deliberate tick at a boundary. A trackpad sends many small deltas per
// gesture, so this is really "keep pushing for about this much" rather than a
// hair-trigger on the first pixel of inertial scroll.
const TRIGGER_THRESHOLD = 70;
// A gap this long between wheel events means a new gesture, not a pause in
// the same one — the accumulator starts over rather than carrying stale intent.
const RESET_IDLE_MS = 150;
// Covers the camera pan (see SpatialCanvas's TRANSITION_SECONDS) plus a small
// buffer, so one gesture can't chain through two sections in one motion.
const LOCKOUT_MS = 850;

interface Options {
  containerRef: React.RefObject<HTMLElement | null>;
  enabled: boolean;
  onNext: () => void;
  onPrev: () => void;
}

// Chains "scrolled past this section's end" into "go to the next section,"
// and the mirror at the top. Only fires once every scrollable element between
// the wheel event and this container has itself run out of room — a nested
// panel (Connect's comment feed, a horizontally-hijacked carousel) always
// gets first claim on the event, never this.
export function useScrollChainNavigation({
  containerRef,
  enabled,
  onNext,
  onPrev,
}: Options) {
  const accumRef = useRef(0);
  const lastWheelAtRef = useRef(0);
  const lockedUntilRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !enabled) return;

    const handleWheel = (event: WheelEvent) => {
      // A primarily-horizontal gesture is never section-chaining input —
      // leave it alone entirely, don't even touch the accumulator.
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      if (event.deltaY === 0) return;

      const now = performance.now();
      if (now < lockedUntilRef.current) {
        event.preventDefault();
        return;
      }

      if (nestedScrollerHasRoom(event.target as Element | null, container, event.deltaY)) {
        accumRef.current = 0;
        return;
      }

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

      if (now - lastWheelAtRef.current > RESET_IDLE_MS) {
        accumRef.current = 0;
      }
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
  }, [containerRef, enabled, onNext, onPrev]);
}

// Walks from the event's target up to (but not including) `stopAt`. True if
// any element on that path is vertically scrollable and still has room to
// move further in the wheel's direction — meaning the event belongs to it.
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
