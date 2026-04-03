import dbConnect from "@/lib/mongoose";
import Order from "@/models/order";
import Admin from "@/models/admin";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    // Ensure Admin model is registered for populate
    void Admin.modelName;

    const { searchParams } = new URL(req.url);
    const s = searchParams.get("s") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    const query: any = { deletedAt: null };
    
    if (s) {
      query.$or = [
        { title: { $regex: s, $options: "i" } },
        { description: { $regex: s, $options: "i" } },
        { location: { $regex: s, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;

    const [orders, total] = await Promise.all([
      Order.find(query)
        .select("coverImage title salary location createdBy createdAt description")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("createdBy", "username"),
      Order.countDocuments(query),
    ]);

    return NextResponse.json(
      {
        data: orders.map((order: any) => ({
          id: order._id,
          coverImage: order.coverImage,
          title: order.title,
          salary: order.salary,
          location: order.location,
          createdBy: order.createdBy
            ? {
                id: order.createdBy._id,
                username: order.createdBy.username,
              }
            : null,
          createdAt: order.createdAt,
          description: order.description,
        })),
        total,
        page,
        totalPages: Math.ceil(total / limit),
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error: "Failed to search orders",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
