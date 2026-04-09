import { SearchPageContent } from "@/components/features/search/SearchPageContent";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return {
    title: `${t("Search.title", { fallback: "Tìm kiếm" })} | HCM-MIRAI`,
  };
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ s?: string; page?: string }>;
}) {
  const { s = "", page = "1" } = await searchParams;
  const currentPage = parseInt(page) || 1;

  return (
    <SearchPageContent 
      initialQuery={s} 
      initialPage={currentPage} 
    />
  );
}
