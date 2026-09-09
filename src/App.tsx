import { useEffect, useRef, useState } from "react";
import "./App.css";
import { StickyNavbar } from "./components/navbar";
import { SpatialCanvas } from "./components/SpatialCanvas";
import { DayCurrents, NightSky } from "./components/decor";
import { travelBetween, type Travel } from "./spatial/journey";

// The canvas arrangement, in whole viewports from Home: About directly above,
// Projects to the right, Connect up and to the left. SpatialCanvas turns these
// into pixels from the measured viewport, so the same layout holds — and the
// pan covers the same proportion of the screen — at every size.
const sections = {
  home: { label: "Home", col: 0, row: 0 },
  about: { label: "About", col: 0, row: -1 },
  projects: { label: "Projects", col: 1, row: 0 },
  connect: { label: "Connect", col: -1, row: -1 },
} as const;

export type SectionId = keyof typeof sections;

function App() {
  const [activeSection, setActiveSection] = useState<SectionId>("home");
  const [darkMode, setDarkMode] = useState(false);
  // The journey the atmosphere streaks along. It is derived here, where both
  // ends of the move are known, rather than inside the sky — the sky is told
  // where the camera went, it does not work it out.
  const [travel, setTravel] = useState<Travel | null>(null);
  const journeyCount = useRef(0);

  useEffect(() => {
    document.body.dataset.theme = darkMode ? "dark" : "light";
  }, [darkMode]);

  const navigateTo = (id: string) => {
    if (id === activeSection || !(id in sections)) return;
    journeyCount.current += 1;
    setTravel(
      travelBetween(
        sections[activeSection],
        sections[id as SectionId],
        journeyCount.current,
      ),
    );
    setActiveSection(id as SectionId);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <DayCurrents travel={travel} />
      <NightSky travel={travel} />
      <StickyNavbar
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode((prev) => !prev)}
        onNavigate={navigateTo}
        activeSection={activeSection}
      />
      <SpatialCanvas
        activeSection={activeSection}
        sections={sections}
        travel={travel}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode((prev) => !prev)}
        onNavigate={navigateTo}
      />
    </div>
  );
}

export default App;
