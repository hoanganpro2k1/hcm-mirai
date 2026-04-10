import PageBreadcrumbs from "@/components/common/PageBreadcrumbs";
import ConsultationForm from "@/components/features/home/ConsultationForm";
import { postService } from "@/services/post.service";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Calendar, User, Tag, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Metadata } from "next";

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string; slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await postService.getPostBySlug(slug);
    return {
      title: `${post.title} | HCM Mirai`,
      description: post.summary || post.title,
      openGraph: {
        images: post.thumbnail ? [post.thumbnail] : [],
      },
    };
  } catch (error) {
    return {
      title: "Bài viết không tồn tại | HCM Mirai",
    };
  }
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  
  let post;
  try {
    post = await postService.getPostBySlug(slug);
  } catch (error) {
    notFound();
  }

  const t = await getTranslations("News");

  const breadcrumbItems = [
    { label: t("hero.breadcrumb"), href: "/" },
    { label: t("hero.title"), href: "/tin-tuc" },
    { label: post.title },
  ];

  return (
    <main className="min-h-screen">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-6 py-4">
        <PageBreadcrumbs items={breadcrumbItems} />
      </div>

      {/* Hero Section */}
      <div className="relative w-full bg-[#EBF4F6] dark:bg-blue-950/20 py-16 md:py-24 mb-12 flex flex-col items-center justify-center border-y border-[#2B3A67]/10 dark:border-white/10 overflow-hidden text-center">
        <div className="container mx-auto px-6 relative z-10 max-w-4xl">
          <h1 className="text-3xl md:text-5xl font-medium text-[#2B3A67] dark:text-white uppercase tracking-wide leading-tight mb-6">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-bold text-gray-500 uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span>{format(new Date((post as any).publishedAt || post.createdAt), "dd/MM/yyyy")}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-primary" />
              <span>{post.author?.name || "Admin"}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full">
              <Tag className="w-3 h-3" />
              <span>
                {post.category === "news" ? "Tin tức" : post.category === "event" ? "Sự kiện" : "Tuyển sinh"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 pb-24 max-w-4xl">
        {/* Back Button */}
        <Link 
          href="/tin-tuc" 
          className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-primary transition-colors mb-12 uppercase tracking-widest group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Quay lại danh sách</span>
        </Link>

        <article>
          {/* Featured Image */}
          {post.thumbnail && (
            <div className="relative aspect-video rounded-[2.5rem] overflow-hidden mb-12 shadow-2xl group bg-slate-100">
              <Image
                src={post.thumbnail}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                priority
              />
            </div>
          )}

          {/* Summary */}
          {post.summary && (
            <div className="mb-12 p-8 bg-slate-50 dark:bg-gray-900 border-l-4 border-[#1c2559] rounded-r-3xl italic text-lg text-gray-600 dark:text-gray-300 leading-relaxed shadow-sm">
              {post.summary}
            </div>
          )}

          {/* Main Content */}
          <div 
            className="prose prose-lg dark:prose-invert max-w-none 
              prose-headings:text-[#2B3A67] dark:prose-headings:text-white
              prose-p:text-gray-600 dark:prose-p:text-gray-300
              prose-img:rounded-3xl prose-img:shadow-xl
              prose-a:text-primary hover:prose-a:text-red-600
              transition-colors"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>

      <ConsultationForm />
    </main>
  );
}
