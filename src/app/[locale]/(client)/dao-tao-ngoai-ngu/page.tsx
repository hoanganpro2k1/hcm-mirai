import TrainingHero from "@/components/features/training/TrainingHero";
import CourseList from "@/components/features/training/CourseList";
import TeachingMethod from "@/components/features/training/TeachingMethod";
import ConsultationForm from "@/components/features/home/ConsultationForm";
import PartnerMarquee from "@/components/features/home/PartnerMarquee";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đào tạo ngoại ngữ | HCM-MIRAI",
  description: "Chương trình đào tạo Tiếng Nhật và Tiếng Hàn chuyên sâu, cam kết đầu ra JLPT và TOPIK.",
};

export default function TrainingPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <TrainingHero />

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
