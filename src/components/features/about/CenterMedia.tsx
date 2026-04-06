"use client";

import { PlayCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function CenterMedia() {
  const t = useTranslations("About.media");

  const media = [
    {
      type: "image",
      src: "https://picsum.photos/id/1/1000/1000",
      className: "col-span-2 row-span-2",
    },
    {
      type: "video",
      src: "https://picsum.photos/id/2/1000/1000",
      className: "col-span-1 row-span-1",
    },
    {
      type: "image",
      src: "https://picsum.photos/id/3/1000/1000",
      className: "col-span-1 row-span-1",
    },
    {
      type: "image",
      src: "https://picsum.photos/id/4/1000/1000",
      className: "col-span-1 row-span-1",
    },
    {
      type: "video",
      src: "https://picsum.photos/id/5/1000/1000",
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
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all flex items-center justify-center">
                {item.type === "video" && (
                  <PlayCircle className="w-12 h-12 md:w-16 md:h-16 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all cursor-pointer" />
                )}
              </div>

              {/* Subtle Label */}
              <div className="absolute bottom-4 left-4 text-white text-[10px] md:text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                {item.type === "video" ? "Xem video" : "Phóng to"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
