"use client";

import { Award, ShieldCheck, Timer, Zap } from "lucide-react";
import { useTranslations } from "next-intl";

const iconMap = {
  i1: <Award className="w-10 h-10 text-primary" />,
  i2: <ShieldCheck className="w-10 h-10 text-primary" />,
  i3: <Timer className="w-10 h-10 text-primary" />,
  i4: <Zap className="w-10 h-10 text-primary" />,
};

export default function StudyAdvantages() {
  const t = useTranslations("StudyAbroad.advantages");

  const items = [
    { id: "i1", icon: <Award className="w-8 h-8" /> },
    { id: "i2", icon: <ShieldCheck className="w-8 h-8" /> },
    { id: "i3", icon: <Timer className="w-8 h-8" /> },
    { id: "i4", icon: <Zap className="w-8 h-8" /> },
  ];

  return (
    <section className="py-24 bg-primary dark:bg-primary/20 transition-colors">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
            {t("title")}
          </h2>
          <div className="w-24 h-2 bg-white mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="group bg-white/10 backdrop-blur-md rounded-[2rem] p-10 border border-white/20 hover:bg-white hover:border-transparent transition-all duration-500 animate-in fade-in slide-in-from-bottom-8"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mb-8 shadow-xl group-hover:bg-primary group-hover:text-white transition-all text-primary">
                {item.icon}
              </div>
              <h3 className="text-2xl font-black text-white group-hover:text-primary transition-colors uppercase mb-4 leading-tight">
                {t(`items.${item.id}.title`)}
              </h3>
              <p className="text-primary-foreground/80 group-hover:text-gray-600 transition-colors leading-relaxed font-medium italic">
                {t(`items.${item.id}.desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
