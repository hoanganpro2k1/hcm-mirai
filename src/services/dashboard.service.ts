import { apiClient } from "@/lib/axios";

export interface DashboardStats {
  stats: {
    users: {
      total: number;
      active: number;
      inactive: number;
    };
    orders: {
      total: number;
    };
    media: {
      total: number;
    };
  };
  recent: {
    media: any[];
    orders: any[];
  }
}

export const dashboardService = {
  getStats: async (): Promise<DashboardStats> => {
    const { data } = await apiClient.get("/admin/stats");
    return data;
  }
};
