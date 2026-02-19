import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motion } from "motion/react";
import { urlFor } from "../lib/sanityImageUrl";
import type { ColorWorksListQueryResult } from "@/lib/types";

type ColorImage = NonNullable<
  NonNullable<ColorWorksListQueryResult>[number]["images"]
>[number];

export default function ImageSlider({ images }: { images: ColorImage[] }) {
  return (
    <Carousel className="_max-w-3/4 w-full">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index} className="flex items-center">
            <motion.div
              key={image._key}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="relative w-full break-inside-avoid overflow-hidden rounded-2xl"
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
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
