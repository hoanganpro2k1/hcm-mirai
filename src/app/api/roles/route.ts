import dbConnect from "@/lib/mongoose";
import { authorize } from "@/lib/rbac";
import { formatDocument } from "@/lib/format-document";
import Role from "@/models/role";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { errorResponse } = await authorize(req); // Any authenticated user can see roles for selection
    if (errorResponse) return errorResponse;

    await dbConnect();

    const roles = await Role.find({ deletedAt: null, isActive: true })
      .select("name description permissions")
      .populate("permissions", "name description")
      .sort({ name: 1 });

    return NextResponse.json(formatDocument(roles));
  } catch (error: any) {
    return NextResponse.json(
      { message: "Lỗi nội bộ", error: error.message },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { payload, errorResponse } = await authorize(req);
    if (errorResponse) return errorResponse;

    // Chỉ Admin mới được tạo Role
    if (payload?.roleName?.toLowerCase() !== "admin") {
      return NextResponse.json(
        { message: "Bạn không có quyền thực hiện hành động này." },
        { status: 403 },
      );
    }

    await dbConnect();
    const body = await req.json();

    const newRole = await Role.create({
      ...body,
      createdBy: payload.userId,
    });

    return NextResponse.json(formatDocument(newRole), { status: 201 });
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json(
        { message: "Tên vai trò này đã tồn tại." },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { message: "Lỗi nội bộ", error: error.message },
      { status: 500 },
    );
  }
}
