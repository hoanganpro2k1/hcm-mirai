"use client";

import { Link } from "@/i18n/routing";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

interface PageHeroProps {
  title: string;
  breadcrumb: string;
  backgroundImage?: string;
  icon?: React.ReactNode;
}

export default function PageHero({ 
  title, 
  breadcrumb, 
  backgroundImage = "https://picsum.photos/id/10/1920/1080",
  icon 
}: PageHeroProps) {
  return (
    <section className="relative h-[300px] md:h-[400px] flex items-center overflow-hidden bg-[#0F172A]">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt={title}
          fill
          className="object-cover grayscale brightness-50 contrast-125 transition-transform duration-1000"
          priority
        />
      </div>
      
      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-linear-to-r from-primary/80 via-primary/40 to-transparent" />

      <div className="container mx-auto px-6 relative z-20">
        <div className="max-w-4xl animate-in fade-in slide-in-from-left-8 duration-700">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-white/70 text-sm mb-6 font-medium">
            <Link href="/" className="hover:text-white transition-colors">{breadcrumb}</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white font-bold">{title}</span>
          </nav>

          <div className="flex items-center gap-4 mb-4">
            {icon && (
              <div className="p-3 bg-red-600 rounded-2xl shadow-xl shadow-red-900/20">
                {icon}
              </div>
            )}
            <div className="h-px w-12 bg-white/30" />
            <span className="text-white/80 uppercase tracking-widest text-sm font-bold">HCM-MIRAI Service</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-none">
            {title}
          </h1>
        </div>
      </div>
    </section>
  );
}
