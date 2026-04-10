"use client";

import { SectionHeader } from "@/components/ui/section-header";
import { ChevronRight, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { NewsCard } from "../news/NewsCard";
import { useQuery } from "@tanstack/react-query";
import { postService } from "@/services/post.service";
import { Skeleton } from "@/components/ui/skeleton";

export default function BlogSection() {
  const t = useTranslations("HomeBlog");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["posts", "home"],
    queryFn: () => postService.getPosts(1, 3),
  });

  const posts = data?.data || [];

  return (
    <section className="py-20 bg-white dark:bg-gray-950 transition-colors">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <SectionHeader
            title={t("title")}
            subtitle={t("subtitle")}
            align="left"
            className="mb-0"
          />
          <Link
            href="/tin-tuc"
            className="hidden md:flex items-center gap-2 text-primary font-bold hover:text-accent transition-colors"
          >
            {t("view_all")}
            <ChevronRight className="w-5 h-5 bg-primary/10 rounded-full p-0.5 group-hover:bg-accent group-hover:text-white transition-all" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {isLoading ? (
            // Skeletons
            [...Array(3)].map((_, i) => (
              <div key={i} className="rounded-3xl border border-gray-100 dark:border-gray-800 p-8 space-y-6">
                <Skeleton className="h-60 w-full rounded-2xl" />
                <div className="space-y-3">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-20 w-full" />
                </div>
              </div>
            ))
          ) : isError ? (
            <div className="col-span-full text-center py-10 text-gray-500">
              Không thể tải bài viết mới nhất.
            </div>
          ) : (
            posts.map((item, idx) => (
              <NewsCard 
                key={item.id} 
                post={item} 
                index={idx} 
                buttonLabel={t("view_details")} 
              />
            ))
          )}
        </div>

        {/* Mobile View all button */}
        <div className="mt-12 md:hidden text-center">
          <Link
            href="/tin-tuc"
            className="inline-flex items-center gap-2 text-primary font-bold hover:text-accent transition-colors"
          >
            {t("view_all")}
            <ChevronRight className="w-5 h-5 bg-primary/10 rounded-full p-0.5 group-hover:bg-accent group-hover:text-white transition-all" />
          </Link>
        </div>
      </div>
    </section>
  );
}
