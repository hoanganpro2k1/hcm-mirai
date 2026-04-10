import dbConnect from "@/lib/mongoose";
import { formatDocument } from "@/lib/format-document";
import Post from "@/models/post";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await dbConnect();
    const { slug } = await params;

    const post = await Post.findOne({
      slug: slug,
      status: "published",
      deletedAt: null,
    }).populate("author", "name avatar");

    if (!post) {
      return NextResponse.json(
        { message: "Không tìm thấy bài viết" },
        { status: 404 }
      );
    }

    return NextResponse.json(formatDocument(post));
  } catch (error: any) {
    return NextResponse.json(
      { message: "Lỗi nội bộ", error: error.message },
      { status: 500 }
    );
  }
}
