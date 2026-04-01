"use client";

import { OrderList } from "@/components/features/admin/orders/OrderList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminOrdersPage() {
  return (
    <div className="max-w-7xl mx-auto animate-in fade-in duration-500">
      <Card className="border-none shadow-none bg-transparent">
        <CardHeader className="px-4 pt-0">
          <CardTitle className="text-2xl font-bold">
            Quản lý Đơn hàng XKLĐ
          </CardTitle>
          <p className="text-slate-500">
            Danh sách các đơn hàng hiện có trên hệ thống với hệ thống URL riêng
            biệt.
          </p>
        </CardHeader>
        <CardContent className="pt-6">
          <OrderList />
        </CardContent>
      </Card>
    </div>
  );
}
