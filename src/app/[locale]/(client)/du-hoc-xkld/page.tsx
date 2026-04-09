import PageBreadcrumbs from "@/components/common/PageBreadcrumbs";
import StudyProgramGrid from "@/components/features/study/StudyProgramGrid";
import ConsultationForm from "@/components/features/home/ConsultationForm";
import PartnerMarquee from "@/components/features/home/PartnerMarquee";
import { useTranslations } from "next-intl";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Du học & XKLĐ | HCM-MIRAI",
  description: "Tầm nhìn quốc tế, sự nghiệp vững bền.",
};

export default function StudyAbroadPage() {
  const t = useTranslations("StudyAbroad.hero");

  const breadcrumbItems = [
    { label: t("breadcrumb"), href: "/" },
    { label: t("title") },
  ];

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-6 py-4">
        <PageBreadcrumbs items={breadcrumbItems} />
      </div>

      <StudyProgramGrid />

      <PartnerMarquee />

      <ConsultationForm />
    </main>
  );
}
