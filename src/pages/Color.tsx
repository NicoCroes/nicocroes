import { useColorWorksList } from "../hooks/useData";
import useLanguage from "../hooks/useLanguage";
import { useGeneralData } from "../hooks/useData";
import WorksGrid from "../components/WorksGrid";
import { motion } from "motion/react";
import SectionContainer from "../components/SectionContainer";

export default function Works() {
  const {
    data: generalData,
    isLoading: isGeneralDataLoading,
    error: generalDataError,
  } = useGeneralData();
  const { data, isLoading, error } = useColorWorksList();
  const { language } = useLanguage();

  if (isLoading || isGeneralDataLoading) return <div>...</div>;
  if (error || generalDataError)
    return <div>{error?.message || generalDataError?.message}</div>;

  const title =
    generalData?.colorTitle?.[language] ||
    generalData?.colorTitle?.es ||
    generalData?.colorTitle?.en ||
    null;

  return (
    <SectionContainer>
      <div className="mb-12 flex w-full items-center justify-center sm:justify-start">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="bg-linear-to-r from-teal-500 via-orange-500 to-yellow-500 bg-clip-text px-4 text-5xl font-thin text-transparent uppercase sm:text-6xl"
        >
          {title}
        </motion.h1>
      </div>
      {data?.length && <WorksGrid data={data} />}
    </SectionContainer>
  );
}
