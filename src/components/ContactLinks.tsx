import { CONTACT } from "../lib/contact";

type ContactLinksProps = {
  className?: string;
};

export default function ContactLinks({ className = "" }: ContactLinksProps) {
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {CONTACT.email && (
        <a
          href={`mailto:${CONTACT.email}`}
          className="rounded bg-white/40 px-2 backdrop-blur-xl transition-colors sm:hover:bg-white/70"
        >
          {CONTACT.email}
        </a>
      )}
      <a
        href={CONTACT.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded bg-white/40 px-2 backdrop-blur-xl transition-colors sm:hover:bg-white/70"
      >
        WhatsApp {CONTACT.phoneDisplay}
      </a>
    </div>
  );
}
