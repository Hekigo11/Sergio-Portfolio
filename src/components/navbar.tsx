import { motion } from "motion/react";

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

export function StickyNavbar({
  darkMode,
  onToggleDarkMode,
  onNavigate,
  activeSection,
}: StickyNavbarProps) {
  return (
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
            onNavigate("home");
          }}
          className={
            darkMode
              ? "text-base font-semibold tracking-tight text-white"
              : "text-base font-semibold tracking-tight text-slate-900"
          }
        >
          Sergio&apos;s Portfolio
        </a>

        <div className="flex items-center gap-5 sm:gap-6">
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
                    onNavigate(item.id);
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
        </div>
      </nav>
    </header>
  );
}

export default StickyNavbar;
