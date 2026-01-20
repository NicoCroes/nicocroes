import { NavLink } from "react-router";
import type { NavLinkProps } from "react-router";
import type { ReactNode } from "react";
import Button from "./Button";
import { motion, AnimatePresence } from "motion/react";

type MyNavLinkProps = {
  to: NavLinkProps["to"];
  children: ReactNode;
};

export default function MyNavLink({ to, children }: MyNavLinkProps) {
  return (
    <NavLink to={to} className="relative flex flex-col items-center">
      {({ isActive }) => (
        <>
          <Button border={true}>{children}</Button>

          <AnimatePresence>
            {isActive && (
              <motion.div
                layout
                key="active-indicator"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                exit={{ scaleX: 0 }}
                className="bg-rey absolute -top-2 h-0.75 w-4 origin-center rounded-2xl sm:top-auto sm:-bottom-2.5"
              />
            )}
          </AnimatePresence>
        </>
      )}
    </NavLink>
  );
}
