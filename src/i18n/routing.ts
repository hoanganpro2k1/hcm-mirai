import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  // Danh sách các ngôn ngữ hỗ trợ
  locales: ["vi", "en"],

  // Ngôn ngữ mặc định
  defaultLocale: "vi",

  // Tiền tố ngôn ngữ trong URL (ví dụ: /vi/about)
  localePrefix: "always",
});

// Các hàm điều hướng hỗ trợ đa ngôn ngữ (Link, useRouter, ...)
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
