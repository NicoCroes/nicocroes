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
import Footer from "./components/Footer";

function App() {
  const { data, isLoading, error } = useGeneralData();
  const location = useLocation();

  if (isLoading) return <div>...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div className="text-rey">
      <div className="to-silver fixed inset-0 -z-10 h-screen bg-linear-to-b from-[white]" />

      <header className="to-white/00 sticky top-0 z-10 flex h-18 items-start justify-between bg-linear-to-b from-white/60 px-4 py-2 text-xl">
        <div>
          <h1 className="text-xl font-light uppercase">
            {data?.name && data.name}
          </h1>
        </div>
        <div className="justify-self-end">
          <LaguageToggle />
        </div>
      </header>
      <NavMenu />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Works />} />
          <Route path="/dp/:slug" element={<DpWorkPage />} />
          <Route path="/color" element={<Color />} />
          <Route path="/color/:slug" element={<ColorWorkPage />} />
          <Route path="/bio" element={<Bio />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

export default App;
