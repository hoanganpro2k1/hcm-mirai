"use client";

import { CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";

export default function StudyProcess() {
  const t = useTranslations("StudyAbroad.process");

  const steps = [
    { id: "s1" },
    { id: "s2" },
    { id: "s3" },
    { id: "s4" },
    { id: "s5" },
    { id: "s6" },
  ];

  return (
    <section className="py-24 bg-white dark:bg-gray-950 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <div className="text-primary font-black uppercase tracking-widest mb-4">{t("subtitle")}</div>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white uppercase leading-tight tracking-tighter">
            {t("title")}
          </h2>
          <div className="w-20 h-2 bg-primary mx-auto mt-6" />
        </div>

        <div className="relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-[112px] left-0 w-full h-1 bg-gray-100 dark:bg-gray-800 -z-0" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={step.id} className="group flex flex-col items-center text-center animate-in fade-in zoom-in duration-500" style={{ animationDelay: `${index * 100}ms` }}>
                {/* Step Number Circle */}
                <div className="relative w-24 h-24 rounded-full bg-white dark:bg-gray-900 border-4 border-gray-100 dark:border-gray-800 shadow-lg flex items-center justify-center mb-8 group-hover:border-primary group-hover:scale-110 transition-all duration-300">
                  <span className="text-3xl font-black text-gray-300 dark:text-gray-700 group-hover:text-primary transition-colors">
                    {index + 1}
                  </span>
                  
                  {/* Step Completion Indicator */}
                  <div className="absolute -top-2 -right-2 bg-primary text-white rounded-full p-1 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary transition-colors">
                  {t(`steps.${step.id}.title`)}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed italic">
                  {t(`steps.${step.id}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
