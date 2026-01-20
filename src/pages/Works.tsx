import { useDpWorksList } from "../hooks/useData";
import VideoHeader from "../components/VideoHeader";
import WorksGrid from "../components/WorksGrid";
import SectionContainer from "../components/SectionContainer";

export default function Works() {
  const { data, isLoading, error } = useDpWorksList();

  if (isLoading) return <div>...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <SectionContainer>
      <div className="flex w-full flex-col items-center gap-16 pt-2">
        <VideoHeader />
        {data?.length && <WorksGrid data={data} />}
      </div>
    </SectionContainer>
  );
}
