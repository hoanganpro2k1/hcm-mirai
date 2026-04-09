"use client";

import PageBreadcrumbs from "@/components/common/PageBreadcrumbs";
import ConsultationForm from "@/components/features/home/ConsultationForm";
import TestimonialsSection from "@/components/features/home/TestimonialsSection";
import { useTranslations } from "next-intl";

export default function TestimonialsPage() {
  const tHeader = useTranslations("Header");

  const breadcrumbItems = [
    { label: tHeader("nav.about_mirai").replace("Về HCM-MIRAI", "Trang chủ"), href: "/" },
    { label: tHeader("nav.testimonials") },
  ];

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-4">
        <PageBreadcrumbs items={breadcrumbItems} />
      </div>
      <div className="py-12 bg-white dark:bg-transparent">
        <TestimonialsSection />
      </div>
      <ConsultationForm />
    </main>
  );
}
