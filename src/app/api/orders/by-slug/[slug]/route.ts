import dbConnect from "@/lib/mongoose";
import { formatDocument } from "@/lib/format-document";
import Order from "@/models/order";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await dbConnect();
    // Đảm bảo User model được nạp (tránh lỗi Schema hasn't been registered khi populate)
    void User.modelName;

    const { slug } = await params;

    const order = await Order.findOne({
      slug: slug,
      deletedAt: null,
    }).populate("createdBy", "username");

    if (!order) {
      return NextResponse.json(
        { message: "Không tìm thấy đơn hàng" },
        { status: 404 }
      );
    }

    return NextResponse.json(formatDocument(order));
  } catch (error: any) {
    return NextResponse.json(
      { message: "Lỗi nội bộ", error: error.message },
      { status: 500 }
    );
  }
}
