import useIsMobile from "../hooks/useIsMobile";
import ContactLinks from "./ContactLinks";

export default function Footer() {
  const mobile = useIsMobile();

  // En móvil el menú ocupa la parte inferior; ahí el contacto vive en la Bio.
  if (mobile) return null;
  return (
    <footer className="pointer-events-none fixed bottom-2 z-10 flex w-full justify-end px-2 text-base">
      <ContactLinks className="pointer-events-auto justify-end" />
    </footer>
  );
}
