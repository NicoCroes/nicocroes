import { motion } from "motion/react";
import { useGeneralData } from "./hooks/useData";

function App() {
  const { data, isLoading, error } = useGeneralData();

  if (isLoading) return <div>...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      <motion.h1 className="font-thin" drag>
        {data?.name && data.name}
      </motion.h1>
    </>
  );
}

export default App;
