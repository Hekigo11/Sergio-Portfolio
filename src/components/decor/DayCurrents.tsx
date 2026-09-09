import { motion } from "motion/react";
import type { CSSProperties } from "react";
import { WindCurrent } from "./WindCurrent";
import { journeyScale, useTravelBurst, type Travel } from "../../spatial/journey";

// The gust: a hand-composed set, not a loop. Each stroke has its own band of
// the frame, its own weight, and its own moment — the two ink-faint ones lead,
// the coloured ones arrive a beat later, so the air reads as being displaced
// rather than as five lines sliding together.
const GUSTS: Array<{
  variant: "drift" | "swell" | "veer" | "eddy";
  /** Band of the frame, measured from the viewport centre — see below. */
  offset: string;
  height: string;
  strokeWidth: number;
  tone: string;
  peak: number;
  delay: number;
  duration: number;
  dashed?: boolean;
}> = [
  {
    variant: "veer",
    offset: "-34vh",
    height: "26vmax",
    strokeWidth: 2,
    tone: "text-ink-faint",
    peak: 0.58,
    delay: 0,
    duration: 560,
  },
  {
    variant: "drift",
    offset: "-17vh",
    height: "18vmax",
    strokeWidth: 1.75,
    tone: "text-accent",
    peak: 0.48,
    delay: 55,
    duration: 610,
  },
  {
    variant: "swell",
    offset: "0vh",
    height: "30vmax",
    strokeWidth: 2.25,
    tone: "text-ink-faint",
    peak: 0.54,
    delay: 25,
    duration: 590,
  },
  {
    variant: "eddy",
    offset: "16vh",
    height: "22vmax",
    strokeWidth: 1.75,
    tone: "text-brass",
    peak: 0.44,
    delay: 90,
    duration: 640,
  },
  {
    variant: "drift",
    offset: "31vh",
    height: "16vmax",
    strokeWidth: 1.5,
    tone: "text-accent",
    peak: 0.38,
    delay: 40,
    duration: 620,
    dashed: true,
  },
];

interface DayCurrentsProps {
  /** The camera journey to streak along, or null at rest. */
  travel?: Travel | null;
}

// The light theme's persistent atmosphere and NightSky's exact counterpart:
// mounted once at the App root, fixed to the viewport, outside SpatialCanvas's
// panned layer, so the camera moves across one continuous body of air rather
// than cutting to a new background per section. Exactly one of the two
// atmospheres is ever displayed, and each carries the opaque `bg-bg` ground
// the sections no longer paint themselves.
//
// Placement is hand-composed, never looped. The resting strokes sit at
// 0.20–0.30 — raised from the 0.10–0.14 they first shipped at, where the
// moving air was effectively invisible on a bright screen and light mode read
// as blank paper. A hairline crossing behind body copy at this weight is still
// far below the threshold where it could affect legibility of #211b14 ink.
//
// Four resting strokes now rather than three: the brass drift is the one this
// file's own note kept in reserve for exactly this — "restoring the two
// retired strokes is a one-line change if light mode ever reads too bare". It
// is also the only warm line in the layer, which is what keeps the resting air
// from reading as uniformly blue. Only one stroke is unconditional: two more
// arrive at `sm` and the brass at `lg`, so a phone viewport, which has far
// less negative space to spare, still carries a single current.
export function DayCurrents({ travel = null }: DayCurrentsProps) {
  const burst = useTravelBurst(travel);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden bg-bg dark:hidden"
    >
      <WindCurrent
        variant="veer"
        strokeWidth={1.75}
        className="wind-drift absolute -top-[8%] -left-[12%] h-[42vh] w-[80vw] text-accent opacity-[0.3] [--drift-delay:-4s] [--drift-duration:46s] [--drift-x:1.6%] [--drift-y:0.5%]"
      />
      <WindCurrent
        variant="swell"
        strokeWidth={2}
        className="wind-drift absolute bottom-[12%] -left-[16%] hidden h-[36vh] w-[70vw] text-accent opacity-[0.28] [--drift-delay:-31s] [--drift-duration:52s] [--drift-x:1.4%] [--drift-y:0.6%] sm:block"
      />
      <WindCurrent
        variant="drift"
        strokeWidth={1.5}
        className="wind-drift absolute top-[18%] -left-[4%] hidden h-[30vh] w-[86vw] text-brass opacity-[0.25] [--drift-delay:-13s] [--drift-duration:58s] [--drift-x:1.1%] [--drift-y:0.4%] lg:block"
      />
      <WindCurrent
        variant="drift"
        strokeWidth={1.5}
        dashed
        className="wind-drift absolute top-[62%] -left-[8%] hidden h-[24vh] w-[92vw] text-ink-faint opacity-[0.2] [--drift-delay:-25s] [--drift-duration:70s] [--drift-x:0.8%] [--drift-y:0.2%] sm:block"
      />

      {burst && (
        // The gust frame is rotated to the camera vector once, so every stroke
        // inside it travels along a plain local -x and no stroke needs to know
        // which way the journey went. Oversized well past the viewport so a
        // diagonal rotation still covers the corners, and clipped by the
        // atmosphere's own `overflow-hidden`.
        //
        // The resting currents above and the section clouds are deliberately
        // untouched by this: they are the scenery the gust passes through, and
        // moving everything at once would read as the page lurching rather
        // than as air being displaced.
        <motion.div
          key={burst.id}
          className="absolute top-1/2 left-1/2 h-[130vmax] w-[130vmax]"
          style={{ x: "-50%", y: "-50%", rotate: burst.angle }}
        >
          {GUSTS.map((gust, index) => (
            <div
              key={index}
              className="wind-gust absolute inset-x-0"
              style={
                {
                  // The frame is far larger than the viewport so a diagonal
                  // rotation still covers the corners, which makes a plain
                  // `top: n%` land well outside the screen. Its centre is the
                  // viewport's centre, so bands are placed from there instead.
                  top: `calc(50% + ${gust.offset})`,
                  height: gust.height,
                  "--gust-peak": String(gust.peak),
                  "--gust-delay": `${gust.delay}ms`,
                  "--gust-duration": `${Math.round(
                    gust.duration * journeyScale(burst),
                  )}ms`,
                } as CSSProperties
              }
            >
              <WindCurrent
                variant={gust.variant}
                strokeWidth={gust.strokeWidth}
                dashed={gust.dashed}
                className={`h-full w-full ${gust.tone}`}
              />
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

export default DayCurrents;
