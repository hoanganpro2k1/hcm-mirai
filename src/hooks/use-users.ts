"use client";

import { userAdminService } from "@/services/user-admin.service";
import { UserFilterParams } from "@/types/user-admin.type";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export function useUsers(initialParams: UserFilterParams = {}) {
  const [params, setParams] = useState<UserFilterParams>({
    page: 1,
    limit: 10,
    ...initialParams,
  });

  const { data, isLoading, isPlaceholderData, error, refetch } = useQuery({
    queryKey: ["admin-users", params],
    queryFn: () => userAdminService.getUsers(params),
    placeholderData: (previousData) => previousData,
  });

  const updateParams = (newParams: Partial<UserFilterParams>) => {
    setParams((prev) => ({ ...prev, ...newParams }));
  };

  const handlePageChange = (page: number) => {
    updateParams({ page });
  };

  const handleSearch = (s: string) => {
    updateParams({ s, page: 1 });
  };

  const handleStatusFilter = (status?: any) => {
    updateParams({ status, page: 1 });
  };

  const handleRoleFilter = (role?: string) => {
    updateParams({ role, page: 1 });
  };

  return {
    users: data?.data || [],
    loading: isLoading || (isPlaceholderData && !data),
    error: error ? "Failed to fetch users. Please try again later." : null,
    pagination: {
      page: data?.page || (params.page as number),
      totalPages: data?.totalPages || 1,
      total: data?.total || 0,
    },
    params,
    updateParams,
    handlePageChange,
    handleSearch,
    handleStatusFilter,
    handleRoleFilter,
    refresh: refetch,
  };
}
