"use client";

import { IMAGES } from "@/constants/images";
import {
  CheckCircle2,
  History,
  Languages,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function BenefitsSection() {
  const t = useTranslations("About.benefits");

  const benefits = [
    {
      key: "item1",
      icon: History,
      color: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      key: "item2",
      icon: Languages,
      color: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
    {
      key: "item3",
      icon: ShieldCheck,
      color: "bg-red-100",
      iconColor: "text-red-600",
    },
    {
      key: "item4",
      icon: TrendingUp,
      color: "bg-amber-100",
      iconColor: "text-amber-600",
    },
  ];

  return (
    <section className="py-12 md:py-20 md:py-32 bg-gray-50 dark:bg-gray-900 transition-colors overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 md:mb-24 flex flex-col items-center">
          <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4">
            Tại sao là chúng tôi?
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white max-w-3xl leading-tight">
            {t("title")}
          </h2>
          <div className="w-24 h-1.5 bg-primary mt-8 rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Grid logic */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="group p-8 bg-white dark:bg-gray-800 rounded-2xl md:rounded-2xl md:rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-50 dark:border-gray-700 hover:-translate-y-2"
              >
                <div
                  className={`w-14 h-14 rounded-2xl ${benefit.color} flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300`}
                >
                  <benefit.icon className={`w-8 h-8 ${benefit.iconColor}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                  {t(`${benefit.key}.title`)}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed font-medium">
                  {t(`${benefit.key}.desc`)}
                </p>

                <div className="mt-8 flex items-center gap-2 text-primary font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Cam kết uy tín</span>
                </div>
              </div>
            ))}
          </div>

          {/* Right Image logic */}
          <div className="relative group lg:ml-12">
            <div className="relative rounded-2xl md:rounded-2xl md:rounded-[3rem] overflow-hidden aspect-4/5 shadow-2xl border-4 md:border-8 border-white dark:border-gray-800 animate-in zoom-in-95 duration-1000">
              <Image
                src={IMAGES.ABOUT.BENEFITS.benefit}
                alt="Student success"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-primary/30 to-transparent" />
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-10 -left-10 md:left-[-40px] bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl border border-gray-50 dark:border-gray-700 max-w-[280px] hidden md:block animate-bounce-slow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-black text-primary italic">
                    98.5%
                  </div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                    Lao động xuất cảnh
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 italic font-medium">
                {`"Hơn 10.000 học sinh đã tin tưởng và chọn HCM Mirai"`}
              </p>
            </div>

            {/* Decorative background circle */}
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl z-[-1]" />
          </div>
        </div>
      </div>
    </section>
  );
}
