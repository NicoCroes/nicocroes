import { NavLink, useParams } from "react-router";
import { useDpWork } from "../hooks/useData";
import { useDpWorksList } from "../hooks/useData";
import useLanguage from "../hooks/useLanguage";
import { PortableText } from "@portabletext/react";
import VimeoEmbedPlayer from "../components/VimeoEmbedPlayer";
import { urlFor } from "../lib/sanityImageUrl";
import ImageGallery from "../components/ImageGallery";
import SectionContainer from "../components/SectionContainer";
import { PortableTextComponent } from "../components/PortableTextComponent";
import Loading from "../components/Loading";

export default function DpWorkPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: work, isLoading, error } = useDpWork(slug!);
  const {
    data: worksList,
    isLoading: isWorksListLoading,
    error: worksListError,
  } = useDpWorksList();
  const { language } = useLanguage();

  if (isLoading || isWorksListLoading) return <Loading />;
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
      <div className="flex h-full w-full grow flex-col items-start">
        <h1 className="text-3xl sm:text-5xl">
          {work?.title?.[language] || work?.title?.es || work?.title?.en}
        </h1>
        <div className="flex flex-col text-base sm:flex-row sm:flex-wrap sm:gap-2 sm:text-xl">
          {work?.director && (
            <h2 className="flex items-center gap-3">{work.director}</h2>
          )}
          {work?.production && (
            <h2 className="flex items-center gap-3">
              <div className="bg-rey hidden h-1 w-1 origin-center rounded-2xl sm:block" />
              {work?.production}
            </h2>
          )}
          {work?.client && (
            <h2 className="flex items-center gap-3">
              <div className="bg-rey hidden h-1 w-1 origin-center rounded-2xl sm:block" />
              {work?.client}
            </h2>
          )}
        </div>
        {additionaInfo && (
          <p className="mt-4 text-base">
            {/* TODO: armar componente para estilizar link */}
            <PortableText
              value={additionaInfo}
              components={PortableTextComponent}
            />
          </p>
        )}
        <div className="my-6 mb-16 w-full gap-4">
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

        <div className="mt-auto mb-24 grid w-full grid-cols-1 text-base uppercase sm:mb-2 sm:grid-cols-3 sm:text-xl">
          <div className="flex w-full grid-cols-3 place-items-center justify-between gap-12 px-2 text-center sm:col-start-2 sm:mb-0 sm:grid">
            {nextWork && (
              <NavLink to={`/dp/${prevWork?.slug?.current}`}>
                {language === "es" ? "anterior" : "previous"}
              </NavLink>
            )}
            <NavLink to="/" className="hidden sm:block">
              index
            </NavLink>

            {nextWork && (
              <NavLink to={`/dp/${nextWork?.slug?.current}`}>
                {language === "es" ? "siguiente" : "next"}
              </NavLink>
            )}
          </div>
        </div>

        <div className="fixed right-2 bottom-2 hidden justify-self-end rounded bg-white/40 px-2 backdrop-blur-xl sm:block">
          {currentIndex + 1}/{worksList?.length}
        </div>
      </div>
    </SectionContainer>
  );
}
