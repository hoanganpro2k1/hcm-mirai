"use client";

import { RoleForm } from "@/components/features/admin/roles/RoleForm";
import { RoleList } from "@/components/features/admin/roles/RoleList";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRoles } from "@/hooks/use-roles";
import { IPopulatedRole } from "@/types/role.type";
import { Plus, ShieldCheck } from "lucide-react";
import { useState } from "react";

export default function AdminRolesPage() {
  const { roles, loading, createRole, updateRole, deleteRole, isCreating, isUpdating } = useRoles();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<IPopulatedRole | null>(null);

  const handleAdd = () => {
    setSelectedRole(null);
    setIsFormOpen(true);
  };

  const handleEdit = (role: IPopulatedRole) => {
    setSelectedRole(role);
    setIsFormOpen(true);
  };

  const handleSubmit = async (data: any) => {
    try {
      if (selectedRole) {
        await updateRole({ id: selectedRole.id, data });
      } else {
        await createRole(data);
      }
      setIsFormOpen(false);
    } catch (error) {
      console.error("Role operation error:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-primary" />
            Quản lý Vai trò & Phân quyền
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Tạo và thiết lập các quyền hạn chi tiết cho từng nhóm người dùng trong hệ thống.
          </p>
        </div>
        <Button onClick={handleAdd} className="w-full md:w-auto shadow-sm">
          <Plus className="mr-2 h-4 w-4" />
          Thêm vai trò mới
        </Button>
      </div>

      <Card className="border-none shadow-sm bg-white dark:bg-slate-950 overflow-hidden">
        <CardHeader className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <CardTitle className="text-lg font-semibold">Danh sách Vai trò</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <RoleList
            roles={roles}
            loading={loading}
            onEdit={handleEdit}
            onDelete={deleteRole}
          />
        </CardContent>
      </Card>

      <RoleForm
        key={isFormOpen ? (selectedRole?.id || "new") : "closed"}
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        role={selectedRole}
        onSubmit={handleSubmit}
        loading={isCreating || isUpdating}
      />
    </div>
  );
}
