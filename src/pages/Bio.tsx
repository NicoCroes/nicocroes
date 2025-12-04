import { useGeneralData } from "../hooks/useData";
import { PortableText } from "@portabletext/react";
import useLanguage from "../hooks/useLanguage";

export default function Bio() {
  const { data, isLoading, error } = useGeneralData();
  const { language } = useLanguage();

  if (isLoading) return <div>...</div>;
  if (error) return <div>{error.message}</div>;

  const bio = data?.bio?.[language] ?? data?.bio?.es ?? data?.bio?.en ?? null;

  return (
    <>
      <h1 className="my-4">Bio</h1>
      <div className="max-w-prose">{bio && <PortableText value={bio} />}</div>
    </>
  );
}
