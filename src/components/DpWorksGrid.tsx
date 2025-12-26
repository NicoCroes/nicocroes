import { NavLink } from "react-router";
import { urlFor } from "../lib/sanityImageUrl";
import useLanguage from "../hooks/useLanguage";
import type { DpWorksListQueryResult } from "../lib/types";

interface DpWorksGidType {
  data: DpWorksListQueryResult;
}

export default function DpWorksGrid({ data }: DpWorksGidType) {
  const { language } = useLanguage();

  return (
    <div className="grid grid-cols-1 gap-4 sm:w-3/4 sm:grid-cols-3">
      {data?.length &&
        data.map((work) => (
          <NavLink to={`/dp/${work.slug?.current}`} key={work._id}>
            <div>
              {work?.title?.[language] || work?.title?.es || work?.title?.en}
              {work?.mainImage && (
                <img
                  src={urlFor(work.mainImage).format("webp").width(600).url()}
                />
              )}
            </div>
          </NavLink>
        ))}
    </div>
  );
}
