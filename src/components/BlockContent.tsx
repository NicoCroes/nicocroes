import type { PortableTextComponents } from "@portabletext/react";

export function useBlockContentComponents(): PortableTextComponents {
  return {
    block: {
      normal: ({ children }) => (
        <p className="mb-4 whitespace-pre-line">{children}</p>
      ),
    },
  };
}
