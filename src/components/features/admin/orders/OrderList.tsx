"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { orderService } from "@/services/order.service";
import { JobOrder } from "@/types/order.type";
import { Edit, Loader2, Plus, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { useRouter } from "next/navigation";

export const OrderList = () => {
  const router = useRouter();
  const [orders, setOrders] = useState<JobOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const response = await orderService.getOrders({ page: 1, limit: 100 });
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Không thể tải danh sách đơn hàng.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDelete = async () => {
    if (!deletingId) return;

    try {
      setIsDeleting(true);
      await orderService.deleteOrder(deletingId);
      setOrders(
        orders.filter((o) => (o._id ? o._id.toString() : o.id) !== deletingId),
      );
      toast.success("Đã xóa đơn hàng thành công.");
      setDeletingId(null);
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error("Lỗi khi xóa đơn hàng.");
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredOrders = orders.filter((order) =>
    order.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
          <Input
            placeholder="Tìm kiếm đơn hàng..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button
          onClick={() => router.push("/admin/orders/create")}
          className="w-full md:w-auto"
        >
          <Plus className="mr-2 h-4 w-4" />
          Thêm đơn hàng
        </Button>
      </div>

      <div className="rounded-md border bg-white dark:bg-slate-900 shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[250px] px-6 md:sticky md:left-0 md:z-30 md:bg-white md:dark:bg-slate-900 md:border-r">
                Tiêu đề
              </TableHead>
              <TableHead>Quốc gia</TableHead>
              <TableHead>Ngành nghề</TableHead>
              <TableHead>Lương</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="min-w-[150px] text-right px-6 md:sticky md:right-0 md:z-30 md:bg-white md:dark:bg-slate-900 md:border-l">
                Hành động
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  <div className="flex items-center justify-center">
                    <Loader2 className="h-6 w-6 animate-spin text-primary mr-2" />
                    Đang tải dữ liệu...
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-24 text-center text-slate-500"
                >
                  Không tìm thấy đơn hàng nào.
                </TableCell>
              </TableRow>
            ) : (
              filteredOrders.map((order) => (
                <TableRow
                  key={order._id?.toString() || order.id}
                  className="group"
                >
                  <TableCell className="font-medium px-6 whitespace-normal py-3 md:sticky md:left-0 md:z-20 md:bg-white md:dark:bg-slate-900 md:border-r group-hover:bg-slate-50 dark:group-hover:bg-slate-800 transition-colors">
                    <div className="line-clamp-4" title={order.title}>
                      {order.title}
                    </div>
                  </TableCell>
                  <TableCell>{order.country || "Chưa rõ"}</TableCell>
                  <TableCell className="whitespace-normal min-w-[150px]">
                    {order.category || "N/A"}
                  </TableCell>
                  <TableCell className="whitespace-normal min-w-[200px]">
                    {order.salary || "Thỏa thuận"}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        order.status === "active" ? "default" : "secondary"
                      }
                    >
                      {order.status === "active" ? "Hoạt động" : "Tạm dừng"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right px-6 md:sticky md:right-0 md:z-20 md:bg-white md:dark:bg-slate-900 md:border-l group-hover:bg-slate-50 dark:group-hover:bg-slate-800 transition-colors">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          router.push(
                            `/admin/orders/${order._id?.toString() || order.id}/edit`,
                          )
                        }
                      >
                        <Edit className="h-4 w-4 text-blue-500" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          setDeletingId(order._id?.toString() || order.id)
                        }
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog
        open={!!deletingId}
        onOpenChange={(open) => !open && setDeletingId(null)}
      >
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Xác nhận xóa đơn hàng?</DialogTitle>
            <DialogDescription>
              Hành động này không thể hoàn tác. Đơn hàng này sẽ bị xóa vĩnh viễn
              khỏi hệ thống.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeletingId(null)}
              disabled={isDeleting}
            >
              Hủy
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang xóa...
                </>
              ) : (
                "Đồng ý xóa"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
