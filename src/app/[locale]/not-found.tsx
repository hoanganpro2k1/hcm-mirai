"use client";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { Home } from "lucide-react";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("NotFound");
  const tHeader = useTranslations("Header");

  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center min-h-[70vh] px-4 py-16 text-center overflow-hidden relative">
        {/* Background Decorative Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 pointer-events-none">
          <div className="w-[300px] h-[300px] bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="w-[500px] h-[500px] bg-sky-500/5 rounded-full blur-3xl -translate-x-1/4 translate-y-1/4"></div>
        </div>

        <div className="relative mb-12 select-none">
          {/* Large 404 with Gradient */}
          <h1 className="text-[12rem] sm:text-[16rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-primary via-primary/80 to-primary/60">
            404
          </h1>

          {/* Secondary overlapping text for depth */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[12rem] sm:text-[16rem] font-black leading-none tracking-tighter text-transparent border-white/5 bg-transparent stroke-primary/10 stroke-1 select-none pointer-events-none blur-[2px]">
              404
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-2xl mx-auto relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-foreground tracking-tight">
            {t("title")}
          </h2>

          <p className="text-muted-foreground text-lg sm:text-xl mb-10 max-w-md mx-auto leading-relaxed">
            {t("description")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/">
              <Button
                size="lg"
                className="rounded-full px-8 py-6 h-auto text-lg font-semibold shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95"
              >
                <Home className="mr-2 h-6 w-6" />
                {t("backHome")}
              </Button>
            </Link>
          </div>
        </div>

        {/* Modern bottom accent */}
        <div className="mt-20 flex items-center gap-2 text-primary/30">
          <div className="h-px w-12 bg-current"></div>
          <div className="h-2 w-2 rounded-full bg-current"></div>
          <div className="h-px w-12 bg-current"></div>
        </div>
      </main>
      <Footer />
    </>
  );
}
