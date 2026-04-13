"use client";

import { Facebook, Linkedin } from "@/components/ui/icons";
import { IMAGES } from "@/constants/images";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function TeamSection() {
  const t = useTranslations("About.team");

  const memberIds = ["m1", "m2", "m3", "m4"];
  const team = memberIds.map((id, idx) => {
    const teamImages = IMAGES.ABOUT.TEAM_SECTION;
    const imageKey = `team${idx + 1}` as keyof typeof teamImages;

    return {
      name: t(`members.${id}.name`),
      role: t(`members.${id}.role`),
      image: teamImages[imageKey],
    };
  });

  return (
    <section className="py-12 md:py-20 md:py-32 bg-white dark:bg-gray-950 transition-colors">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 md:mb-24 gap-8">
          <div className="max-w-2xl">
            <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">
              Gặp gỡ đội ngũ
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-accent leading-tight">
              {t("title")}
            </h2>
            <p className="mt-6 text-gray-600 dark:text-gray-400 text-lg">
              {t("subtitle")}
            </p>
          </div>
          <div className="hidden md:block">
            <button className="px-8 py-4 bg-primary text-white rounded-2xl font-bold hover:shadow-xl hover:shadow-primary/20 transition-all flex items-center gap-2 group">
              Tất cả nhân sự
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                →
              </div>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {team.map((member, idx) => (
            <div key={idx} className="group flex flex-col items-center">
              <div className="relative w-full aspect-square rounded-2xl md:rounded-[3rem] overflow-hidden mb-6 shadow-2xl transition-all duration-500 group-hover:rounded-[2rem] border-8 border-transparent group-hover:border-primary/10">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Social Overlay */}
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary shadow-xl cursor-pointer hover:scale-110 transition-transform">
                    <Facebook className="w-5 h-5" />
                  </div>
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary shadow-xl cursor-pointer hover:scale-110 transition-transform">
                    <Linkedin className="w-5 h-5" />
                  </div>
                </div>
              </div>
              <div className="text-center group-hover:-translate-y-2 transition-transform duration-300">
                <h4 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {member.name}
                </h4>
                <p className="text-primary font-bold text-sm uppercase tracking-wider">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
