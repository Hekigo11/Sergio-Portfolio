import { useEffect, useRef } from "react";
import {
  useScrollFlowRegistry,
  type HorizontalConsumer,
} from "./scrollFlowContext";

// Registers a horizontal region for its section. The consumer is held behind
// a ref so a re-render never re-registers — the registered identity stays
// stable while the closure it calls stays current.
export function useHorizontalScrollConsumer(
  sectionId: string,
  consumer: HorizontalConsumer,
) {
  const registry = useScrollFlowRegistry();
  const latest = useRef(consumer);

  // Refreshed in an effect rather than during render: the registered wrapper
  // below reads this only from event handlers, long after paint.
  useEffect(() => {
    latest.current = consumer;
  });

  useEffect(() => {
    if (!registry) return;
    return registry.register(sectionId, {
      canConsume: (deltaY, viewport) =>
        latest.current.canConsume(deltaY, viewport),
      consume: (deltaY, viewport) => latest.current.consume(deltaY, viewport),
      reset: () => latest.current.reset?.(),
    });
  }, [registry, sectionId]);
}
