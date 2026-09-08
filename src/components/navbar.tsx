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
      className={
        darkMode
          ? "flex h-8 w-14 items-center justify-end rounded-full border border-slate-600 bg-slate-800 p-1 shadow-sm hover:border-violet-500"
          : "flex h-8 w-14 items-center justify-start rounded-full border border-slate-200 bg-slate-100 p-1 shadow-sm hover:border-violet-400"
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
            ? "flex h-6 w-6 items-center justify-center rounded-full bg-violet-300 text-sm leading-none text-slate-950"
            : "flex h-6 w-6 items-center justify-center rounded-full bg-violet-600 text-sm leading-none text-white"
        }
      >
        <span aria-hidden="true">{darkMode ? "☾" : "☀"}</span>
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
      <header
        className={
          darkMode
            ? "sticky top-0 z-50 border-b border-slate-700 bg-slate-950/80 backdrop-blur-md"
            : "sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md"
        }
      >
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
            className={
              darkMode
                ? "text-base font-semibold tracking-tight text-white"
                : "text-base font-semibold tracking-tight text-slate-900"
            }
          >
            Sergio&apos;s Portfolio
          </a>

          <div className="flex items-center gap-3 sm:gap-6">
            <div
              className={
                darkMode
                  ? "hidden items-center gap-5 text-sm font-medium text-slate-300 md:flex"
                  : "hidden items-center gap-5 text-sm font-medium text-slate-600 md:flex"
              }
            >
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
                    className={
                      darkMode
                        ? active
                          ? "font-semibold text-violet-300"
                          : "hover:text-violet-300"
                        : active
                          ? "font-semibold text-violet-600"
                          : "hover:text-violet-600"
                    }
                  >
                    {item.label}
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
              className={
                darkMode
                  ? "flex h-11 w-11 items-center justify-center rounded-full text-slate-100 md:hidden"
                  : "flex h-11 w-11 items-center justify-center rounded-full text-slate-900 md:hidden"
              }
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
            className={
              darkMode
                ? "fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col bg-slate-950/95 backdrop-blur-md md:hidden"
                : "fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col bg-white/95 backdrop-blur-md md:hidden"
            }
          >
            <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-between px-6 py-8 sm:px-10">
              <ul className="flex flex-col">
                {navItems.map((item) => {
                  const active = item.id === activeSection;
                  return (
                    <li
                      key={item.id}
                      className={`border-b ${darkMode ? "border-slate-800" : "border-slate-200"}`}
                    >
                      <a
                        href={`#${item.id}`}
                        onClick={(event) => {
                          event.preventDefault();
                          handleNavigate(item.id);
                        }}
                        aria-current={active ? "page" : undefined}
                        className={
                          active
                            ? `flex items-center py-5 text-3xl font-bold tracking-tight ${
                                darkMode ? "text-violet-300" : "text-violet-600"
                              }`
                            : `flex items-center py-5 text-3xl font-bold tracking-tight ${
                                darkMode ? "text-slate-100" : "text-slate-900"
                              }`
                        }
                      >
                        {item.label}
                      </a>
                    </li>
                  );
                })}
              </ul>

              <div className="flex items-center justify-between pt-8">
                <span
                  className={`text-sm font-medium ${darkMode ? "text-slate-400" : "text-slate-600"}`}
                >
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
