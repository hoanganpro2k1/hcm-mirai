import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import User from "@/models/user";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    // Lấy refreshToken từ Cookie HttpOnly hoặc từ Body
    let refreshToken: string | null = null;

    const cookieToken = req.cookies.get("refreshToken")?.value;
    refreshToken = cookieToken || null;

    if (!refreshToken) {
      const bodyText = await req.text();
      if (bodyText) {
        try {
          const body = JSON.parse(bodyText);
          refreshToken = body.refreshToken || null;
        } catch (e) {
          // Ignore parse errors from empty body
        }
      }
    }

    if (refreshToken) {
      await User.findOneAndUpdate(
        { refreshToken },
        { $set: { refreshToken: null } },
      );
    }

    // Xóa Cookie ở client bằng cách set maxAge = 0 hoặc expires trong quá khứ
    const response = NextResponse.json(
      { message: "Đăng xuất thành công" },
      { status: 200 }
    );

    response.cookies.set({
      name: "refreshToken",
      value: "",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 0, // Xóa ngay
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { message: "Lỗi Server", error: error.message },
      { status: 500 }
    );
  }
}
