"use client";

import { IMAGES } from "@/constants/images";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function CenterMedia() {
  const t = useTranslations("About.media");

  const media = [
    {
      type: "image",
      src: IMAGES.ABOUT.CENTER_MEDIA.centerMedia1,
      className: "col-span-2 row-span-2",
    },
    {
      type: "video",
      src: IMAGES.ABOUT.CENTER_MEDIA.centerMedia2,
      className: "col-span-1 row-span-1",
    },
    {
      type: "image",
      src: IMAGES.ABOUT.CENTER_MEDIA.centerMedia3,
      className: "col-span-1 row-span-1",
    },
    {
      type: "image",
      src: IMAGES.ABOUT.CENTER_MEDIA.centerMedia4,
      className: "col-span-1 row-span-1",
    },
    {
      type: "video",
      src: IMAGES.ABOUT.CENTER_MEDIA.centerMedia5,
      className: "col-span-1 row-span-1",
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-3xl md:text-5xl font-bold text-accent mb-6 leading-tight">
            {t("title")}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-4 md:gap-6 h-[400px] md:h-[600px]">
          {media.map((item, idx) => (
            <div
              key={idx}
              className={`relative overflow-hidden rounded-3xl group shadow-lg ${item.className}`}
            >
              <Image
                src={item.src}
                alt={`Media ${idx}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
