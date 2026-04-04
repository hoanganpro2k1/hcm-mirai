import { apiClient } from "@/lib/axios";
import { IPopulatedRole, IRole } from "@/types/role.type";

export interface RolePayload {
  name: string;
  description?: string;
  permissions: string[]; // Array of Permission IDs
}

export const roleService = {
  getRoles: async (): Promise<IPopulatedRole[]> => {
    const res = await apiClient.get<IPopulatedRole[]>("/roles");
    return res.data;
  },

  createRole: async (data: RolePayload): Promise<IRole> => {
    const res = await apiClient.post<IRole>("/roles", data);
    return res.data;
  },

  updateRole: async (id: string, data: RolePayload): Promise<IPopulatedRole> => {
    const res = await apiClient.put<IPopulatedRole>(`/roles/${id}`, data);
    return res.data;
  },

  deleteRole: async (id: string): Promise<{ message: string }> => {
    const res = await apiClient.delete<{ message: string }>(`/roles/${id}`);
    return res.data;
  },
};
