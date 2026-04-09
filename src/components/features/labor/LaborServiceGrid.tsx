"use client";

import { Link } from "@/i18n/routing";
import {
  Briefcase,
  CheckCircle2,
  Construction,
  Shirt,
  Utensils,
  Wrench,
} from "lucide-react";
import { useTranslations } from "next-intl";

interface LaborServiceGridProps {
  namespace: "LaborDomestic" | "LaborOverseas";
}

export default function LaborServiceGrid({ namespace }: LaborServiceGridProps) {
  const t = useTranslations(namespace);
  const tCommon = useTranslations("LaborCommon");

  const categories = [
    {
      icon: <Construction className="w-8 h-8 text-red-600" />,
      title: tCommon("categories.cat1.title"),
      desc: tCommon("categories.cat1.desc"),
      color: "bg-red-50",
    },
    {
      icon: <Wrench className="w-8 h-8 text-blue-600" />,
      title: tCommon("categories.cat2.title"),
      desc: tCommon("categories.cat2.desc"),
      color: "bg-blue-50",
    },
    {
      icon: <Shirt className="w-8 h-8 text-purple-600" />,
      title: tCommon("categories.cat3.title"),
      desc: tCommon("categories.cat3.desc"),
      color: "bg-purple-50",
    },
    {
      icon: <Utensils className="w-8 h-8 text-green-600" />,
      title: tCommon("categories.cat4.title"),
      desc: tCommon("categories.cat4.desc"),
      color: "bg-green-50",
    },
    {
      icon: <Briefcase className="w-8 h-8 text-orange-600" />,
      title: tCommon("categories.cat5.title"),
      desc: tCommon("categories.cat5.desc"),
      color: "bg-orange-50",
    },
    {
      icon: <CheckCircle2 className="w-8 h-8 text-teal-600" />,
      title: tCommon("categories.cat6.title"),
      desc: tCommon("categories.cat6.desc"),
      color: "bg-teal-50",
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-gray-950 transition-colors">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-primary font-bold text-sm tracking-widest uppercase mb-4 opacity-70">
              <div className="w-8 h-0.5 bg-primary" />
              <span>{tCommon("badge")}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-[#1E293B] dark:text-white uppercase tracking-tighter leading-tight mb-6">
              {t("intro.title")}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed italic">
              {t("intro.desc")}
            </p>
          </div>
          <Link
            href="/don-hang"
            className="px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-black uppercase text-sm tracking-widest shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all"
          >
            {tCommon("cta")}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="group p-8 rounded-[2.5rem] bg-[#F8FAFC] dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-2xl hover:border-red-600 transition-all duration-500 animate-in fade-in slide-in-from-bottom-8"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div
                className={`w-16 h-16 rounded-2xl ${cat.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}
              >
                {cat.icon}
              </div>
              <h3 className="text-2xl font-black text-[#1E293B] dark:text-white uppercase tracking-tight mb-4">
                {cat.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-8">
                {cat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
