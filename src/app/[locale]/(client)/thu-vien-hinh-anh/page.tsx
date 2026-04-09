import PageBreadcrumbs from "@/components/common/PageBreadcrumbs";
import CenterImages from "@/components/features/gallery/CenterImages";
import CenterVideos from "@/components/features/gallery/CenterVideos";
import ConsultationForm from "@/components/features/home/ConsultationForm";
import PartnerMarquee from "@/components/features/home/PartnerMarquee";
import { Metadata } from "next";
import { useTranslations } from "next-intl";

export const metadata: Metadata = {
  title: "Thư viện hình ảnh | HCM-MIRAI",
  description: "Khám phá không gian học tập và các hoạt động sôi nổi tại trung tâm đào tạo HCM-MIRAI",
};

export default function GalleryPage() {
  const tGallery = useTranslations("Gallery.hero");
  const tHeader = useTranslations("Header");

  const breadcrumbItems = [
    { label: tHeader("nav.about_mirai").replace("Về HCM-MIRAI", "Trang chủ"), href: "/" },
    { label: tGallery("title") },
  ];

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-6 py-4">
        <PageBreadcrumbs items={breadcrumbItems} />
      </div>

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
