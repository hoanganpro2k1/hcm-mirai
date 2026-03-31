import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Admin from "@/models/admin";
import { comparePasswords, generateAccessToken, generateRefreshToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { message: "Vui lòng nhập tài khoản và mật khẩu." },
        { status: 400 }
      );
    }

    // 1. Kiểm tra Admin theo username
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return NextResponse.json(
        { message: "Tài khoản hoặc mật khẩu không đúng." },
        { status: 401 }
      );
    }

    // 2. Kiểm tra mật khẩu
    const isValidPassword = await comparePasswords(password, admin.password as string);
    if (!isValidPassword) {
      return NextResponse.json(
        { message: "Tài khoản hoặc mật khẩu không đúng." },
        { status: 401 }
      );
    }

    const payload = { adminId: admin._id.toString(), username: admin.username };

    // 3. Tạo Tokens
    const accessToken = await generateAccessToken(payload);
    const refreshToken = await generateRefreshToken(payload);

    // 4. Lưu Refresh Token vào Database của admin (sử dụng Token Rotation hoặc thu hồi sau này)
    admin.refreshToken = refreshToken;
    await admin.save();

    // 5. Build response chứa accessToken ở HTTP body
    const response = NextResponse.json(
      {
        message: "Đăng nhập thành công",
        accessToken,
        admin: {
          id: admin._id,
          username: admin.username,
        },
      },
      { status: 200 }
    );

    // 6. Set Refresh Token vào HTTP-Only Cookie để an toàn khỏi XSS
    response.cookies.set({
      name: "refreshToken",
      value: refreshToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/", // Áp dụng cookie trên mọi route API
      maxAge: 7 * 24 * 60 * 60, // 7 days (tính bằng giây)
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { message: "Lỗi Server", error: error.message },
      { status: 500 }
    );
  }
}
