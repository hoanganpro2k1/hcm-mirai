"use client";

import { OrderForm } from "@/components/features/admin/orders/OrderForm";
import { useRouter } from "next/navigation";

export default function CreateOrderPage() {
  const router = useRouter();

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 p-6">
      <OrderForm 
        onSuccess={() => router.push("/admin/orders")} 
        onCancel={() => router.push("/admin/orders")} 
      />
    </div>
  );
}
