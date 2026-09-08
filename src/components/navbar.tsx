import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

interface StickyNavbarProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onNavigate: (id: string) => void;
  activeSection: string;
}

const navItems = [
  { label: "Home", id: "home" },
  { label: "About Me", id: "about" },
  { label: "Projects", id: "projects" },
  { label: "Connect", id: "connect" },
];

const EASING = [0.22, 1, 0.36, 1] as const;

function MenuGlyph({ open }: { open: boolean }) {
  const bar =
    "absolute left-0 h-[1.75px] w-full rounded-full bg-current transition-all duration-300 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]";
  return (
    <span className="relative block h-4 w-5 shrink-0" aria-hidden="true">
      <span
        className={`${bar} ${open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"}`}
      />
      <span
        className={`${bar} top-1/2 -translate-y-1/2 ${open ? "opacity-0" : "opacity-100"}`}
      />
      <span
        className={`${bar} ${open ? "top-1/2 -translate-y-1/2 -rotate-45" : "top-full -translate-y-full"}`}
      />
    </span>
  );
}

function SunIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      className="h-3.5 w-3.5"
    >
      <circle cx="12" cy="12" r="4.25" />
      <path d="M12 2.5v2.25M12 19.25v2.25M4.4 4.4l1.6 1.6M18 18l1.6 1.6M2.5 12h2.25M19.25 12h2.25M4.4 19.6l1.6-1.6M18 6l1.6-1.6" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5"
    >
      <path d="M20 14.2A8.25 8.25 0 0 1 9.8 4a8.25 8.25 0 1 0 10.2 10.2Z" />
    </svg>
  );
}

function ThemeToggle({
  darkMode,
  onToggleDarkMode,
}: {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggleDarkMode}
      aria-label="Toggle dark mode"
      aria-pressed={darkMode}
      className={`flex h-8 w-14 items-center rounded-full border border-border bg-surface p-1 transition hover:border-border-strong ${
        darkMode ? "justify-end" : "justify-start"
      }`}
    >
      <motion.span
        layout
        transition={{ type: "spring", visualDuration: 0.2, bounce: 0.2 }}
        className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-accent-ink"
      >
        {darkMode ? <MoonIcon /> : <SunIcon />}
      </motion.span>
      <span className="sr-only">
        {darkMode ? "Switch to light mode" : "Switch to dark mode"}
      </span>
    </button>
  );
}

export function StickyNavbar({
  darkMode,
  onToggleDarkMode,
  onNavigate,
  activeSection,
}: StickyNavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  // The panel sits above everything else in the DOM; Escape is the keyboard
  // equivalent of tapping the backdrop.
  useEffect(() => {
    if (!menuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  // A route change (including re-tapping the current section) always closes
  // the menu, matching how a mobile drawer nav is expected to behave.
  useEffect(() => {
    setMenuOpen(false);
  }, [activeSection]);

  const handleNavigate = (id: string) => {
    onNavigate(id);
    setMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-bg/95 dark:bg-bg/75 dark:backdrop-blur-md">
        <nav
          className="mx-auto flex min-h-16 w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8"
          aria-label="Main navigation"
        >
          <a
            href="#home"
            onClick={(event) => {
              event.preventDefault();
              handleNavigate("home");
            }}
            className="font-display text-lg font-bold tracking-tight text-ink"
          >
            Sergio&apos;s Portfolio
          </a>

          <div className="flex items-center gap-3 sm:gap-6">
            <div className="hidden items-center gap-6 text-sm font-medium text-ink-muted md:flex">
              {navItems.map((item) => {
                const active = item.id === activeSection;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(event) => {
                      event.preventDefault();
                      handleNavigate(item.id);
                    }}
                    className={`relative py-1.5 transition-colors ${
                      active
                        ? "font-semibold text-accent"
                        : "hover:text-ink"
                    }`}
                  >
                    {item.label}
                    {active && (
                      <motion.span
                        layoutId="nav-active-underline"
                        className="absolute inset-x-0 -bottom-px h-px bg-accent"
                        transition={{ duration: 0.35, ease: EASING }}
                      />
                    )}
                  </a>
                );
              })}
            </div>

            <div className="hidden md:block">
              <ThemeToggle darkMode={darkMode} onToggleDarkMode={onToggleDarkMode} />
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-panel"
              className="flex h-11 w-11 items-center justify-center rounded-full text-ink md:hidden"
            >
              <MenuGlyph open={menuOpen} />
            </button>
          </div>
        </nav>
      </header>

      {/* Rendered as a header sibling, not a descendant: backdrop-blur-md on
          <header> would otherwise become this fixed panel's containing block
          (any ancestor with a backdrop-filter/transform/filter does), collapsing
          top-16/bottom-0 to the header's own ~64px box instead of the viewport. */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav-panel"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: EASING }}
            className="fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col bg-bg/98 dark:bg-bg/85 dark:backdrop-blur-md md:hidden"
          >
            <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-between px-6 py-8 sm:px-10">
              <ul className="flex flex-col">
                {navItems.map((item) => {
                  const active = item.id === activeSection;
                  return (
                    <li key={item.id} className="border-b border-border">
                      <a
                        href={`#${item.id}`}
                        onClick={(event) => {
                          event.preventDefault();
                          handleNavigate(item.id);
                        }}
                        aria-current={active ? "page" : undefined}
                        className={`flex items-center py-5 font-display text-3xl font-bold tracking-tight ${
                          active ? "text-accent" : "text-ink"
                        }`}
                      >
                        {item.label}
                      </a>
                    </li>
                  );
                })}
              </ul>

              <div className="flex items-center justify-between pt-8">
                <span className="text-sm font-medium text-ink-muted">
                  {darkMode ? "Dark mode" : "Light mode"}
                </span>
                <ThemeToggle darkMode={darkMode} onToggleDarkMode={onToggleDarkMode} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default StickyNavbar;
