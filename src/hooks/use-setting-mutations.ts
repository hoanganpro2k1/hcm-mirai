import { useMutation, useQueryClient } from "@tanstack/react-query";
import { settingService } from "@/services/setting.service";
import { toast } from "sonner";

export function useSettingMutations() {
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: ({ key, value }: { key: string; value: any }) =>
      settingService.updateSetting(key, value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      queryClient.invalidateQueries({ queryKey: ["admin-settings"] });
      toast.success("Đã cập nhật cài đặt thành công");
    },
    onError: (error: any) => {
      toast.error("Lỗi khi cập nhật cài đặt: " + (error.response?.data?.message || error.message));
    },
  });

  return {
    updateSetting: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
  };
}
