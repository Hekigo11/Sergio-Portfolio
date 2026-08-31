import { useEffect, useState } from "react";
import "./App.css";
import { StickyNavbar } from "./components/navbar";
import { SpatialCanvas } from "./components/SpatialCanvas";

const sections = {
  home: { label: "Home", x: 0, y: 0 },
  about: { label: "About", x: 0, y: -1400 },
  projects: { label: "Projects", x: 1800, y: 0 },
  connect: { label: "Connect", x: -1800, y: 0 },
} as const;

export type SectionId = keyof typeof sections;

function App() {
  const [activeSection, setActiveSection] = useState<SectionId>("home");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.dataset.theme = darkMode ? "dark" : "light";
  }, [darkMode]);

  const navigateTo = (id: string) => {
    if (id === activeSection || !(id in sections)) return;
    setActiveSection(id as SectionId);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <StickyNavbar
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode((prev) => !prev)}
        onNavigate={navigateTo}
        activeSection={activeSection}
      />
      <SpatialCanvas
        activeSection={activeSection}
        sections={sections}
        darkMode={darkMode}
      />
    </div>
  );
}

export default App;
