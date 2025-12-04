import { NavLink, useParams } from "react-router";
import { useDpWork } from "../hooks/useData";
import useLanguage from "../hooks/useLanguage";
import { PortableText } from "@portabletext/react";

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
      <NavLink to="/">{language === "es" ? "volver" : "go back"}</NavLink>
    </>
  );
}
