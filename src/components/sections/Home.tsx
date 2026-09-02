import { motion } from "motion/react";
import portraitDark from "../../assets/Home/PortraitDark.png";

const portraitLight = new URL(
  "../../assets/Home/PortraitLight.JPG",
  import.meta.url,
).href;

interface HomeProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

const Home = ({ darkMode, onToggleDarkMode }: HomeProps) => {
  const portraitSource = darkMode ? portraitDark : portraitLight;

  return (
    <div className="mx-auto grid min-h-full w-full max-w-6xl items-center gap-12 px-6 py-12 sm:px-10 lg:min-h-[calc(100vh-4rem)] lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.8fr)] lg:gap-20 lg:px-8">
      <div className="max-w-2xl text-center lg:text-left">
        <h2
          className={
            darkMode
              ? "text-2xl font-bold text-slate-300"
              : "text-2xl font-bold text-slate-600"
          }
        >
          - Greetings, I'm
        </h2>
        <h1
          className={
            darkMode
              ? "mt-4 text-5xl font-bold tracking-tight text-slate-100 sm:text-6xl"
              : "mt-4 text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl"
          }
        >
          Jasper D. Sergio
        </h1>
        <h3
          className={
            darkMode
              ? "mt-5 text-2xl font-bold text-slate-200"
              : "mt-5 text-2xl font-bold text-slate-700"
          }
        >
          Computer Engineer
        </h3>
        <p
          className={
            darkMode
              ? "mt-6 max-w-prose text-base leading-7 text-slate-300"
              : "mt-6 max-w-prose text-base leading-7 text-slate-600"
          }
        >
          Welcome to my portfolio website! I am a passionate Computer Engineer
          with a strong interest in software development and technology. Here,
          you can explore my projects, skills, and experiences that showcase my
          expertise in the field.
        </p>
      </div>
      <div className="flex flex-col items-center justify-center gap-5 lg:items-end">
        <img
          key={portraitSource}
          src={portraitSource}
          alt="Portrait of Jasper D. Sergio"
          className="h-64 w-64 rounded-2xl object-cover sm:h-72 sm:w-72"
        />
        <div className="flex flex-col items-center gap-2 lg:items-end">
          <div
            className={
              darkMode
                ? "flex items-center gap-2 text-xs font-medium text-slate-300"
                : "flex items-center gap-2 text-xs font-medium text-slate-600"
            }
          >
            {/* <span>Toggle dark mode for aesthetical changes</span> */}
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              className="h-4 w-4 rotate-90"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </div>
          <button
            type="button"
            onClick={onToggleDarkMode}
            aria-label="Toggle dark mode for aesthetical changes"
            aria-pressed={darkMode}
            className={
              darkMode
                ? "flex h-7 w-12 items-center justify-end rounded-full bg-slate-700 p-1"
                : "flex h-7 w-12 items-center justify-start rounded-full bg-slate-200 p-1"
            }
          >
            <motion.span
              layout
              transition={{
                type: "spring",
                visualDuration: 0.2,
                bounce: 0.2,
              }}
              className={
                darkMode
                  ? "h-5 w-5 rounded-full bg-slate-100"
                  : "h-5 w-5 rounded-full bg-slate-700"
              }
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
