import { useColorWorksList } from "../hooks/useData";
import useLanguage from "../hooks/useLanguage";
import { useGeneralData } from "../hooks/useData";
import { motion } from "motion/react";
import SectionContainer from "../components/SectionContainer";
import Loading from "../components/Loading";
import ColorWork from "../components/ColorWork";

export default function Works() {
  const {
    data: generalData,
    isLoading: isGeneralDataLoading,
    error: generalDataError,
  } = useGeneralData();
  const { data, isLoading, error } = useColorWorksList();
  const { language } = useLanguage();

  if (isLoading || isGeneralDataLoading) return <Loading />;
  if (error || generalDataError)
    return <div>{error?.message || generalDataError?.message}</div>;

  const title =
    generalData?.colorTitle?.[language] ||
    generalData?.colorTitle?.es ||
    generalData?.colorTitle?.en ||
    null;

  const info =
    generalData?.colorInfo?.[language] ||
    generalData?.colorInfo?.es ||
    generalData?.colorInfo?.en ||
    null;

  return (
    <SectionContainer>
      <div className="mb-12 flex w-full flex-col items-center justify-center gap-4">
        <motion.h1
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-linear-to-r from-teal-500 via-orange-500 to-yellow-500 bg-clip-text px-4 text-5xl font-thin text-transparent uppercase sm:text-6xl"
        >
          {title}
        </motion.h1>
        {info && <p className="max-w-prose">{info}</p>}
      </div>
      {data?.length && (
        <div className="flex flex-col gap-16 pb-16 sm:gap-32">
          {data.map((work) => {
            if (work?.slug?.current)
              return <ColorWork key={work._id} slug={work.slug.current} />;
          })}
        </div>
      )}
    </SectionContainer>
  );
}
