"use client";

import { Button } from "@/components/ui/button";
import { IMAGES } from "@/constants/images";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function ServicesHero() {
  const t = useTranslations("Services.hero");
  const scrollToForm = () => {
    document
      .getElementById("consultation-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="container mx-auto px-6 py-12 md:py-20 lg:py-24">
      <div className="flex flex-col lg:flex-row items-center gap-12">
        <div className="w-full lg:w-1/2 rounded-3xl overflow-hidden relative aspect-4/3 md:aspect-video lg:aspect-square xl:aspect-4/3">
          <Image
            src={IMAGES.SERVICES.HERO.hero}
            alt="HCM-MIRAI Services"
            fill
            className="object-cover"
          />
        </div>
        <div className="w-full lg:w-1/2 space-y-6">
          <div className="inline-flex items-center space-x-2 text-primary font-semibold text-sm tracking-widest uppercase">
            <span></span>
            <span>{t("overview")}</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 leading-tight">
            {t("title1")}
            <br className="hidden md:block" /> {t("title2")}
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {t("description")}
          </p>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-6 text-lg"
            onClick={scrollToForm}
          >
            {t("cta")}
          </Button>
        </div>
      </div>
    </section>
  );
}
