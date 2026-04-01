"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { OrderForm } from "@/components/features/admin/orders/OrderForm";
import { orderService } from "@/services/order.service";
import { JobOrder } from "@/types/order.type";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function EditOrderPage() {
  const params = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<JobOrder | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const id = params.id as string;
        if (!id) return;
        const data = await orderService.getOrderById(id);
        setOrder(data as any);
      } catch (error) {
        console.error("Error fetching order:", error);
        toast.error("Không thể tải thông tin đơn hàng.");
        router.push("/admin/orders");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [params.id, router]);

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-3 text-slate-500">Đang tải thông tin đơn hàng...</span>
      </div>
    );
  }

  if (!order) return null;

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 p-6">
      <OrderForm 
        initialData={order}
        onSuccess={() => router.push("/admin/orders")} 
        onCancel={() => router.push("/admin/orders")} 
      />
    </div>
  );
}
