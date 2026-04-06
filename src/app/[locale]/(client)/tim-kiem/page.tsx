import { SearchPageContent } from "@/components/features/search/SearchPageContent";

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
