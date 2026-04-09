import PageBreadcrumbs from "@/components/common/PageBreadcrumbs";
import LaborServiceGrid from "@/components/features/labor/LaborServiceGrid";
import ConsultationForm from "@/components/features/home/ConsultationForm";
import PartnerMarquee from "@/components/features/home/PartnerMarquee";
import { useTranslations } from "next-intl";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cung ứng lao động trong nước | HCM-MIRAI",
  description: "Giải pháp nhân sự uy tín cho các doanh nghiệp tại Việt Nam.",
};

export default function DomesticLaborPage() {
  const t = useTranslations("LaborDomestic.hero");

  const breadcrumbItems = [
    { label: t("breadcrumb"), href: "/" },
    { label: t("title") },
  ];

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-6 py-4">
        <PageBreadcrumbs items={breadcrumbItems} />
      </div>

      <LaborServiceGrid namespace="LaborDomestic" />

      <PartnerMarquee />

      <ConsultationForm />
    </main>
  );
}
