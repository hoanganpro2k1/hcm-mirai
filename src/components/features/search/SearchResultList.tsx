"use client";

import SearchCard from "@/components/features/search/SearchCard";
import { Link } from "@/i18n/routing";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { Skeleton } from "@/components/ui/skeleton";

interface SearchResultListProps {
  results: any[];
  searchQuery: string;
  isLoading: boolean;
}

export const SearchResultList = ({
  results,
  searchQuery,
  isLoading,
}: SearchResultListProps) => {
  const t = useTranslations("Search");

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-4 p-4 border rounded-xl">
             <div className="flex flex-col sm:flex-row gap-8">
                <Skeleton className="aspect-video w-full sm:w-[320px] rounded-lg" />
                <div className="flex-1 flex flex-col gap-3 py-2">
                   <Skeleton className="h-6 w-3/4 rounded-md" />
                   <Skeleton className="h-4 w-full rounded-md" />
                   <Skeleton className="h-4 w-5/6 rounded-md" />
                   <div className="mt-auto pt-6">
                      <Skeleton className="h-4 w-1/3 rounded-md" />
                   </div>
                </div>
             </div>
          </div>
        ))}
      </div>
    );
  }

  if (!results || results.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-gray-200 bg-white p-20 text-center shadow-sm">
        <Search className="mx-auto size-16 text-gray-200 mb-4" />
        <p className="text-lg text-gray-500">
          {!searchQuery ? (
            t("empty.no_query")
          ) : (
            <>
              {t("empty.message")}{" "}
              <span className="font-bold text-[#373737]">
                &quot;{searchQuery}&quot;
              </span>
            </>
          )}
        </p>
        <Link
          href="/"
          className="mt-6 inline-block font-bold text-primary hover:underline"
        >
          {t("empty.back_home")}
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {results.map((order, index) => (
        <SearchCard
          key={order.id || index}
          type="order"
          variant="list"
          title={order.title ?? ""}
          description={order.description ?? ""}
          image={order.coverImage ?? ""}
          href={`/don-hang/${order.id}`}
          date={
            order.createdAt
              ? new Date(order.createdAt).toLocaleDateString("vi-VN")
              : undefined
          }
          author={order.createdBy?.username || "HCM-Mirai"}
        />
      ))}
    </div>
  );
};
