import ConsultationForm from "@/components/features/home/ConsultationForm";
import PartnerMarquee from "@/components/features/home/PartnerMarquee";
import TestimonialsSection from "@/components/features/home/TestimonialsSection";
import AboutHero from "@/components/features/about/AboutHero";
import VisionMission from "@/components/features/about/VisionMission";
import BenefitsSection from "@/components/features/about/BenefitsSection";
import TeamSection from "@/components/features/about/TeamSection";
import CenterMedia from "@/components/features/about/CenterMedia";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Giới thiệu về HCM-MIRAI - Chắp cánh ước mơ du học",
  description: "Trang giới thiệu chi tiết về sứ mệnh, tầm nhìn, đội ngũ và các dịch vụ của HCM-MIRAI trong lĩnh vực du học và tư vấn giáo dục quốc tế.",
};

export default function GioiThieuPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* 1. Hero Section */}
      <AboutHero />

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
