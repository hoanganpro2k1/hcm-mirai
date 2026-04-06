import PageHero from "@/components/common/PageHero";
import StudyProgramGrid from "@/components/features/study/StudyProgramGrid";
import ConsultationForm from "@/components/features/home/ConsultationForm";
import PartnerMarquee from "@/components/features/home/PartnerMarquee";
import { GraduationCap } from "lucide-react";
import { useTranslations } from "next-intl";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Du học & XKLĐ | HCM-MIRAI",
  description: "Tầm nhìn quốc tế, sự nghiệp vững bền.",
};

export default function StudyAbroadPage() {
  const t = useTranslations("StudyAbroad.hero");

  return (
    <main className="min-h-screen">
      <PageHero 
        title={t("title")}
        breadcrumb={t("breadcrumb")}
        backgroundImage="https://picsum.photos/id/113/1920/1080"
        icon={<GraduationCap className="w-8 h-8 text-white" />}
      />

      <StudyProgramGrid />

      <PartnerMarquee />

      <ConsultationForm />
    </main>
  );
}
