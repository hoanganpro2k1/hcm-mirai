"use client";

import PageHero from "@/components/common/PageHero";
import TestimonialsSection from "@/components/features/home/TestimonialsSection";
import { useTranslations } from "next-intl";

export default function TestimonialsPage() {
  const t = useTranslations("Footer");
  
  return (
    <main className="min-h-screen bg-background">
      <PageHero 
        title={t("links.testimonials")}
        breadcrumb="Testimonials"
        backgroundImage="https://picsum.photos/1920/600?testimonials"
      />
      <div className="py-12 bg-white dark:bg-transparent">
        <TestimonialsSection />
      </div>
    </main>
  );
}
