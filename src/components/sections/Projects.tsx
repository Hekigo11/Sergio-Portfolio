import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";

interface ProjectsProps {
  darkMode: boolean;
}

// Auto-discovers project photos from src/assets/Projects/<slug>/*.
// Add a project's images by dropping files in that folder — no import to add or edit.
const projectImageModules = import.meta.glob<string>(
  "../../assets/Projects/**/*.{png,jpg,jpeg,webp}",
  { eager: true, import: "default" },
);

const projectImagesBySlug: Record<string, string[]> = {};
for (const [filePath, url] of Object.entries(projectImageModules)) {
  const slug = filePath.match(/Projects\/([^/]+)\//)?.[1];
  if (!slug) continue;
  (projectImagesBySlug[slug] ??= []).push(url);
}
for (const images of Object.values(projectImagesBySlug)) {
  images.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches,
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = () => setMatches(mql.matches);
    handler();
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);

  return matches;
}

// Shrinks --fit until content stops overflowing its box, instead of scrolling.
function useFitScale({ min = 0.7, max = 1, steps = 6 } = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(max);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    let frame = 0;
    const measure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const step = (max - min) / steps;
        let next = max;
        content.style.setProperty("--fit", String(next));
        for (let i = 0; i < steps; i++) {
          if (content.scrollHeight <= container.clientHeight) break;
          next = Math.max(min, next - step);
          content.style.setProperty("--fit", String(next));
        }
        setScale(next);
      });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [min, max, steps]);

  return { containerRef, contentRef, scale };
}

interface ProjectImageCarouselProps {
  images: string[];
  alt: string;
}

const AUTO_ADVANCE_MS = 4000;

