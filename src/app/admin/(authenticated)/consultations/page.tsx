import { ConsultationAdminSection } from "@/components/features/admin/consultations/ConsultationAdminSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản lý đăng ký tư vấn | HCM - MIRAI",
  description: "Quản lý danh sách khách hàng đăng ký tư vấn XKLĐ Nhật Bản.",
};

export default function AdminConsultationsPage() {
  return (
    <div className="p-6">
      <ConsultationAdminSection />
    </div>
  );
}
