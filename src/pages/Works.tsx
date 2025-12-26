import { useDpWorksList } from "../hooks/useData";
import VideoHeader from "../components/VideoHeader";
import DpWorksGrid from "../components/DpWorksGrid";

export default function Works() {
  const { data, isLoading, error } = useDpWorksList();

  if (isLoading) return <div>...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <section className="flex w-full flex-col items-center gap-8">
      <VideoHeader />
      {data?.length && <DpWorksGrid data={data} />}
    </section>
  );
}
