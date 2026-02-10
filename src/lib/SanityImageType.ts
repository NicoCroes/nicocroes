import type { SanityImageCrop, SanityImageHotspot } from "./types";

export type SanityImage = {
  _type?: "image";
  asset?: {
    _ref: string;
    _type: "reference";
  };
  crop?: SanityImageCrop;
  hotspot?: SanityImageHotspot;
  aspectRatio?: number | null;
};
