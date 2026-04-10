"use client";

import { SectionHeader } from "@/components/ui/section-header";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

const categoryIds = [
  "korea",
  "japan",
  "taiwan",
  "australia",
  "germany",
  "labor",
];

const programData = [
  {
    id: 1,
    category: "korea",
    tagKey: "hot",
    image: "https://picsum.photos/400/300?korea-1",
  },
  {
    id: 2,
    category: "korea",
    tagKey: "new",
    image: "https://picsum.photos/400/300?korea-2",
  },
  {
    id: 3,
    category: "japan",
    tagKey: "admission",
    image: "https://picsum.photos/400/300?japan-1",
  },
  {
    id: 4,
    category: "japan",
    tagKey: "scholarship",
    image: "https://picsum.photos/400/300?japan-2",
  },
  {
    id: 5,
    category: "labor",
    tagKey: "labor",
    image: "https://picsum.photos/400/300?labor-1",
  },
  {
    id: 6,
    category: "australia",
    tagKey: "hot",
    image: "https://picsum.photos/400/300?australia-1",
  },
];

export default function ProgramSection() {
  const t = useTranslations("HomePrograms");
  const [activeTab, setActiveTab] = useState("korea");

  const filteredPrograms =
    activeTab === "all"
      ? programData
      : programData.filter((p) => p.category === activeTab);

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900/50 transition-colors">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <SectionHeader title={t("title")} align="left" className="mb-0" />

          {/* Tabs Navigation */}
          <div className="flex flex-wrap gap-2 mt-6 md:mt-0">
            {categoryIds.map((id) => (
              <Button
                key={id}
                onClick={() => setActiveTab(id)}
                className={cn(
                  "px-6 py-2.5 rounded-full text-sm font-bold transition-all border-2",
                  activeTab === id
                    ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                    : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-100 dark:border-gray-700 hover:border-primary/50",
                )}
              >
                {t(`categories.${id}`)}
              </Button>
            ))}
          </div>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPrograms.length > 0 ? (
            filteredPrograms.map((program) => (
              <div
                key={program.id}
                className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all hover:-translate-y-1"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={program.image}
                    alt={t(`items.program_${program.id}.title`)}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-accent text-accent-foreground text-xs uppercase font-black px-3 py-1 rounded-full shadow-lg">
                      {t(`tags.${program.tagKey}`)}
                    </span>
                  </div>
                </div>
                <Link href="/du-hoc-xkld" className="block p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-snug line-clamp-2 min-h-[56px] group-hover:text-primary transition-colors italic">
                    {t(`items.program_${program.id}.title`)}
                  </h3>
                  <div className="mt-4 pt-4 border-t border-gray-50 dark:border-gray-700 flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 group-hover:text-primary transition-colors">
                      {t("view_details")}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-gray-500 dark:text-gray-400 italic">
                {t("no_programs")}
              </p>
            </div>
          )}
        </div>

        {/* View all button */}
        <div className="mt-12 text-center">
          <Link
            href="/du-hoc-xkld"
            className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all hover:text-accent group"
          >
            {t("view_all")}
            <ChevronRight className="w-5 h-5 bg-primary/10 rounded-full p-0.5 group-hover:bg-accent group-hover:text-white transition-all" />
          </Link>
        </div>
      </div>
    </section>
  );
}
