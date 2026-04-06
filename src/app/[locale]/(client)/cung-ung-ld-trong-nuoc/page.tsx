import PageHero from "@/components/common/PageHero";
import LaborServiceGrid from "@/components/features/labor/LaborServiceGrid";
import ConsultationForm from "@/components/features/home/ConsultationForm";
import PartnerMarquee from "@/components/features/home/PartnerMarquee";
import { HardHat } from "lucide-react";
import { useTranslations } from "next-intl";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cung ứng lao động trong nước | HCM-MIRAI",
  description: "Giải pháp nhân sự uy tín cho các doanh nghiệp tại Việt Nam.",
};

export default function DomesticLaborPage() {
  const t = useTranslations("LaborDomestic.hero");

  return (
    <main className="min-h-screen">
      <PageHero 
        title={t("title")}
        breadcrumb={t("breadcrumb")}
        backgroundImage="https://picsum.photos/id/111/1920/1080"
        icon={<HardHat className="w-8 h-8 text-white" />}
      />

      <LaborServiceGrid namespace="LaborDomestic" />

      <PartnerMarquee />

      <ConsultationForm />
    </main>
  );
}
