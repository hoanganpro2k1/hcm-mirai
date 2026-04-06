"use client";

import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const categories = [
  { id: "korea", label: "Hàn Quốc" },
  { id: "japan", label: "Nhật Bản" },
  { id: "taiwan", label: "Đài Loan" },
  { id: "australia", label: "Úc" },
  { id: "germany", label: "Đức" },
  { id: "labor", label: "XKLĐ" },
];

const programs = [
  {
    id: 1,
    category: "korea",
    title: "Du học Hàn Quốc hệ D2-1 (Cao đẳng mẫu mực)",
    tag: "Hot",
    image: "https://picsum.photos/400/300?korea-1",
  },
  {
    id: 2,
    category: "korea",
    title: "Du học Hàn Quốc hệ D4-1 (Visa tiếng Hàn)",
    tag: "Mới",
    image: "https://picsum.photos/400/300?korea-2",
  },
  {
    id: 3,
    category: "japan",
    title: "Du học Nhật Bản hệ tự túc (Kỳ tháng 10)",
    tag: "Tuyển sinh",
    image: "https://picsum.photos/400/300?japan-1",
  },
  {
    id: 4,
    category: "japan",
    title: "Học bổng báo Nhật Bản 2026",
    tag: "Học bổng",
    image: "https://picsum.photos/400/300?japan-2",
  },
  {
    id: 5,
    category: "labor",
    title: "Đơn hàng cơ khí Nhật Bản (Lương cao)",
    tag: "XKLĐ",
    image: "https://picsum.photos/400/300?labor-1",
  },
  {
    id: 6,
    category: "australia",
    title: "Du học Úc diện đào tạo nghề (Subclass 407)",
    tag: "Hot",
    image: "https://picsum.photos/400/300?australia-1",
  },
];

export default function ProgramSection() {
  const [activeTab, setActiveTab] = useState("korea");

  const filteredPrograms =
    activeTab === "all"
      ? programs
      : programs.filter((p) => p.category === activeTab);

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900/50 transition-colors">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <SectionHeader
            title="Chương trình du học và đào tạo"
            align="left"
            className="mb-0"
          />

          {/* Tabs Navigation */}
          <div className="flex flex-wrap gap-2 mt-6 md:mt-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={cn(
                  "px-6 py-2.5 rounded-full text-sm font-bold transition-all border-2",
                  activeTab === cat.id
                    ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                    : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-100 dark:border-gray-700 hover:border-primary/50",
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPrograms.length > 0 ? (
            filteredPrograms.map((program) => (
              <div
                key={program.id}
                className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all hover:-translate-y-1"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-accent text-white text-[10px] uppercase font-black px-3 py-1 rounded-full shadow-lg">
                      {program.tag}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-snug line-clamp-2 min-h-[56px] group-hover:text-primary transition-colors">
                    {program.title}
                  </h3>
                  <div className="mt-4 pt-4 border-t border-gray-50 dark:border-gray-700 flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 group-hover:text-primary transition-colors">
                      Xem chi tiết
                    </span>
                    <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-gray-500 dark:text-gray-400 italic">
                Hiện tại chưa có chương trình nào cho chuyên mục này. Vui lòng
                quay lại sau!
              </p>
            </div>
          )}
        </div>

        {/* View all button */}
        <div className="mt-12 text-center">
          <button className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all hover:text-accent group">
            Xem tất cả chương trình
            <ChevronRight className="w-5 h-5 bg-primary/10 rounded-full p-0.5 group-hover:bg-accent group-hover:text-white transition-all" />
          </button>
        </div>
      </div>
    </section>
  );
}
