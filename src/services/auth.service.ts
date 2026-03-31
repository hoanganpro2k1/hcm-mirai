import { apiClient } from "@/lib/axios";
import { LoginFormValues, SetupFormValues } from "@/schemas/auth.schema";

export const authService = {
  login: async (values: LoginFormValues) => {
    const res = await apiClient.post("/auth/login", values);
    return res.data;
  },

  setup: async (values: SetupFormValues) => {
    const res = await apiClient.post("/auth/setup", values);
    return res.data;
  },

  logout: async () => {
    const res = await apiClient.post("/auth/logout");
    return res.data;
  },
};
