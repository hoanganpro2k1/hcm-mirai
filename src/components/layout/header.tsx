"use client";

import { ConsultationModal } from "@/components/features/consultation/ConsultationModal";
import SearchTrigger from "@/components/features/search/SearchTrigger";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/hooks/use-settings";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import NextImage from "next/image";
import { useState } from "react";
import { ModeToggle } from "./mode-toggle";

export function Header() {
  const t = useTranslations("Header");
  const { data: settings, isLoading } = useSettings();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const locale = useLocale() as "vi" | "en";

  // Dynamic topbar text from settings, fallback to i18n
  const topbarText = settings?.topbar_text?.[locale] || t("topbar.tuyensinh");
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: "vi" | "en") => {
    router.replace(pathname, { locale: newLocale });
  };

  const navItems = [
    {
      label: t("nav.gioithieu"),
      href: "#",
      children: [
        { label: t("nav.about_mirai"), href: "/gioi-thieu" },
        { label: t("nav.services"), href: "/dich-vu" },
        { label: t("nav.gallery"), href: "/thu-vien-hinh-anh" },
        { label: t("nav.testimonials"), href: "/cam-nhan-hoc-vien" },
      ],
    },
    { label: t("nav.daotao"), href: "/dao-tao-ngoai-ngu" },
    {
      label: t("nav.cungung"),
      href: "#",
      children: [
        { label: t("nav.domestic"), href: "/cung-ung-ld-trong-nuoc" },
        { label: t("nav.overseas"), href: "/cung-ung-ld-nuoc-ngoai" },
      ],
    },
    { label: t("nav.duhoc"), href: "/du-hoc-xkld" },
    { label: t("nav.tintuc"), href: "/tin-tuc" },
    { label: t("nav.donhang"), href: "/don-hang" },
  ];

  return (
    <header
      className="w-full flex flex-col font-sans sticky top-0 z-50 transition-colors"
      onClick={() => isSearchOpen && setIsSearchOpen(false)}
    >
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground text-sm py-2 px-6 flex justify-between items-center transition-colors">
        <Link
          href={`tel:${t("topbar.phone_val", { defaultValue: "0973460999" }).replace(/\s/g, "")}`}
          className="flex items-center gap-2 hover:text-gray-300 transition-colors"
        >
          <Phone className="w-4 h-4" />
          <span>{t("topbar.phone_val", { defaultValue: "0973 460 999" })}</span>
        </Link>
        <Link
          href="/don-hang"
          className="hidden uppercase md:block font-medium hover:text-white/80 transition-colors hover:underline"
        >
          {isLoading ? "Đang tải..." : topbarText}
        </Link>
        <div className="flex items-center gap-1 font-semibold">
          <button
            onClick={() => handleLocaleChange("vi")}
            className={`cursor-pointer hover:text-gray-300 transition-colors ${
              locale === "vi"
                ? "text-white underline underline-offset-4"
                : "text-white/70"
            }`}
          >
            VN
          </button>
          <span>|</span>
          <button
            onClick={() => handleLocaleChange("en")}
            className={`cursor-pointer hover:text-gray-300 transition-colors ${
              locale === "en"
                ? "text-white underline underline-offset-4"
                : "text-white/70"
            }`}
          >
            EN
          </button>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-background/95 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b shadow-sm transition-colors">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <NextImage
            src="/logo.png"
            alt="HCM Mirai Logo"
            width={160}
            height={50}
            className="w-auto h-8 sm:h-10 object-contain"
            priority
          />
        </Link>

        {/* Navigation Links */}
        <nav className="hidden xl:flex items-center gap-6 text-primary font-medium text-[15px]">
          {navItems.map((item) => (
            <div key={item.label} className="relative group py-6 -my-6">
              <Link
                href={item.href}
                className="flex text-sm items-center gap-1 font-bold hover:brightness-150 transition"
              >
                {item.label}{" "}
                {item.children && <ChevronDown className="w-4 h-4" />}
              </Link>

              {/* Dropdown Menu */}
              {item.children && (
                <div className="absolute top-[calc(100%-8px)] left-0 pt-4 w-[280px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-left -translate-y-2 group-hover:translate-y-0 z-50">
                  <div className="bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] py-4 flex flex-col border border-gray-50">
                    {item.children.length > 0 &&
                      item.children.map((child, idx) => (
                        <Link
                          key={idx}
                          href={child.href}
                          className="px-6 py-3.5 font-semibold text-[15px] hover:text-primary hover:bg-muted transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          <Link
            href="/lien-he"
            className="hover:text-primary font-bold transition"
          >
            {t("nav.lienhe")}
          </Link>
        </nav>

        {/* Actions Context Group */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="relative flex items-center">
            <SearchTrigger
              isOpen={isSearchOpen}
              onToggle={() => setIsSearchOpen(!isSearchOpen)}
              onClose={() => setIsSearchOpen(false)}
            />
          </div>
          <ModeToggle />
          <button
            onClick={() => setIsConsultationOpen(true)}
            className="hidden sm:block bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 sm:px-6 rounded uppercase text-xs sm:text-sm font-semibold transition shrink-0"
          >
            {t("actions.tuvan")}
          </button>

          {/* Mobile Menu Toggle */}
          <Button
            className="xl:hidden p-1.5 sm:p-2 -mr-2 text-foreground bg-transparent hover:bg-muted rounded-md transition-colors shrink-0"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label={t("actions.open_menu")}
          >
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay & Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 xl:hidden">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer */}
          <div className="fixed right-0 top-0 bottom-0 w-[280px] bg-background shadow-xl flex flex-col z-[101] overflow-y-auto animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="font-bold text-foreground text-lg uppercase">
                Menu
              </div>
              <Button
                variant={"ghost"}
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-muted-foreground hover:bg-muted rounded-md transition"
                aria-label={t("actions.close_menu")}
              >
                <X className="w-6 h-6" />
              </Button>
            </div>

            <div className="flex flex-col py-2">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="border-b border-gray-100 last:border-none"
                >
                  <div className="px-4 py-3">
                    <Link
                      href={item.href}
                      className="font-bold text-foreground text-[15px] flex justify-between items-center"
                      onClick={() =>
                        !item.children && setIsMobileMenuOpen(false)
                      }
                    >
                      {item.label}
                    </Link>

                    {item.children && (
                      <div className="mt-2 pl-4 flex flex-col gap-2 border-l-2 border-gray-100 ml-2">
                        {item.children.map((child, idx) => (
                          <Link
                            key={idx}
                            href={child.href}
                            className="py-1.5 text-[14px] hover:text-primary text-muted-foreground font-medium transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div className="px-4 py-3 border-t border-muted">
                <Link
                  href="/lien-he"
                  className="font-bold text-foreground text-[15px] hover:text-primary transition"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t("nav.lienhe")}
                </Link>
              </div>
            </div>

            <div className="p-4 mt-auto">
              <Button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsConsultationOpen(true);
                }}
                className="w-full bg-primary hover:bg-primary/90 transition-colors text-primary-foreground py-3 rounded-md uppercase text-sm font-semibold"
              >
                {t("actions.tuvan")}
              </Button>
            </div>
          </div>
        </div>
      )}
      <ConsultationModal
        open={isConsultationOpen}
        onOpenChange={setIsConsultationOpen}
      />
    </header>
  );
}
