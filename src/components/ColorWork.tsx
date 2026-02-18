import { useColorWork } from "../hooks/useData";
import useLanguage from "../hooks/useLanguage";
import { PortableText } from "@portabletext/react";
import VimeoEmbedPlayer from "../components/VimeoEmbedPlayer";
import { urlFor } from "../lib/sanityImageUrl";
import Carousel from "./Carousel";
import Loading from "../components/Loading";
import Image from "../components/Image";

export default function ColorWork({ slug }: { slug: string }) {
  const { data, isLoading, error } = useColorWork(slug!);
  const { language } = useLanguage();

  if (isLoading) return <Loading />;
  if (error) return <div>{error.message}</div>;

  const additionaInfo =
    data?.additionalInfo?.[language] ??
    data?.additionalInfo?.es ??
    data?.additionalInfo?.en ??
    null;

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <h1 className="self-start text-3xl sm:text-5xl">
        {data?.title?.[language] || data?.title?.es || data?.title?.en}
      </h1>
      {additionaInfo && <PortableText value={additionaInfo} />}
      <div className="w-full">
        {data?.vimeoEmbed ? (
          <VimeoEmbedPlayer
            embedCode={data.vimeoEmbed}
            muted={0}
            autoplay={0}
            controls={1}
            loop={0}
            previewImage={
              data.mainImage &&
              urlFor(data.mainImage).format("webp").width(800).url()
            }
            uiColor="0c2e62"
          />
        ) : (
          data?.mainImage && (
            <Image
              imageData={data.mainImage}
              width={1000}
              aspectRatio="1.777"
            />
          )
        )}
      </div>
      {data?.images?.length && (
        <div className="mt-4 w-full columns-1 rounded-2xl transition-all duration-300 sm:w-3/4">
          <Carousel images={data?.images ?? data.images} />
        </div>
      )}
    </div>
  );
}
