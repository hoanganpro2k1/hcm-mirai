import dbConnect from "@/lib/mongoose";
import { formatDocument } from "@/lib/format-document";
import Post from "@/models/post";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "9");
    const category = searchParams.get("category");
    const skip = (page - 1) * limit;

    const query: any = {
      status: "published",
      deletedAt: null,
    };

    if (category && category !== "all") {
      query.category = category;
    }

    const posts = await Post.find(query)
      .populate("author", "name avatar")
      .sort({ publishedAt: -1, createdAt: -1 })
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
