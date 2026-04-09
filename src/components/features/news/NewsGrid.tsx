"use client";

import { Link } from "@/i18n/routing";
import { ArrowRight, Calendar, User, Video } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function NewsGrid() {
  const t = useTranslations("News");

  const news = [
    {
      id: 1,
      title:
        "HCM-MIRAI ký kết biên bản ghi nhớ với trường Đại học Dong-A Hàn Quốc",
      category: "Tin tức",
      date: "2024-04-05",
      author: "Admin",
      image: "https://picsum.photos/id/1/800/600",
      type: "news",
    },
    {
      id: 2,
      title:
        "Học viên HCM-MIRAI chinh phục visa du học Nhật Bản kỳ tháng 4/2024",
      category: "Sự kiện",
      date: "2024-03-28",
      author: "Admin",
      image: "https://picsum.photos/id/2/800/600",
      type: "event",
    },
    {
      id: 3,
      title:
        "Hành trình trải nghiệm văn hóa rực rỡ tại Trung tâm Đào tạo HCM-MIRAI",
      category: "Sự kiện",
      date: "2024-03-15",
      author: "Admin",
      image: "https://picsum.photos/id/3/800/600",
      type: "event",
    },
    {
      id: 4,
      title: "Thông báo tuyển sinh du học Đức diện chuyển đổi bằng điều dưỡng",
      category: "Tuyển sinh",
      date: "2024-03-10",
      author: "Admin",
      image: "https://picsum.photos/id/4/800/600",
      type: "news",
    },
    {
      id: 5,
      title:
        "Lễ chia tay học viên kỳ bay tháng 4 - Những giọt nước mắt hạnh phúc",
      category: "Sự kiện",
      date: "2024-03-05",
      author: "Admin",
      image: "https://picsum.photos/id/5/800/600",
      type: "video",
    },
    {
      id: 6,
      title: "Bí quyết học tiếng Nhật N3 trong vòng 6 tháng từ con số 0",
      category: "Tin tức",
      date: "2024-02-28",
      author: "Admin",
      image: "https://picsum.photos/id/6/800/600",
      type: "news",
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-gray-950 transition-colors">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 text-center md:text-left">
          <div className="max-w-2xl">
            <div className="flex items-center justify-center md:justify-start gap-2 text-primary font-bold text-sm tracking-widest uppercase mb-4 opacity-70">
              <div className="w-8 h-0.5 bg-primary" />
              <span>{t("grid.latest_update")}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-[#1E293B] dark:text-white uppercase tracking-tighter leading-tight">
              {t("intro.title")}
            </h2>
          </div>
          <nav className="flex items-center justify-center gap-2 overflow-x-auto pb-4 md:pb-0">
            {Object.entries(t.raw("grid.categories")).map(([key, label]: [string, any]) => (
              <button
                key={key}
                className={`px-6 py-2.5 rounded-full text-sm font-black uppercase tracking-widest whitespace-nowrap transition-all ${
                  key === "all"
                    ? "bg-red-600 text-white shadow-lg shadow-red-200 dark:shadow-none"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-red-50 hover:text-red-600"
                }`}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {news.map((item, idx) => (
            <div
              key={item.id}
              className="group flex flex-col bg-[#F8FAFC] dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[2.5rem] overflow-hidden hover:shadow-2xl hover:border-red-600 transition-all duration-500 animate-in fade-in slide-in-from-bottom-12"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Image Container */}
              <div className="relative aspect-3/2 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase text-primary tracking-widest">
                    {item.category}
                  </span>
                  {item.type === "video" && (
                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white">
                      <Video className="w-4 h-4 fill-current" />
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-4 text-xs font-bold text-gray-400 mb-4">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 border-l border-gray-200 dark:border-gray-700 pl-4">
                    <User className="w-3.5 h-3.5" />
                    <span>{item.author}</span>
                  </div>
                </div>

                <h3 className="text-xl font-black text-[#1E293B] dark:text-white uppercase tracking-tight line-clamp-2 leading-tight mb-6 group-hover:text-red-600 transition-colors italic">
                  {item.title}
                </h3>

                <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-200/50 dark:border-gray-700">
                  <Link
                    href={`/tin-tuc/${item.id}`}
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
        <div className="mt-20 text-center">
          <button className="px-10 py-4 border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-2xl font-black uppercase text-sm tracking-widest transition-all">
            {t("grid.load_more")}
          </button>
        </div>
      </div>
    </section>
  );
}
