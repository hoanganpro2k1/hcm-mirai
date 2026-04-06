"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { MoveRight, Library } from "lucide-react";

export default function CenterImages() {
  const t = useTranslations("Gallery.images");

  const images = [
    { id: 1, src: "https://picsum.photos/id/11/1200/800" },
    { id: 2, src: "https://picsum.photos/id/12/1200/800" },
    { id: 3, src: "https://picsum.photos/id/13/1200/800" },
    { id: 4, src: "https://picsum.photos/id/14/1200/800" },
    { id: 5, src: "https://picsum.photos/id/15/1200/800" },
    { id: 6, src: "https://picsum.photos/id/16/1200/800" },
    { id: 7, src: "https://picsum.photos/id/17/1200/800" },
    { id: 8, src: "https://picsum.photos/id/18/1200/800" },
    { id: 9, src: "https://picsum.photos/id/19/1200/800" },
  ];

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-950 transition-colors">
      <div className="container mx-auto px-6">
        {/* Header matching mockup */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary font-bold text-sm">
                <Library className="w-4 h-4" />
                <span>Thư viện</span>
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
            Xem thêm
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
