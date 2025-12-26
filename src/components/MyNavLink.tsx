import { NavLink } from "react-router";
import type { NavLinkProps } from "react-router";
import type { ReactNode } from "react";
import Button from "./Button";

type MyNavLinkProps = {
  to: NavLinkProps["to"];
  children: ReactNode;
};

export default function MyNavLink({ to, children }: MyNavLinkProps) {
  return (
    <NavLink to={to} className="relative flex flex-col items-center">
      {({ isActive }) => (
        <>
          <Button>{children}</Button>
          {isActive && (
            <div className="bg-rey absolute -top-2 h-0.75 w-4 rounded-2xl sm:top-auto sm:-bottom-2.5" />
          )}
        </>
      )}
    </NavLink>
  );
}
