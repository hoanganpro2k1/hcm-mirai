"use client";

import { postService } from "@/services/post.service";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { NewsCard } from "./NewsCard";
import { NewsCardSkeleton } from "./NewsCardSkeleton";

export default function NewsGrid() {
  const t = useTranslations("News");

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["posts", "all"],
    queryFn: ({ pageParam = 1 }) =>
      postService.getPosts(pageParam as number, 9),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });

  const posts = data?.pages.flatMap((page) => page.data) || [];

  if (isLoading) {
    return (
      <div className="container mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {Array.from({ length: 6 }).map((_, i) => (
            <NewsCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="bg-white dark:bg-gray-950 transition-colors">
      <div className="relative w-full bg-[#EBF4F6] dark:bg-blue-950/20 py-16 md:py-24 mb-16 md:mb-20 flex flex-col items-center justify-center border-y border-[#2B3A67]/10 dark:border-white/10 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-medium text-[#2B3A67] dark:text-white uppercase tracking-wide leading-tight">
            {t("intro.title")}
          </h2>
        </div>
      </div>

      <div className="container mx-auto px-6 pb-24">
        {isError && (
          <div className="text-center py-10 text-red-500">
            Có lỗi xảy ra khi tải bài viết. Vui lòng thử lại sau.
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.map((item, idx) => (
            <NewsCard
              key={item.id}
              post={item}
              index={idx}
              buttonLabel={t("grid.read_more")}
            />
          ))}
        </div>

        {/* Load More Button */}
        {hasNextPage && (
          <div className="mt-20 text-center">
            <button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="px-10 py-4 border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-2xl font-black uppercase text-sm tracking-widest transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
            >
              {isFetchingNextPage && (
                <Loader2 className="w-4 h-4 animate-spin" />
              )}
              {t("grid.load_more")}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
