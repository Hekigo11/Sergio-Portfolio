import { WindCurrent } from "./WindCurrent";

// The light theme's persistent atmosphere and NightSky's exact counterpart:
// mounted once at the App root, fixed to the viewport, outside SpatialCanvas's
// panned layer, so the camera moves across one continuous body of air rather
// than cutting to a new background per section. Exactly one of the two
// atmospheres is ever displayed, and each carries the opaque `bg-bg` ground
// the sections no longer paint themselves.
//
// Placement is hand-composed, never looped: three strokes at 0.10–0.14 opacity,
// so a hairline crossing behind body copy stays far below the threshold where
// it could affect legibility. Two are dropped below `sm`, where a phone
// viewport has far less negative space to spare.
//
// Three rather than the original five: the cloud and lineart artwork now sits
// in the sections as placed marks, and the background's job is to stay under
// all of it. Restoring the two retired strokes (a brass drift upper-right and
// a brass eddy lower-right) is a one-line change if light mode ever reads too
// bare — they were removed for restraint, not because they were wrong.
export function DayCurrents() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden bg-bg dark:hidden"
    >
      <WindCurrent
        variant="veer"
        strokeWidth={1.25}
        className="wind-drift absolute -top-[8%] -left-[12%] h-[42vh] w-[80vw] text-accent opacity-[0.14] [--drift-delay:-4s] [--drift-duration:46s] [--drift-x:1.6%] [--drift-y:0.5%]"
      />
      <WindCurrent
        variant="swell"
        strokeWidth={1.5}
        className="wind-drift absolute bottom-[12%] -left-[16%] hidden h-[36vh] w-[70vw] text-accent opacity-[0.13] [--drift-delay:-31s] [--drift-duration:52s] [--drift-x:1.4%] [--drift-y:0.6%] sm:block"
      />
      <WindCurrent
        variant="drift"
        strokeWidth={1}
        dashed
        className="wind-drift absolute top-[62%] -left-[8%] hidden h-[24vh] w-[92vw] text-ink-faint opacity-[0.1] [--drift-delay:-25s] [--drift-duration:70s] [--drift-x:0.8%] [--drift-y:0.2%] sm:block"
      />
    </div>
  );
}

export default DayCurrents;
