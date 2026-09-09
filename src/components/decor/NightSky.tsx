import { motion } from "motion/react";
import type { CSSProperties } from "react";
import { OrbitalArc } from "./OrbitalArc";
import { Ring } from "./Ring";
import { journeyScale, useTravelBurst, type Travel } from "../../spatial/journey";

// Deterministic PRNG (mulberry32) so the star field is generated once, at
// module load, and never reshuffles between renders — a real star chart
// doesn't redraw itself every time you look at it.
function mulberry32(seed: number) {
  return function random() {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Star {
  x: number;
  y: number;
  r: number;
  opacity: number;
  delay: number;
  duration: number;
  /** The nearest tier carries a faint surrounding bloom. */
  halo: boolean;
}

const SKY_WIDTH = 1600;
const SKY_HEIGHT = 900;

const EASING = [0.22, 1, 0.36, 1] as const;

// Three depth tiers, still weighted toward many dim, tiny, distant points and
// a handful of nearer, brighter ones — a sparse field, not a dense band. The
// tiers sit brighter and slightly larger than they first shipped: at the
// original values the sky read as an almost-black rectangle on most screens,
// which left the night theme's whole premise invisible and gave the speed
// burst nothing to work with. It is still comfortably under the glass panels
// that sit on it, which carry a 16px backdrop blur of their own.
const TIERS: Array<{
  count: number;
  r: [number, number];
  opacity: [number, number];
  halo: boolean;
}> = [
  { count: 72, r: [0.6, 1.1], opacity: [0.26, 0.48], halo: false },
  { count: 30, r: [1.1, 1.7], opacity: [0.52, 0.74], halo: false },
  { count: 15, r: [1.8, 2.7], opacity: [0.82, 1], halo: true },
];

function generateStars(): Star[] {
  const random = mulberry32(1337);
  const stars: Star[] = [];
  for (const tier of TIERS) {
    for (let i = 0; i < tier.count; i++) {
      stars.push({
        x: random() * SKY_WIDTH,
        y: random() * SKY_HEIGHT,
        r: tier.r[0] + random() * (tier.r[1] - tier.r[0]),
        opacity: tier.opacity[0] + random() * (tier.opacity[1] - tier.opacity[0]),
        delay: random() * 6,
        duration: 3.5 + random() * 4,
        halo: tier.halo,
      });
    }
  }
  return stars;
}

const STARS = generateStars();

// How far the whole trail field surges on a reference-length journey, in px.
// The camera crosses several viewports; this layer is the far distance, so it
// moves a small fraction of that — which is what sells it as depth rather than
// as a second camera. A longer journey scales it on the same root curve the
// camera's own duration uses, so the sky always agrees with the pan.
const SURGE = 132;

// The trails are the nearer half of the same seeded field — the stars a real
// parallax would smear most — re-expressed as plain positioned elements rather
// than SVG geometry, so a burst is transform and opacity on composited boxes
// and never a repaint of the star chart. They are placed as a percentage of
// the viewport while the chart is drawn `xMidYMid slice`, so on an aspect
// ratio far from the sky's own 16:9 a trail sits near its star rather than
// exactly on it. That is invisible at this speed, and the chart dims under the
// burst so the eye reads the streaks, not the alignment.
const TRAILS = STARS.filter((star) => star.r >= 1).map((star, index) => ({
  left: (star.x / SKY_WIDTH) * 100,
  top: (star.y / SKY_HEIGHT) * 100,
  length: Math.round(44 + (star.r - 1) * 62),
  thickness: star.r >= 1.8 ? 2.75 : 2,
  peak: Math.min(1, star.opacity + 0.35),
  delay: (index % 7) * 16,
  duration: 500 + (index % 5) * 55,
}));

interface NightSkyProps {
  /** The camera journey to streak along, or null at rest. */
  travel?: Travel | null;
}

// The persistent dark-mode backdrop: fixed behind the whole app (mounted
// once at the App root, outside SpatialCanvas's panned layer) so it reads as
// one continuous sky the camera moves over, never a per-section repaint.
// Dark-mode only for this pass — light mode keeps its opaque paper ground
// untouched; a `dark:block` gate is the only theme logic here.
export function NightSky({ travel = null }: NightSkyProps) {
  const burst = useTravelBurst(travel);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 hidden overflow-hidden bg-bg dark:block"
    >
      <Ring
        flatten={85}
        rotate={-10}
        className="absolute -top-24 -left-32 h-[34rem] w-[34rem] text-ink-faint opacity-[0.14]"
      />
      <OrbitalArc
        sweep={44}
        rotate={15}
        flatten={60}
        className="absolute -right-40 -bottom-40 h-[28rem] w-[28rem] text-ink-faint opacity-[0.17]"
      />

      {/* Motion owns the two-phase dip: the chart drops fast as the burst
          starts so the trails carry the frame, then comes back slowly as the
          camera settles. One composited opacity on one element — not 102. */}
      <motion.svg
        viewBox={`0 0 ${SKY_WIDTH} ${SKY_HEIGHT}`}
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        initial={false}
        animate={{ opacity: burst ? 0.32 : 1 }}
        transition={{ duration: burst ? 0.16 : 0.45, ease: EASING }}
      >
        {STARS.map((star, index) => (
          <g
            key={index}
            className="star-twinkle text-ink-faint"
            style={
              {
                "--twinkle-delay": `${star.delay}s`,
                "--twinkle-duration": `${star.duration}s`,
              } as CSSProperties
            }
          >
            {star.halo && (
              // A second, much fainter disc rather than a `filter` — a glow
              // drawn as fill costs nothing, where a drop-shadow on a
              // continuously twinkling element repaints every frame.
              <circle
                cx={star.x}
                cy={star.y}
                r={star.r * 3.8}
                fill="currentColor"
                fillOpacity={star.opacity * 0.18}
                className="text-ink-muted"
              />
            )}
            <circle
              cx={star.x}
              cy={star.y}
              r={star.r}
              fill="currentColor"
              fillOpacity={star.opacity}
              className={star.halo ? "text-ink-muted" : undefined}
            />
          </g>
        ))}
      </motion.svg>

      {burst && (
        // Motion orchestrates the field as a whole — one transform surging
        // opposite the camera — and the CSS keyframe below stretches and fades
        // each trail on its own delay, so they never fire in lockstep.
        <motion.div
          key={burst.id}
          className="absolute inset-0 text-ink-muted"
          initial={{ x: 0, y: 0 }}
          animate={{
            x: -burst.ux * SURGE * journeyScale(burst),
            y: -burst.uy * SURGE * journeyScale(burst),
          }}
          transition={{ duration: burst.durationSeconds * 0.88, ease: EASING }}
        >
          {TRAILS.map((trail, index) => (
            <span
              key={index}
              className="star-streak absolute block rounded-full"
              style={
                {
                  left: `${trail.left}%`,
                  top: `${trail.top}%`,
                  width: trail.length,
                  height: trail.thickness,
                  marginLeft: -trail.length / 2,
                  marginTop: -trail.thickness / 2,
                  background:
                    "linear-gradient(90deg, transparent, currentColor 50%, transparent)",
                  "--streak-angle": `${burst.angle}deg`,
                  "--streak-peak": String(trail.peak),
                  "--streak-delay": `${trail.delay}ms`,
                  "--streak-duration": `${Math.round(
                    trail.duration * journeyScale(burst),
                  )}ms`,
                } as CSSProperties
              }
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}

export default NightSky;
