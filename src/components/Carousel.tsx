import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { urlFor } from "../lib/sanityImageUrl";
import type {
  DpWorkBySlugQueryResult,
  ColorWorkBySlugQueryResult,
} from "../lib/types";

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
        <button
          onClick={() => scrollBySlide(-1)}
          className="bg-rey/60 absolute top-1/2 left-2 z-5 -translate-y-1/2 cursor-pointer rounded px-4 text-white backdrop-blur sm:-left-12"
        >
          ‹
        </button>
      )}

      {canScrollNext && (
        <button
          onClick={() => scrollBySlide(1)}
          className="bg-rey/60 absolute top-1/2 right-2 z-5 -translate-y-1/2 cursor-pointer rounded px-4 text-white backdrop-blur sm:-right-12"
        >
          ›
        </button>
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
