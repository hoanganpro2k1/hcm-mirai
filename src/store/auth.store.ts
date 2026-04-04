import { create } from "zustand";

interface SystemUser {
  id: string;
  username: string;
  name?: string;
  avatar?: string;
  phoneNumber?: string;
  status?: string;
  role?: string;
  permissions?: string[];
}

interface AuthState {
  accessToken: string | null;
  user: SystemUser | null;
  setAuth: (accessToken: string, user?: SystemUser) => void;
  clearAuth: () => void;
  isInitialized: boolean;
  setInitialized: (status: boolean) => void;
}

// Global store lưu thông tin đăng nhập trên RAM
export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,
  isInitialized: false,

  setAuth: (accessToken, user) =>
    set((state) => ({
      accessToken,
      user: user || state.user,
      isInitialized: true,
    })),

  clearAuth: () => set({ accessToken: null, user: null, isInitialized: true }),

  setInitialized: (status) => set({ isInitialized: status }),
}));
