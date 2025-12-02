import { NavLink } from "react-router";
import useLanguage from "../hooks/useLanguage";

export default function NavMenu() {
  const { language } = useLanguage();
  return (
    <>
      <ul className="flex gap-2">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "underline" : "")}
          >
            {language === "es" ? "Trabajos" : "Works"}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/color"
            className={({ isActive }) => (isActive ? "underline" : "")}
          >
            Color
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/bio"
            className={({ isActive }) => (isActive ? "underline" : "")}
          >
            Bio
          </NavLink>
        </li>
      </ul>
    </>
  );
}
