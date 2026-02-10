import type { PortableTextComponents } from "@portabletext/react";

export const PortableTextComponent: PortableTextComponents = {
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ value, children }) => {
      const target = (value?.href || "").startsWith("http")
        ? "_blank"
        : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === "_blank" ? "noindex nofollow" : ""}
          className="hover:bg-silver-light cursor-pointer underline transition-colors"
        >
          {children}
        </a>
      );
    },
  },
};
