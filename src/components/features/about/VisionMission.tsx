"use client";

import { Lightbulb, Target, Trophy, Users } from "lucide-react";
import { useTranslations } from "next-intl";

export default function VisionMission() {
  const t = useTranslations("About.vision_mission");

  const items = [
    {
      key: "mission",
      icon: Target,
      bg: "bg-[#2563eb]", // Blue
      hoverBg: "hover:bg-[#1d4ed8]",
    },
    {
      key: "vision",
      icon: Lightbulb,
      bg: "bg-[#0ea5e9]", // Sky blue
      hoverBg: "hover:bg-[#0284c7]",
    },
    {
      key: "core_values",
      icon: Trophy,
      bg: "bg-[#dc2626]", // Red
      hoverBg: "hover:bg-[#b91c1c]",
    },
    {
      key: "philosophy",
      icon: Users,
      bg: "bg-[#f97316]", // Orange
      hoverBg: "hover:bg-[#ea580c]",
    },
  ];

  return (
    <section className="py-12 md:py-24 bg-white dark:bg-gray-950 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 overflow-hidden rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800">
          {items.map((item, idx) => (
            <div
              key={idx}
              className={`${item.bg} ${item.hoverBg} p-10 md:p-14 text-white transition-all duration-300 group relative flex flex-col items-center text-center sm:items-start sm:text-left h-full min-h-[300px] md:min-h-[350px]`}
            >
              {/* Background accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700" />

              <div className="mb-6 p-4 bg-white/20 rounded-2xl backdrop-blur-md shadow-lg group-hover:rotate-12 transition-transform duration-300">
                <item.icon className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-2xl md:text-3xl font-bold mb-4 uppercase tracking-wider">
                {t(`${item.key}.title`)}
              </h3>

              <p className="text-white/90 text-[15px] md:text-lg leading-relaxed font-medium">
                {t(`${item.key}.desc`)}
              </p>

              {/* Decorative number */}
              <span className="absolute bottom-6 right-8 text-6xl font-black text-white/10 select-none">
                0{idx + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
