import Time from "./Time";
import useIsMobile from "../hooks/useIsMobile";

export default function Footer() {
  const mobile = useIsMobile();

  if (mobile) return null;
  return (
    <footer className="border-rey/20 _mt-6 _mb-2 fixed bottom-2 flex w-full justify-end px-4 text-xl">
      <Time />
    </footer>
  );
}
