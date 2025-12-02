import { useGeneralData } from "../hooks/useData";
import { PortableText } from "@portabletext/react";
import useLanguage from "../hooks/useLanguage";

export default function Bio() {
  const { data, isLoading, error } = useGeneralData();
  const { language } = useLanguage();

  if (isLoading) return <div>...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      <h1 className="my-4">Bio</h1>
      <div className="max-w-prose">
        {data?.bio?.es && (
          <PortableText value={data.bio[language] || data.bio.es} />
        )}
      </div>
    </>
  );
}
