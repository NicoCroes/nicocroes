import useLanguage from "../hooks/useLanguage";
import MyNavLink from "./MyNavLink";

export default function NavMenu() {
  const { language } = useLanguage();

  return (
    <div className="pointer-events-none fixed bottom-0 z-10 flex w-full justify-center bg-linear-to-b from-[#C0C0C000] to-white/60 pb-4 sm:top-12 sm:bottom-auto sm:bg-none">
      <ul className="pointer-events-auto flex gap-4 text-xl font-light sm:gap-8">
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
