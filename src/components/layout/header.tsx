"use client";

import { Link, usePathname, useRouter } from "@/i18n/routing";
import { BookOpen, ChevronDown, Menu, Phone, Search, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { ModeToggle } from "./mode-toggle";

export function Header() {
  const t = useTranslations("Header");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const locale = useLocale();
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
        { label: t("nav.services"), href: "/dich-vu-chinh" },
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
    { label: t("nav.duhoc"), href: "/du-hoc-xklđ" },
    { label: t("nav.tintuc"), href: "/tin-tuc" },
    { label: t("nav.donhang"), href: "/don-hang" },
  ];

  return (
    <header className="w-full flex flex-col font-sans sticky top-0 z-50 transition-colors">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground text-sm py-2 px-6 flex justify-between items-center transition-colors">
        <Link
          href="tel:+0973460999"
          className="flex items-center gap-2 hover:text-gray-300 transition-colors"
        >
          <Phone className="w-4 h-4" />
          <span>+0973 460 999</span>
        </Link>
        <div className="hidden uppercase md:block font-medium">
          {t("topbar.tuyensinh")}
        </div>
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
          <div className="text-primary">
            <BookOpen className="w-6 h-6 sm:w-8 sm:h-8" />
          </div>
          <div className="flex flex-col">
            <span className="text-base sm:text-xl font-bold text-primary leading-tight">
              HCM - MIRAI
            </span>
            <span className="text-[8px] sm:text-[10px] font-semibold text-red-600 leading-none">
              CHẮP CÁNH ƯỚC MƠ
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-primary font-medium text-[15px]">
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
          <div className="relative hidden md:flex items-center">
            <Search className="w-4 h-4 absolute left-3 text-muted-foreground" />
            <input
              type="text"
              placeholder={t("actions.timkiem")}
              className="bg-muted text-sm text-foreground placeholder:text-muted-foreground rounded-md pl-9 pr-4 py-2 w-48 focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <ModeToggle />
          <button className="hidden sm:block bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 sm:px-6 rounded uppercase text-xs sm:text-sm font-semibold transition shrink-0">
            {t("actions.tuvan")}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-1.5 sm:p-2 -mr-2 text-foreground hover:bg-muted rounded-md transition-colors shrink-0"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay & Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
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
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-muted-foreground hover:bg-muted rounded-md transition"
              >
                <X className="w-6 h-6" />
              </button>
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
              <button className="w-full bg-primary hover:bg-primary/90 transition-colors text-primary-foreground py-3 rounded-md uppercase text-sm font-semibold">
                {t("actions.tuvan")}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
