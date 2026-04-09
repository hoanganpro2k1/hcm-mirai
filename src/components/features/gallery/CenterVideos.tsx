"use client";

import { Link } from "@/i18n/routing";
import { Library, MoveRight, PlayCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function CenterVideos() {
  const t = useTranslations("Gallery.videos");

  const videos = [
    {
      id: 1,
      src: "https://picsum.photos/id/101/1200/800",
      title: "GẦN 20 NĂM VỮNG BƯỚC HCM-MIRAI KHÔNG NGỪNG VƯƠN XA",
      duration: "05:12",
    },
    {
      id: 2,
      src: "https://picsum.photos/id/102/1200/800",
      title: "DU HỌC THẠC SĨ CÙNG HCM-MIRAI - BƯỚC TIẾN LỚN CHO SỰ NGHIỆP",
      duration: "04:30",
    },
    {
      id: 3,
      src: "https://picsum.photos/id/103/1200/800",
      title: "KHÔNG LO HỌC PHÍ NHẬP HỌC 0 ĐỒNG TẠI HCM-MIRAI",
      duration: "03:45",
    },
    {
      id: 4,
      src: "https://picsum.photos/id/104/1200/800",
      title: "KHÔNG NGHĨ SẼ KHÓC - NHƯNG NƯỚC MẮT VẪN RƠI | HCM-MIRAI",
      duration: "06:20",
    },
    {
      id: 5,
      src: "https://picsum.photos/id/107/1200/800",
      title: "GIÂY PHÚT CHIA XA KHI CON LÊN ĐƯỜNG DU HỌC | HCM-MIRAI",
      duration: "04:15",
    },
    {
      id: 6,
      src: "https://picsum.photos/id/106/1200/800",
      title: "HỌC VIÊN HCM-MIRAI MÁCH NHỎ - BÍ KÍP XIN VISA CỰC DỄ",
      duration: "03:10",
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

        {/* 3x2 Grid with red borders */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8 md:gap-12">
          {/* The mockup shows 2 columns for videos, so I'll follow that. 3 columns might be too small. */}
          {videos.map((video) => (
            <div
              key={video.id}
              className="group relative p-2 border border-red-200 hover:border-red-600 transition-all duration-300 rounded-xl overflow-hidden shadow-sm hover:shadow-md animate-in slide-in-from-bottom-8"
            >
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <Image
                  src={video.src}
                  alt={video.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all flex items-center justify-center">
                  <PlayCircle className="w-16 h-16 text-red-600 drop-shadow-2xl scale-90 group-hover:scale-110 transition-all" />
                </div>

                {/* Info Container matching mockup style */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/90 to-transparent">
                  <h4 className="text-white font-bold text-sm md:text-base leading-tight uppercase tracking-tight line-clamp-2">
                    {video.title}
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
