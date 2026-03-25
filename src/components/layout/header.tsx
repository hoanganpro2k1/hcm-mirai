import { BookOpen, ChevronDown, Phone, Search } from "lucide-react";
import Link from "next/link";

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
  return (
    <header className="w-full flex flex-col font-sans">
      {/* Top Bar */}
      <div className="bg-[#1c2559] text-white text-sm py-2 px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4" />
          <span>+09 132 121 96</span>
        </div>
        <div className="hidden md:block font-medium">
          TUYỂN SINH LỚP DU HỌC HÀN BAY KÌ THÁNG 9-12/2025
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
        <Link href="/" className="flex items-center gap-2">
          <div className="text-[#1c2559]">
            <BookOpen className="w-8 h-8" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-[#1c2559] leading-tight">
              K - EDU
            </span>
            <span className="text-[10px] font-semibold text-red-600 leading-none">
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
                className="flex items-center gap-1 hover:text-blue-700 transition"
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
          <Link href="/" className="hover:text-blue-700 transition">
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
          <button className="bg-[#1c2559] hover:bg-[#161d46] text-white px-6 py-2 rounded uppercase text-sm font-semibold transition">
            Tư vấn ngay
          </button>
        </div>
      </div>
    </header>
  );
}
