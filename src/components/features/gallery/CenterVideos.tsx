"use client";

import { Link } from "@/i18n/routing";
import { Library, MoveRight } from "lucide-react";
import { useTranslations } from "next-intl";

export default function CenterVideos() {
  const t = useTranslations("Gallery.videos");
  const tCommon = useTranslations("Gallery.common");

  const videos = [
    {
      id: 1,
      youtubeId: "GJ4A1wnhee0",
    },
    {
      id: 2,
      youtubeId: "V2L1tVYiMyI",
    },
    {
      id: 3,
      youtubeId: "aqnM3mea_So",
    },
    {
      id: 4,
      youtubeId: "7LJVbH4pOzU",
    },
    {
      id: 5,
      youtubeId: "0FvM1sSkmdo",
    },
    {
      id: 6,
      youtubeId: "Oy_cngAsvew",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-950 transition-colors">
      <div className="container mx-auto px-6">
        {/* Header matching mockup */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary font-bold text-sm">
              <Library className="w-4 h-4" />
              <span>{tCommon("badge")}</span>
            </div>
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

        {/* 3x2 Grid with red borders */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {videos.map((video) => (
            <div
              key={video.id}
              className="flex flex-col p-2 border border-red-200 hover:border-red-600 transition-all duration-300 rounded-xl overflow-hidden shadow-sm hover:shadow-md animate-in slide-in-from-bottom-8 bg-white dark:bg-gray-900"
            >
              <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${video.youtubeId}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0"
                ></iframe>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
