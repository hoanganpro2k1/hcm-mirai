"use client";

import { userAdminService } from "@/services/user-admin.service";
import { UserCreatePayload, UserUpdatePayload } from "@/types/user-admin.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUserMutations() {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (data: UserCreatePayload) => userAdminService.createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      toast.success("Đã tạo người dùng mới thành công.");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Lỗi khi tạo người dùng!");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UserUpdatePayload }) =>
      userAdminService.updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      toast.success("Đã cập nhật thông tin người dùng thành công.");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Lỗi khi cập nhật!");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => userAdminService.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      toast.success("Đã xóa người dùng thành công.");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Lỗi khi xóa người dùng!");
    },
  });

  return {
    createUser: createMutation.mutateAsync,
    updateUser: updateMutation.mutateAsync,
    deleteUser: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}
