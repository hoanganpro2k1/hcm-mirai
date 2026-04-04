import { hashPassword } from "@/lib/auth";
import dbConnect from "@/lib/mongoose";
import { authorize } from "@/lib/rbac";
import Role from "@/models/role";
import { formatDocument } from "@/lib/format-document";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { errorResponse } = await authorize(req, "users:view");
    if (errorResponse) return errorResponse;

    await dbConnect();
    void Role.modelName;

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const s = searchParams.get("s") || "";
    const roleId = searchParams.get("role");
    const status = searchParams.get("status");

    const query: any = { deletedAt: null };

    // Tìm kiếm mờ (username, name, phoneNumber)
    if (s) {
      query.$or = [
        { username: { $regex: s, $options: "i" } },
        { name: { $regex: s, $options: "i" } },
        { phoneNumber: { $regex: s, $options: "i" } },
      ];
    }

    if (roleId) {
      query.role = roleId;
    }

    if (status) {
      query.status = status;
    }

    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      User.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("role", "name description")
        .select("-password -refreshToken"),
      User.countDocuments(query),
    ]);

    return NextResponse.json({
      data: formatDocument(users),
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Lỗi nội bộ", error: error.message },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { errorResponse, payload: currentUser } = await authorize(
      req,
      "users:create",
    );
    if (errorResponse) return errorResponse;

    await dbConnect();

    const body = await req.json();
    const { username, password, name, phoneNumber, role, status, avatar } =
      body;

    if (!username || !password) {
      return NextResponse.json(
        { message: "Thiếu username hoặc password." },
        { status: 400 },
      );
    }

    // Kiểm tra trùng username
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return NextResponse.json(
        { message: "Tên đăng nhập đã tồn tại." },
        { status: 400 },
      );
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({
      username,
      password: hashedPassword,
      name,
      phoneNumber,
      role,
      status: status || "active",
      avatar,
      createdBy: currentUser?.userId,
    });

    return NextResponse.json(formatDocument(newUser), { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Lỗi nội bộ", error: error.message },
      { status: 500 },
    );
  }
}
