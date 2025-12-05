import { useColorWorksList } from "../hooks/useData";
import useLanguage from "../hooks/useLanguage";
import { useGeneralData } from "../hooks/useData";
import ColorWorksGrid from "../components/ColorWorksGrid";

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
    <>
      <h1 className="py-4">{title}</h1>
      {data?.length && <ColorWorksGrid data={data} />}
    </>
  );
}
