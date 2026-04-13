"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { SectionHeader } from "@/components/ui/section-header";
import { IMAGES } from "@/constants/images";
import { cn } from "@/lib/utils";
import { Quote, Trophy } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

const studentIds = ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"];

export default function ProgramSection() {
  const t = useTranslations("HomePrograms");

  return (
    <section className="py-12 md:py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 border-y border-gray-100 dark:border-gray-800 transition-colors overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <SectionHeader
            title={t("title")}
            subtitle={t("subtitle")}
            align="center"
          />
        </div>

        <div className="relative px-0 md:px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 md:-ml-6">
              {studentIds.map((id, idx) => (
                <CarouselItem
                  key={id}
                  className="pl-4 md:pl-6 md:pb-8 md:basis-1/2 lg:basis-1/3 xl:basis-1/3"
                >
                  <div className="group relative bg-white dark:bg-gray-800 rounded-2xl md:rounded-2xl md:rounded-[2.5rem] p-4 h-full border border-gray-100 dark:border-gray-700 shadow-xl shadow-gray-200/50 dark:shadow-none hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2">
                    {/* Image Container */}
                    <div className="relative aspect-video rounded-xl md:rounded-[2rem] overflow-hidden mb-6">
                      <Image
                        src={
                          IMAGES.STUDENTS[
                            `student${idx + 1}` as keyof typeof IMAGES.STUDENTS
                          ]
                        }
                        alt={t(`students.${id}.name`)}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {/* Badge Country */}
                      <div className="absolute top-4 right-4">
                        <div
                          className={cn(
                            "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg backdrop-blur-md border",
                            t(`students.${id}.country`) === "Nhật Bản" ||
                              t(`students.${id}.country`) === "Japan"
                              ? "bg-red-500/90 text-white border-red-400"
                              : "bg-blue-600/90 text-white border-blue-400",
                          )}
                        >
                          {t(`students.${id}.country`)}
                        </div>
                      </div>

                      {/* Congrats Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 text-white">
                        <Quote className="w-8 h-8 text-primary mb-4 opacity-50" />
                        <p className="text-sm italic font-medium leading-relaxed">
                          {`"${t("congrats")}"`}
                        </p>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="px-4 pb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Trophy className="w-4 h-4 text-amber-500" />
                        <span className="text-[10px] font-bold text-amber-600 uppercase tracking-tighter">
                          {t(`students.${id}.year`)} Successful
                        </span>
                      </div>
                      <h3 className="text-xl font-black text-gray-900 dark:text-white mb-1 group-hover:text-primary transition-colors">
                        {t(`students.${id}.name`)}
                      </h3>
                      <p className="text-sm font-bold text-primary italic mb-4">
                        {t(`students.${id}.order`)}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-6 border-2 border-primary/20 hover:bg-primary hover:text-white transition-all" />
            <CarouselNext className="hidden md:flex -right-6 border-2 border-primary/20 hover:bg-primary hover:text-white transition-all" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
