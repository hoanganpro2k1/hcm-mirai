import { apiClient } from "@/lib/axios";
import { IPermission } from "@/types/permission.type";

export const permissionService = {
  getPermissions: async (): Promise<IPermission[]> => {
    const res = await apiClient.get<IPermission[]>("/permissions");
    return res.data;
  },

  createPermission: async (data: Partial<IPermission>): Promise<IPermission> => {
    const res = await apiClient.post<IPermission>("/permissions", data);
    return res.data;
  },
};
