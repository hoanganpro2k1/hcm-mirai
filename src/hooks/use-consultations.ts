"use client";

import { consultationService } from "@/services/consultation.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export function useConsultations() {
  const queryClient = useQueryClient();
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const {
    data: consultations = [],
    isLoading,
    isRefetching,
    refetch,
  } = useQuery({
    queryKey: ["admin-consultations", filterStatus],
    queryFn: () => consultationService.getConsultations(filterStatus),
    placeholderData: (previousData) => previousData,
  });

  const { mutateAsync: updateStatusMutation } = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      consultationService.updateStatus(id, status),
    onSuccess: () => {
      // Refresh the list after update
      queryClient.invalidateQueries({
        queryKey: ["admin-consultations", filterStatus],
      });
      toast.success("Cập nhật trạng thái thành công");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Cập nhật thất bại");
    },
  });

  const updateStatus = async (id: string, newStatus: string) => {
    await updateStatusMutation({ id, status: newStatus });
  };

  const refresh = () => {
    refetch();
  };

  return {
    consultations,
    loading: isLoading,
    filterStatus,
    setFilterStatus,
    refreshing: isRefetching,
    updateStatus,
    refresh,
  };
}
