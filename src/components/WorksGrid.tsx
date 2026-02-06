import { useState } from "react";
import { NavLink } from "react-router";
import { urlFor } from "../lib/sanityImageUrl";
import useLanguage from "../hooks/useLanguage";
import type { DpWorksListQueryResult } from "../lib/types";
import { motion, AnimatePresence } from "motion/react";

interface DpWorksGidType {
  data: DpWorksListQueryResult;
}

export default function DpWorksGrid({ data }: DpWorksGidType) {
  const { language } = useLanguage();
  const [hoveredWork, setHoveredWork] = useState<string | null>(null);

  return (
    <div
      className={`${data?.length < 4 ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-2 sm:grid-cols-4"} mb-24 grid items-center gap-2 sm:mb-32 sm:gap-6 sm:px-4`}
    >
      {data?.length &&
        data.map((work) => (
          <NavLink to={`/dp/${work.slug?.current}`} key={work._id}>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="relative"
            >
              <div
                onMouseEnter={() => setHoveredWork(work._id)}
                onMouseLeave={() => setHoveredWork(null)}
                className="pointer-events-auto absolute flex h-full w-full items-center"
              >
                <AnimatePresence>
                  {hoveredWork === work._id && (
                    <div
                      key="work-card-title"
                      className="flex w-full justify-center gap-1 px-4 text-center"
                    >
                      <motion.h2
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="rounded bg-white/50 px-2 text-sm uppercase backdrop-blur-xl"
                      >
                        {work?.title?.[language] ||
                          work?.title?.es ||
                          work?.title?.en}
                      </motion.h2>
                    </div>
                  )}
                </AnimatePresence>
              </div>

              {work?.mainImage && (
                <img
                  className={`rounded-xl ${hoveredWork && hoveredWork !== work._id && "grayscale"} transition`}
                  src={urlFor(work.mainImage).format("webp").width(600).url()}
                />
              )}
            </motion.div>
          </NavLink>
        ))}
    </div>
  );
}
