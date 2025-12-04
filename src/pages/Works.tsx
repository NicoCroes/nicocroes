import { useDpWorksList } from "../hooks/useData";
import type { DpWorksListQueryResult } from "../lib/types";
import useLanguage from "../hooks/useLanguage";
import { NavLink } from "react-router";
import VideoHeader from "../components/VideoHeader";

type Work = DpWorksListQueryResult[number];

export default function Works() {
  const { data, isLoading, error } = useDpWorksList();
  const { language } = useLanguage();

  if (isLoading) return <div>...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      <VideoHeader />
      <h1 className="py-4">{language == "es" ? "Trabajos" : "Works"}</h1>
      <div className="flex flex-col">
        {data?.length &&
          data.map((work: Work) => (
            <NavLink to={`/dp/${work.slug?.current}`} key={work._id}>
              {work?.title?.[language] || work?.title?.es || work?.title?.en}
            </NavLink>
          ))}
      </div>
    </>
  );
}
