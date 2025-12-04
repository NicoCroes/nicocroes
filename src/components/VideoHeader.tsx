import { useGeneralData } from "../hooks/useData";
import { urlFor } from "../lib/sanityImageUrl";

export default function VideoHeader() {
  const { data, isLoading, error } = useGeneralData();

  if (isLoading) return <div>...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div className="flex h-[30vh] w-1/2 flex-col items-center justify-center bg-black/20">
      <p>ヾ(≧▽≦*)o</p>
      <p className="max-w-prose text-xs">{data?.coverVideo}</p>
      {data?.coverThumbnail && (
        <img
          src={urlFor(data.coverThumbnail).format("webp").width(100).url()}
        />
      )}
    </div>
  );
}
