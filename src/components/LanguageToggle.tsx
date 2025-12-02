import useLanguage from "../hooks/useLanguage";
import { motion } from "motion/react";

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed top-0 right-0 z-10 cursor-pointer"
      onClick={() => {
        setLanguage(language === "es" ? "en" : "es");
      }}
    >
      {language === "es" ? "en" : "es"}
    </motion.button>
  );
}
