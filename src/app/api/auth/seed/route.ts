import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Permission from "@/models/permission";
import Role from "@/models/role";
import Admin from "@/models/admin";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    // 1. Khởi tạo Permissions
    const permissionsData = [
      { name: "orders:create", description: "Quyền tạo đơn hàng mới", path: "/api/orders", method: "POST", module: "ORDERS" },
      { name: "orders:edit", description: "Quyền chỉnh sửa đơn hàng", path: "/api/orders/[id]", method: "PUT", module: "ORDERS" },
      { name: "orders:delete", description: "Quyền xóa đơn hàng", path: "/api/orders/[id]", method: "DELETE", module: "ORDERS" },
    ];

    const permissions = [];
    for (const p of permissionsData) {
      const existing = await Permission.findOne({ name: p.name });
      if (!existing) {
        permissions.push(await Permission.create(p));
      } else {
        permissions.push(existing);
      }
    }

    // 2. Khởi tạo Roles
    // Role Admin: Có tất cả các quyền
    let adminRole = await Role.findOne({ name: "admin" });
    if (!adminRole) {
      adminRole = await Role.create({
        name: "admin",
        description: "Quản trị viên toàn quyền",
        permissions: permissions.map((p) => p._id),
        isActive: true,
      });
    }

    // Role Editor: Chỉ có quyền tạo và sửa
    let editorRole = await Role.findOne({ name: "editor" });
    if (!editorRole) {
      const editorPermissions = permissions
        .filter((p) => ["orders:create", "orders:edit"].includes(p.name))
        .map((p) => p._id);
        
      editorRole = await Role.create({
        name: "editor",
        description: "Biên tập viên",
        permissions: editorPermissions,
        isActive: true,
      });
    }

    // 3. Gán Role Admin cho tài khoản Admin đầu tiên tìm thấy (nếu có)
    const firstAdmin = await Admin.findOne();
    if (firstAdmin && !firstAdmin.role) {
      firstAdmin.role = adminRole._id;
      await firstAdmin.save();
    }

    return NextResponse.json({
      message: "Khởi tạo dữ liệu Role & Permission thành công!",
      stats: {
        permissionsCreated: permissions.length,
        rolesCreated: 2,
        adminUpdated: firstAdmin ? firstAdmin.username : "Không tìm thấy admin nào",
      }
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
