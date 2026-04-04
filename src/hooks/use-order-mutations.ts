import { useMutation, useQueryClient } from "@tanstack/react-query";
import { orderService } from "@/services/order.service";
import { toast } from "sonner";
import { JobOrder } from "@/types/order.type";

export function useOrderMutations() {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (data: Partial<JobOrder>) => orderService.createOrder(data as any),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Đã tạo đơn hàng thành công");
    },
    onError: (error: any) => {
      toast.error("Lỗi khi tạo đơn hàng: " + (error.response?.data?.message || error.message));
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<JobOrder> }) =>
      orderService.updateOrder(id, data as any),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Đã cập nhật đơn hàng thành công");
    },
    onError: (error: any) => {
      toast.error("Lỗi khi cập nhật đơn hàng: " + (error.response?.data?.message || error.message));
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => orderService.deleteOrder(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Đã xóa đơn hàng thành công");
    },
    onError: (error: any) => {
      toast.error("Lỗi khi xóa đơn hàng: " + (error.response?.data?.message || error.message));
    },
  });

  return {
    createOrder: createMutation.mutateAsync,
    updateOrder: updateMutation.mutateAsync,
    deleteOrder: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}
