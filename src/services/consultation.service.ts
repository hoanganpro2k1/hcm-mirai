import { apiClient } from "@/lib/axios";
import { IConsultation } from "@/types/consultation.type";

export const consultationService = {
  getConsultations: async (status: string) => {
    const res = await apiClient.get<{ data: IConsultation[] }>(
      `/admin/consultations?status=${status}`,
    );
    return res.data.data;
  },

  updateStatus: async (id: string, status: string) => {
    const res = await apiClient.patch<{ data: IConsultation }>(
      `/admin/consultations/${id}`,
      { status },
    );
    return res.data.data;
  },
};
