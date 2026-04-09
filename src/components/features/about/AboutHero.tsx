"use client";

import { Link } from "@/i18n/routing";
import { ChevronRight, Home } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function AboutHero() {
  const t = useTranslations("About.hero");

  return (
    <section className="relative h-[300px] md:h-[400px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="https://picsum.photos/id/122/2000/1000"
          alt="About HCM Mirai"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-6 text-center text-white space-y-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-700">
          {t("title")}
        </h1>

        {/* Breadcrumb */}
        <nav className="flex items-center justify-center gap-2 text-sm md:text-base font-medium opacity-90 animate-in fade-in slide-in-from-bottom-2 duration-700 delay-200">
          <Link
            href="/"
            className="flex items-center gap-1 hover:underline hover:text-white transition-colors"
          >
            <Home className="w-4 h-4" />
            {t("breadcrumb")}
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white font-bold">{t("title")}</span>
        </nav>
      </div>

      {/* Decorative element */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-linear-to-t from-background to-transparent" />
    </section>
  );
}
