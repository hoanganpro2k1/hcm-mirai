import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Admin from "@/models/admin";
import { verifyToken, generateAccessToken, generateRefreshToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    // Lấy refreshToken từ Cookie HttpOnly
    const refreshTokenCookie = req.cookies.get("refreshToken")?.value;

    if (!refreshTokenCookie) {
      return NextResponse.json(
        { message: "Refresh token không tồn tại, vui lòng đăng nhập lại." },
        { status: 401 }
      );
    }

    // 1. Giải mã token để xem còn hạn không và lấy payload
    const decoded = await verifyToken(refreshTokenCookie, "refresh");

    if (!decoded) {
      return NextResponse.json(
        { message: "Refresh token không hợp lệ hoặc đã hết hạn." },
        { status: 403 }
      );
    }

    // 2. Tìm admin bằng ID
    const admin = await Admin.findById(decoded.adminId);
    if (!admin) {
      return NextResponse.json(
        { message: "Tài khoản không tồn tại." },
        { status: 403 }
      );
    }

    // 3. Kiểm tra tính hợp lệ của token trong Database
    // Tránh trường hợp token cũ (đã được thay hoặc thu hồi) được sử dụng lại
    if (admin.refreshToken !== refreshTokenCookie) {
      return NextResponse.json(
        { message: "Refresh token không khớp với hệ thống, có thể tài khoản đã bị đổi mật khẩu hoặc đăng nhập từ nơi khác." },
        { status: 403 }
      );
    }

    // 4. Cơ chế Token Rotation: Cấp phát mới lại Access Token và Refresh Token 
    const payload = { adminId: admin._id.toString(), username: admin.username };

    const newAccessToken = await generateAccessToken(payload);
    const newRefreshToken = await generateRefreshToken(payload);

    // Lưu newRefreshToken mới vào Database
    admin.refreshToken = newRefreshToken;
    await admin.save();

    // 5. Trả kết quả
    const response = NextResponse.json(
      {
        message: "Cấp lại token thành công",
        accessToken: newAccessToken,
      },
      { status: 200 }
    );

    // Cập nhật lại Cookie chứa Refresh Token mới
    response.cookies.set({
      name: "refreshToken",
      value: newRefreshToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { message: "Lỗi nội bộ Server", error: error.message },
      { status: 500 }
    );
  }
}
