"use client";

import { IMAGES } from "@/constants/images";
import { Link } from "@/i18n/routing";
import { Library, MoveRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function CenterImages() {
  const t = useTranslations("Gallery.images");
  const tCommon = useTranslations("Gallery.common");

  const images = [
    { id: 1, src: IMAGES.GALLERY.gallery1 },
    { id: 2, src: IMAGES.GALLERY.gallery2 },
    { id: 3, src: IMAGES.GALLERY.gallery3 },
    { id: 4, src: IMAGES.GALLERY.gallery4 },
    { id: 5, src: IMAGES.GALLERY.gallery5 },
    { id: 6, src: IMAGES.GALLERY.gallery6 },
    { id: 7, src: IMAGES.GALLERY.gallery7 },
    { id: 8, src: IMAGES.GALLERY.gallery8 },
    { id: 9, src: IMAGES.GALLERY.gallery9 },
  ];

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-950 transition-colors">
      <div className="container mx-auto px-6">
        {/* Header matching mockup */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary font-bold text-sm">
              <Library className="w-4 h-4" />
              <span>{tCommon("badge")}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E293B] dark:text-white uppercase tracking-tight">
              {t("title")}
            </h2>
            <p className="text-gray-400 text-sm md:text-base max-w-2xl">
              {t("subtitle")}
            </p>
          </div>
          <Link
            href="/thu-vien-hinh-anh"
            className="text-red-500 hover:text-red-600 font-bold text-sm flex items-center gap-2 transition-colors group"
          >
            {tCommon("seeMore")}
            <MoveRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3x3 Grid with red borders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {images.map((img) => (
            <div
              key={img.id}
              className="group relative p-1.5 border border-red-200 hover:border-red-600 transition-all duration-300 rounded-lg overflow-hidden animate-in fade-in zoom-in"
            >
              <div className="relative aspect-4/3 rounded-md overflow-hidden">
                <Image
                  src={img.src}
                  alt={`Center Image ${img.id}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
