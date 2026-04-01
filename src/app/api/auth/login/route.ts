import envConfig from "@/config";
import {
  comparePasswords,
  generateAccessToken,
  generateRefreshToken,
} from "@/lib/auth";
import dbConnect from "@/lib/mongoose";
import Admin from "@/models/admin";
import RefreshToken from "@/models/refreshToken";
import { IPopulatedAdmin } from "@/types/auth.type";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { message: "Vui lòng nhập tài khoản và mật khẩu." },
        { status: 400 },
      );
    }

    // 1. Kiểm tra Admin theo username và populate Role cùng Permissions
    const admin = (await Admin.findOne({ username }).populate({
      path: "role",
      populate: {
        path: "permissions",
        model: "Permission",
      },
    })) as IPopulatedAdmin | null;

    if (!admin) {
      return NextResponse.json(
        { message: "Tài khoản hoặc mật khẩu không đúng." },
        { status: 401 },
      );
    }

    // 2. Kiểm tra mật khẩu
    const isValidPassword = await comparePasswords(
      password,
      admin.password as string,
    );
    if (!isValidPassword) {
      return NextResponse.json(
        { message: "Tài khoản hoặc mật khẩu không đúng." },
        { status: 401 },
      );
    }

    // Chuẩn bị payload cho Token
    const roleName = admin.role?.name;
    const rolePermissions =
      admin.role?.permissions?.map((p: any) => p.name) || [];

    const payload = {
      adminId: admin._id.toString(),
      username: admin.username,
      roleName,
      rolePermissions,
    };

    // 3. Tạo Tokens
    const accessToken = await generateAccessToken(payload);
    const refreshTokenStr = await generateRefreshToken(payload);

    // 4. Lưu Refresh Token vào Database riêng
    // Tính toán thời gian hết hạn (ví dụ 7 ngày sau)
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await RefreshToken.create({
      token: refreshTokenStr,
      adminId: admin._id,
      expiresAt: expiresAt,
    });

    // Cập nhật refreshToken cũ trong Admin (nếu vẫn muốn giữ để tương thích ngược hoặc xóa đi)
    admin.refreshToken = refreshTokenStr;
    await admin.save();

    // 5. Build response chứa accessToken ở HTTP body
    const response = NextResponse.json(
      {
        message: "Đăng nhập thành công",
        accessToken,
        admin: {
          id: admin._id,
          username: admin.username,
          role: roleName,
          permissions: rolePermissions,
        },
      },
      { status: 200 },
    );

    // 6. Set Refresh Token vào HTTP-Only Cookie để an toàn khỏi XSS
    response.cookies.set({
      name: "refreshToken",
      value: refreshTokenStr,
      httpOnly: true,
      secure: envConfig.NODE_ENV === "production",
      sameSite: "strict",
      path: "/", // Áp dụng cookie trên mọi route API
      maxAge: 7 * 24 * 60 * 60, // 7 days (tính bằng giây)
    });

    return response;
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Lỗi Server", error: error.message },
      { status: 500 },
    );
  }
}
