import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export default function Time() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {location.pathname.split("/").length < 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="rounded bg-white/40 px-2 backdrop-blur-xl"
          >
            {time.toLocaleTimeString()}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
