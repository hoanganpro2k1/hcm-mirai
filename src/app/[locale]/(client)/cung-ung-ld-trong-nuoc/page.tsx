import PageBreadcrumbs from "@/components/common/PageBreadcrumbs";
import LaborServiceGrid from "@/components/features/labor/LaborServiceGrid";
import ConsultationForm from "@/components/features/home/ConsultationForm";
import PartnerMarquee from "@/components/features/home/PartnerMarquee";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "LaborDomestic.hero" });
  
  return {
    title: `${t("title")} | HCM-MIRAI`,
    description: t("seo_desc"),
  };
}

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
