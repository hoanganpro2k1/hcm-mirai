export interface IConsultation {
  id: string;
  name: string;
  phone: string;
  email?: string;
  note?: string;
  status: "pending" | "processed" | "cancelled";
  processedBy?: {
    id: string;
    name: string;
    username: string;
  };
  processedAt?: string;
  createdAt: string;
}
