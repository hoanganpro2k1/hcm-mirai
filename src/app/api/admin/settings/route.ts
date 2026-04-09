import dbConnect from "@/lib/mongoose";
import { authorize } from "@/lib/rbac";
import Setting from "@/models/setting";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    await dbConnect();

    // Check authorization
    const { payload, errorResponse } = await authorize(req, "settings:update");
    if (errorResponse) return errorResponse;

    const body = await req.json();
    const { key, value } = body;

    if (!key) {
      return NextResponse.json({ error: "Key is required" }, { status: 400 });
    }

    const setting = await Setting.findOneAndUpdate(
      { key },
      { value, updatedBy: payload?.userId },
      { new: true, upsert: true }
    );

    return NextResponse.json(setting, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error: "Failed to update setting",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    
    // Check authorization
    const { errorResponse } = await authorize(req, "settings:view");
    if (errorResponse) return errorResponse;

    const settings = await Setting.find({});
    return NextResponse.json(settings, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error: "Failed to fetch settings",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
