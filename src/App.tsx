import { useEffect } from "react";
import { removeInitialLoader } from "./utils/removeInitialLoader";
import { useGeneralData, useDpWorksList } from "./hooks/useData";
import { Routes, Route, useLocation } from "react-router";
import { AnimatePresence } from "motion/react";
import Works from "./pages/Works";
import DpWorkPage from "./pages/DpWorkPage";
import Color from "./pages/Color";
import Bio from "./pages/Bio";
import LaguageToggle from "./components/LanguageToggle";
import NavMenu from "./components/NavMenu";
import Footer from "./components/Footer";
import { motion } from "motion/react";

function App() {
  const generalData = useGeneralData();
  const dpWorksList = useDpWorksList();
  const location = useLocation();

  const isLoading = dpWorksList.isLoading || generalData.isLoading;
  const error = dpWorksList.error || generalData.error;
  const data = generalData.data;

  useEffect(() => {
    if (!isLoading || error) {
      removeInitialLoader();
    }
  }, [isLoading, error]);

  if (isLoading) return null;
  if (error) return <div>{error?.message}</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-rey text-xl font-light"
    >
      <header className="pointer-events-none sticky top-0 z-10 flex h-12 items-start justify-between px-2 py-2 sm:h-18">
        <div className="pointer-events-auto">
          <h1 className="rounded bg-white/40 px-2 uppercase backdrop-blur-xl">
            {data?.name && data.name}
          </h1>
        </div>
        <div className="pointer-events-auto justify-self-end">
          <LaguageToggle />
        </div>
      </header>
      <NavMenu />

      <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Works />} />
          <Route path="/dp/:slug" element={<DpWorkPage />} />
          <Route path="/color" element={<Color />} />
          <Route path="/bio" element={<Bio />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </motion.div>
  );
}

export default App;
