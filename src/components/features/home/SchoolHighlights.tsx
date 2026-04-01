"use client";

import { SectionHeader } from "@/components/ui/section-header";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin } from "lucide-react";

const schools = [
  {
    id: 1,
    name: "Đại học Yonsei (Yonsei University)",
    location: "Seoul, Hàn Quốc",
    image: "https://picsum.photos/600/400?yonsei",
    description: "Một trong những trường đại học tư thục lâu đời và uy tín nhất Hàn Quốc.",
    tags: ["Top 1%"],
  },
  {
    id: 2,
    name: "Đại học Quốc gia Seoul (SNU)",
    location: "Seoul, Hàn Quốc",
    image: "https://picsum.photos/600/400?snu",
    description: "Trường đại học danh giá nhất Hàn Quốc, biểu tượng của giáo dục xứ Kim Chi.",
    tags: ["Ưu tú"],
  },
  {
    id: 3,
    name: "Đại học Tokyo (UTokyo)",
    location: "Tokyo, Nhật Bản",
    image: "https://picsum.photos/600/400?tokyo",
    description: "Trường đại học nghiên cứu hàng đầu Châu Á và thế giới.",
    tags: ["Top Thế giới"],
  },
];

export default function SchoolHighlights() {
  return (
    <section className="py-20 bg-primary/5 dark:bg-primary/10 transition-colors">
      <div className="container mx-auto px-6">
        <SectionHeader
          title="Chọn Trường Phù Hợp Cho Hành Trình Du Học"
          subtitle="Các trường học tiêu biểu"
          align="left"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {schools.map((school) => (
            <div
              key={school.id}
              className="group bg-white dark:bg-gray-800 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-xl hover:shadow-2xl transition-all"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={school.image}
                  alt={school.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  {school.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-accent text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase italic"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-8 space-y-4">
                <div className="flex items-center gap-2 text-primary font-bold text-sm">
                  <MapPin className="w-4 h-4" />
                  {school.location}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-snug group-hover:text-primary transition-colors">
                  {school.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                  {school.description}
                </p>
                <div className="pt-4">
                  <Button
                    variant="outline"
                    className="w-full rounded-xl border-2 hover:bg-primary hover:text-white transition-all font-bold gap-2 group/btn"
                  >
                    Xem chi tiết
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button
            variant="ghost"
            className="text-primary hover:text-accent font-bold text-lg gap-2"
          >
            Khám phá hơn 200 trường liên kết
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
