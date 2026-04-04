"use client";

import { permissionService } from "@/services/permission.service";
import { IPermission } from "@/types/permission.type";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export interface GroupedPermissions {
  [module: string]: IPermission[];
}

export function usePermissions() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-permissions"],
    queryFn: () => permissionService.getPermissions(),
  });

  const groupedPermissions = useMemo(() => {
    if (!data) return {};

    const groups: GroupedPermissions = {};
    data.forEach((p) => {
      const moduleName = p.module || "Khác";
      if (!groups[moduleName]) groups[moduleName] = [];
      groups[moduleName].push(p);
    });
    return groups;
  }, [data]);

  return {
    permissions: data || [],
    groupedPermissions,
    loading: isLoading,
    error,
  };
}
