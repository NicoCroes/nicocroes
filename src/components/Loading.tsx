import { motion } from "motion/react";

export default function Loading() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 flex h-screen w-full items-center justify-center p-4"
    >
      <div className="border-rey/20 border-t-rey h-16 w-16 animate-spin rounded-full border-2" />
    </motion.div>
  );
}
