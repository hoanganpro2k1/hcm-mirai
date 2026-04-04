import dbConnect from "@/lib/mongoose";
import { authorize } from "@/lib/rbac";
import Consultation from "@/models/consultation";
import { NextRequest, NextResponse } from "next/server";
import { formatDocument } from "@/lib/format-document";

/**
 * PATCH /api/admin/consultations/[id]
 * Update the status of a consultation request and record the processor.
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { payload, errorResponse } = await authorize(req, "consultations:edit");
    if (errorResponse) return errorResponse;

    await dbConnect();
    const { id } = await params;

    const body = await req.json();
    const { status } = body;

    if (!status || !["pending", "processed", "cancelled"].includes(status)) {
      return NextResponse.json(
        { message: "Trạng thái không hợp lệ" },
        { status: 400 }
      );
    }

    const updateData: any = { status };
    
    // If status is changed to processed or cancelled, record the processor
    if (status !== "pending") {
      updateData.processedBy = payload?.userId;
      updateData.processedAt = new Date();
    } else {
      // If changed back to pending, clear the processor info
      updateData.processedBy = null;
      updateData.processedAt = null;
    }

    const consultation = await Consultation.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    ).populate("processedBy", "name username");

    if (!consultation) {
      return NextResponse.json(
        { message: "Không tìm thấy yêu cầu tư vấn" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Cập nhật trạng thái thành công",
      data: formatDocument(consultation),
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Lỗi khi cập nhật trạng thái", error: error.message },
      { status: 500 },
    );
  }
}
