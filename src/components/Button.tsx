import type { ReactNode } from "react";
import { motion } from "motion/react";

type ButtonProps = {
  children: ReactNode;
  handleClick?: () => void;
  border: boolean;
};

export default function Button({ children, handleClick, border }: ButtonProps) {
  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`${border ? "border-rey/20 border" : ""} _shadow-xs _bg-white/90 _hover:text-silver sm:hover:bg-silver-light cursor-pointer self-start rounded bg-white px-2 font-light uppercase transition-colors sm:self-auto`}
      onClick={handleClick}
    >
      {children}
    </motion.button>
  );
}
