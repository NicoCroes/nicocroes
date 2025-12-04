import { useGeneralData } from "./hooks/useData";
import { Routes, Route, useLocation } from "react-router";
import { AnimatePresence } from "motion/react";
import Works from "./pages/Works";
import DpWorkPage from "./pages/DpWorkPage";
import Color from "./pages/Color";
import Bio from "./pages/Bio";
import LaguageToggle from "./components/LanguageToggle";
import NavMenu from "./components/NavMenu";
import useLanguage from "./hooks/useLanguage";

function App() {
  const { data, isLoading, error } = useGeneralData();
  const location = useLocation();
  const { language } = useLanguage();

  if (isLoading) return <div>...</div>;
  if (error) return <div>{error.message}</div>;

  const detail =
    data?.detail?.[language] ?? data?.detail?.es ?? data?.detail?.en ?? null;

  return (
    <>
      <header className="flex items-start justify-between">
        <div className="flex gap-4">
          <h1 className="font-bold">{data?.name && data.name}</h1>
          {detail && <h2>{detail}</h2>}
          <NavMenu />
        </div>
        <LaguageToggle />
      </header>

      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Works />} />
          <Route path="/dp/:slug" element={<DpWorkPage />} />
          <Route path="/color" element={<Color />} />
          <Route path="/bio" element={<Bio />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
