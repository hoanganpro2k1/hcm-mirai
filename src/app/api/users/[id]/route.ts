import { hashPassword } from "@/lib/auth";
import dbConnect from "@/lib/mongoose";
import { authorize } from "@/lib/rbac";
import User from "@/models/user";
import { formatDocument } from "@/lib/format-document";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { errorResponse } = await authorize(req, "users:view");
    if (errorResponse) return errorResponse;

    await dbConnect();
    const { id } = await params;

    const user = await User.findOne({ _id: id, deletedAt: null })
      .populate("role", "name description")
      .select("-password -refreshToken");

    if (!user) {
      return NextResponse.json({ message: "Người dùng không tồn tại." }, { status: 404 });
    }

    return NextResponse.json(formatDocument(user));
  } catch (error: any) {
    return NextResponse.json({ message: "Lỗi nội bộ", error: error.message }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { errorResponse, payload: currentUser } = await authorize(req, "users:edit");
    if (errorResponse) return errorResponse;

    await dbConnect();
    const { id } = await params;
    const body = await req.json();
    
    // Create an update object, excluding protected fields
    const { password, ...updateData } = body;
    
    const updatePayload: any = { 
      ...updateData,
      updatedBy: currentUser?.userId 
    };

    // If providing a new password, hash it
    if (password && password.trim() !== "") {
      updatePayload.password = await hashPassword(password);
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: id, deletedAt: null },
      updatePayload,
      { new: true }
    ).select("-password -refreshToken").populate("role", "name description");

    if (!updatedUser) {
      return NextResponse.json({ message: "Người giữ dụng không tồn tại." }, { status: 404 });
    }

    return NextResponse.json(formatDocument(updatedUser));
  } catch (error: any) {
    return NextResponse.json({ message: "Lỗi nội bộ", error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { errorResponse, payload: currentUser } = await authorize(req, "users:delete");
    if (errorResponse) return errorResponse;

    await dbConnect();
    const { id } = await params;

    // Prevent self-deletion
    if (id === currentUser?.userId) {
      return NextResponse.json({ message: "Bạn không thể xóa chính mình." }, { status: 400 });
    }

    const deletedUser = await User.findOneAndUpdate(
      { _id: id, deletedAt: null },
      { 
        deletedAt: new Date(),
        deletedBy: currentUser?.userId
      },
      { new: true }
    );

    if (!deletedUser) {
      return NextResponse.json({ message: "Người dùng không tồn tại." }, { status: 404 });
    }

    return NextResponse.json({ message: "Xóa người dùng thành công." });
  } catch (error: any) {
    return NextResponse.json({ message: "Lỗi nội bộ", error: error.message }, { status: 500 });
  }
}
