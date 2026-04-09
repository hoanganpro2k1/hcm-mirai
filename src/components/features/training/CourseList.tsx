"use client";

import { Link } from "@/i18n/routing";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  GraduationCap,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function CourseList() {
  const t = useTranslations("Training");

  const courses = [
    {
      id: "japanese",
      title: t("courses.japanese.title"),
      subtitle: t("courses.japanese.subtitle"),
      desc: t("courses.japanese.desc"),
      icon: <BookOpen className="w-8 h-8 text-red-600" />,
      levels: ["N5", "N4", "N3", "N2", "N1"],
      accent: "bg-red-600",
      image: "https://picsum.photos/id/21/800/600",
    },
    {
      id: "korean",
      title: t("courses.korean.title"),
      subtitle: t("courses.korean.subtitle"),
      desc: t("courses.korean.desc"),
      icon: <GraduationCap className="w-8 h-8 text-blue-600" />,
      levels: ["TOPIK I", "TOPIK II"],
      accent: "bg-blue-600",
      image: "https://picsum.photos/id/22/800/600",
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-gray-950 transition-colors">
      <div className="container mx-auto px-6">
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black text-[#1E293B] dark:text-white uppercase tracking-tighter leading-tight mb-6">
            {t("intro.title")}
          </h2>
          <div className="w-24 h-2 bg-red-600 mx-auto mb-8" />
          <p className="text-gray-500 dark:text-gray-400 text-lg md:text-xl font-medium leading-relaxed italic">
            {t("intro.desc")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {courses.map((course) => (
            <div
              key={course.id}
              className="group relative bg-[#F8FAFC] dark:bg-gray-900 rounded-[3rem] overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-2xl transition-all duration-500 animate-in fade-in slide-in-from-bottom-12"
            >
              {/* Banner Image */}
              <div className="relative h-48 md:h-64 overflow-hidden">
                <Image
                  fill
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div
                  className={`absolute inset-0 bg-linear-to-t from-gray-900 via-transparent to-transparent opacity-60`}
                />
                <div className="absolute bottom-6 left-8 flex items-center gap-4">
                  <div className={`p-4 ${course.accent} rounded-2xl shadow-xl`}>
                    {course.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                      {course.title}
                    </h3>
                    <p className="text-white/80 font-bold">{course.subtitle}</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-10 space-y-8">
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                  {course.desc}
                </p>

                <div className="space-y-4">
                  <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">
                    Levels Offered
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {course.levels.map((level) => (
                      <span
                        key={level}
                        className="px-4 py-2 bg-white dark:bg-gray-800 rounded-full text-sm font-bold text-gray-700 dark:text-gray-300 border border-gray-100 dark:border-gray-700"
                      >
                        {level}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-green-600 font-bold">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Chứng chỉ uy tín</span>
                  </div>
                  <Link
                    href="/lien-he"
                    className="flex items-center gap-2 font-black uppercase text-sm group/btn"
                  >
                    <span>Tìm hiểu lộ trình</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Background Decoration */}
              <div
                className={`absolute -top-12 -right-12 w-32 h-32 ${course.accent} opacity-5 rounded-full blur-3xl pointer-events-none group-hover:opacity-10 transition-opacity`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
