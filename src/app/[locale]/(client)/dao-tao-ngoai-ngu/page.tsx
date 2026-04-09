import PageBreadcrumbs from "@/components/common/PageBreadcrumbs";
import CourseList from "@/components/features/training/CourseList";
import TeachingMethod from "@/components/features/training/TeachingMethod";
import ConsultationForm from "@/components/features/home/ConsultationForm";
import PartnerMarquee from "@/components/features/home/PartnerMarquee";
import { Metadata } from "next";
import { useTranslations } from "next-intl";

export const metadata: Metadata = {
  title: "Đào tạo ngoại ngữ | HCM-MIRAI",
  description: "Chương trình đào tạo Tiếng Nhật và Tiếng Hàn chuyên sâu, cam kết đầu ra JLPT và TOPIK.",
};

export default function TrainingPage() {
  const t = useTranslations("Training.hero");

  const breadcrumbItems = [
    { label: t("breadcrumb"), href: "/" },
    { label: t("title") },
  ];

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-6 py-4">
        <PageBreadcrumbs items={breadcrumbItems} />
      </div>

      {/* Intro & Courses Section */}
      <CourseList />

      {/* Teaching Method & Philosophy */}
      <TeachingMethod />

      {/* Partner Marquee */}
      <PartnerMarquee />

      {/* Registration Form */}
      <ConsultationForm />
    </main>
  );
}
