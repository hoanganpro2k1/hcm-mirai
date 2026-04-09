import { useQuery } from "@tanstack/react-query";
import { settingService } from "@/services/setting.service";

export function useSettings() {
  return useQuery({
    queryKey: ["settings"],
    queryFn: settingService.getSettings,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useAdminSettings() {
  return useQuery({
    queryKey: ["admin-settings"],
    queryFn: settingService.getAdminSettings,
  });
}
