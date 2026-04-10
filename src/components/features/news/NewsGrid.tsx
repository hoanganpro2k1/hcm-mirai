"use client";

import { Link } from "@/i18n/routing";
import { ArrowRight, Calendar, User, Video, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { postService } from "@/services/post.service";
import { useInfiniteQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { IPost } from "@/types/post.type";

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
    queryFn: ({ pageParam = 1 }) => postService.getPosts(pageParam as number, 9),
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
      <div className="flex justify-center items-center py-40">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
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
            <div
              key={item.id}
              className="group flex flex-col bg-[#F8FAFC] dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[2.5rem] overflow-hidden hover:shadow-2xl hover:border-red-600 transition-all duration-500 animate-in fade-in slide-in-from-bottom-12"
              style={{ animationDelay: `${(idx % 9) * 100}ms` }}
            >
              {/* Image Container */}
              <div className="relative aspect-3/2 overflow-hidden bg-slate-100">
                {item.thumbnail ? (
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-300">
                    No image
                  </div>
                )}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase text-primary tracking-widest shadow-sm">
                    {item.category === "news" ? "Tin tức" : item.category === "event" ? "Sự kiện" : "Tuyển sinh"}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-4 text-xs font-bold text-gray-400 mb-4">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>
                      {item.publishedAt 
                        ? format(new Date(item.publishedAt), "dd/MM/yyyy")
                        : format(new Date(item.createdAt), "dd/MM/yyyy")}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 border-l border-gray-200 dark:border-gray-700 pl-4">
                    <User className="w-3.5 h-3.5" />
                    <span>{item.author?.name || "Admin"}</span>
                  </div>
                </div>

                <h3 className="text-xl font-black text-[#1E293B] dark:text-white uppercase tracking-tight line-clamp-2 leading-tight mb-6 group-hover:text-red-600 transition-colors italic">
                  {item.title}
                </h3>

                <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-200/50 dark:border-gray-700">
                  <Link
                    href={`/tin-tuc/${item.slug}`}
                    className="flex items-center gap-2 font-black uppercase text-xs tracking-widest group/btn"
                  >
                    <span>{t("grid.read_more")}</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                  <div className="w-1.5 h-1.5 bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </div>
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
              {isFetchingNextPage && <Loader2 className="w-4 h-4 animate-spin" />}
              {t("grid.load_more")}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

