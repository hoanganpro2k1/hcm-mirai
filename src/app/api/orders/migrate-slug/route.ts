import dbConnect from "@/lib/mongoose";
import Order from "@/models/order";
import { slugify } from "@/lib/utils";
import { NextResponse } from "next/server";

/**
 * API tạm thời để migrate slug cho các đơn hàng cũ.
 * Truy cập: GET /api/orders/migrate-slug
 */
export async function GET() {
  try {
    await dbConnect();

    const orders = await Order.find({ 
      $or: [
        { slug: { $exists: false } },
        { slug: "" },
        { slug: null }
      ]
    });

    const results = [];

    for (const order of orders) {
      const newSlug = slugify(order.title);
      order.slug = newSlug;
      await order.save();
      results.push({ id: order._id, title: order.title, slug: newSlug });
    }

    return NextResponse.json({
      message: `Đã cập nhật slug cho ${results.length} đơn hàng.`,
      updated: results
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
