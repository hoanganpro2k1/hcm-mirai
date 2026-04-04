"use client";

import { UserFilter } from "@/components/features/admin/users/UserFilter";
import { UserForm } from "@/components/features/admin/users/UserForm";
import { UserList } from "@/components/features/admin/users/UserList";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";
import { useUserMutations } from "@/hooks/use-user-mutations";
import { useUsers } from "@/hooks/use-users";
import { IUser } from "@/types/auth.type";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function AdminUsersPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  const {
    users,
    loading,
    pagination,
    params,
    handlePageChange,
    handleSearch,
    handleStatusFilter,
    handleRoleFilter,
    updateParams,
  } = useUsers();

  const { createUser, updateUser, deleteUser, isCreating, isUpdating } =
    useUserMutations();

  const handleCreateNew = () => {
    setSelectedUser(null);
    setIsFormOpen(true);
  };

  const handleEdit = (user: IUser) => {
    setSelectedUser(user);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
      await deleteUser(id);
    }
  };

  const handleToggleStatus = async (user: IUser) => {
    const newStatus = user.status === "active" ? "inactive" : "active";
    await updateUser({
      id: user.id,
      data: { status: newStatus },
    });
  };

  const handleSubmit = async (data: any) => {
    if (selectedUser) {
      await updateUser({ id: selectedUser.id, data });
    } else {
      await createUser(data);
    }
  };

  const handleReset = () => {
    updateParams({ s: "", status: undefined, role: undefined, page: 1 });
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Quản lý Người dùng
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Quản lý tài khoản, phân quyền và trạng thái hoạt động của nhân sự.
          </p>
        </div>
        <Button onClick={handleCreateNew} className="sm:w-fit">
          <Plus className="mr-2 h-4 w-4" />
          Thêm người dùng
        </Button>
      </div>

      <UserFilter
        onSearch={handleSearch}
        onStatusChange={handleStatusFilter}
        onRoleChange={handleRoleFilter}
        onReset={handleReset}
        currentFilters={params}
      />

      <UserList
        users={users}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleStatus={handleToggleStatus}
      />

      <div className="flex justify-center pt-4">
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      <UserForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        initialData={selectedUser}
        onSubmit={handleSubmit}
        isSubmitting={isCreating || isUpdating}
      />
    </div>
  );
}
