import { useGeneralData } from "../hooks/useData";
import { PortableText } from "@portabletext/react";
import useLanguage from "../hooks/useLanguage";
import { useBlockContentComponents } from "../components/BlockContent";
import { urlFor } from "../lib/sanityImageUrl";
import LinkButton from "../components/LinkButton";
import SectionContainer from "../components/SectionContainer";
import { motion } from "motion/react"

export default function Bio() {
  const { data, isLoading, error } = useGeneralData();
  const { language } = useLanguage();
  const components = useBlockContentComponents();

  if (isLoading) return <div>...</div>;
  if (error) return <div>{error.message}</div>;

  const bio = data?.bio?.[language] ?? data?.bio?.es ?? data?.bio?.en ?? null;

  return (
    <SectionContainer>
      <div className="flex grow flex-col items-center justify-center gap-8 pb-18 md:flex-row">
        {data?.profileImage && (
          <div className="w-100 bg-rey rounded-2xl h-150">
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-auto w-100 rounded-2xl"
              src={urlFor(data.profileImage).format("webp").width(400).height(600).url()}
            />
          </div>
        )}
        <div className="">
          <p className="max-w-prose text-lg">
            {bio && <PortableText value={bio} components={components} />}
          </p>

          {data?.links?.length && (
            <ul className="flex w-full justify-start gap-2 text-lg">
              {data.links.map((link) => (
                <li key={link._key}>
                  {link.url && (
                    <LinkButton url={link.url} text={link.title || link.url} />
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </SectionContainer>
  );
}
