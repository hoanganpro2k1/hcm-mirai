import dbConnect from "@/lib/mongoose";
import Order from "@/models/order";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    // Fetch orders that are not soft-deleted
    const orders = await Order.find({ deletedAt: null }).sort({
      createdAt: -1,
    });

    return NextResponse.json(orders, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error: "Failed to fetch orders",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();

    // Validate required fields
    if (!body.title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const order = await Order.create({
      ...body,
      deletedAt: null,
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error: "Failed to create order",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
