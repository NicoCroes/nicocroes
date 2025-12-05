import { useDpWorksList } from "../hooks/useData";
import useLanguage from "../hooks/useLanguage";
import VideoHeader from "../components/VideoHeader";
import DpWorksGrid from "../components/DpWorksGrid";

export default function Works() {
  const { data, isLoading, error } = useDpWorksList();
  const { language } = useLanguage();

  if (isLoading) return <div>...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      <VideoHeader />
      <h1 className="py-4">{language == "es" ? "Trabajos" : "Works"}</h1>
      {data?.length && <DpWorksGrid data={data} />}
    </>
  );
}
