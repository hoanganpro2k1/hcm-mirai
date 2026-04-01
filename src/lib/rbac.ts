import { TokenPayload, verifyToken } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

/**
 * Kiểm tra xem người dùng có quyền hạn nhất định hay không.
 */
export function hasPermission(
  payload: TokenPayload,
  permission: string,
): boolean {
  if (!payload || !payload.rolePermissions) return false;

  // Admin được mặc định có tất cả quyền
  if (payload.roleName === "admin" || payload.roleName === "Admin") return true;

  return payload.rolePermissions.includes(permission);
}

/**
 * Middleware utility để kiểm tra xác thực và quyền hạn trong API Routes.
 */
export async function authorize(
  req: NextRequest,
  requiredPermission?: string,
): Promise<{
  payload: TokenPayload | null;
  errorResponse: NextResponse | null;
}> {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return {
      payload: null,
      errorResponse: NextResponse.json(
        { message: "Không thể truy cập. Thiếu Access Token." },
        { status: 401 },
      ),
    };
  }

  const token = authHeader.split(" ")[1];
  const payload = await verifyToken(token, "access");

  if (!payload) {
    return {
      payload: null,
      errorResponse: NextResponse.json(
        { message: "Access Token không hợp lệ hoặc đã hết hạn." },
        { status: 401 },
      ),
    };
  }

  if (requiredPermission && !hasPermission(payload, requiredPermission)) {
    return {
      payload,
      errorResponse: NextResponse.json(
        { message: "Bạn không có quyền thực hiện hành động này." },
        { status: 403 },
      ),
    };
  }

  return { payload, errorResponse: null };
}
