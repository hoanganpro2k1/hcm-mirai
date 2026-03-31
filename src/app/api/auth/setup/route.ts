import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Admin from "@/models/admin";
import { hashPassword } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    // Check if any admin exists
    const adminCount = await Admin.countDocuments();
    if (adminCount > 0) {
      return NextResponse.json(
        { message: "Tài khoản admin đã tồn tại. Không thể tạo thêm qua API setup." },
        { status: 403 }
      );
    }

    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { message: "Vui lòng cung cấp username và password." },
        { status: 400 }
      );
    }

    // Mã hóa mật khẩu
    const hashedPassword = await hashPassword(password);

    // Tạo Admin mới
    const newAdmin = new Admin({
      username,
      password: hashedPassword,
    });

    await newAdmin.save();

    // Trả về không chứa password
    return NextResponse.json(
      {
        message: "Tạo tài khoản Admin thành công.",
        admin: {
          id: newAdmin._id,
          username: newAdmin.username,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Đã có lỗi xảy ra", error: error.message },
      { status: 500 }
    );
  }
}
