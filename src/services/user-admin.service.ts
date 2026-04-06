import { apiClient } from "@/lib/axios";
import { IUser } from "@/types/auth.type";
import {
  UserAdminResponse,
  UserCreatePayload,
  UserFilterParams,
  UserUpdatePayload,
} from "@/types/user-admin.type";

export const userAdminService = {
  getUsers: async (params: UserFilterParams): Promise<UserAdminResponse> => {
    const res = await apiClient.get<UserAdminResponse>("/users", { params });
    return res.data;
  },

  getUserById: async (id: string): Promise<IUser> => {
    const res = await apiClient.get<IUser>(`/users/${id}`);
    return res.data;
  },

  createUser: async (data: UserCreatePayload): Promise<IUser> => {
    const res = await apiClient.post<IUser>("/users", data);
    return res.data;
  },

  updateUser: async (id: string, data: UserUpdatePayload): Promise<IUser> => {
    const res = await apiClient.patch<IUser>(`/users/${id}`, data);
    return res.data;
  },

  deleteUser: async (id: string): Promise<{ message: string }> => {
    const res = await apiClient.delete<{ message: string }>(`/users/${id}`);
    return res.data;
  },
};
