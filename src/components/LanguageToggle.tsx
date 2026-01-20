import useLanguage from "../hooks/useLanguage";
import Button from "./Button";

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <Button
      handleClick={() => setLanguage(language === "es" ? "en" : "es")}
      border={false}
    >
      {language === "es" ? "en" : "es"}
    </Button>
  );
}
