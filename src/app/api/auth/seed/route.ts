import dbConnect from "@/lib/mongoose";
import Permission from "@/models/permission";
import Role from "@/models/role";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    // 1. Khởi tạo Permissions
    const permissionsData = [
      {
        name: "orders:create",
        description: "Quyền tạo đơn hàng mới",
        path: "/api/orders",
        method: "POST",
        module: "ORDERS",
      },
      {
        name: "orders:edit",
        description: "Quyền chỉnh sửa đơn hàng",
        path: "/api/orders/[id]",
        method: "PUT",
        module: "ORDERS",
      },
      {
        name: "orders:delete",
        description: "Quyền xóa đơn hàng",
        path: "/api/orders/[id]",
        method: "DELETE",
        module: "ORDERS",
      },
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
        permissions: permissions.map((p) => p.id as any),
        isActive: true,
      });
    }

    // Role Editor: Chỉ có quyền tạo và sửa
    let editorRole = await Role.findOne({ name: "editor" });
    if (!editorRole) {
      const editorPermissions = permissions
        .filter((p) => ["orders:create", "orders:edit"].includes(p.name))
        .map((p) => p.id as any);

      editorRole = await Role.create({
        name: "editor",
        description: "Biên tập viên",
        permissions: editorPermissions,
        isActive: true,
      });
    }

    // 3. Gán Role Admin cho tài khoản User đầu tiên tìm thấy (nếu có)
    const firstUser = await User.findOne();
    if (firstUser && !firstUser.role) {
      firstUser.role = adminRole.id as any;
      await firstUser.save();
    }

    return NextResponse.json({
      message: "Khởi tạo dữ liệu Role & Permission thành công!",
      stats: {
        permissionsCreated: permissions.length,
        rolesCreated: 2,
        userUpdated: firstUser ? firstUser.username : "Không tìm thấy user nào",
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
