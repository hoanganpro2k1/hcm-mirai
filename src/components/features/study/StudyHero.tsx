"use client";

import { buttonVariants } from "@/components/ui/button";
import { IMAGES } from "@/constants/images";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { ChevronRight, Play } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function StudyHero() {
  const t = useTranslations("StudyAbroad.hero");

  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-slate-900 border-b border-white/10">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={IMAGES.HOME.HERO.slide1}
          alt="Study Abroad Background"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl space-y-8 animate-in fade-in slide-in-from-left-8 duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-primary-foreground text-sm font-bold backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            {t("subtitle")}
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] tracking-tight uppercase">
            {t("title")}
          </h1>

          <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl font-medium italic">
            {`"${t("seo_desc")}"`}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              href="#contact-section"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-16 px-8 rounded-full text-lg font-black bg-primary hover:bg-white hover:text-white transition-all shadow-xl shadow-primary/20 flex items-center justify-center no-underline group",
              )}
            >
              {t("cta_consult")}
              <ChevronRight className="ml-2 w-6 h-6 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="https://www.youtube.com/watch?v=GJ4A1wnhee0&t=1s"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 group text-white no-underline"
            >
              <div className="w-16 h-16 rounded-full border-2 border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-slate-900 transition-all">
                <Play className="w-6 h-6 fill-current" />
              </div>
              <span className="font-bold text-lg">{t("cta_video")}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 right-0 p-12 hidden lg:block animate-pulse">
        <div className="w-64 h-64 border-2 border-white/5 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-white/5 rounded-full" />
      </div>
    </section>
  );
}
