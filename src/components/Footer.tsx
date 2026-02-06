import Time from "./Time";
import useIsMobile from "../hooks/useIsMobile";

export default function Footer() {
  const mobile = useIsMobile();

  if (mobile) return null;
  return (
    <footer className="fixed bottom-2 flex w-full justify-end px-2">
      <Time />
    </footer>
  );
}
