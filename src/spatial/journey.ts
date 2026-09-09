import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

/**
 * How far apart neighbouring sections sit, **in viewports**.
 *
 * This is the dial for "how big does the canvas feel". Because it is a
 * multiple of the measured viewport rather than a pixel count, raising it is
 * safe on every device at once: at 2.75 a phone travels 2.75 phone-screens and
 * a 4K display travels 2.75 4K-screens, so the journey is the same *gesture*
 * everywhere and no device can be given a step it cannot afford.
 *
 * The only hard floor is just above 1: at exactly one viewport the outgoing
 * section's edge would still be touching the incoming one's, so anything below
 * about 1.15 puts two sections on screen at once. There is no ceiling — the
 * space between sections is empty canvas that paints nothing.
 */
export const SECTION_SPAN = 2.75;

// The journey the timing curve is anchored to: the span this site shipped with
// (one viewport plus a small gap) took 0.7s. Everything longer is derived from
// that, so the original pace is still the reference the rest is judged against.
const REFERENCE_DISTANCE = 1.1;
const REFERENCE_SECONDS = 0.7;
// However far apart the sections are moved, no single journey drags past this.
export const MAX_JOURNEY_SECONDS = 1.35;

/**
 * Camera duration for a journey of `distance` viewports.
 *
 * Deliberately a square root, not a multiplication. Scaling time linearly with
 * distance keeps the speed constant, so a longer canvas just means more
 * waiting; holding time constant makes a 2.5× longer journey 2.5× faster,
 * which is a blur. The root sits between the two: a 2.5× longer journey takes
 * ~1.6× as long and so travels ~1.6× faster. That is the whole trick — the
 * page reads as *further apart and quicker*, which is the point.
 */
export function journeyDuration(distance: number): number {
  return Math.min(
    MAX_JOURNEY_SECONDS,
    REFERENCE_SECONDS * Math.sqrt(distance / REFERENCE_DISTANCE),
  );
}

/**
 * One camera journey across the canvas, handed to the atmosphere layers so the
 * speed effect points where the camera actually went.
 *
 * Angles are screen axes, matching CSS `rotate`: 0° is the camera travelling
 * right, 90° down, -90° up. A section one row *up* the canvas is `row: -1`, so
 * navigating to it gives `uy: -1` — and the sky, being what the camera moves
 * over, streaks the other way.
 */
export interface Travel {
  /** Increments per navigation, so the same direction twice still fires. */
  id: number;
  angle: number;
  /** Unit vector of camera travel, screen axes. */
  ux: number;
  uy: number;
  /** Length in viewports. A diagonal is √2 longer than an orthogonal hop. */
  distance: number;
  /** How long the camera takes, in seconds. */
  durationSeconds: number;
  /** How long the atmosphere reacts, in ms. */
  burstMs: number;
}

export function travelBetween(
  from: { col: number; row: number },
  to: { col: number; row: number },
  id: number,
): Travel {
  const dx = to.col - from.col;
  const dy = to.row - from.row;
  const cells = Math.hypot(dx, dy) || 1;
  const distance = cells * SECTION_SPAN;
  const durationSeconds = journeyDuration(distance);
  return {
    id,
    angle: (Math.atan2(dy, dx) * 180) / Math.PI,
    ux: dx / cells,
    uy: dy / cells,
    distance,
    durationSeconds,
    // The burst is always over before the camera settles — the air clears, then
    // the destination arrives. Never so brief it cannot be seen on a long hop.
    burstMs: Math.max(420, Math.round(durationSeconds * 1000 * 0.78)),
  };
}

/**
 * How much bigger this journey is than the reference one, on the same root
 * curve as the duration. Multiply distances and timings by it so a long
 * diagonal streaks further and lingers longer than a short hop, without
 * anything needing to know the span.
 */
export function journeyScale(travel: Travel): number {
  return Math.sqrt(travel.distance / REFERENCE_DISTANCE);
}

// Holds a travel for the length of one window and then drops it, so whatever
// consumes it returns to rest on its own rather than needing to be told twice.
// Returns null under `prefers-reduced-motion`: the camera still travels, on its
// own reduced-motion path, but nothing streaks and nothing is promoted.
//
// The live value is derived during render and the effect only schedules its
// expiry. Copying the travel into state on arrival would have cost a second
// render to start, which is a frame of the camera already moving with a still
// sky behind it — the one frame this exists to fill.
export function useTravelBurst(
  travel: Travel | null,
  /** Defaults to the atmosphere's burst; pass the camera's own for the pan. */
  windowMs?: number,
): Travel | null {
  const shouldReduceMotion = useReducedMotion();
  const [expiredId, setExpiredId] = useState(0);

  useEffect(() => {
    if (!travel || shouldReduceMotion) return;
    const timer = window.setTimeout(
      () => setExpiredId(travel.id),
      windowMs ?? travel.burstMs,
    );
    return () => window.clearTimeout(timer);
  }, [travel, windowMs, shouldReduceMotion]);

  if (!travel || shouldReduceMotion || travel.id <= expiredId) return null;
  return travel;
}
