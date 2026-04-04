import { create } from "zustand";
import { dashboardService, DashboardStats } from "@/services/dashboard.service";

interface DashboardState {
  stats: DashboardStats | null;
  isLoading: boolean;
  lastFetched: number | null;
  fetchStats: (force?: boolean) => Promise<void>;
  clearStats: () => void;
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
  stats: null,
  isLoading: false,
  lastFetched: null,

  fetchStats: async (force = false) => {
    const { stats, isLoading, lastFetched } = get();
    
    // Prevent multiple calls if already loading or data is fresh (within 1 minute)
    const now = Date.now();
    const isFresh = lastFetched && (now - lastFetched < 60000);
    
    if (isLoading || (stats && isFresh && !force)) return;

    try {
      set({ isLoading: true });
      const data = await dashboardService.getStats();
      set({ stats: data, lastFetched: now });
    } catch (error) {
      console.error("Dashboard Stats Fetch Error:", error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  clearStats: () => set({ stats: null, lastFetched: null }),
}));
