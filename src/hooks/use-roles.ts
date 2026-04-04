"use client";

import { roleService } from "@/services/role.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useRoles() {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-roles"],
    queryFn: () => roleService.getRoles(),
  });

  const createMutation = useMutation({
    mutationFn: roleService.createRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-roles"] });
      toast.success("Đã tạo vai trò mới.");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Lỗi khi tạo vai trò.");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      roleService.updateRole(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-roles"] });
      toast.success("Đã cập nhật vai trò.");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Lỗi khi cập nhật vai trò.");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: roleService.deleteRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-roles"] });
      toast.success("Đã xóa vai trò.");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Lỗi khi xóa vai trò.");
    },
  });

  return {
    roles: data || [],
    loading: isLoading,
    error,
    createRole: createMutation.mutateAsync,
    updateRole: updateMutation.mutateAsync,
    deleteRole: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}
