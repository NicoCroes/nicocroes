import { NavLink } from "react-router";
import { urlFor } from "../lib/sanityImageUrl";
import useLanguage from "../hooks/useLanguage";
import type {
  DpWorksListQueryResult,
  ColorWorksListQueryResult,
} from "../lib/types";
import { motion } from "motion/react";

interface WorksGidType {
  data: DpWorksListQueryResult | ColorWorksListQueryResult;
}

// Cuadrícula de 2 columnas con miniaturas panorámicas.
// Las imágenes se recortan al centro (object-cover), así nunca se ven barras negras
// aunque la portada original sea 4:3 o tenga franjas.
export default function DpWorksGrid({ data }: WorksGidType) {
  const { language } = useLanguage();
  const route = "dp";

  return (
    <div className="mb-24 grid w-full grid-cols-1 gap-3 sm:mb-32 sm:px-2 md:grid-cols-2 md:gap-4">
      {data?.length &&
        data.map((work) => {
          const title =
            work?.title?.[language] || work?.title?.es || work?.title?.en;
          const client = "client" in work ? work.client : null;
          return (
            <NavLink to={`/${route}/${work.slug?.current}`} key={work._id}>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="group relative aspect-[2.4/1] w-full overflow-hidden rounded-lg bg-black"
              >
                {work?.mainImage && (
                  <img
                    className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                    src={urlFor(work.mainImage)
                      .format("webp")
                      .width(1400)
                      .url()}
                    alt={title || ""}
                    loading="lazy"
                  />
                )}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-black/55 px-4 text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <h2 className="text-base tracking-wide text-white uppercase sm:text-lg">
                    {title}
                  </h2>
                  {client && (
                    <p className="text-xs tracking-widest text-white/70 uppercase">
                      {client}
                    </p>
                  )}
                </div>
              </motion.div>
            </NavLink>
          );
        })}
    </div>
  );
}
