import { useCallback, useMemo, useRef, type ReactNode } from "react";
import { ScrollFlowContext, type HorizontalConsumer } from "./scrollFlowContext";

// One wheel listener owns the page (see useSectionScrollFlow). Carousels do
// not listen for wheel events themselves; they register here and wait to be
// asked. That is the whole point of this subsystem: with several listeners at
// different DOM depths each grabbing wheel events and calling stopPropagation,
// which one wins depends on where the cursor happens to be — so a carousel
// would page only when hovered exactly, and section navigation would fire from
// the same tick that was meant to scroll a row. One decision point, made in a
// fixed order, removes that race.
export function ScrollFlowProvider({ children }: { children: ReactNode }) {
  const consumersRef = useRef(new Map<string, Set<HorizontalConsumer>>());

  const register = useCallback(
    (sectionId: string, consumer: HorizontalConsumer) => {
      const map = consumersRef.current;
      const set = map.get(sectionId) ?? new Set<HorizontalConsumer>();
      set.add(consumer);
      map.set(sectionId, set);
      return () => {
        set.delete(consumer);
        if (set.size === 0) map.delete(sectionId);
      };
    },
    [],
  );

  const consumersFor = useCallback(
    (sectionId: string) => Array.from(consumersRef.current.get(sectionId) ?? []),
    [],
  );

  const resetConsumers = useCallback((sectionId: string) => {
    for (const consumer of consumersRef.current.get(sectionId) ?? []) {
      consumer.reset?.();
    }
  }, []);

  const value = useMemo(
    () => ({ register, consumersFor, resetConsumers }),
    [register, consumersFor, resetConsumers],
  );

  return (
    <ScrollFlowContext.Provider value={value}>
      {children}
    </ScrollFlowContext.Provider>
  );
}

export default ScrollFlowProvider;
