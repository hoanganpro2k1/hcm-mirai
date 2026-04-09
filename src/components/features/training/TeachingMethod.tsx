"use client";

import { IMAGES } from "@/constants/images";
import { Award, BookText, Laptop, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function TeachingMethod() {
  const t = useTranslations("Training.features");
  const tMethod = useTranslations("Training.method");

  const methods = [
    {
      icon: <Users className="w-8 h-8 text-red-600" />,
      title: t("native"),
      desc: t("native_desc"),
      color: "bg-red-50",
    },
    {
      icon: <BookText className="w-8 h-8 text-blue-600" />,
      title: t("curriculum"),
      desc: t("curriculum_desc"),
      color: "bg-blue-50",
    },
    {
      icon: <Laptop className="w-8 h-8 text-purple-600" />,
      title: t("facilities"),
      desc: t("facilities_desc"),
      color: "bg-purple-50",
    },
    {
      icon: <Award className="w-8 h-8 text-green-600" />,
      title: t("support"),
      desc: t("support_desc"),
      color: "bg-green-50",
    },
  ];

  return (
    <section className="py-24 bg-[#F8FAFC] dark:bg-gray-900 overflow-hidden relative transition-colors">
      {/* Decorative Ornaments */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left: Content Header */}
          <div className="max-w-xl animate-in fade-in slide-in-from-left-12 duration-1000">
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-2 text-primary font-bold text-sm tracking-[0.2em] uppercase opacity-70">
                <div className="w-8 h-[2px] bg-primary" />
                <span>{tMethod("badge")}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-[#1E293B] dark:text-white uppercase tracking-tighter leading-tight">
                {tMethod("title_start")}{" "}
                <span className="text-red-600">
                  {tMethod("title_highlight")}
                </span>{" "}
                {tMethod("title_end")}
              </h2>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed mb-10 italic">
              {tMethod("desc")}
            </p>

            {/* Illustration or Image Stack */}
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square bg-gray-200 dark:bg-gray-800 rounded-[2rem] overflow-hidden relative group">
                <Image
                  src={IMAGES.TRAINING.teachingMethod1}
                  alt="Classroom"
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-all duration-700"
                />
              </div>
              <div className="aspect-square bg-gray-200 dark:bg-gray-800 rounded-[2rem] overflow-hidden relative group mt-8">
                <Image
                  src={IMAGES.TRAINING.teachingMethod2}
                  alt="Reading"
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-all duration-700"
                />
              </div>
            </div>
          </div>

          {/* Right: Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 animate-in fade-in slide-in-from-right-12 duration-1000">
            {methods.map((method, idx) => (
              <div
                key={idx}
                className={`p-8 rounded-[2.5rem] bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group`}
              >
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-sm`}
                >
                  {method.icon}
                </div>
                <h3 className="text-xl font-black text-[#1E293B] dark:text-white uppercase tracking-tight mb-4">
                  {method.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base leading-relaxed">
                  {method.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
