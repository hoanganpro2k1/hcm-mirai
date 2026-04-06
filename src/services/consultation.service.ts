import { apiClient } from "@/lib/axios";
import { ConsultationFormValues } from "@/schemas/consultation.schema";
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

  submitConsultation: async (data: ConsultationFormValues) => {
    const res = await apiClient.post("/consultations", data);
    return res.data;
  },
};
