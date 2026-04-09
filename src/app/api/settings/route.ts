import dbConnect from "@/lib/mongoose";
import Setting from "@/models/setting";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const settings = await Setting.find({});
    
    // Transform array to key-value object
    const settingsMap = settings.reduce((acc: any, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});

    return NextResponse.json(settingsMap, { status: 200 });
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
