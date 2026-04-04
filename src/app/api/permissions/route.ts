import dbConnect from "@/lib/mongoose";
import { authorize } from "@/lib/rbac";
import { formatDocument } from "@/lib/format-document";
import Permission from "@/models/permission";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { payload, errorResponse } = await authorize(req);
    if (errorResponse) return errorResponse;
    if (payload?.roleName?.toLowerCase() !== "admin") {
       return NextResponse.json({ message: "Bạn không có quyền thực hiện hành động này." }, { status: 403 });
    }

    await dbConnect();

    const permissions = await Permission.find({ deletedAt: null })
      .sort({ module: 1, name: 1 });

    return NextResponse.json(formatDocument(permissions));
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
    if (payload?.roleName?.toLowerCase() !== "admin") {
       return NextResponse.json({ message: "Bạn không có quyền thực hiện hành động này." }, { status: 403 });
    }

    await dbConnect();
    const body = await req.json();

    const newPermission = await Permission.create({
      ...body,
      createdBy: payload.userId,
    });

    return NextResponse.json(formatDocument(newPermission), { status: 201 });
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json(
        { message: "Permission này đã tồn tại." },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { message: "Lỗi nội bộ", error: error.message },
      { status: 500 },
    );
  }
}
