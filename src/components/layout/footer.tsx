import Link from "next/link";
import { BookOpen, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#1c2559] text-white pt-16 pb-8 font-sans">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Section */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="text-white">
              <BookOpen className="w-8 h-8" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold leading-tight">
                K - EDU
              </span>
              <span className="text-[10px] font-semibold text-red-500 leading-none">
                CHẮP CÁNH ƯỚC MƠ
              </span>
            </div>
          </Link>
          <p className="text-sm text-gray-300 mt-2">
            Mang đến cơ hội học tập và làm việc tại Hàn Quốc cho hàng ngàn học sinh Việt Nam.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-semibold text-lg mb-4">Liên kết nhanh</h4>
          <ul className="flex flex-col gap-2 text-sm text-gray-300">
            <li><Link href="/" className="hover:text-white transition">Giới thiệu</Link></li>
            <li><Link href="/" className="hover:text-white transition">Du học Hàn Quốc</Link></li>
            <li><Link href="/" className="hover:text-white transition">Đào tạo tiếng Hàn</Link></li>
            <li><Link href="/" className="hover:text-white transition">Tin tức & sự kiện</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-semibold text-lg mb-4">Dịch vụ</h4>
          <ul className="flex flex-col gap-2 text-sm text-gray-300">
            <li><Link href="/" className="hover:text-white transition">Tư vấn chọn trường</Link></li>
            <li><Link href="/" className="hover:text-white transition">Hỗ trợ làm hồ sơ</Link></li>
            <li><Link href="/" className="hover:text-white transition">Luyện thi TOPIK</Link></li>
            <li><Link href="/" className="hover:text-white transition">Dịch vụ chứng minh tài chính</Link></li>
          </ul>
        </div>

        {/* Contact info */}
        <div>
          <h4 className="font-semibold text-lg mb-4">Liên hệ</h4>
          <ul className="flex flex-col gap-3 text-sm text-gray-300">
            <li className="flex gap-2">
              <MapPin className="w-5 h-5 shrink-0" />
              <span>Phú Cát, Quốc Oai, Hà Nội</span>
            </li>
            <li className="flex gap-2 items-center">
              <Phone className="w-4 h-4 shrink-0" />
              <span>+09 132 121 96</span>
            </li>
            <li className="flex gap-2 items-center">
              <Mail className="w-4 h-4 shrink-0" />
              <span>contact@k-edu.vn</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-gray-700 mt-12 pt-8 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} K-EDU. All rights reserved.
      </div>
    </footer>
  );
}
