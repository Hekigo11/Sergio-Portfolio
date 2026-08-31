interface StickyNavbarProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onNavigate: (id: string) => void;
  activeSection: string;
}

const navItems = [
  { label: "Home", id: "home" },
  { label: "Projects", id: "projects" },
  { label: "About Me", id: "about" },
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
            className={
              darkMode
                ? "rounded-full border border-slate-600 bg-slate-800 px-3 py-1.5 text-sm font-medium text-slate-200 shadow-sm hover:border-violet-500 hover:text-violet-300"
                : "rounded-full border border-slate-200 bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm hover:border-violet-400 hover:text-violet-600"
            }
          >
            {darkMode ? "Light" : "Dark"}
          </button>        </div>
      </nav>
    </header>
  );
}

export default StickyNavbar;
