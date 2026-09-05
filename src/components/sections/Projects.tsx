import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState, type WheelEvent } from "react";
import navview1 from "../../assets/Projects/navview1.png";
import navview2 from "../../assets/Projects/navview2.png";

interface ProjectsProps {
  darkMode: boolean;
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
            onClick={() => goTo(index - 1)}
            aria-label="Previous image"
            className="absolute top-1/2 left-2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm transition hover:bg-black/65"
          >
            <span aria-hidden="true">‹</span>
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
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
                onClick={() => setIndex(i)}
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

const projectitems = [
  {
    title:
      "NavView: Computer Vision and LiDAR-Based System for Autonomous River Boats",
    timeline: "May 2026",
    description:
      "NavView is an autonomous river-cleaning perception system integrating Computer Vision, LiDAR, SLAM, and ROS2 for real-time floating debris detection and obstacle awareness. The system uses a lightweight YOLO-based model trained on a custom San Juan River dataset and integrates a Mini PC, LiDAR, camera, Arduino Mega, and propulsion system into a low-cost autonomous vessel prototype.",
    images: [navview1, navview2],
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
];

const Projects = ({ darkMode }: ProjectsProps) => {
  const trackRef = useRef<HTMLDivElement>(null);

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track) return;
    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
    event.preventDefault();
    track.scrollBy({ left: event.deltaY, behavior: "smooth" });
  };

  const cardClasses = darkMode
    ? "border-slate-700 bg-slate-900 text-slate-100"
    : "border-slate-200 bg-white text-slate-900";

  const muted = darkMode ? "text-slate-300" : "text-slate-600";
  const subtle = darkMode
    ? "border border-slate-700 text-slate-300"
    : "border border-slate-300 text-slate-700";
  const line = darkMode ? "border-slate-800" : "border-slate-200";
  const surfaceBg = darkMode ? "bg-slate-900" : "bg-white";

  return (
    <section className="flex flex-col px-6 pt-10 pb-6 sm:h-full sm:overflow-hidden sm:px-10 lg:px-8 lg:pt-14">
      <div className="mx-auto w-full max-w-6xl shrink-0">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Projects
        </h2>
      </div>

      <div
        ref={trackRef}
        onWheel={handleWheel}
        tabIndex={0}
        aria-label="Projects"
        className="mx-auto mt-8 flex w-full max-w-6xl flex-col gap-6 focus:outline-none sm:min-h-0 sm:flex-1 sm:flex-row sm:gap-0 sm:snap-x sm:snap-mandatory sm:overflow-x-auto sm:overflow-y-hidden sm:scroll-smooth"
      >
        {projectitems.map((project) => {
          const hasImage =
            Array.isArray(project.images) && project.images.length > 0;

          return (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className={`flex w-full flex-col overflow-hidden rounded-2xl border p-4 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:h-full sm:shrink-0 sm:snap-start sm:p-6 lg:p-8 ${cardClasses}`}
            >
              <div className="flex flex-col gap-6 sm:h-full sm:min-h-0 lg:grid lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:items-stretch">
                <div
                  className={`h-48 shrink-0 overflow-hidden rounded-xl border sm:h-56 lg:h-full lg:shrink ${surfaceBg} ${line}`}
                >
                  {hasImage ? (
                    <ProjectImageCarousel
                      images={project.images}
                      alt={project.title}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center p-6 text-center">
                      <div>
                        <div
                          className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full border text-lg font-semibold ${darkMode ? "border-slate-500 text-slate-200" : "border-slate-400/60 text-slate-600"}`}
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
                  )}
                </div>

                <div className="flex flex-col sm:relative sm:min-h-0 sm:flex-1 lg:flex-none">
                  <div className="sm:min-h-0 sm:flex-1 sm:overflow-y-auto sm:pr-1">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-xl font-semibold tracking-tight sm:text-2xl lg:text-3xl">
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

                    <p
                      className={`mt-4 text-sm leading-6 sm:text-base sm:leading-7 ${muted}`}
                    >
                      {project.description}
                    </p>

                    <div className="mt-5">
                      <p
                        className={`mb-2 text-[10px] font-medium uppercase tracking-[0.22em] ${muted}`}
                      >
                        Key features
                      </p>
                      <ul
                        className={`grid grid-cols-1 gap-x-6 gap-y-2 text-sm leading-6 sm:grid-cols-2 ${muted}`}
                      >
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
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-x-0 bottom-0 hidden h-10 bg-linear-to-t to-transparent sm:block ${darkMode ? "from-slate-900" : "from-white"}`}
                  />
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>

      <p
        className={`mx-auto mt-3 flex w-full max-w-6xl shrink-0 items-center gap-2 text-xs font-medium uppercase tracking-wide ${muted}`}
      >
        <span aria-hidden="true">&bull;</span>
        Scroll to explore
      </p>
    </section>
  );
};

export default Projects;
