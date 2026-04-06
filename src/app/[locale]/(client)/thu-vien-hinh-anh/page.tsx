import GalleryHero from "@/components/features/gallery/GalleryHero";
import CenterImages from "@/components/features/gallery/CenterImages";
import CenterVideos from "@/components/features/gallery/CenterVideos";
import ConsultationForm from "@/components/features/home/ConsultationForm";
import PartnerMarquee from "@/components/features/home/PartnerMarquee";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thư viện hình ảnh | HCM-MIRAI",
  description: "Khám phá không gian học tập và các hoạt động sôi nổi tại trung tâm đào tạo HCM-MIRAI",
};

export default function GalleryPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <GalleryHero />

      {/* Center Images Section (3x3 Grid) */}
      <CenterImages />

      {/* Center Videos Section (3x2 Grid) */}
      <CenterVideos />

      {/* Partner Marquee */}
      <PartnerMarquee />

      {/* Registration Form */}
      <ConsultationForm />
    </main>
  );
}
