import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import User from "@/models/user";
import { hashPassword } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    // Check if any user exists
    const userCount = await User.countDocuments();
    if (userCount > 0) {
      return NextResponse.json(
        {
          message:
            "Tài khoản admin đã tồn tại. Không thể tạo thêm qua API setup.",
        },
        { status: 403 },
      );
    }

    const { username, password, name, avatar, phoneNumber } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { message: "Vui lòng cung cấp username và password." },
        { status: 400 },
      );
    }

    // Mã hóa mật khẩu
    const hashedPassword = await hashPassword(password);

    // Tạo User mới
    const newUser = new User({
      username,
      password: hashedPassword,
      name,
      avatar,
      phoneNumber,
      status: "active",
    });

    await newUser.save();

    // Trả về không chứa password
    return NextResponse.json(
      {
        message: "Tạo tài khoản User thành công.",
        user: {
          id: newUser.id,
          username: newUser.username,
          name: newUser.name,
          avatar: newUser.avatar,
          phoneNumber: newUser.phoneNumber,
          status: newUser.status,
        },
      },
      { status: 201 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Đã có lỗi xảy ra", error: error.message },
      { status: 500 },
    );
  }
}
