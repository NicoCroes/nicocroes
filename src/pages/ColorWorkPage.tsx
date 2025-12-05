import { NavLink, useParams } from "react-router";
import { useColorWork } from "../hooks/useData";
import useLanguage from "../hooks/useLanguage";
import { PortableText } from "@portabletext/react";
import VimeoEmbedPlayer from "../components/VimeoEmbedPlayer";
import { urlFor } from "../lib/sanityImageUrl";
import ImageGallery from "../components/ImageGallery";

export default function ColorWorkPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: work, isLoading, error } = useColorWork(slug!);
  const { language } = useLanguage();

  if (isLoading) return <div>...</div>;
  if (error) return <div>{error.message}</div>;

  const additionaInfo =
    work?.additionalInfo?.[language] ??
    work?.additionalInfo?.es ??
    work?.additionalInfo?.en ??
    null;

  return (
    <>
      <h1>{work?.title?.[language] || work?.title?.es || work?.title?.en}</h1>
      {additionaInfo && <PortableText value={additionaInfo} />}
      {work?.vimeoEmbed && (
        <div className="w-1/2">
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
      {work?.images?.length && (
        <ImageGallery images={work?.images ?? work.images} />
      )}
      <NavLink to="/color">{language === "es" ? "volver" : "go back"}</NavLink>
    </>
  );
}
