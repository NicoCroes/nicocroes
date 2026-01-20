import { motion } from "motion/react";

type LinkButtonProps = {
  url: string;
  text: string;
};

export default function LinkButton({ url, text }: LinkButtonProps) {
  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <a
        className="bg-rey sm:hover:bg-rey/80 border-rey/40 rounded border px-2 text-[#e0e0e0] transition-colors"
        href={url}
        target="_blank"
      >
        {text}
      </a>
    </motion.button>
  );
}
