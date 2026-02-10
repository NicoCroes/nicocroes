import { useDpWorksList } from "../hooks/useData";
import VideoHeader from "../components/VideoHeader";
import WorksGrid from "../components/WorksGrid";
import SectionContainer from "../components/SectionContainer";
import Loading from "../components/Loading";

export default function Works() {
  const { data, isLoading, error } = useDpWorksList();

  if (isLoading) return <Loading />;
  if (error) return <div>{error.message}</div>;

  return (
    <SectionContainer>
      <div className="flex w-full flex-col items-center gap-8 pt-2 sm:gap-16">
        <VideoHeader />
        <div className="bg-rey h-0.75 w-4 origin-center rounded-2xl" />
        {data?.length && <WorksGrid data={data} route="dp" />}
      </div>
    </SectionContainer>
  );
}
