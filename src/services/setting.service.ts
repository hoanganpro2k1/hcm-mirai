import { apiClient } from "@/lib/axios";

export const settingService = {
  getSettings: async () => {
    const response = await apiClient.get("/settings");
    return response.data;
  },

  getAdminSettings: async () => {
    const response = await apiClient.get("/admin/settings");
    return response.data;
  },

  updateSetting: async (key: string, value: any) => {
    const response = await apiClient.patch("/admin/settings", { key, value });
    return response.data;
  },
};
