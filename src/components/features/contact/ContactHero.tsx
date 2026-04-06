"use client";

import { useTranslations } from "next-intl";

export function ContactHero() {
  const t = useTranslations("Contact");

  return (
    <section className="relative py-20 bg-blue-50/50 dark:bg-gray-900 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-accent/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white tracking-tight mb-6">
          {t("title")}
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
          {t("subtitle")}
        </p>

        {/* Modern bottom accent */}
        <div className="mt-12 flex items-center justify-center gap-2 text-primary/20">
          <div className="h-px w-16 bg-current"></div>
          <div className="h-2 w-2 rounded-full bg-current"></div>
          <div className="h-px w-16 bg-current"></div>
        </div>
      </div>
    </section>
  );
}
