import type { ReactNode } from "react";
import { motion } from "motion/react";

type ButtonProps = {
  children: ReactNode;
  handleClick?: () => void;
};

export default function Button({ children, handleClick }: ButtonProps) {
  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.975 }}
      className="border-rey/10 cursor-pointer self-start rounded-xs border bg-white/40 px-2 font-light lowercase shadow-xs sm:self-auto"
      onClick={handleClick}
    >
      {children}
    </motion.button>
  );
}
