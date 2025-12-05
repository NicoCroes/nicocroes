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
    <div className="flex gap-4 px-4">
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
