import { useGeneralData } from "../hooks/useData";
import { PortableText } from "@portabletext/react";
import useLanguage from "../hooks/useLanguage";
import { urlFor } from "../lib/sanityImageUrl";

export default function Bio() {
  const { data, isLoading, error } = useGeneralData();
  const { language } = useLanguage();

  if (isLoading) return <div>...</div>;
  if (error) return <div>{error.message}</div>;

  const bio = data?.bio?.[language] ?? data?.bio?.es ?? data?.bio?.en ?? null;

  console.log(data);
  return (
    <>
      <h1 className="my-4">Bio</h1>
      <div className="max-w-prose">{bio && <PortableText value={bio} />}</div>

      {data?.profileImage && (
        <img src={urlFor(data.profileImage).format("webp").width(300).url()} />
      )}
      <ul>
        {data?.links?.length &&
          data.links.map((link) => (
            <li key={link._key}>
              <a href={link.url} target="_blank">
                {link.title}
              </a>
            </li>
          ))}
      </ul>
    </>
  );
}
