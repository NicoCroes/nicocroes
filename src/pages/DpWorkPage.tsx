import { NavLink, useParams } from "react-router";
import { useDpWork } from "../hooks/useData";
import { useDpWorksList } from "../hooks/useData";
import useLanguage from "../hooks/useLanguage";
import { PortableText } from "@portabletext/react";
import VimeoEmbedPlayer from "../components/VimeoEmbedPlayer";
import { urlFor } from "../lib/sanityImageUrl";
import ImageGallery from "../components/ImageGallery";
import SectionContainer from "../components/SectionContainer";

export default function DpWorkPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: work, isLoading, error } = useDpWork(slug!);
  const {
    data: worksList,
    isLoading: isWorksListLoading,
    error: worksListError,
  } = useDpWorksList();
  const { language } = useLanguage();

  if (isLoading || isWorksListLoading) return <div>...</div>;
  if (error || worksListError)
    return <div>{error?.message || worksListError?.message}</div>;

  const additionaInfo =
    work?.additionalInfo?.[language] ??
    work?.additionalInfo?.es ??
    work?.additionalInfo?.en ??
    null;

  const currentIndex =
    worksList?.findIndex((w) => w.slug?.current === work?.slug?.current) ?? -1;

  const nextWork =
    currentIndex !== -1 && worksList
      ? worksList[(currentIndex + 1) % worksList.length]
      : null;

  const prevWork =
    currentIndex !== -1 && worksList
      ? worksList[(currentIndex - 1 + worksList.length) % worksList.length]
      : null;

  return (
    <SectionContainer>
      <div className="flex w-full flex-col items-start">
        <h1 className="">
          {work?.title?.[language] || work?.title?.es || work?.title?.en}
        </h1>
        <div className="flex gap-2">
          {work?.director && <h2>{work.director}</h2>}
          {work?.production && (
            <h2 className="flex items-baseline gap-2">
              <div className="bg-rey h-px w-4 origin-center rounded-2xl" />
              {work?.production}
            </h2>
          )}
          {work?.client && (
            <h2 className="flex items-baseline gap-2">
              <div className="bg-rey h-px w-4 origin-center rounded-2xl" />
              {work?.client}
            </h2>
          )}
        </div>
        {additionaInfo && (
          <p className="text-lg">
            <PortableText value={additionaInfo} />
          </p>
        )}
        <div className="my-6 grid grid-cols-1 items-center gap-4 sm:grid-cols-2">
          {work?.images?.length && (
            <ImageGallery images={work?.images ?? work.images} />
          )}
          {work?.vimeoEmbed && (
            <div className="w-full">
              <VimeoEmbedPlayer
                embedCode={work.vimeoEmbed}
                muted={0}
                autoplay={0}
                controls={1}
                loop={0}
                previewImage={
                  work.mainImage &&
                  urlFor(work.mainImage).format("webp").width(800).url()
                }
                uiColor="0c2e62"
              />
            </div>
          )}
        </div>
        <div className="bottom-2 z-100 mt-16 mb-24 flex w-full justify-center gap-12 sm:fixed sm:mb-0">
          {nextWork && (
            <NavLink to={`/dp/${prevWork?.slug?.current}`}>
              {language === "es" ? "anterior" : "previous"}
            </NavLink>
          )}
          <NavLink to="/">index</NavLink>

          {nextWork && (
            <NavLink to={`/dp/${nextWork?.slug?.current}`}>
              {language === "es" ? "siguiente" : "next"}
            </NavLink>
          )}
        </div>
      </div>
    </SectionContainer>
  );
}
