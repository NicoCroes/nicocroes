import { motion } from "motion/react";
import { useGeneralData } from "./hooks/useData";
import Bio from "./pages/Bio";
import LaguageToggle from "./components/LanguageToggle";

function App() {
  const { data, isLoading, error } = useGeneralData();

  if (isLoading) return <div>...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      <motion.h1 className="font-thin" drag>
        {data?.name && data.name}
      </motion.h1>
      <Bio />
      <LaguageToggle />
    </>
  );
}

export default App;
