import dbConnect from "@/lib/mongoose";
import { authorize } from "@/lib/rbac";
import { formatDocument } from "@/lib/format-document";
import Post from "@/models/post";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { payload, errorResponse } = await authorize(req);
    if (errorResponse) return errorResponse;

    await dbConnect();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "100");
    const skip = (page - 1) * limit;

    const query: any = { deletedAt: null };

    const posts = await Post.find(query)
      .populate("author", "name username")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Post.countDocuments(query);

    return NextResponse.json({
      data: formatDocument(posts),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
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

    await dbConnect();
    const body = await req.json();

    // publishedAt handling
    if (body.status === "published" && !body.publishedAt) {
      body.publishedAt = new Date();
    }

    const newPost = await Post.create({
      ...body,
      author: payload?.userId,
    });

    return NextResponse.json(formatDocument(newPost), { status: 201 });
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json(
        { message: "Slug này đã tồn tại, vui lòng đổi tiêu đề." },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { message: "Lỗi nội bộ", error: error.message },
      { status: 500 },
    );
  }
}
