import { IUser, UserStatus } from "./auth.type";

export interface UserFilterParams {
  page?: number;
  limit?: number;
  s?: string; // Search string (username, name, email, phone)
  role?: string; // Role name or ID
  status?: UserStatus;
}

export interface UserAdminResponse {
  data: IUser[];
  total: number;
  page: number;
  totalPages: number;
}

export interface UserCreatePayload {
  username: string;
  password?: string;
  name?: string;
  phoneNumber?: string;
  avatar?: string;
  role?: string; // Role ID
  status?: UserStatus;
}

export type UserUpdatePayload = Partial<UserCreatePayload>;
