import type {
  DpWorkBySlugQueryResult,
  ColorWorkBySlugQueryResult,
} from "../lib/types";
import { motion } from "motion/react";
import { urlFor } from "../lib/sanityImageUrl";

type DpImage = NonNullable<
  NonNullable<DpWorkBySlugQueryResult>["images"]
>[number];
type ColorImage = NonNullable<
  NonNullable<ColorWorkBySlugQueryResult>["images"]
>[number];

type GalleryImage = DpImage | ColorImage;

interface ImageGalleryProps {
  images: GalleryImage[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  return (
    <>
      <div className="w-full columns-1 gap-4 pt-4 transition-all duration-300">
        {images.map((image) => {
          return (
            <motion.div
              key={image._key}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="relative mb-8 w-full break-inside-avoid overflow-hidden rounded-2xl"
              style={{
                aspectRatio: image.dimensions?.aspectRatio,
              }}
            >
              <img
                src={urlFor(image).format("webp").height(50).blur(50).url()}
                className="absolute inset-0 h-full w-full scale-110 object-cover"
                alt=""
              />

              <img
                src={urlFor(image).format("webp").url()}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300"
                onLoad={(e) => {
                  e.currentTarget.classList.remove("opacity-0");
                  e.currentTarget.classList.add("opacity-100");
                }}
              />
            </motion.div>
          );
        })}
      </div>
    </>
  );
}
