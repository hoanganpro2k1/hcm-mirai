"use client";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { SectionHeader } from "@/components/ui/section-header";
import { IMAGES } from "@/constants/images";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";

const testimonialData = [
  {
    id: 1,
    image: IMAGES.HOME.TESTIMONIALS.testimonial1,
    rating: 5,
    key: "t1",
  },
  {
    id: 2,
    image: IMAGES.HOME.TESTIMONIALS.testimonial2,
    rating: 5,
    key: "t2",
  },
  {
    id: 3,
    image: IMAGES.HOME.TESTIMONIALS.testimonial3,
    rating: 5,
    key: "t3",
  },
];

export default function TestimonialsSection() {
  const t = useTranslations("HomeTestimonials");
  const [api, setApi] = useState<CarouselApi>();

  return (
    <section className="py-12 md:py-20 bg-white dark:bg-gray-950 transition-colors relative overflow-hidden">
      {/* Decorative Ornaments */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl z-0" />
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl z-0" />

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeader title={t("title")} subtitle={t("subtitle")} />

        <Carousel
          setApi={setApi}
          opts={{ loop: true }}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent>
            {testimonialData.map((testimonial) => (
              <CarouselItem key={testimonial.id}>
                <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20 py-8 px-4">
                  {/* Student Image */}
                  <div className="w-full md:w-1/2 lg:w-[45%] relative">
                    <div className="aspect-3/4 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800 z-10 relative">
                      <Image
                        src={testimonial.image}
                        alt={t(`testimonials.${testimonial.key}.name`)}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                    {/* Design Elements */}
                    <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary rounded-3xl -z-10 rotate-12" />
                    <div className="absolute -top-6 -left-6 w-24 h-24 bg-accent rounded-full -z-10" />
                  </div>

                  {/* Testimonial Content */}
                  <div className="w-full md:w-1/2 flex flex-col space-y-6">
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-accent text-accent"
                        />
                      ))}
                    </div>

                    <div className="relative">
                      <Quote className="w-16 h-16 text-primary/10 absolute -top-8 -left-8" />
                      <p className="text-xl md:text-2xl font-medium text-gray-800 dark:text-gray-200 leading-relaxed italic relative z-10">
                        &ldquo;{t(`testimonials.${testimonial.key}.feedback`)}
                        &rdquo;
                      </p>
                    </div>

                    <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
                      <h3 className="text-2xl font-bold text-primary dark:text-blue-400">
                        {t(`testimonials.${testimonial.key}.name`)}
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-widest text-sm mt-1">
                        {t(`testimonials.${testimonial.key}.role`)}
                      </p>
                    </div>

                    {/* Slider Controls */}
                    <div className="flex gap-4 mt-8">
                      <Button
                        variant="outline"
                        onClick={() => api?.scrollPrev()}
                        className="w-12 h-12 rounded-full border-2 border-gray-200 dark:border-gray-800 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all group"
                        aria-label="Previous testimonial"
                      >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => api?.scrollNext()}
                        className="w-12 h-12 rounded-full border-2 border-gray-200 dark:border-gray-800 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all group"
                        aria-label="Next testimonial"
                      >
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
