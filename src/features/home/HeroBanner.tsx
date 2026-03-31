"use client";

import Fade from "embla-carousel-fade";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";

type SlideType = {
  id: number;
  title: string;
  description: string;
  image: string;
};

const slides: SlideType[] = [
  {
    id: 1,
    title: "Learn Chinese Faster",
    description: "Build your foundation with real conversation",
    image: "https://picsum.photos/1920/1080?1",
  },
  {
    id: 2,
    title: "Speak With Confidence",
    description: "Practice with structured lessons",
    image: "https://picsum.photos/1920/1080?2",
  },
  {
    id: 3,
    title: "Master HSK Easily",
    description: "From beginner to advanced",
    image: "https://picsum.photos/1920/1080?3",
  },
];

export default function HeroBanner() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Fade()]);

  const [index, setIndex] = useState(0);

  // sync current slide
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi]);

  // autoplay
  useEffect(() => {
    if (!emblaApi) return;

    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <div
      className="relative h-[80vh] w-full overflow-hidden select-none"
      ref={emblaRef}
    >
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          className={`
            absolute inset-0 transition-opacity duration-1000
            ${i === index ? "opacity-100 z-10" : "opacity-0 z-0"}
          `}
        >
          {/* Background */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50" />

          {/* Content */}
          <div className="relative z-20 flex h-full items-center px-10 md:px-20">
            <div className="max-w-xl text-white">
              <h1
                className={`
                  text-4xl md:text-6xl font-bold leading-tight
                  transition-all duration-700
                  ${
                    i === index
                      ? "translate-y-0 opacity-100"
                      : "translate-y-6 opacity-0"
                  }
                `}
              >
                {slide.title}
              </h1>

              <p
                className={`
                  mt-4 text-lg md:text-xl text-gray-200
                  transition-all duration-700 delay-150
                  ${
                    i === index
                      ? "translate-y-0 opacity-100"
                      : "translate-y-6 opacity-0"
                  }
                `}
              >
                {slide.description}
              </p>

              <button
                className={`
                  mt-6 rounded-lg bg-white px-6 py-3 font-semibold text-black
                  transition-all duration-700 delay-300 hover:bg-gray-200
                  ${
                    i === index
                      ? "translate-y-0 opacity-100"
                      : "translate-y-6 opacity-0"
                  }
                `}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* DOTS */}
      <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`
              h-3 w-3 rounded-full transition-all
              ${i === index ? "bg-white scale-125" : "bg-white/50"}
            `}
          />
        ))}
      </div>
    </div>
  );
}
