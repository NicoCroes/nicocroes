import { NavLink, useParams } from "react-router";
import { useDpWork } from "../hooks/useData";
import useLanguage from "../hooks/useLanguage";
import { PortableText } from "@portabletext/react";
import VimeoEmbedPlayer from "../components/VimeoEmbedPlayer";
import { urlFor } from "../lib/sanityImageUrl";

export default function DpWorkPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: work, isLoading, error } = useDpWork(slug!);
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
      <NavLink to="/">{language === "es" ? "volver" : "go back"}</NavLink>
    </>
  );
}
