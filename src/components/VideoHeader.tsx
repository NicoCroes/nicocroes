import { useGeneralData } from "../hooks/useData";
import { urlFor } from "../lib/sanityImageUrl";
import VimeoEmbedPlayer from "./VimeoEmbedPlayer";

export default function VideoHeader() {
  const { data, isLoading, error } = useGeneralData();

  if (isLoading) return <div>...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div className="flex w-full flex-col items-center justify-center sm:w-3/4">
      <div className="w-full">
        {data?.coverVideo && (
          <VimeoEmbedPlayer
            embedCode={data.coverVideo}
            muted={1}
            autoplay={1}
            controls={0}
            loop={1}
            previewImage={
              data.coverThumbnail &&
              urlFor(data.coverThumbnail).format("webp").width(800).url()
            }
            uiColor="0c2e62"
          />
        )}
      </div>
    </div>
  );
}
