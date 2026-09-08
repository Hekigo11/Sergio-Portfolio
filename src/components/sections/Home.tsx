import { motion } from "motion/react";
import portraitDark from "../../assets/Home/PortraitDark.png";
import { useComments } from "../../hooks/useComments";
import VisitorNotesCarousel from "../VisitorNotesCarousel";
import MetaLabel from "../ui/MetaLabel";
import { DecorField, MaskedArt } from "../decor";
import lineHalo from "../../assets/line-halo.svg";
import lineartFour from "../../assets/lineart-4.svg";
import starsFour from "../../assets/stars-4.svg";
import cloudTwo from "../../assets/cloud-2.svg";

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
  const { comments: visitorNotes, loading: notesLoading } = useComments(5);
  const showVisitorNotes = !notesLoading && visitorNotes.length > 0;

  return (
    <div>
      <div className="relative mx-auto grid min-h-full w-full max-w-6xl items-center gap-12 px-6 py-12 sm:px-10 lg:min-h-[calc(100vh-4rem)] lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.72fr)] lg:items-stretch lg:gap-16 lg:px-8">
        {/* Theme-paired flourish: the lineart curl is the day mark, the star
            cluster the night one, sharing a slot so either theme shows the
            same number of marks. */}
        <DecorField className="hidden lg:block">
          <MaskedArt
            src={cloudTwo}
            className="absolute top-[8%] left-[2%] w-52 text-ink-faint opacity-30 aspect-744/214"
          />
          <MaskedArt
            src={lineartFour}
            className="absolute bottom-[6%] left-0 w-36 text-ink-faint opacity-35 aspect-722/472 dark:hidden"
          />
          <MaskedArt
            src={starsFour}
            className="absolute bottom-[7%] left-[1%] hidden w-32 text-ink-faint opacity-45 aspect-579/492 dark:block"
          />
        </DecorField>

        <div className="relative flex max-w-2xl flex-col justify-center text-center lg:text-left">
          <MetaLabel size="sm">- Greetings, I&apos;m</MetaLabel>
          <h1 className="mt-6 font-display text-5xl leading-[0.95] font-bold tracking-tight text-ink sm:text-6xl lg:text-7xl">
            Jasper D. Sergio
          </h1>

          <div className="mx-auto mt-8 h-px w-16 bg-border-strong lg:mx-0" />

          <h3 className="mt-8 text-2xl font-semibold tracking-tight text-ink">
            Computer Engineer
          </h3>
          <h4 className="mt-2 max-w-prose text-lg leading-7 text-ink-muted">
            Software Engineering & Automation Enthusiast
          </h4>
          <p className="mt-6 max-w-prose font-display text-lg leading-7 text-ink-muted italic">
            Building practical software, automation, and intelligent systems.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-6 lg:items-end lg:border-l lg:border-border lg:pl-16">
          {/* Stage is sized beyond the portrait itself so the halo has room
              to clear the frame's edge rather than hugging its border. */}
          <div className="relative flex h-64 w-64 items-center justify-center sm:h-80 sm:w-80 lg:h-96 lg:w-96">
            <DecorField className="hidden sm:block">
              <MaskedArt
                src={lineHalo}
                className="absolute inset-0 text-ink-faint opacity-60"
              />
            </DecorField>
            <div className="relative rounded-xl border border-border bg-surface-solid p-2">
              <img
                key={portraitSource}
                src={portraitSource}
                alt="Portrait of Jasper D. Sergio"
                className="h-64 w-64 rounded-lg object-cover sm:h-72 sm:w-72"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              className="h-4 w-4 rotate-180 text-ink-faint"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
            <button
              type="button"
              onClick={onToggleDarkMode}
              aria-label="Toggle dark mode for aesthetical changes"
              aria-pressed={darkMode}
              className={`flex h-7 w-12 items-center rounded-full border border-border bg-surface p-1 transition hover:border-border-strong ${
                darkMode ? "justify-end" : "justify-start"
              }`}
            >
              <motion.span
                layout
                transition={{
                  type: "spring",
                  visualDuration: 0.2,
                  bounce: 0.2,
                }}
                className="h-5 w-5 rounded-full bg-accent"
              />
            </button>
          </div>
        </div>
      </div>

      {showVisitorNotes && (
        <div className="border-t border-border">
          <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-6 py-14 text-center sm:px-10 lg:px-8">
            <VisitorNotesCarousel comments={visitorNotes} darkMode={darkMode} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
