import PageBreadcrumbs from "@/components/common/PageBreadcrumbs";
import LaborServiceGrid from "@/components/features/labor/LaborServiceGrid";
import ConsultationForm from "@/components/features/home/ConsultationForm";
import PartnerMarquee from "@/components/features/home/PartnerMarquee";
import { useTranslations } from "next-intl";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cung ứng lao động nước ngoài | HCM-MIRAI",
  description: "Cơ hội việc làm tại Nhật Bản, Hàn Quốc, Úc và Châu Âu.",
};

export default function OverseasLaborPage() {
  const t = useTranslations("LaborOverseas.hero");

  const breadcrumbItems = [
    { label: t("breadcrumb"), href: "/" },
    { label: t("title") },
  ];

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-6 py-4">
        <PageBreadcrumbs items={breadcrumbItems} />
      </div>

      <LaborServiceGrid namespace="LaborOverseas" />

      <PartnerMarquee />

      <ConsultationForm />
    </main>
  );
}
