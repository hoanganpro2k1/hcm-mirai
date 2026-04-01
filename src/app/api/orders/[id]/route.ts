import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Order from "@/models/order";
import Admin from "@/models/admin"; // Nạp Admin để hỗ trợ populate createdBy
import { authorize } from "@/lib/rbac";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const _ForceAdmin = Admin.modelName; 
    const { id } = await params;

    const order = await Order.findOne({ _id: id, deletedAt: null }).populate("createdBy", "username");

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(order, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: "Failed to fetch order", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    // Check authorization and permission
    const { payload, errorResponse } = await authorize(req, "orders:edit");
    if (errorResponse) return errorResponse;

    const { id } = await params;
    const body = await req.json();

    // Ensure we don't accidentally un-delete or change createdBy via PUT
    delete body.deletedAt;
    delete body.createdBy;

    const order = await Order.findOneAndUpdate(
      { _id: id, deletedAt: null },
      { 
        $set: {
          ...body,
          updatedBy: payload?.adminId,
        }
      },
      { new: true, runValidators: true }
    );

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(order, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: "Failed to update order", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    // Check authorization and permission
    const { payload, errorResponse } = await authorize(req, "orders:delete");
    if (errorResponse) return errorResponse;

    const { id } = await params;

    // Soft delete by setting deletedAt and deletedBy
    const order = await Order.findOneAndUpdate(
      { _id: id, deletedAt: null },
      { 
        $set: { 
          deletedAt: new Date(),
          deletedBy: payload?.adminId,
        }
      },
      { new: true }
    );

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Order deleted successfully" },
      { status: 200 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      { error: "Failed to delete order", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
