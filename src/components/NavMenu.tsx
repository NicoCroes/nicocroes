import useLanguage from "../hooks/useLanguage";
import MyNavLink from "./MyNavLink";

export default function NavMenu() {
  const { language } = useLanguage();

  return (
    <div className="pointer-events-none fixed bottom-0 z-10 flex w-full justify-center pb-4 md:top-2 md:bottom-auto md:bg-none">
      <ul className="pointer-events-auto grid grid-cols-3 gap-4 text-base sm:text-xl">
        <li>
          <MyNavLink to="/">
            {language === "es" ? "Trabajos" : "Works"}
          </MyNavLink>
        </li>
        <li>
          <MyNavLink to="/color">Color</MyNavLink>
        </li>
        <li>
          <MyNavLink to="/bio">Bio</MyNavLink>
        </li>
      </ul>
    </div>
  );
}
