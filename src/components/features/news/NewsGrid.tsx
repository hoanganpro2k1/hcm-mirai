import { postService } from "@/services/post.service";
import { NewsCard } from "./NewsCard";
import { PaginationWrapper } from "@/components/common/PaginationWrapper";
import { getTranslations } from "next-intl/server";

interface NewsGridProps {
  page: number;
  limit: number;
}

export default async function NewsGrid({ page, limit }: NewsGridProps) {
  const t = await getTranslations("News");
  const { data: posts, totalPages, page: currentPage } = await postService.getPosts(page, limit);

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
          {posts.map((item, idx) => (
            <NewsCard
              key={item.id}
              post={item}
              index={idx}
              buttonLabel={t("grid.read_more")}
            />
          ))}
        </div>

        <PaginationWrapper 
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
    </section>
  );
}
