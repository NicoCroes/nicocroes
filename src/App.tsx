import { useGeneralData } from "./hooks/useData";
import { Routes, Route, useLocation } from "react-router";
import { AnimatePresence } from "motion/react";
import Works from "./pages/Works";
import DpWorkPage from "./pages/DpWorkPage";
import ColorWorkPage from "./pages/ColorWorkPage";
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
    <div className="text-rey pb-16">
      <div className="fixed inset-0 -z-10 h-screen bg-linear-to-b from-[white] to-[#C0C0C0]" />

      <header className="sticky top-0 z-10 flex items-center justify-between bg-linear-to-b from-white/60 to-[#C0C0C000] px-4 pt-4 pb-8 text-xl sm:px-8 sm:py-8">
        <div>
          <h1 className="text-3xl uppercase">{data?.name && data.name}</h1>
          {detail && <h2 className="font-thin">{detail}</h2>}
        </div>
        <div className="justify-self-end">
          <LaguageToggle />
        </div>
      </header>
      <NavMenu />

      <div className="px-4">
        <AnimatePresence>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Works />} />
            <Route path="/dp/:slug" element={<DpWorkPage />} />
            <Route path="/color" element={<Color />} />
            <Route path="/color/:slug" element={<ColorWorkPage />} />
            <Route path="/bio" element={<Bio />} />
          </Routes>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
