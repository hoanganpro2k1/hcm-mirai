"use client";

import { Award, Globe, GraduationCap, Plane } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function StudyProgramGrid() {
  const t = useTranslations("StudyAbroad");

  const programs = [
    {
      title: t("programs.prog1.title"),
      desc: t("programs.prog1.desc"),
      icon: <Globe className="w-8 h-8 text-red-600" />,
      image: "https://picsum.photos/id/101/800/600",
    },
    {
      title: t("programs.prog2.title"),
      desc: t("programs.prog2.desc"),
      icon: <GraduationCap className="w-8 h-8 text-blue-600" />,
      image: "https://picsum.photos/id/102/800/600",
    },
    {
      title: t("programs.prog3.title"),
      desc: t("programs.prog3.desc"),
      icon: <Plane className="w-8 h-8 text-purple-600" />,
      image: "https://picsum.photos/id/103/800/600",
    },
    {
      title: t("programs.prog4.title"),
      desc: t("programs.prog4.desc"),
      icon: <Award className="w-8 h-8 text-green-600" />,
      image: "https://picsum.photos/id/104/800/600",
    },
  ];

  return (
    <section className="py-24 bg-[#F8FAFC] dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-6">
        <div className="mb-20 text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black text-[#1E293B] dark:text-white uppercase tracking-tighter leading-tight mb-6">
            {t("intro.title")}
          </h2>
          <div className="w-24 h-2 bg-red-600 mx-auto mb-8" />
          <p className="text-gray-500 dark:text-gray-400 text-lg md:text-xl leading-relaxed italic">
            {t("intro.desc")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {programs.map((program, idx) => (
            <div
              key={idx}
              className="group flex flex-col md:flex-row bg-white dark:bg-gray-800 rounded-[3rem] overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-2xl transition-all duration-500 animate-in fade-in slide-in-from-bottom-12"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="md:w-1/2 relative h-64 md:h-full overflow-hidden">
                <Image
                  src={program.image}
                  alt={program.title}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
              </div>
              <div className="md:w-1/2 p-10 flex flex-col justify-center">
                <div className="w-16 h-16 bg-gray-50 dark:bg-gray-700 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                  {program.icon}
                </div>
                <h3 className="text-2xl font-black text-[#1E293B] dark:text-white uppercase tracking-tight mb-4">
                  {program.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
                  {program.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
