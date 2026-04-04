import dbConnect from "@/lib/mongoose";
import Order from "@/models/order";
import User from "@/models/user";
import { formatDocument } from "@/lib/format-document";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    // Ensure User model is registered for populate
    void User.modelName;

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
        data: formatDocument(orders),
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
