import dbConnect from "@/lib/mongoose";
import Consultation from "@/models/consultation";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { name, phone, email, note } = body;

    // Validation
    if (!name || !phone) {
      return NextResponse.json(
        { message: "Họ tên và Số điện thoại là bắt buộc" },
        { status: 400 },
      );
    }

    const newConsultation = await Consultation.create({
      name,
      phone,
      email: email || "",
      note: note || "",
      status: "pending",
    });

    return NextResponse.json(
      {
        message: "Yêu cầu tư vấn của bạn đã được gửi thành công!",
        data: newConsultation,
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Consultation Submission Error:", error);
    return NextResponse.json(
      { message: "Đã có lỗi xảy ra khi gửi yêu cầu. Vui lòng thử lại sau." },
      { status: 500 },
    );
  }
}
