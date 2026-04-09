import PageBreadcrumbs from "@/components/common/PageBreadcrumbs";
import NewsGrid from "@/components/features/news/NewsGrid";
import ConsultationForm from "@/components/features/home/ConsultationForm";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return {
    title: `${t("News.hero.title")} | HCM-MIRAI`,
    description: t("News.hero.seo_desc", { fallback: "Cập nhật những tin tức mới nhất về tuyển sinh và hoạt động tại HCM-MIRAI." }),
  };
}

export default function NewsPage() {
  const t = useTranslations("News.hero");

  const breadcrumbItems = [
    { label: t("breadcrumb"), href: "/" },
    { label: t("title") },
  ];

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-6 py-4">
        <PageBreadcrumbs items={breadcrumbItems} />
      </div>

      <NewsGrid />

      <ConsultationForm />
    </main>
  );
}
