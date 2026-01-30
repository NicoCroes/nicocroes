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
      className={`${data?.length < 3 ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-2 sm:grid-cols-4"} grid gap-4 items-center`}
    >
      {data?.length &&
        data.map((work) => (
          <NavLink to={`/dp/${work.slug?.current}`} key={work._id}>
            <div className="relative">
              <div
                onMouseEnter={() => setHoveredWork(work._id)}
                onMouseLeave={() => setHoveredWork(null)}
                className="_justify-start pointer-events-auto absolute flex h-full w-full items-center"
              >
                <AnimatePresence>
                  {hoveredWork === work._id && (
                    <div key="work-card-title" className="flex gap-1">
                      <motion.h2
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="rounded-r-xs bg-white/80 px-2 text-sm uppercase"
                      >
                        {work?.title?.[language] ||
                          work?.title?.es ||
                          work?.title?.en}
                      </motion.h2>
                      <motion.div
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        exit={{ scaleY: 0 }}
                        className="bg-rey/80 mx-1 h-5 w-0.5 rounded-xs"
                      />
                    </div>
                  )}
                </AnimatePresence>
              </div>

              {work?.mainImage && (
                <img
                  className={`rounded-2xl ${hoveredWork && hoveredWork !== work._id && "grayscale"} transition`}
                  src={urlFor(work.mainImage).format("webp").width(600).url()}
                />
              )}
            </div>
          </NavLink>
        ))}
    </div>
  );
}
