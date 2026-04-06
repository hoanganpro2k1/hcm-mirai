"use client";

import PageHero from "@/components/common/PageHero";
import ProgramSection from "@/components/features/home/ProgramSection";
import { useTranslations } from "next-intl";

export default function ServicesPage() {
  const t = useTranslations("Header");
  
  return (
    <main className="min-h-screen bg-background">
      <PageHero 
        title={t("nav.services")}
        breadcrumb="Services"
        backgroundImage="https://picsum.photos/1920/600?services"
      />
      <div className="py-12">
        <ProgramSection />
      </div>
    </main>
  );
}
