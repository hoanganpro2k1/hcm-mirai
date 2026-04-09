"use client";

import { SectionHeader } from "@/components/ui/section-header";
import { Calendar, ChevronRight, User } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/routing";

export default function BlogSection() {
  const t = useTranslations("HomeBlog");

  const newsItems = [
    {
      id: 1,
      title: t("items.item_1.title"),
      category: t("items.item_1.category"),
      date: "15/03/2026",
      author: t("author_admin"),
      image: "https://picsum.photos/600/400?news1",
      excerpt: t("items.item_1.excerpt"),
    },
    {
      id: 2,
      title: t("items.item_2.title"),
      category: t("items.item_2.category"),
      date: "12/03/2026",
      author: t("author_consultant"),
      image: "https://picsum.photos/600/400?news2",
      excerpt: t("items.item_2.excerpt"),
    },
    {
      id: 3,
      title: t("items.item_3.title"),
      category: t("items.item_3.category"),
      date: "10/03/2026",
      author: t("author_admin"),
      image: "https://picsum.photos/600/400?news3",
      excerpt: t("items.item_3.excerpt"),
    },
  ];

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
          {newsItems.map((item) => (
            <article
              key={item.id}
              className="group bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-2xl transition-all"
            >
              <Link
                href={`/tin-tuc/${item.id}`}
                className="block relative h-60 overflow-hidden"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                  <span className="bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                    {item.category}
                  </span>
                </div>
              </Link>

              <div className="p-8">
                <div className="flex items-center gap-4 text-xs font-semibold text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-widest">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {item.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    {item.author}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight line-clamp-2 min-h-[56px] group-hover:text-primary transition-colors">
                  <Link href={`/tin-tuc/${item.id}`}>{item.title}</Link>
                </h3>

                <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                  {item.excerpt}
                </p>

                <div className="mt-8 pt-6 border-t border-gray-50 dark:border-gray-800">
                  <Link
                    href={`/tin-tuc/${item.id}`}
                    className="inline-flex items-center gap-2 text-primary dark:text-blue-400 font-bold hover:text-accent transition-colors group/link"
                  >
                    {t("view_details")}
                    <ChevronRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
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
