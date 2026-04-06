"use client";

import { useSearch } from "@/hooks/use-search";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { SearchHeader } from "./SearchHeader";
import { SearchPagination } from "./SearchPagination";
import { SearchResultList } from "./SearchResultList";
import { SearchSidebar } from "./SearchSidebar";

interface SearchPageContentProps {
  initialQuery: string;
  initialPage: number;
}

export const SearchPageContent = ({
  initialQuery,
  initialPage,
}: SearchPageContentProps) => {
  const {
    searchQuery,
    activeFilter,
    setActiveFilter,
    page,
    setPage,
    results,
    isLoading,
  } = useSearch({
    initialQuery,
    initialPage,
    limit: 10,
    name: "Page",
  });

  // Keep pagination in sync with URL if user uses browser navigation
  const searchParams = useSearchParams();
  useEffect(() => {
    // Sync logic can be added here if needed in the future
  }, [searchParams]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-[#F7FAFC]">
      <div className="container mx-auto pb-8 px-4">
        <SearchHeader query={searchQuery} />

        <div className="flex flex-col gap-0 lg:flex-row">
          <SearchSidebar
            resultsCount={results?.total || 0}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />

          <div className="flex-1 pt-6 lg:pl-12 lg:pt-0">
            <SearchResultList
              results={results?.data || []}
              searchQuery={searchQuery}
              isLoading={isLoading}
            />

            <SearchPagination
              currentPage={page}
              totalPages={results?.totalPages || 0}
              searchQuery={searchQuery}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </main>
  );
};
