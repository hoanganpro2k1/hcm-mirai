import dbConnect from "@/lib/mongoose";
import { authorize } from "@/lib/rbac";
import Order from "@/models/order";
import User from "@/models/user"; // Phải import User để Mongoose đăng ký model này cho populate
import { formatDocument } from "@/lib/format-document";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    // Đảm bảo User model được nạp (tránh lỗi Schema hasn't been registered)
    void User.modelName;

    const { searchParams } = new URL(req.url);
    const country = searchParams.get("country");
    const category = searchParams.get("category");
    const gender = searchParams.get("gender");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    const query: any = { deletedAt: null };
    if (country && country !== "all") query.country = country;
    if (category && category !== "all") query.category = category;
    if (gender && gender !== "all" && gender !== "both") query.gender = gender;

    const skip = (page - 1) * limit;

    const [orders, total] = await Promise.all([
      Order.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select("-content -updatedBy -deletedBy -deletedAt")
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
      { status: 200 },
    );
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error: "Failed to fetch orders",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    // Check authorization and permission
    const { payload, errorResponse } = await authorize(req, "orders:create");
    if (errorResponse) return errorResponse;

    const body = await req.json();
    const { slugify } = await import("@/lib/utils");

    // Validate required fields
    if (!body.title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const order = await Order.create({
      ...body,
      slug: body.slug || slugify(body.title),
      createdBy: payload?.userId,
      deletedAt: null,
    });

    return NextResponse.json(formatDocument(order), { status: 201 });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error: "Failed to create order",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
