import PageBreadcrumbs from "@/components/common/PageBreadcrumbs";
import ConsultationForm from "@/components/features/home/ConsultationForm";
import PartnerMarquee from "@/components/features/home/PartnerMarquee";
import StudyProgramGrid from "@/components/features/study/StudyProgramGrid";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

import StudyAdvantages from "@/components/features/study/StudyAdvantages";
import StudyFAQ from "@/components/features/study/StudyFAQ";
import StudyHero from "@/components/features/study/StudyHero";
import StudyProcess from "@/components/features/study/StudyProcess";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "StudyAbroad.hero" });

  return {
    title: `${t("title")} | HCM Mirai`,
    description: t("seo_desc"),
  };
}

export default function StudyAbroadPage() {
  const t = useTranslations("StudyAbroad.hero");

  const breadcrumbItems = [
    { label: t("breadcrumb"), href: "/" },
    { label: t("title") },
  ];

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-6 py-6">
        <PageBreadcrumbs items={breadcrumbItems} />
      </div>

      <StudyHero />

      <StudyAdvantages />

      <StudyProcess />

      <StudyProgramGrid />

      <StudyFAQ />

      <PartnerMarquee />

      <div id="contact-section">
        <ConsultationForm />
      </div>
    </main>
  );
}
