import PageBreadcrumbs from "@/components/common/PageBreadcrumbs";
import ConsultationForm from "@/components/features/home/ConsultationForm";
import PartnerMarquee from "@/components/features/home/PartnerMarquee";
import TestimonialsSection from "@/components/features/home/TestimonialsSection";
import VisionMission from "@/components/features/about/VisionMission";
import BenefitsSection from "@/components/features/about/BenefitsSection";
import TeamSection from "@/components/features/about/TeamSection";
import CenterMedia from "@/components/features/about/CenterMedia";
import { useTranslations } from "next-intl";

import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return {
    title: `${t("Header.nav.about_mirai")} | HCM-MIRAI`,
    description: t("About.hero.seo_desc", { fallback: "Trang giới thiệu chi tiết về sứ mệnh, tầm nhìn, đội ngũ và các dịch vụ của HCM-MIRAI trong lĩnh vực du học và tư vấn giáo dục quốc tế." }),
  };
}

export default function GioiThieuPage() {
  const tHeader = useTranslations("Header");

  const breadcrumbItems = [
    { label: tHeader("nav.home"), href: "/" },
    { label: tHeader("nav.about_mirai") },
  ];

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-4">
        <PageBreadcrumbs items={breadcrumbItems} />
      </div>

      {/* 2. Vision and Mission (Core values) */}
      <VisionMission />

      {/* 3. Why Choose Us (Benefits) */}
      <BenefitsSection />

      {/* 4. Our Leadership Team */}
      <TeamSection />

      {/* 5. Student Feedback (Testimonials) */}
      <TestimonialsSection />

      {/* 6. Partner Marquee */}
      <div className="bg-white dark:bg-gray-950 py-10">
        <PartnerMarquee />
      </div>

      {/* 7. Gallery / Media of the center */}
      <CenterMedia />

      {/* 8. Free Consultation Form */}
      <div id="consultation" className="bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
        <ConsultationForm />
      </div>
    </main>
  );
}
