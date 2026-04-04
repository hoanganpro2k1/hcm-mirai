import { formatDocument } from "@/lib/format-document";
import dbConnect from "@/lib/mongoose";
import { authorize } from "@/lib/rbac";
import Media from "@/models/media";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/media
 * Fetch paginated media list with infinite scrolling support.
 */
export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const search = searchParams.get("search") || "";
    const folder = searchParams.get("folder") || "general";

    const query: any = { deletedAt: null };
    if (search) {
      query.fileName = { $regex: search, $options: "i" };
    }
    if (folder && folder !== "all") {
      query.folder = folder;
    }

    const skip = (page - 1) * limit;

    const [mediaItems, total] = await Promise.all([
      Media.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Media.countDocuments(query),
    ]);

    return NextResponse.json({
      data: formatDocument(mediaItems),
      total,
      page,
      totalPages: Math.ceil(total / limit),
      hasMore: skip + mediaItems.length < total,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Lỗi khi tải thư viện ảnh", error: error.message },
      { status: 500 },
    );
  }
}

/**
 * POST /api/media
 * Save metadata after successful Cloudinary upload.
 */
export async function POST(req: NextRequest) {
  try {
    const { errorResponse } = await authorize(req);
    if (errorResponse) return errorResponse;

    await dbConnect();
    const body = await req.json();

    const { url, public_id, fileName, mimeType, size, width, height, folder } =
      body;

    if (!url || !public_id || !fileName) {
      return NextResponse.json(
        { message: "Thiếu thông tin hình ảnh." },
        { status: 400 },
      );
    }

    // Check if media with this public_id already exists (might have been soft-deleted)
    let media = await Media.findOne({ public_id });

    if (media) {
      // Restore if soft-deleted
      media.deletedAt = null;
      media.fileName = fileName;
      media.folder = folder || "general";
      await media.save();
    } else {
      media = await Media.create({
        url,
        public_id,
        fileName,
        mimeType,
        size,
        width,
        height,
        folder: folder || "general",
      });
    }

    return NextResponse.json(formatDocument(media), { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Lỗi khi lưu thông tin ảnh", error: error.message },
      { status: 500 },
    );
  }
}

/**
 * DELETE /api/media
 * Soft-delete media items.
 */
export async function DELETE(req: NextRequest) {
  try {
    const { errorResponse } = await authorize(req);
    if (errorResponse) return errorResponse;

    await dbConnect();
    const { ids } = await req.json();

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { message: "Vui lòng chọn ảnh để xóa." },
        { status: 400 },
      );
    }

    // Soft delete
    await Media.updateMany(
      { _id: { $in: ids } },
      { $set: { deletedAt: new Date() } },
    );

    return NextResponse.json({ message: "Đã xóa ảnh thành công (Xóa mềm)." });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Lỗi khi xóa ảnh", error: error.message },
      { status: 500 },
    );
  }
}
