import dbConnect from "@/lib/mongoose";
import { authorize } from "@/lib/rbac";
import { formatDocument } from "@/lib/format-document";
import Post from "@/models/post";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { errorResponse } = await authorize(req);
    if (errorResponse) return errorResponse;

    const { id } = await params;
    await dbConnect();

    const post = await Post.findOne({ _id: id, deletedAt: null }).populate(
      "author",
      "name username"
    );

    if (!post) {
      return NextResponse.json(
        { message: "Không tìm thấy bài viết." },
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

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { payload, errorResponse } = await authorize(req);
    if (errorResponse) return errorResponse;

    const { id } = await params;
    await dbConnect();
    const body = await req.json();

    // publishedAt handling
    if (body.status === "published" && !body.publishedAt) {
      // If it was draft before and now published
      const currentPost = await Post.findById(id);
      if (currentPost && currentPost.status === "draft") {
        body.publishedAt = new Date();
      }
    }

    const updatedPost = await Post.findOneAndUpdate(
      { _id: id, deletedAt: null },
      { ...body, updatedBy: payload?.userId },
      { new: true, runValidators: true }
    );

    if (!updatedPost) {
      return NextResponse.json(
        { message: "Không tìm thấy bài viết hoặc đã bị xóa." },
        { status: 404 }
      );
    }

    return NextResponse.json(formatDocument(updatedPost));
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json(
        { message: "Slug này đã tồn tại, vui lòng đổi tiêu đề." },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: "Lỗi nội bộ", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { payload, errorResponse } = await authorize(req);
    if (errorResponse) return errorResponse;

    const { id } = await params;
    await dbConnect();

    const deletedPost = await Post.findOneAndUpdate(
      { _id: id, deletedAt: null },
      { deletedAt: new Date(), deletedBy: payload?.userId }
    );

    if (!deletedPost) {
      return NextResponse.json(
        { message: "Không tìm thấy bài viết hoặc đã bị xóa từ trước." },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Xóa bài viết thành công." });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Lỗi nội bộ", error: error.message },
      { status: 500 }
    );
  }
}
