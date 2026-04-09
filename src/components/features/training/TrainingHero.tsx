"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ChevronRight, GraduationCap } from "lucide-react";

export default function TrainingHero() {
  const t = useTranslations("Training.hero");

  return (
    <section className="relative h-[400px] flex items-center overflow-hidden bg-primary/90">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center grayscale brightness-50 contrast-125"
        style={{ 
          backgroundImage: "url('https://picsum.photos/id/20/1920/1080')",
          backgroundColor: '#0F172A'
        }}
      />
      
      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-linear-to-r from-primary/80 via-primary/40 to-transparent" />

      <div className="container mx-auto px-6 relative z-20">
        <div className="max-w-3xl animate-in fade-in slide-in-from-left-8 duration-700">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-white/70 text-sm mb-6 font-medium">
            <Link href="/" className="hover:text-white transition-colors">{t("breadcrumb")}</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white font-bold">{t("title")}</span>
          </nav>

          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-red-600 rounded-2xl shadow-xl shadow-red-900/20">
               <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <div className="h-px w-12 bg-white/30" />
            <span className="text-white/80 uppercase tracking-widest text-sm font-bold">{t("edu_brand")}</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none mb-6">
            {t("title")}
          </h1>
          
          <div className="flex items-center gap-4">
             <div className="w-16 h-1.5 bg-red-600" />
             <p className="text-white/60 text-lg font-medium italic">
                &ldquo;{t("quote")}&rdquo;
             </p>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 right-0 p-12 opacity-10 hidden lg:block">
         <GraduationCap className="w-64 h-64 text-white" />
      </div>
    </section>
  );
}
