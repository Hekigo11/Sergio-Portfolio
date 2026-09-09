import portraitDark from "../../assets/Home/PortraitDark.webp";
import portraitLight from "../../assets/Home/PortraitLight.webp";
import { useComments } from "../../hooks/useComments";
import VisitorNotesCarousel from "../VisitorNotesCarousel";
import MetaLabel from "../ui/MetaLabel";
import ThemeToggle from "../ui/ThemeToggle";
import { DecorField, MaskedArt } from "../decor";
import lineHalo from "../../assets/line-halo.svg";
import lineartFour from "../../assets/lineart-4.svg";
import starsFour from "../../assets/stars-4.svg";
import cloudTwo from "../../assets/cloud-2.svg";

interface HomeProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

const Home = ({ darkMode, onToggleDarkMode }: HomeProps) => {
  const portraitSource = darkMode ? portraitDark : portraitLight;
  const { comments: visitorNotes, loading: notesLoading } = useComments(5);
  const showVisitorNotes = !notesLoading && visitorNotes.length > 0;

  return (
    <div className="relative mx-auto grid min-h-full w-full max-w-6xl items-center gap-12 px-6 py-12 sm:px-10 lg:min-h-(--app-height) lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.72fr)] lg:items-stretch lg:gap-10 lg:px-8 xl:gap-16">
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

        {/* Sits directly under the intro copy now rather than as a
            separate full-bleed band beneath the whole hero — a visitor's
            own words read as the page's closing thought, not a distinct
            section. mt-10 (a notch past the mt-6/mt-8 rhythm above) marks
            it as a different register — a live quote, not more intro
            prose — without a rule to separate it, which would compete with
            the h1's own short title rule as the page's one hairline mark. */}
        {showVisitorNotes && (
          <div className="mt-10">
            <VisitorNotesCarousel
              comments={visitorNotes}
              darkMode={darkMode}
              className="items-center lg:items-start"
            />
          </div>
        )}
      </div>

      <div className="flex flex-col items-center justify-center gap-6 lg:items-end lg:border-l lg:border-border lg:pl-10 xl:pl-16">
        {/* Stage is sized beyond the portrait itself so the halo has room
            to clear the frame's edge rather than hugging its border. */}
        <div className="relative flex h-64 w-64 items-center justify-center sm:h-80 sm:w-80 lg:h-[21rem] lg:w-[21rem] xl:h-96 xl:w-96">
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
              className="h-56 w-56 rounded-lg object-cover sm:h-72 sm:w-72"
            />
          </div>
        </div>
        {/* Caption sits at the same gap-2 that binds a MetaLabel to its
            control everywhere else in the system (Connect's form labels) —
            a caption is read as belonging to the one thing beneath or above
            it, not as a third item in the row. */}
        <div className="flex flex-col items-center gap-2 lg:items-end">
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
            <ThemeToggle
              darkMode={darkMode}
              onToggleDarkMode={onToggleDarkMode}
              size="sm"
            />
          </div>
          <MetaLabel as="p" size="sm">
            For a change in atmosphere
          </MetaLabel>
        </div>
      </div>
    </div>
  );
};

export default Home;
