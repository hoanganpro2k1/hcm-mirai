import PageBreadcrumbs from "@/components/common/PageBreadcrumbs";
import NewsGrid from "@/components/features/news/NewsGrid";
import ConsultationForm from "@/components/features/home/ConsultationForm";
import { getTranslations } from "next-intl/server";

interface NewsPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return {
    title: `${t("News.hero.title")} | HCM Mirai`,
    description: t("News.hero.seo_desc", { fallback: "Cập nhật những tin tức mới nhất về tuyển sinh và hoạt động tại HCM Mirai." }),
  };
}

export default async function NewsPage({ params, searchParams }: NewsPageProps) {
  const { locale } = await params;
  const sParams = await searchParams;
  const t = await getTranslations({ locale, namespace: "News.hero" });

  const page = Number(sParams.page) || 1;

  const breadcrumbItems = [
    { label: t("breadcrumb"), href: "/" },
    { label: t("title") },
  ];

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-6 py-4">
        <PageBreadcrumbs items={breadcrumbItems} />
      </div>

      <NewsGrid page={page} limit={9} />

      <ConsultationForm />
    </main>
  );
}
