import { motion } from "motion/react";
import type { ReactNode } from "react";

export default function SectionContainer({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-[calc(100vh-72px)] flex-col px-4"
    >
      {children}
    </motion.section>
  );
}
