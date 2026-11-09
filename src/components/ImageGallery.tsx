import type {
  DpWorkBySlugQueryResult,
  ColorWorksListQueryResult,
} from "../lib/types";
import { motion } from "motion/react";
import { urlFor } from "../lib/sanityImageUrl";

type DpImage = NonNullable<
  NonNullable<DpWorkBySlugQueryResult>["images"]
>[number];
type ColorImage = NonNullable<
  NonNullable<ColorWorksListQueryResult>[number]["images"]
>[number];

type GalleryImage = DpImage | ColorImage;

interface ImageGalleryProps {
  images: GalleryImage[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  return (
    <>
      {/* Primera imagen a todo el ancho; el resto en 2 columnas (en pantallas medianas o más).
          Si sobra una al final, también va a todo el ancho para no dejar huecos. */}
      <div className="grid w-full grid-cols-1 gap-4 pt-4 transition-all duration-300 md:grid-cols-2 md:gap-6">
        {images.map((image, index) => {
          const isFirst = index === 0;
          const isLoneLast =
            index === images.length - 1 && (images.length - 1) % 2 === 1;
          const fullWidth = isFirst || isLoneLast;
          return (
            <motion.div
              key={image._key}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className={`relative w-full overflow-hidden rounded-2xl ${fullWidth ? "md:col-span-2" : ""}`}
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
