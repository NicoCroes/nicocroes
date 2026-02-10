import { useGeneralData } from "../hooks/useData";
import { PortableText } from "@portabletext/react";
import useLanguage from "../hooks/useLanguage";
import { useBlockContentComponents } from "../components/BlockContent";
import { urlFor } from "../lib/sanityImageUrl";
import LinkButton from "../components/LinkButton";
import SectionContainer from "../components/SectionContainer";
import { motion } from "motion/react";
import Loading from "../components/Loading";

export default function Bio() {
  const { data, isLoading, error } = useGeneralData();
  const { language } = useLanguage();
  const components = useBlockContentComponents();

  if (isLoading) return <Loading />;
  if (error) return <div>{error.message}</div>;

  const bio = data?.bio?.[language] ?? data?.bio?.es ?? data?.bio?.en ?? null;

  return (
    <SectionContainer>
      <div className="flex grow items-center justify-center pb-18">
        <div className="flex flex-col items-center justify-center gap-8 md:flex-row md:items-start">
          {data?.profileImage && (
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-auto w-100 rounded-2xl"
              src={urlFor(data.profileImage)
                .format("webp")
                .width(400)
                .height(600)
                .url()}
            />
          )}
          <div className="">
            <div className="max-w-prose text-lg">
              {bio && <PortableText value={bio} components={components} />}
            </div>

            {data?.links?.length && (
              <ul className="flex w-full justify-center gap-2 text-lg sm:justify-start">
                {data.links.map((link) => (
                  <li key={link._key}>
                    {link.url && (
                      <LinkButton
                        url={link.url}
                        text={link.title || link.url}
                      />
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
