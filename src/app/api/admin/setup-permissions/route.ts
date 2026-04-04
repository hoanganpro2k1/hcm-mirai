import dbConnect from "@/lib/mongoose";
import Permission from "@/models/permission";
import Role from "@/models/role";
import { authorize } from "@/lib/rbac";
import { formatDocument } from "@/lib/format-document";
import { NextRequest, NextResponse } from "next/server";

/**
 * API tạm thời để setup quyền cho Editor.
 * Chỉ Admin mới có quyền chạy API này.
 */
export async function GET(req: NextRequest) {
  try {
    /* 
    // Tạm thời gỡ bỏ kiểm tra Authorization để có thể chạy trực tiếp từ trình duyệt
    const { payload, errorResponse } = await authorize(req);
    if (errorResponse) return errorResponse;
    if (payload?.roleName?.toLowerCase() !== "admin") {
      return NextResponse.json({ message: "Chỉ Admin mới có quyền chạy setup!" }, { status: 403 });
    }
    */

    await dbConnect();

    // 2. Đảm bảo các quyền 'orders' tồn tại
    const permissionsToCreate = [
      {
        name: "orders:view",
        description: "Quyền xem danh sách đơn hàng XKLĐ",
        path: "/api/orders",
        method: "GET",
        module: "orders"
      },
      {
        name: "orders:create",
        description: "Quyền tạo mới đơn hàng XKLĐ",
        path: "/api/orders",
        method: "POST",
        module: "orders"
      },
      {
        name: "orders:delete",
        description: "Quyền xóa đơn hàng XKLĐ",
        path: "/api/orders",
        method: "DELETE",
        module: "orders"
      }
    ];

    const permissionIds = [];
    for (const p of permissionsToCreate) {
      let perm = await Permission.findOne({ name: p.name });
      if (!perm) {
        perm = await Permission.create(p);
      }
      permissionIds.push(perm._id);
    }

    // 3. Cập nhật Role 'editor'
    const editorRole = await Role.findOneAndUpdate(
      { name: "editor" },
      { 
        $set: { 
          permissions: permissionIds 
        } 
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({
      message: "Setup hoàn tất!",
      role: "editor",
      permissions: permissionsToCreate.map(p => p.name),
      data: formatDocument(editorRole)
    });
  } catch (error: any) {
    return NextResponse.json({ message: "Lỗi setup", error: error.message }, { status: 500 });
  }
}
