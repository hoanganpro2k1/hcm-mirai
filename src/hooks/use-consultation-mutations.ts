"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { consultationService } from "@/services/consultation.service";
import { ConsultationFormValues } from "@/schemas/consultation.schema";
import { toast } from "sonner";

export function useConsultationMutations() {
  const queryClient = useQueryClient();

  const submitMutation = useMutation({
    mutationFn: (data: ConsultationFormValues) => 
      consultationService.submitConsultation(data),
    onSuccess: () => {
      // Invalidate admin consultations if we are on the dashboard
      queryClient.invalidateQueries({ queryKey: ["admin-consultations"] });
      // Note: Components will handle their own additional success logic like modal close
    },
    onError: (error: any) => {
      console.error("Consultation submission error:", error);
      toast.error(error.response?.data?.message || "Đã có lỗi xảy ra. Vui lòng thử lại.");
    },
  });

  return {
    submitConsultation: submitMutation.mutateAsync,
    isSubmitting: submitMutation.isPending,
    isSuccess: submitMutation.isSuccess,
    reset: submitMutation.reset,
  };
}
