"use client";

import { IMAGES } from "@/constants/images";
import { Award, ChevronRight, Globe, GraduationCap, Plane } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function StudyProgramGrid() {
  const t = useTranslations("StudyAbroad");

  const programIds = ["prog1", "prog2", "prog3", "prog4"];
  const icons = [
    <Globe key="1" className="w-8 h-8 text-red-600" />,
    <GraduationCap key="2" className="w-8 h-8 text-blue-600" />,
    <Plane key="3" className="w-8 h-8 text-purple-600" />,
    <Award key="4" className="w-8 h-8 text-green-600" />,
  ];

  return (
    <section className="py-24 bg-[#F8FAFC] dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-6">
        <div className="mb-20 text-center max-w-4xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full bg-red-50 text-red-600 text-sm font-bold mb-4 uppercase tracking-tighter">
            {t("intro.badge_admission")}
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-[#1E293B] dark:text-white uppercase tracking-tighter leading-tight mb-6">
            {t("intro.title")}
          </h2>
          <div className="w-24 h-2 bg-red-600 mx-auto mb-8" />
          <p className="text-gray-500 dark:text-gray-400 text-lg md:text-xl leading-relaxed italic font-medium">
            {t("intro.desc")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {programIds.map((id, idx) => (
            <div
              key={id}
              className="group flex flex-col lg:flex-row bg-white dark:bg-gray-800 rounded-[3rem] overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-2xl transition-all duration-500 animate-in fade-in slide-in-from-bottom-12"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="lg:w-2/5 relative h-64 lg:h-auto overflow-hidden">
                <Image
                  src={
                    IMAGES.STUDY_ABROAD.PROGRAMS[
                      `program${idx + 1}` as keyof typeof IMAGES.STUDY_ABROAD.PROGRAMS
                    ]
                  }
                  alt={t(`programs.${id}.title`)}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                  {(t.raw(`programs.${id}.tags`) as string[]).map(
                    (tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="bg-white/90 backdrop-blur-sm text-primary text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-lg"
                      >
                        {tag}
                      </span>
                    ),
                  )}
                </div>
              </div>
              <div className="lg:w-3/5 p-10 flex flex-col justify-center">
                <div className="w-16 h-16 bg-gray-50 dark:bg-gray-700 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-gray-100 dark:border-gray-600 group-hover:bg-primary group-hover:text-white transition-all">
                  {icons[idx]}
                </div>
                <h3 className="text-2xl font-black text-[#1E293B] dark:text-white uppercase tracking-tight mb-4 group-hover:text-primary transition-colors">
                  {t(`programs.${id}.title`)}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-8 italic">
                  {t(`programs.${id}.desc`)}
                </p>
                <div className="mt-auto">
                  <button className="flex items-center gap-2 text-primary font-black uppercase text-sm tracking-wider group/btn transition-all">
                    {t("intro.learn_more")}
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover/btn:bg-primary group-hover/btn:text-white transition-all">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
