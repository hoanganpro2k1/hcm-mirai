"use client";

import { BookOpen, ChevronDown, Menu, Phone, Search, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const navItems = [
  {
    label: "Giới thiệu",
    href: "/",
    children: [
      { label: "Về K-EDU", href: "/" },
      { label: "Dịch vụ chính", href: "/" },
      { label: "Thư viện hình ảnh", href: "/" },
      { label: "Tuyển dụng", href: "/" },
      { label: "Cảm nhận học viên", href: "/" },
      { label: "Chính sách và quyền riêng tư", href: "/" },
    ],
  },
  { label: "Du học Hàn Quốc", href: "/" },
  { label: "Đào tạo tiếng Hàn", href: "/" },
  { label: "Đơn hàng", href: "/" },
  { label: "Tin tức & sự kiện", href: "/" },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="w-full flex flex-col font-sans">
      {/* Top Bar */}
      <div className="bg-[#1c2559] text-white text-sm py-2 px-6 flex justify-between items-center">
        <Link
          href="tel:+0983439381"
          className="flex items-center gap-2 hover:text-gray-300 transition-colors"
        >
          <Phone className="w-4 h-4" />
          <span>+09 8343 9381</span>
        </Link>
        <div className="hidden md:block font-medium">
          TUYỂN SINH LỚP DU HỌC HÀN BAY KÌ THÁNG 4-12/2026
        </div>
        <div className="flex items-center gap-1 font-semibold">
          <button className="hover:text-gray-300">VN</button>
          <span>|</span>
          <button className="hover:text-gray-300">EN</button>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-white px-6 py-4 flex items-center justify-between border-b shadow-sm z-50">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <div className="text-[#1c2559]">
            <BookOpen className="w-6 h-6 sm:w-8 sm:h-8" />
          </div>
          <div className="flex flex-col">
            <span className="text-base sm:text-xl font-bold text-[#1c2559] leading-tight">
              HCM - MIRAI
            </span>
            <span className="text-[8px] sm:text-[10px] font-semibold text-red-600 leading-none">
              CHẮP CÁNH ƯỚC MƠ
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-[#1c2559] font-medium text-[15px]">
          {navItems.map((item) => (
            <div key={item.label} className="relative group py-6 -my-6">
              <Link
                href={item.href}
                className="flex items-center gap-1 font-bold hover:text-blue-700 transition"
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
                          className="px-6 py-3.5 font-semibold text-[15px] hover:text-blue-700 hover:bg-blue-50/50 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          <Link href="/" className="hover:text-blue-700 font-bold transition">
            Liên hệ
          </Link>
        </nav>

        {/* Actions Context Group */}
        <div className="flex items-center gap-4">
          <div className="relative hidden md:flex items-center">
            <Search className="w-4 h-4 absolute left-3 text-gray-500" />
            <input
              type="text"
              placeholder="Tìm kiếm"
              className="bg-gray-100 text-sm text-gray-700 placeholder:text-gray-500 rounded-md pl-9 pr-4 py-2 w-48 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <button className="hidden sm:block bg-[#1c2559] hover:bg-[#161d46] text-white px-4 py-2 sm:px-6 rounded uppercase text-xs sm:text-sm font-semibold transition shrink-0">
            Tư vấn ngay
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-1.5 sm:p-2 -mr-2 text-[#1c2559] hover:bg-gray-100 rounded-md transition-colors shrink-0"
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
          <div className="fixed right-0 top-0 bottom-0 w-[280px] bg-white shadow-xl flex flex-col z-[101] overflow-y-auto animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="font-bold text-[#1c2559] text-lg uppercase">
                Menu
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-gray-500 hover:bg-gray-100 rounded-md transition"
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
                      className="font-bold text-[#1c2559] text-[15px] flex justify-between items-center"
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
                            className="py-1.5 text-[14px] hover:text-blue-700 text-gray-600 font-medium transition-colors"
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
              <div className="px-4 py-3 border-t border-gray-100">
                <Link
                  href="/"
                  className="font-bold text-[#1c2559] text-[15px] hover:text-blue-700 transition"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Liên hệ
                </Link>
              </div>
            </div>

            <div className="p-4 mt-auto">
              <button className="w-full bg-[#1c2559] hover:bg-[#161d46] transition-colors text-white py-3 rounded-md uppercase text-sm font-semibold">
                Tư vấn ngay
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
