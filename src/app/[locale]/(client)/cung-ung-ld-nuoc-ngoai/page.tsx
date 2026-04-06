import PageHero from "@/components/common/PageHero";
import LaborServiceGrid from "@/components/features/labor/LaborServiceGrid";
import ConsultationForm from "@/components/features/home/ConsultationForm";
import PartnerMarquee from "@/components/features/home/PartnerMarquee";
import { Plane } from "lucide-react";
import { useTranslations } from "next-intl";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cung ứng lao động nước ngoài | HCM-MIRAI",
  description: "Cơ hội việc làm tại Nhật Bản, Hàn Quốc, Úc và Châu Âu.",
};

export default function OverseasLaborPage() {
  const t = useTranslations("LaborOverseas.hero");

  return (
    <main className="min-h-screen">
      <PageHero 
        title={t("title")}
        breadcrumb={t("breadcrumb")}
        backgroundImage="https://picsum.photos/id/112/1920/1080"
        icon={<Plane className="w-8 h-8 text-white" />}
      />

      <LaborServiceGrid namespace="LaborOverseas" />

      <PartnerMarquee />

      <ConsultationForm />
    </main>
  );
}
