import { createContext, useContext } from "react";

// A horizontal region (a carousel, a snap row) that wants first claim on
// vertical wheel input while it still has somewhere to go.
export interface HorizontalConsumer {
  /** May this take a wheel delta right now? Checks its own visibility and
   * remaining scroll room — the controller asks, it never assumes.
   * `viewport` is the active section's visible box, so a consumer can tell
   * whether the reader has actually arrived at it rather than merely
   * scrolled its first pixel into view. */
  canConsume: (deltaY: number, viewport: DOMRect) => boolean;
  /** Take the delta. Only called when `canConsume` just returned true. */
  consume: (deltaY: number, viewport: DOMRect) => void;
  /** Return to the start. Called when the section is entered, so a region
   * left at its far end on a previous visit doesn't silently skip itself. */
  reset?: () => void;
}

export interface ScrollFlowRegistry {
  register: (sectionId: string, consumer: HorizontalConsumer) => () => void;
  consumersFor: (sectionId: string) => HorizontalConsumer[];
  resetConsumers: (sectionId: string) => void;
}

export const ScrollFlowContext = createContext<ScrollFlowRegistry | null>(null);

export function useScrollFlowRegistry(): ScrollFlowRegistry | null {
  return useContext(ScrollFlowContext);
}
