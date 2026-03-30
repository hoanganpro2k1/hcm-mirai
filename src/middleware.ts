import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Bỏ qua chặn các route setup, login. Nếu gọi tới /admin/dashboard thì mới tính chặn
  const publicPaths = ['/admin/login', '/admin/setup'];
  const isPublic = publicPaths.some(path => request.nextUrl.pathname.startsWith(path));

  // Trang admin cần bảo vệ
  if (request.nextUrl.pathname === '/admin') {
    // Luôn luôn forward root /admin sang dashboard để nó vào luồng check auth
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }
  if (request.nextUrl.pathname.startsWith('/admin') && !isPublic) {
    const defaultLoginUrl = new URL('/admin/login', request.url);
    
    // Kiểm tra nhanh xem người dùng còn Cookie chứa Refresh Token không
    const tokenCookie = request.cookies.get('refreshToken')?.value;
    
    // Không có bằng chứng cho thấy từng đăng nhập -> Kick về Đăng nhập
    if (!tokenCookie) {
      return NextResponse.redirect(defaultLoginUrl);
    }
  }

  // Tương tự, nếu đang ở /admin/login mà đã có token thì cho vào luôn /admin/dashboard
  if (request.nextUrl.pathname === '/admin/login') {
    const tokenCookie = request.cookies.get('refreshToken')?.value;
    if (tokenCookie) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

// Xác định những đường dẫn Middleware nên lọc
export const config = {
  matcher: ['/admin/:path*'],
};