function ProjectImageCarousel({ images, alt }: ProjectImageCarouselProps) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const hasMultiple = images.length > 1;

  const goTo = (next: number) => {
    setIndex((next + images.length) % images.length);
  };

  useEffect(() => {
    if (!hasMultiple || isPaused) return;
    const id = setInterval(() => {
      setIndex((current) => (current + 1) % images.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [hasMultiple, isPaused, images.length, index]);

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.img
          key={images[index]}
          src={images[index]}
          alt={`${alt} — image ${index + 1} of ${images.length}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 h-full w-full object-contain"
        />
      </AnimatePresence>

      {hasMultiple && (
        <>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              goTo(index - 1);
            }}
            aria-label="Previous image"
            className="absolute top-1/2 left-2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm transition hover:bg-black/65 sm:h-7 sm:w-7"
          >
            <span aria-hidden="true">‹</span>
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              goTo(index + 1);
            }}
            aria-label="Next image"
            className="absolute top-1/2 right-2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm transition hover:bg-black/65 sm:h-7 sm:w-7"
          >
            <span aria-hidden="true">›</span>
          </button>
          <div className="absolute inset-x-0 bottom-0 flex justify-center gap-1.5 px-3 pb-2">
            {images.map((image, i) => (
              <button
                key={image}
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setIndex(i);
                }}
                aria-label={`Go to image ${i + 1}`}
                aria-current={i === index}
                className="group p-2"
              >
                <span
                  className={`block h-1.5 w-1.5 rounded-full shadow-[0_0_3px_rgba(0,0,0,0.7)] transition ${
                    i === index ? "bg-white" : "bg-white/50 group-hover:bg-white/75"
                  }`}
                />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

interface ProjectItem {
  slug: string;
  title: string;
  role?: string;
  timeline: string;
  description: string;
  keyFeatures: string[];
  technologies: string[];
}

const DEFAULT_ROLE = "Full-Stack Developer";

const projectitems: ProjectItem[] = [
  {
    slug: "navview",
    title:
      "NavView: Computer Vision and LiDAR-Based System for Autonomous River Boats",
    timeline: "May 2026",
    description:
      "An autonomous river-cleaning system integrating Computer Vision, LiDAR, SLAM, and ROS 2 for real-time debris detection and obstacle-aware navigation. Built with a lightweight YOLO model and custom river dataset, integrated with onboard computing and propulsion hardware.",

    keyFeatures: [
      "Real-time debris detection & tracking",
      "LiDAR obstacle detection & avoidance",
      "SLAM-based localization & mapping",
      "Temporal stability scoring for glare reduction",
      "ROS 2 autonomous navigation",
    ],

    technologies: [
      "Python",
      "C/C++",
      "ROS 2",
      "YOLO",
      "ByteTrack",
      "SLAM Toolbox",
      "ROSbridge",
      "Arduino",
    ],
  },

  {
    slug: "marj",
    title: "MARJ Food Services E-Commerce Website",
    timeline: "2025",
    description:
      "A full-stack e-commerce website for MARJ Food Services, featuring an online storefront, shopping cart, order processing, and database-backed management.",

    keyFeatures: [
      "Online product storefront",
      "Shopping cart & checkout",
      "Order management",
      "Customer account management",
      "Responsive web interface",
    ],

    technologies: ["PHP", "MySQL", "HTML", "CSS", "JavaScript", "Bootstrap"],
  },

  {
    slug: "lost-and-found",
    title: "Lost and Found System for Adamson University",
    timeline: "2025",
    role: "Front-End Designer",
    description:
      "A mobile-first web application designed to simplify the reporting, tracking, and claiming of lost property through a centralized platform. The system provides public item browsing and search alongside administrative tools for managing records and claim requests.",

    keyFeatures: [
      "Search and filter lost & found items",
      "Lost item reporting and claim requests",
      "Admin dashboard and item management",
      "Claim review and history tracking",
      "Responsive mobile-first interface",
    ],

    technologies: [
      "JavaScript",
      "HTML",
      "CSS",
      "React.js",
      "Firebase",
      "Tailwind CSS",
      "Google Chrome DevTools",
    ],
  },
  {
    slug: "volcano-monitoring",
    title: "Mobile IoT Volcano Monitoring System",
    timeline: "2024",

    description:
      "A mobile IoT monitoring system that provides real-time sensor data and alert levels through a React Native dashboard. The application connects to Firebase Realtime Database and provides monitoring and control features for remote volcanic activity observation.",

    keyFeatures: [
      "Real-time sensor data monitoring",
      "Volcanic activity alert levels",
      "Sensor status dashboard",
      "Firebase Realtime Database integration",
      "Remote system controls",
    ],

    technologies: [
      "React Native",
      "Expo",
      "Firebase",
      "Firebase Realtime Database",
    ],
  },
];

interface ThemeClasses {
  cardClasses: string;
  muted: string;
  subtle: string;
  line: string;
  surfaceBg: string;
  darkMode: boolean;
}

function PlaceholderBox({
  muted,
  darkMode,
}: {
  muted: string;
  darkMode: boolean;
}) {
  return (
    <div className="flex h-full items-center justify-center p-6 text-center">
      <div>
        <div
          className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full border text-lg font-semibold ${
            darkMode
              ? "border-slate-500 text-slate-200"
              : "border-slate-400/60 text-slate-600"
          }`}
        >
          +
        </div>
        <p
          className={`mt-3 text-[10px] font-medium uppercase tracking-[0.2em] ${muted}`}
        >
          Preview
        </p>
      </div>
    </div>
  );
}

// Mobile: a plain stacked card in normal document flow — the page scrolls, so no shrink-to-fit needed.
function MobileProjectCard({
  project,
  images,
  theme,
}: {
  project: ProjectItem;
  images: string[];
  theme: ThemeClasses;
}) {
  const { cardClasses, muted, subtle, line, surfaceBg, darkMode } = theme;
  const hasImage = images.length > 0;
  const role = project.role ?? DEFAULT_ROLE;
  const roleBadgeClasses = darkMode
    ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-300"
    : "border-cyan-500/30 bg-cyan-50 text-cyan-700";

  return (
    <article
      className={`flex w-full flex-col overflow-hidden rounded-2xl border p-4 shadow-[0_20px_60px_rgba(15,23,42,0.08)] ${cardClasses}`}
    >
      <div
        className={`h-48 shrink-0 overflow-hidden rounded-xl border ${surfaceBg} ${line}`}
      >
        {hasImage ? (
          <ProjectImageCarousel images={images} alt={project.title} />
        ) : (
          <PlaceholderBox muted={muted} darkMode={darkMode} />
        )}
      </div>

      <div className="mt-6 flex flex-col">
        <span
          className={`mb-3 inline-flex w-fit items-center rounded-full border px-3 py-1 text-[11px] font-semibold tracking-wide uppercase ${roleBadgeClasses}`}
        >
          {role}
        </span>
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-semibold tracking-tight">
            {project.title}
          </h3>
          {project.timeline && (
            <span
              className={`shrink-0 text-xs font-medium uppercase tracking-[0.2em] ${muted}`}
            >
              {project.timeline}
            </span>
          )}
        </div>

        <p className={`mt-4 text-sm leading-6 ${muted}`}>
          {project.description}
        </p>

        <div className="mt-5">
          <p
            className={`mb-2 text-[10px] font-medium uppercase tracking-[0.22em] ${muted}`}
          >
            Key features
          </p>
          <ul className={`space-y-2 text-sm leading-6 ${muted}`}>
            {project.keyFeatures.map((feature) => (
              <li key={feature} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-5">
          <p
            className={`mb-2 text-[10px] font-medium uppercase tracking-[0.22em] ${muted}`}
          >
            Stack
          </p>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className={`rounded-md px-2.5 py-1 text-xs font-medium ${subtle}`}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

// Desktop/tablet: a coverflow card whose scale/opacity are continuously derived from live scroll
// position (no snap-to-index jump) — it grows and fades smoothly as it passes through center.
// Only its own text ever needs to shrink-to-fit, independent of every other card's content length.
function CoverflowProjectCard({
  project,
  images,
  theme,
  scrollX,
  containerWidth,
  cardWidth,
  index,
  gap,
  sidePadding,
  onSelect,
}: {
  project: ProjectItem;
  images: string[];
  theme: ThemeClasses;
  scrollX: MotionValue<number>;
  containerWidth: number;
  cardWidth: number;
  index: number;
  gap: number;
  sidePadding: number;
  onSelect: () => void;
}) {
  const { cardClasses, muted, subtle, line, surfaceBg, darkMode } = theme;
  const { containerRef, contentRef, scale: fitScale } = useFitScale();
  const hasImage = images.length > 0;
  const role = project.role ?? DEFAULT_ROLE;
  const roleBadgeClasses = darkMode
    ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-300"
    : "border-cyan-500/30 bg-cyan-50 text-cyan-700";

  const cardCenter = sidePadding + index * (cardWidth + gap) + cardWidth / 2;
  const distance = useTransform(
    scrollX,
    (sx) => cardCenter - sx - containerWidth / 2,
  );
  const scale = useTransform(
    distance,
    [-cardWidth * 1.15, 0, cardWidth * 1.15],
    [0.82, 1, 0.82],
  );
  const opacity = useTransform(
    distance,
    [-cardWidth * 1.4, 0, cardWidth * 1.4],
    [0.32, 1, 0.32],
  );

  return (
    // The scale/opacity transform lives on an inner element, not this flex item
    // itself. Scrollable-overflow (and therefore this track's scrollWidth) is
    // spec'd to include descendants' *transformed* geometry — so if this outer
    // box carried the transform, the last card scaling up toward center would
    // keep growing scrollWidth, pushing the scroll-end further away the closer
    // you got, making it impossible to ever scroll it fully into view.
    // Keeping this box a fixed, untransformed width sidesteps that entirely.
    //
    <article style={{ width: cardWidth }} className="h-full shrink-0">
      <motion.div
        onClick={onSelect}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onSelect();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={`View ${project.title}`}
        style={{ scale, opacity }}
        className={`flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-2xl border p-5 shadow-[0_20px_60px_rgba(15,23,42,0.12)] lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-stretch lg:gap-7 lg:p-7 ${cardClasses}`}
      >
        <div
          className={`h-56 w-full shrink-0 self-center overflow-hidden rounded-xl border sm:h-64 lg:aspect-3/2 lg:h-auto ${surfaceBg} ${line}`}
        >
          {hasImage ? (
            <ProjectImageCarousel images={images} alt={project.title} />
          ) : (
            <PlaceholderBox muted={muted} darkMode={darkMode} />
          )}
        </div>

        <div
          ref={containerRef}
          className="mt-6 min-h-0 flex-1 overflow-hidden lg:mt-0"
        >
          <div ref={contentRef} style={{ "--fit": fitScale } as CSSProperties}>
            <span
              className={`mb-[calc(0.5rem*var(--fit))] inline-flex w-fit items-center rounded-full border px-[calc(0.75rem*var(--fit))] py-[calc(0.25rem*var(--fit))] text-[calc(0.6875rem*var(--fit))] font-semibold tracking-wide uppercase ${roleBadgeClasses}`}
            >
              {role}
            </span>
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-[calc(1.25rem*var(--fit))] leading-[1.15] font-semibold tracking-tight lg:text-[calc(1.875rem*var(--fit))]">
                {project.title}
              </h3>
              {project.timeline && (
                <span
                  className={`shrink-0 text-[calc(0.7rem*var(--fit))] font-medium uppercase tracking-[0.2em] ${muted}`}
                >
                  {project.timeline}
                </span>
              )}
            </div>

            <p
              className={`mt-[calc(0.75rem*var(--fit))] text-[calc(0.875rem*var(--fit))] leading-[1.6] lg:text-[calc(1rem*var(--fit))] ${muted}`}
            >
              {project.description}
            </p>

            <div className="mt-[calc(1.1rem*var(--fit))]">
              <p
                className={`mb-2 text-[calc(0.625rem*var(--fit))] font-medium uppercase tracking-[0.22em] ${muted}`}
              >
                Key features
              </p>
              <ul
                className={`grid grid-cols-1 gap-x-6 gap-y-[calc(0.4rem*var(--fit))] text-[calc(0.875rem*var(--fit))] leading-[1.5] lg:grid-cols-2 ${muted}`}
              >
                {project.keyFeatures.map((feature) => (
                  <li key={feature} className="flex gap-2">
                    <span className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-[calc(1.1rem*var(--fit))]">
              <p
                className={`mb-2 text-[calc(0.625rem*var(--fit))] font-medium uppercase tracking-[0.22em] ${muted}`}
              >
                Stack
              </p>
              <div className="flex flex-wrap gap-[calc(0.4rem*var(--fit))]">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className={`rounded-md px-[calc(0.6rem*var(--fit))] py-[calc(0.3rem*var(--fit))] text-[calc(0.75rem*var(--fit))] font-medium ${subtle}`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </article>
  );
}

const CARD_WIDTH_RATIO = 0.88;
const CARD_WIDTH_MAX = 1280;
const CARD_GAP = 32;
// Lower = longer, slippier glide toward the target scroll position ("ice" feel).
const SCROLL_EASE = 0.09;
// Multiplier turning drag-release velocity (px/ms) into an extra fling distance (px).
const FLING_STRENGTH = 220;
const FLING_MIN_VELOCITY = 0.05;

function CoverflowTrack({ theme }: { theme: ThemeClasses }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const { scrollX } = useScroll({ container: trackRef });

  const dragState = useRef<{
    startX: number;
    startScrollLeft: number;
    moved: boolean;
    lastX: number;
    lastT: number;
    velocity: number;
  } | null>(null);
  const suppressClickRef = useRef(false);
  const wheelTargetRef = useRef<number | null>(null);
  const wheelRafRef = useRef(0);

  useLayoutEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      setContainerWidth(entries[0].contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const cardWidth = containerWidth
    ? Math.min(containerWidth * CARD_WIDTH_RATIO, CARD_WIDTH_MAX)
    : 0;
  const sidePadding = Math.max(0, (containerWidth - cardWidth) / 2);

  const scrollToIndex = (index: number) => {
    const el = trackRef.current;
    if (!el || !cardWidth) return;
    const center = sidePadding + index * (cardWidth + CARD_GAP) + cardWidth / 2;
    el.scrollTo({ left: center - containerWidth / 2, behavior: "smooth" });
  };

  const stepWheelEase = () => {
    const el = trackRef.current;
    if (!el || wheelTargetRef.current === null) return;
    const target = wheelTargetRef.current;
    const diff = target - el.scrollLeft;
    if (Math.abs(diff) < 0.5) {
      el.scrollLeft = target;
      wheelTargetRef.current = null;
      return;
    }
    el.scrollLeft += diff * SCROLL_EASE;
    wheelRafRef.current = requestAnimationFrame(stepWheelEase);
  };

  // React attaches onWheel as a passive listener by default, so preventDefault()
  // inside it silently no-ops (and warns). Attach natively with passive: false
  // so redirecting a vertical wheel into horizontal scroll actually works.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const handleWheel = (event: globalThis.WheelEvent) => {
      // A real horizontal gesture (trackpad swipe) already scrolls this native
      // overflow-x container on its own, with the browser's own momentum curve —
      // leave it alone. Only step in for a plain vertical wheel, which has
      // nothing else to scroll here: ease it toward an accumulating target
      // instead of jumping scrollLeft directly, so ticks glide instead of step.
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      if (event.deltaY === 0) return;
      event.preventDefault();
      const maxScroll = el.scrollWidth - el.clientWidth;
      const base = wheelTargetRef.current ?? el.scrollLeft;
      wheelTargetRef.current = Math.max(
        0,
        Math.min(maxScroll, base + event.deltaY),
      );
      cancelAnimationFrame(wheelRafRef.current);
      wheelRafRef.current = requestAnimationFrame(stepWheelEase);
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", handleWheel);
      cancelAnimationFrame(wheelRafRef.current);
    };
  }, []);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    if ((event.target as HTMLElement).closest("button")) return;
    const el = trackRef.current;
    if (!el) return;
    cancelAnimationFrame(wheelRafRef.current);
    wheelTargetRef.current = null;
    const now = performance.now();
    dragState.current = {
      startX: event.clientX,
      startScrollLeft: el.scrollLeft,
      moved: false,
      lastX: event.clientX,
      lastT: now,
      velocity: 0,
    };
    el.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    const state = dragState.current;
    if (!el || !state) return;
    const delta = event.clientX - state.startX;
    if (Math.abs(delta) > 4) state.moved = true;
    el.scrollLeft = state.startScrollLeft - delta;

    const now = performance.now();
    const dt = now - state.lastT;
    if (dt > 0) {
      // Blend rather than overwrite so a single jittery sample near release
      // doesn't dominate the fling — feels like a continuous glide, not a snap.
      const instantVelocity = (event.clientX - state.lastX) / dt;
      state.velocity = state.velocity * 0.7 + instantVelocity * 0.3;
      state.lastX = event.clientX;
      state.lastT = now;
    }
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    const state = dragState.current;
    if (state?.moved) suppressClickRef.current = true;
    if (el?.hasPointerCapture(event.pointerId)) {
      el.releasePointerCapture(event.pointerId);
    }

    // Fling: let a fast drag release keep gliding in the same direction, like
    // letting go of something sliding across ice, instead of stopping dead.
    if (el && state?.moved && Math.abs(state.velocity) > FLING_MIN_VELOCITY) {
      const maxScroll = el.scrollWidth - el.clientWidth;
      wheelTargetRef.current = Math.max(
        0,
        Math.min(maxScroll, el.scrollLeft - state.velocity * FLING_STRENGTH),
      );
      cancelAnimationFrame(wheelRafRef.current);
      wheelRafRef.current = requestAnimationFrame(stepWheelEase);
    }

    dragState.current = null;
  };

  const handleCardSelect = (index: number) => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false;
      return;
    }
    scrollToIndex(index);
  };

  return (
    <div
      ref={trackRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      role="region"
      aria-roledescription="carousel"
      aria-label="Projects"
      className="mx-auto mt-8 min-h-0 w-full flex-1 cursor-grab overflow-x-auto overflow-y-hidden scrollbar-none active:cursor-grabbing"
    >
      <div
        className="flex h-full items-stretch"
        style={{
          gap: CARD_GAP,
          paddingLeft: sidePadding,
        }}
      >
        {cardWidth > 0 &&
          projectitems.map((project, i) => (
            <CoverflowProjectCard
              key={project.slug}
              project={project}
              images={projectImagesBySlug[project.slug] ?? []}
              theme={theme}
              scrollX={scrollX}
              containerWidth={containerWidth}
              cardWidth={cardWidth}
              index={i}
              gap={CARD_GAP}
              sidePadding={sidePadding}
              onSelect={() => handleCardSelect(i)}
            />
          ))}
        {cardWidth > 0 && (
          // A real trailing box, not padding/margin: Chrome drops a scroll
          // container's *trailing* padding (and a last child's trailing
          // margin) from scrollWidth, so either one left the native
          // scroll-end short of sidePadding — the last card's right edge
          // landed flush against the viewport edge instead of centered. An
          // actual flex item's own width is a "real" box and isn't dropped.
          // It already sits one `gap` past the last card, so subtract that
          // out to land on exactly `sidePadding` of total trailing space.
          <div
            aria-hidden="true"
            style={{ width: Math.max(0, sidePadding - CARD_GAP) }}
            className="h-full shrink-0"
          />
        )}
      </div>
    </div>
  );
}

const Projects = ({ darkMode }: ProjectsProps) => {
  const isCoverflow = useMediaQuery("(min-width: 640px)");

  const theme: ThemeClasses = {
    darkMode,
    cardClasses: darkMode
      ? "border-slate-700 bg-slate-900 text-slate-100"
      : "border-slate-200 bg-white text-slate-900",
    muted: darkMode ? "text-slate-300" : "text-slate-600",
    subtle: darkMode
      ? "border border-slate-700 text-slate-300"
      : "border border-slate-300 text-slate-700",
    line: darkMode ? "border-slate-800" : "border-slate-200",
    surfaceBg: darkMode ? "bg-slate-900" : "bg-white",
  };

  return (
    <section className="flex flex-col px-6 pt-10 pb-6 sm:h-full sm:overflow-hidden sm:px-10 lg:px-8 lg:pt-14">
      <div className="mx-auto w-full shrink-0">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Projects
        </h2>
      </div>

      {isCoverflow ? (
        <CoverflowTrack theme={theme} />
      ) : (
        <div className="mx-auto mt-8 flex w-full flex-col gap-6">
          {projectitems.map((project) => (
            <MobileProjectCard
              key={project.slug}
              project={project}
              images={projectImagesBySlug[project.slug] ?? []}
              theme={theme}
            />
          ))}
        </div>
      )}

      <p
        className={`mx-auto mt-3 flex w-full shrink-0 items-center gap-2 text-xs font-medium uppercase tracking-wide ${theme.muted}`}
      >
        <span aria-hidden="true">&bull;</span>
        Scroll to Continue
      </p>
    </section>
  );
};

export default Projects;
