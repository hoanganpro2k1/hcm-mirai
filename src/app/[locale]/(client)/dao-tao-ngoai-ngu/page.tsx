import PageBreadcrumbs from "@/components/common/PageBreadcrumbs";
import CourseList from "@/components/features/training/CourseList";
import TeachingMethod from "@/components/features/training/TeachingMethod";
import ConsultationForm from "@/components/features/home/ConsultationForm";
import PartnerMarquee from "@/components/features/home/PartnerMarquee";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Training.hero" });
  
  return {
    title: `${t("title")} | HCM Mirai`,
    description: t("seo_desc"),
  };
}

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
