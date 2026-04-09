"use client";

import { SectionHeader } from "@/components/ui/section-header";
import { IMAGES } from "@/constants/images";
import { Link } from "@/i18n/routing";
import { Briefcase, FileText, GraduationCap, Landmark } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

const featureKeys = [
  {
    key: "school_choice",
    icon: GraduationCap,
    color: "bg-blue-100 dark:bg-blue-900/30",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    key: "visa_support",
    icon: Landmark,
    color: "bg-red-100 dark:bg-red-900/30",
    iconColor: "text-red-600 dark:text-red-400",
  },
  {
    key: "document_service",
    icon: FileText,
    color: "bg-emerald-100 dark:bg-emerald-900/30",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    key: "career_path",
    icon: Briefcase,
    color: "bg-amber-100 dark:bg-amber-900/30",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
];

export default function Introduction() {
  const t = useTranslations("Introduction");

  return (
    <section className="py-10 md:py-20 bg-white dark:bg-gray-950 transition-colors">
      <div className="container mx-auto px-6">
        <SectionHeader title={t("title")} align="center" />

        {/* Top Text Content */}
        <div className="max-w-5xl mx-auto mb-20 space-y-6 text-center">
          <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl leading-relaxed italic border-l-4 border-primary pl-6 py-2 text-left bg-primary/5 rounded-r-2xl">
            {t("mission")}
          </p>
          <div className="grid md:grid-cols-2 gap-8 text-left text-gray-600 dark:text-gray-400 leading-relaxed">
            <p>{t("desc1")}</p>
            <p>{t("desc2")}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left side: Image */}
          <div className="relative group">
            {/* Main Image */}
            <div className="relative rounded-3xl overflow-hidden border-8 border-gray-100 dark:border-gray-900 shadow-2xl z-10 aspect-4/3">
              <Image
                src={IMAGES.HOME.INTRODUCTION.home1}
                alt="HCM Mirai Building"
                fill
                loading="eager"
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
            </div>

            {/* Decorative background circle */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl z-0" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl z-0" />
          </div>

          {/* Right side: Why choose us & Features */}
          <div className="space-y-8">
            <div className="space-y-2">
              <span className="text-primary font-bold uppercase tracking-widest text-sm">
                {t("subtitle")}
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                {t("whyChooseUs")}
              </h3>
            </div>

            {/* Feature Cards Grid (2x2) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {featureKeys.map((feature, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-blue-50/50 dark:bg-blue-900/10 rounded-xl border border-blue-100/50 dark:border-blue-800/50 hover:bg-white dark:hover:bg-gray-900 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 group flex flex-col items-center text-center sm:items-start sm:text-left"
                >
                  <div className="w-12 h-12 rounded-xl bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center mb-4 transition-transform group-hover:rotate-12">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2 leading-tight">
                    {t(`features.${feature.key}.title`)}
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                    {t(`features.${feature.key}.description`)}
                  </p>
                </div>
              ))}
            </div>

            <Link
              href="/lien-he"
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white px-10 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-primary/20 flex items-center justify-center gap-2"
            >
              {t("cta")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
