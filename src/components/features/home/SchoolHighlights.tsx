"use client";

import { SectionHeader } from "@/components/ui/section-header";
import { IMAGES } from "@/constants/images";
import { MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

const schoolData = [
  {
    id: 1,
    image: IMAGES.HOME.SCHOOL_HIGHLIGHTS.school1,
    tagKeys: ["top1"],
  },
  {
    id: 2,
    image: IMAGES.HOME.SCHOOL_HIGHLIGHTS.school2,
    tagKeys: ["elite"],
  },
  {
    id: 3,
    image: IMAGES.HOME.SCHOOL_HIGHLIGHTS.school3,
    tagKeys: ["top_world"],
  },
];

export default function SchoolHighlights() {
  const t = useTranslations("HomeHighlights");

  return (
    <section className="py-20 bg-primary/5 dark:bg-primary/10 transition-colors">
      <div className="container mx-auto px-6">
        <SectionHeader
          title={t("title")}
          subtitle={t("subtitle")}
          align="left"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {schoolData.map((school) => (
            <div
              key={school.id}
              className="group bg-white dark:bg-gray-800 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-xl hover:shadow-2xl transition-all"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={school.image}
                  alt={t(`items.school_${school.id}.name`)}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  {school.tagKeys.map((tagKey) => (
                    <span
                      key={tagKey}
                      className="bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full uppercase italic"
                    >
                      {t(`tags.${tagKey}`)}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-8 space-y-4">
                <div className="flex items-center gap-2 text-primary font-bold text-sm">
                  <MapPin className="w-4 h-4" />
                  {t(`items.school_${school.id}.location`)}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-snug group-hover:text-primary transition-colors">
                  {t(`items.school_${school.id}.name`)}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                  {t(`items.school_${school.id}.description`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
