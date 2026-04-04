import dbConnect from "@/lib/mongoose";
import { authorize } from "@/lib/rbac";
import User from "@/models/user";
import Order from "@/models/order";
import Media from "@/models/media";
import { NextRequest, NextResponse } from "next/server";
import { formatDocument } from "@/lib/format-document";

/**
 * GET /api/admin/stats
 * Get aggregated statistics for the admin dashboard.
 */
export async function GET(req: NextRequest) {
  try {
    const { errorResponse } = await authorize(req);
    if (errorResponse) return errorResponse;

    await dbConnect();

    // Aggregate counts
    const [
      totalUsers,
      activeUsers,
      totalOrders,
      totalMedia,
      recentMedia,
      recentOrders,
    ] = await Promise.all([
      User.countDocuments({ deletedAt: null }),
      User.countDocuments({ status: "active", deletedAt: null }),
      Order.countDocuments({ deletedAt: null }),
      Media.countDocuments({ deletedAt: null }),
      Media.find({ deletedAt: null }).sort({ createdAt: -1 }).limit(8).select("url fileName"),
      Order.find({ deletedAt: null }).sort({ createdAt: -1 }).limit(5).select("title coverImage location salary status"),
    ]);

    return NextResponse.json({
      stats: {
        users: {
          total: totalUsers,
          active: activeUsers,
          inactive: totalUsers - activeUsers,
        },
        orders: {
          total: totalOrders,
        },
        media: {
          total: totalMedia,
        },
      },
      recent: {
        media: formatDocument(recentMedia),
        orders: formatDocument(recentOrders),
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Lỗi khi lấy thống kê hệ thống", error: error.message },
      { status: 500 },
    );
  }
}
