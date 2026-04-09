"use client";

import { SectionHeader } from "@/components/ui/section-header";
import { IMAGES } from "@/constants/images";
import { Link } from "@/i18n/routing";
import { Play, ZoomIn } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

const photos = [
  { id: 1, src: IMAGES.HOME.GALLERY.gallery2, size: "row-span-2" },
  { id: 2, src: IMAGES.HOME.GALLERY.gallery1, size: "col-span-2" },
  { id: 3, src: IMAGES.HOME.GALLERY.gallery5, size: "" },
  { id: 4, src: IMAGES.HOME.GALLERY.gallery4, size: "" },
  { id: 5, src: IMAGES.HOME.GALLERY.gallery3, size: "col-span-2" },
];

const videos = [
  {
    id: 1,
    titleKey: "v1",
    thumbnail: IMAGES.HOME.GALLERY.gallery6,
    duration: "00:23",
  },
  {
    id: 2,
    titleKey: "v2",
    thumbnail: IMAGES.HOME.GALLERY.gallery7,
    duration: "00:42",
  },
];

export default function GallerySection() {
  const t = useTranslations("HomeGallery");

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900/50 transition-colors">
      <div className="container mx-auto px-6">
        <SectionHeader
          title={t("title")}
          subtitle={t("subtitle")}
          align="left"
        />

        <div className="grid lg:grid-cols-2 gap-12 mt-12">
          {/* Photo Gallery (Masonry-like Grid) */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[150px]">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className={`relative rounded-2xl overflow-hidden group cursor-pointer ${photo.size}`}
              >
                <Image
                  src={photo.src}
                  alt={`Center Photo ${photo.id}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <ZoomIn className="text-white w-8 h-8 scale-50 group-hover:scale-100 transition-transform" />
                </div>
              </div>
            ))}
          </div>

          {/* Video List */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <Play className="w-4 h-4 text-red-600 dark:text-red-400 fill-red-600 dark:fill-red-400" />
              </span>
              {t("video_title")}
            </h3>

            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-6">
              {videos.map((video) => (
                <div
                  key={video.id}
                  className="group bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all flex flex-col md:flex-row border border-gray-100 dark:border-gray-700"
                >
                  <div className="relative md:w-48 h-36 overflow-hidden">
                    <Image
                      src={video.thumbnail}
                      alt={t(`videos.${video.titleKey}`)}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <div className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center group-hover:bg-red-600 transition-colors">
                        <Play className="w-4 h-4 text-white fill-white" />
                      </div>
                    </div>
                    <span className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 text-[10px] text-white font-bold rounded">
                      {video.duration}
                    </span>
                  </div>
                  <div className="p-4 md:p-6 flex-1 flex flex-col justify-center">
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                      {t(`videos.${video.titleKey}`)}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 font-medium">
                      {t("youtube_cta")} &rarr;
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/thu-vien-hinh-anh"
              className="w-full py-4 text-center block rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400 font-bold hover:border-primary hover:text-primary transition-all"
            >
              {t("view_all_youtube")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
