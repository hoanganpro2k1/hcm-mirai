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

    const matchStage: any = { deletedAt: null };
    if (s) {
      // Tách từ khóa thành các từ đơn để tìm kiếm linh hoạt (như Full Text Search)
      // Ví dụ: "Tuyển nam" sẽ khớp với "Tuyển 10 Nam"
      const terms = s.split(/\s+/).filter((t) => t.length > 0);
      if (terms.length > 0) {
        const pattern = terms
          .map((t) => `(?=.*${t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`)
          .join("");
        const flexibleRegex = { $regex: pattern, $options: "i" };

        matchStage.$or = [
          { title: flexibleRegex },
          { description: flexibleRegex },
          { location: flexibleRegex },
        ];
      }
    }

    const skip = (page - 1) * limit;

    const pipeline: any[] = [{ $match: matchStage }];

    if (s) {
      pipeline.push({
        $addFields: {
          relevance_score: {
            $add: [
              // 1. Ưu tiên tuyệt đối: Khớp chính xác toàn bộ cụm từ (100đ)
              { $cond: [{ $eq: ["$title", s] }, 100, 0] },
              // 2. Ưu tiên cao: Bắt đầu bằng toàn bộ cụm từ (50đ)
              {
                $cond: [
                  { $regexMatch: { input: "$title", regex: `^${s}`, options: "i" } },
                  50,
                  0,
                ],
              },
              // 3. Ưu tiên trung bình: Chứa nguyên cụm từ dính liền (20đ)
              {
                $cond: [
                  { $regexMatch: { input: "$title", regex: s, options: "i" } },
                  20,
                  0,
                ],
              },
              // 4. Ưu tiên cơ bản: Chứa các từ lẻ (đã lọc ở matchStage) (10đ)
              10,
            ],
          },
        },
      });
      pipeline.push({ $sort: { relevance_score: -1, createdAt: -1 } });
    } else {
      pipeline.push({ $sort: { createdAt: -1 } });
    }

    pipeline.push(
      { $skip: skip },
      { $limit: limit },
      {
        $lookup: {
          from: "users",
          localField: "createdBy",
          foreignField: "_id",
          as: "createdBy",
        },
      },
      { $unwind: { path: "$createdBy", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          coverImage: 1,
          title: 1,
          salary: 1,
          location: 1,
          createdAt: 1,
          description: 1,
          relevance_score: 1,
          "createdBy.username": 1,
          "createdBy._id": 1,
        },
      }
    );

    const [orders, total] = await Promise.all([
      Order.aggregate(pipeline),
      Order.countDocuments(matchStage),
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
