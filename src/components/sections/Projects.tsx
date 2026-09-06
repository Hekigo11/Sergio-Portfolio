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
  type WheelEvent,
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
            className="absolute top-1/2 left-2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm transition hover:bg-black/65"
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
            className="absolute top-1/2 right-2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm transition hover:bg-black/65"
          >
            <span aria-hidden="true">›</span>
          </button>
          <div className="absolute inset-x-0 bottom-0 flex justify-center gap-1.5 bg-linear-to-t from-black/50 to-transparent px-3 pt-6 pb-2">
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
                className={`h-1.5 w-1.5 rounded-full transition ${
                  i === index ? "bg-white" : "bg-white/50 hover:bg-white/75"
                }`}
              />
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
  timeline: string;
  description: string;
  keyFeatures: string[];
  technologies: string[];
}

const projectitems: ProjectItem[] = [
  {
    slug: "navview",
    title:
      "NavView: Computer Vision and LiDAR-Based System for Autonomous River Boats",
    timeline: "May 2026",
    description:
      "NavView is an autonomous river-cleaning perception system integrating Computer Vision, LiDAR, SLAM, and ROS2 for real-time floating debris detection and obstacle awareness. The system uses a lightweight YOLO-based model trained on a custom San Juan River dataset and integrates a Mini PC, LiDAR, camera, Arduino Mega, and propulsion system into a low-cost autonomous vessel prototype.",
    keyFeatures: [
      "Real-time floating debris detection & tracking",
      "LiDAR-based 360° obstacle detection",
      "Autonomous navigation & obstacle avoidance",
      "SLAM-based localization & mapping",
      "Temporal stability scoring for glare reduction",
      "ROS 2 perception-to-navigation integration",
      "Manual, autonomous, and emergency-stop control",
      "Live camera & LiDAR monitoring interface",
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
    timeline: "March 2026",
    description:
      "A full-stack e-commerce website developed for MARJ Food Services, providing customers with an online storefront for browsing products, managing carts, and placing orders. The system includes product and order management features backed by a relational database to support the business's online operations.",
    keyFeatures: [
      "Online product storefront",
      "Product browsing and management",
      "Shopping cart functionality",
      "Order placement and processing",
      "Customer account management",
      "Database-backed product and order records",
      "Responsive web interface",
    ],
    technologies: ["PHP", "MySQL", "HTML", "CSS", "JavaScript", "Bootstrap"],
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

function PlaceholderBox({ muted, darkMode }: { muted: string; darkMode: boolean }) {
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
  onSelect: () => void;
}) {
  const { cardClasses, muted, subtle, line, surfaceBg, darkMode } = theme;
  const { containerRef, contentRef, scale: fitScale } = useFitScale();
  const hasImage = images.length > 0;

  const cardCenter = index * (cardWidth + gap) + cardWidth / 2;
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
    <motion.article
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
      style={{ width: cardWidth, scale, opacity }}
      className={`flex h-full shrink-0 cursor-pointer flex-col overflow-hidden rounded-2xl border p-5 shadow-[0_20px_60px_rgba(15,23,42,0.12)] lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-stretch lg:gap-7 lg:p-7 ${cardClasses}`}
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
    </motion.article>
  );
}

const CARD_WIDTH_RATIO = 0.88;
const CARD_WIDTH_MAX = 1280;
const CARD_GAP = 32;

function CoverflowTrack({ theme }: { theme: ThemeClasses }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const { scrollX } = useScroll({ container: trackRef });

  const dragState = useRef<{
    startX: number;
    startScrollLeft: number;
    moved: boolean;
  } | null>(null);
  const suppressClickRef = useRef(false);

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
    const center = index * (cardWidth + CARD_GAP) + cardWidth / 2;
    el.scrollTo({ left: center - containerWidth / 2, behavior: "smooth" });
  };

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!el) return;
    const delta =
      Math.abs(event.deltaX) > Math.abs(event.deltaY)
        ? event.deltaX
        : event.deltaY;
    if (delta === 0) return;
    event.preventDefault();
    el.scrollLeft += delta;
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const el = trackRef.current;
    if (!el) return;
    dragState.current = {
      startX: event.clientX,
      startScrollLeft: el.scrollLeft,
      moved: false,
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
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (dragState.current?.moved) suppressClickRef.current = true;
    if (el?.hasPointerCapture(event.pointerId)) {
      el.releasePointerCapture(event.pointerId);
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
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      role="region"
      aria-roledescription="carousel"
      aria-label="Projects"
      className="mx-auto mt-8 min-h-0 w-full max-w-[100rem] flex-1 cursor-grab overflow-x-auto overflow-y-hidden scrollbar-none active:cursor-grabbing"
    >
      <div
        className="flex h-full items-stretch"
        style={{
          gap: CARD_GAP,
          paddingLeft: sidePadding,
          paddingRight: sidePadding,
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
              onSelect={() => handleCardSelect(i)}
            />
          ))}
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
      <div className="mx-auto w-full max-w-[100rem] shrink-0">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Projects
        </h2>
      </div>

      {isCoverflow ? (
        <CoverflowTrack theme={theme} />
      ) : (
        <div className="mx-auto mt-8 flex w-full max-w-[100rem] flex-col gap-6">
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
        className={`mx-auto mt-3 flex w-full max-w-[100rem] shrink-0 items-center gap-2 text-xs font-medium uppercase tracking-wide ${theme.muted}`}
      >
        <span aria-hidden="true">&bull;</span>
        Scroll to Continue
      </p>
    </section>
  );
};

export default Projects;
