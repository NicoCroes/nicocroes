import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { urlFor } from "../lib/sanityImageUrl";
import type {
  DpWorkBySlugQueryResult,
  ColorWorksListQueryResult,
} from "../lib/types";

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

export default function Carousel({ images }: ImageGalleryProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateArrows = () => {
    const track = trackRef.current;
    if (!track) return;

    const { scrollLeft, scrollWidth, clientWidth } = track;

    setCanScrollPrev(scrollLeft > 0);
    setCanScrollNext(scrollLeft + clientWidth < scrollWidth - 2);
  };

  const scrollBySlide = (dir: number) => {
    const track = trackRef.current;
    if (!track) return;

    const slide = track.querySelector<HTMLElement>("[data-slide]");
    if (!slide) return;

    const slideWidth = slide.offsetWidth;
    track.scrollBy({ left: dir * slideWidth, behavior: "smooth" });
  };

  useEffect(() => {
    updateArrows();

    const track = trackRef.current;
    if (!track) return;

    track.addEventListener("scroll", updateArrows);
    window.addEventListener("resize", updateArrows);

    return () => {
      track.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [images]);

  return (
    <div className="relative w-full">
      {canScrollPrev && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => scrollBySlide(-1)}
          className="text-rey absolute -bottom-10 left-2 z-5 cursor-pointer rounded backdrop-blur sm:top-1/2 sm:bottom-auto sm:-left-12 sm:-translate-y-1/2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-arrow-left-icon lucide-arrow-left"
          >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
        </motion.button>
      )}

      {canScrollNext && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => scrollBySlide(1)}
          className="text-rey absolute right-2 -bottom-10 z-5 cursor-pointer rounded backdrop-blur sm:top-1/2 sm:-right-12 sm:bottom-auto sm:-translate-y-1/2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-arrow-right-icon lucide-arrow-right"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </motion.button>
      )}

      <div
        ref={trackRef}
        className="no-scrollbar flex touch-pan-x snap-x snap-mandatory items-center gap-4 overflow-x-auto overscroll-x-contain scroll-smooth rounded-2xl bg-black"
      >
        {images.map((image, i) => (
          <div
            key={i}
            data-slide
            className="min-w-full shrink-0 snap-center overflow-hidden"
          >
            <motion.div
              key={image._key}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="relative w-full break-inside-avoid overflow-hidden"
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
          </div>
        ))}
      </div>
    </div>
  );
}
