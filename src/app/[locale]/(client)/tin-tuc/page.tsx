import PageHero from "@/components/common/PageHero";
import NewsGrid from "@/components/features/news/NewsGrid";
import ConsultationForm from "@/components/features/home/ConsultationForm";
import { Newspaper } from "lucide-react";
import { useTranslations } from "next-intl";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tin tức & Sự kiện | HCM-MIRAI",
  description: "Cập nhật những tin tức mới nhất về tuyển sinh và hoạt động tại HCM-MIRAI.",
};

export default function NewsPage() {
  const t = useTranslations("News.hero");

  return (
    <main className="min-h-screen">
      <PageHero 
        title={t("title")}
        breadcrumb={t("breadcrumb")}
        backgroundImage="https://picsum.photos/id/114/1920/1080"
        icon={<Newspaper className="w-8 h-8 text-white" />}
      />

      <NewsGrid />

      <ConsultationForm />
    </main>
  );
}
