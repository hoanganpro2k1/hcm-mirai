import { formatDocument } from "@/lib/format-document";
import dbConnect from "@/lib/mongoose";
import { authorize } from "@/lib/rbac";
import Role from "@/models/role";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const { payload, errorResponse } = await authorize(req);
    if (errorResponse) return errorResponse;

    if (payload?.roleName?.toLowerCase() !== "admin") {
      return NextResponse.json(
        { message: "Bạn không có quyền thực hiện hành động này." },
        { status: 403 },
      );
    }

    await dbConnect();
    const body = await req.json();

    const updatedRole = await Role.findByIdAndUpdate(
      id,
      { ...body, updatedBy: payload.userId },
      { new: true, runValidators: true },
    ).populate("permissions", "name description");

    if (!updatedRole) {
      return NextResponse.json(
        { message: "Không tìm thấy vai trò." },
        { status: 404 },
      );
    }

    return NextResponse.json(formatDocument(updatedRole));
  } catch (error: any) {
    return NextResponse.json(
      { message: "Lỗi nội bộ", error: error.message },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const { payload, errorResponse } = await authorize(req);
    if (errorResponse) return errorResponse;

    if (payload?.roleName?.toLowerCase() !== "admin") {
      return NextResponse.json(
        { message: "Bạn không có quyền thực hiện hành động này." },
        { status: 403 },
      );
    }

    await dbConnect();

    // Kiểm tra xem có user nào đang sử dụng role này không
    const userCount = await User.countDocuments({ role: id });
    if (userCount > 0) {
      return NextResponse.json(
        { message: "Không thể xóa vai trò đang có người dùng sử dụng." },
        { status: 400 },
      );
    }

    const deletedRole = await Role.findByIdAndUpdate(
      id,
      { deletedAt: new Date(), isActive: false },
      { new: true },
    );

    if (!deletedRole) {
      return NextResponse.json(
        { message: "Không tìm thấy vai trò." },
        { status: 404 },
      );
    }

    return NextResponse.json({ message: "Đã xóa vai trò thành công." });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Lỗi nội bộ", error: error.message },
      { status: 500 },
    );
  }
}
