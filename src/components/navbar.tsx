import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ui/ThemeToggle";

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
    "absolute left-0 h-[1.75px] w-full rounded-full bg-current transition-[top,opacity,transform] duration-300 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]";
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

export function StickyNavbar({
  darkMode,
  onToggleDarkMode,
  onNavigate,
  activeSection,
}: StickyNavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

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
          className="mx-auto flex min-h-16 w-full max-w-6xl items-center justify-between px-6 py-3 sm:px-10 lg:px-8"
          aria-label="Main navigation"
        >
          <a
            href="#home"
            onClick={(event) => {
              event.preventDefault();
              handleNavigate("home");
            }}
            className="group press relative py-1.5 font-display text-lg font-bold tracking-tight text-ink"
          >
            Sergio&apos;s Portfolio
            <span
              aria-hidden="true"
              className="rule-draw absolute inset-x-0 -bottom-px h-px bg-ink-muted"
            />
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
                    aria-current={active ? "page" : undefined}
                    className={`group press relative py-1.5 ${
                      active ? "font-semibold text-accent" : "hover:text-ink"
                    }`}
                  >
                    {item.label}
                    {/* Hover draws the same rule in pencil; the section you are
                        actually in has it inked, and that inked rule travels
                        between links rather than being redrawn on each one. */}
                    {!active && (
                      <span
                        aria-hidden="true"
                        className="rule-draw absolute inset-x-0 -bottom-px h-px bg-ink-muted"
                      />
                    )}
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
              className="press flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-surface active:bg-surface active:text-accent md:hidden"
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
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -8 }}
            animate={{ opacity: 1, y: 0 }}
            // Leaving is faster than arriving: a panel on its way out is
            // already the wrong answer to what the visitor just asked for.
            exit={{
              opacity: 0,
              y: shouldReduceMotion ? 0 : -8,
              transition: { duration: 0.16, ease: EASING },
            }}
            transition={{ duration: 0.28, ease: EASING }}
            className="fixed inset-x-0 top-16 z-40 flex h-(--app-height) flex-col bg-bg/98 dark:bg-bg/85 dark:backdrop-blur-md md:hidden"
          >
            <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-between px-6 py-8 sm:px-10">
              <ul className="flex flex-col">
                {navItems.map((item, index) => {
                  const active = item.id === activeSection;
                  return (
                    <motion.li
                      key={item.id}
                      // The drawer's links arrive as a list, so they arrive in
                      // sequence. The stagger spans 120ms across all four —
                      // short enough to read as one gesture, never as a wait.
                      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: 0.06 + index * 0.04,
                        ease: EASING,
                      }}
                      className="border-b border-border"
                    >
                      <a
                        href={`#${item.id}`}
                        onClick={(event) => {
                          event.preventDefault();
                          handleNavigate(item.id);
                        }}
                        aria-current={active ? "page" : undefined}
                        className={`press flex items-center py-5 font-display text-3xl font-bold tracking-tight ${
                          active
                            ? "text-accent"
                            : "text-ink hover:text-accent active:text-accent"
                        }`}
                      >
                        {item.label}
                      </a>
                    </motion.li>
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
