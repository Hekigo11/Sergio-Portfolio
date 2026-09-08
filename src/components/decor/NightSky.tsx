import type { CSSProperties } from "react";
import { OrbitalArc } from "./OrbitalArc";
import { Ring } from "./Ring";

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
}

const SKY_WIDTH = 1600;
const SKY_HEIGHT = 900;

// Three depth tiers, weighted toward many dim, tiny, distant points and a
// handful of nearer, brighter ones — a sparse field, not a dense band.
const TIERS: Array<{
  count: number;
  r: [number, number];
  opacity: [number, number];
}> = [
  { count: 55, r: [0.5, 0.9], opacity: [0.14, 0.3] },
  { count: 20, r: [0.9, 1.3], opacity: [0.3, 0.48] },
  { count: 8, r: [1.3, 1.8], opacity: [0.48, 0.75] },
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
      });
    }
  }
  return stars;
}

const STARS = generateStars();

// The persistent dark-mode backdrop: fixed behind the whole app (mounted
// once at the App root, outside SpatialCanvas's panned layer) so it reads as
// one continuous sky the camera moves over, never a per-section repaint.
// Dark-mode only for this pass — light mode keeps its opaque paper ground
// untouched; a `dark:block` gate is the only theme logic here.
export function NightSky() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 hidden overflow-hidden bg-bg dark:block"
    >
      <Ring
        flatten={85}
        rotate={-10}
        className="absolute -top-24 -left-32 h-[34rem] w-[34rem] text-ink-faint opacity-[0.07]"
      />
      <OrbitalArc
        sweep={44}
        rotate={15}
        flatten={60}
        className="absolute -right-40 -bottom-40 h-[28rem] w-[28rem] text-ink-faint opacity-[0.09]"
      />

      <svg
        viewBox={`0 0 ${SKY_WIDTH} ${SKY_HEIGHT}`}
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
      >
        {STARS.map((star, index) => (
          <circle
            key={index}
            cx={star.x}
            cy={star.y}
            r={star.r}
            fill="currentColor"
            fillOpacity={star.opacity}
            className="star-twinkle text-ink-faint"
            style={
              {
                "--twinkle-delay": `${star.delay}s`,
                "--twinkle-duration": `${star.duration}s`,
              } as CSSProperties
            }
          />
        ))}
      </svg>
    </div>
  );
}

export default NightSky;
