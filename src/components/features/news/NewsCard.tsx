"use client";

import { Link } from "@/i18n/routing";
import { format } from "date-fns";
import { Calendar, ChevronRight, User } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { IPost } from "@/types/post.type";

interface NewsCardProps {
  post: any; // Use any to support both IPost and static items from BlogSection
  index?: number;
  buttonLabel?: string;
}

export const NewsCard = ({ post, index = 0, buttonLabel }: NewsCardProps) => {
  const t = useTranslations("News.grid");

  // Determine what property to use for the link (prefer slug, fallback to id)
  const linkHref = `/tin-tuc/${post.slug || post.id}`;

  // Formatting date - handle both Date objects, string dates, and static strings
  let displayDate = "";
  try {
    if (post.publishedAt || post.createdAt) {
      displayDate = format(
        new Date(post.publishedAt || post.createdAt),
        "dd/MM/yyyy"
      );
    } else {
      displayDate = post.date || "";
    }
  } catch (e) {
    displayDate = post.date || "";
  }

  // Handle category display - supports raw key or already translated label
  const categoryLabel =
    post.category === "news"
      ? "Tin tức"
      : post.category === "event"
      ? "Sự kiện"
      : post.category === "admission"
      ? "Tuyển sinh"
      : post.category; // fallback to the value itself (for static translations)

  // Handle author
  const authorName = typeof post.author === "string" ? post.author : post.author?.name || "Admin";

  // Handle image
  const thumbnail = post.thumbnail || post.image;

  // Handle excerpt - strip HTML if it's from RichTextEditor
  const rawSummary = post.summary || post.excerpt || (post.content || "");
  const summary = rawSummary.replace(/<[^>]*>?/gm, "").substring(0, 160);

  return (
    <article
      className="group bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-2xl transition-all animate-in fade-in slide-in-from-bottom-12"
      style={{ animationDelay: `${(index % 9) * 100}ms` }}
    >
      <Link href={linkHref} className="block relative h-60 overflow-hidden">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-slate-100 dark:bg-slate-800 text-slate-400">
            No image
          </div>
        )}
        <div className="absolute top-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
          <span className="bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">
            {categoryLabel}
          </span>
        </div>
      </Link>

      <div className="p-8 flex flex-col h-[calc(100%-15rem)]">
        <div className="flex items-center gap-4 text-xs font-semibold text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-widest">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {displayDate}
          </span>
          <span className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5" />
            {authorName}
          </span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight line-clamp-2 min-h-[56px] group-hover:text-primary transition-colors italic">
          <Link href={linkHref}>{post.title}</Link>
        </h3>

        <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
          {summary}
        </p>

        <div className="mt-auto pt-6 border-t border-gray-50 dark:border-gray-800">
          <Link
            href={linkHref}
            className="inline-flex items-center gap-2 text-primary dark:text-blue-400 font-bold hover:text-accent transition-colors group/link uppercase text-xs tracking-widest"
          >
            {buttonLabel || t("read_more")}
            <ChevronRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
};
