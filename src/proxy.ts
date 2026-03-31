import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const i18nMiddleware = createMiddleware(routing);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Xử lý logic cho các route ADMIN
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    // Bỏ qua chặn các route setup, login. Nếu gọi tới /admin/dashboard thì mới tính chặn
    const publicPaths = ["/admin/login", "/admin/setup"];
    const isPublic = publicPaths.some((path) => pathname.startsWith(path));

    // Trang admin cần bảo vệ
    if (pathname === "/admin") {
      // Luôn luôn forward root /admin sang dashboard để nó vào luồng check auth
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }

    if (pathname.startsWith("/admin") && !isPublic) {
      const defaultLoginUrl = new URL("/admin/login", request.url);

      // Kiểm tra nhanh xem người dùng còn Cookie chứa Refresh Token không
      const tokenCookie = request.cookies.get("refreshToken")?.value;

      // Không có bằng chứng cho thấy từng đăng nhập -> Kick về Đăng nhập
      if (!tokenCookie) {
        return NextResponse.redirect(defaultLoginUrl);
      }
    }

    // Nếu đang ở /admin/login mà đã có token thì cho vào luôn /admin/dashboard
    if (pathname === "/admin/login") {
      const tokenCookie = request.cookies.get("refreshToken")?.value;
      if (tokenCookie) {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      }
    }

    return NextResponse.next();
  }

  // 2. Xử lý logic ĐA NGÔN NGỮ cho các route CLIENT
  return i18nMiddleware(request);
}

// Xác định những đường dẫn Middleware nên lọc
export const config = {
  // Matcher cho cả locales và admin
  matcher: ["/", "/(vi|en)/:path*", "/admin/:path*"],
};

export default proxy;
