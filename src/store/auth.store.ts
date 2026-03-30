import { create } from "zustand";

interface AdminUser {
  id: string;
  username: string;
}

interface AuthState {
  accessToken: string | null;
  admin: AdminUser | null;
  setAuth: (accessToken: string, admin?: AdminUser) => void;
  clearAuth: () => void;
  isInitialized: boolean;
  setInitialized: (status: boolean) => void;
}

// Global store lưu thông tin đăng nhập trên RAM
export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  admin: null,
  isInitialized: false,

  setAuth: (accessToken, admin) =>
    set((state) => ({
      accessToken,
      admin: admin || state.admin,
      isInitialized: true,
    })),

  clearAuth: () => set({ accessToken: null, admin: null, isInitialized: true }),

  setInitialized: (status) => set({ isInitialized: status }),
}));
