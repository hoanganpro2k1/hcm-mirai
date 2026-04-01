"use client";

import Fade from "embla-carousel-fade";
import Image from "next/image";
import { useEffect, useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { IMAGES } from "@/constants/images";
import { cn } from "@/lib/utils";

type SlideType = {
  id: number;
  image: string;
};

const slides: SlideType[] = [
  {
    id: 1,
    image: IMAGES.HOME.HERO.slide1,
  },
  {
    id: 2,
    image: IMAGES.HOME.HERO.slide2,
  },
  {
    id: 3,
    image: IMAGES.HOME.HERO.slide3,
  },
];

export default function HeroBanner() {
  const [api, setApi] = useState<CarouselApi>();
  const [index, setIndex] = useState(0);

  // sync current slide
  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setIndex(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    onSelect();
  }, [api]);

  // autoplay
  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <Carousel
      opts={{ loop: true }}
      plugins={[Fade()]}
      setApi={setApi}
      className={cn(
        "relative h-[70vh] w-full overflow-hidden select-none",
        "**:data-[slot=carousel-content]:h-full",
      )}
    >
      <CarouselContent className="h-full ml-0">
        {slides.map((slide, i) => (
          <CarouselItem key={slide.id} className="relative h-full pl-0">
            {/* Background Image */}
            <Image
              src={slide.image}
              alt={`Slide ${i + 1}`}
              fill
              quality={100}
              sizes="100vw"
              className={cn(
                "object-cover h-full w-full transition-opacity duration-1000",
                i === index ? "opacity-100" : "opacity-0",
              )}
              priority={i === 0}
            />
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* DOTS */}
      <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => api?.scrollTo(i)}
            className={`
              h-3 w-3 rounded-full transition-all duration-300
              ${
                i === index
                  ? "bg-primary scale-125"
                  : "bg-white/50 hover:bg-white/80"
              }
            `}
          />
        ))}
      </div>
    </Carousel>
  );
}
