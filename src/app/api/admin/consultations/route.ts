import dbConnect from "@/lib/mongoose";
import { authorize } from "@/lib/rbac";
import Consultation from "@/models/consultation";
import { NextRequest, NextResponse } from "next/server";
import { formatDocument } from "@/lib/format-document";

/**
 * GET /api/admin/consultations
 * List all consultation requests for admins.
 */
export async function GET(req: NextRequest) {
  try {
    const { errorResponse } = await authorize(req);
    if (errorResponse) return errorResponse;

    await dbConnect();

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const query: any = {};
    if (status && status !== "all") {
      query.status = status;
    }

    const [consultations, total] = await Promise.all([
      Consultation.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("processedBy", "name username"),
      Consultation.countDocuments(query),
    ]);

    return NextResponse.json({
      data: formatDocument(consultations),
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Lỗi khi lấy danh sách yêu cầu tư vấn", error: error.message },
      { status: 500 },
    );
  }
}
