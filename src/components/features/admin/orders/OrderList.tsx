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
import { useDebounce } from "@/hooks/use-debounce";
import { useOrderMutations } from "@/hooks/use-order-mutations";
import { useOrders } from "@/hooks/use-orders";
import { COUNTRY_OPTIONS, CATEGORY_OPTIONS } from "@/constants/order.constant";

import { Edit, Loader2, Plus, Search, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { useRouter } from "next/navigation";

export const OrderList = () => {
  const router = useRouter();
  const { orders, loading: isLoading } = useOrders({ limit: 100 });
  const { deleteOrder, isDeleting } = useOrderMutations();

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!deletingId) return;
    await deleteOrder(deletingId);
    setDeletingId(null);
  };

  const filteredOrders = orders.filter((order) =>
    order.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
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
              <TableHead className="w-[80px]">Ảnh</TableHead>
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
                <TableRow key={order.id} className="group">
                  <TableCell>
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                      {order.coverImage ? (
                        <Image
                          src={order.coverImage}
                          alt={order.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-[10px] text-slate-400 text-center px-1">
                          No cover
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium px-6 whitespace-normal py-3 md:sticky md:left-0 md:z-20 md:bg-white md:dark:bg-slate-900 md:border-r group-hover:bg-slate-50 dark:group-hover:bg-slate-800 transition-colors">
                    <div className="line-clamp-4" title={order.title}>
                      {order.title}
                    </div>
                  </TableCell>
                  <TableCell>
                    {COUNTRY_OPTIONS.find((opt) => opt.value === order.country)
                      ?.label ||
                      order.country ||
                      "Chưa rõ"}
                  </TableCell>
                  <TableCell className="whitespace-normal min-w-[150px]">
                    {CATEGORY_OPTIONS.find((opt) => opt.value === order.category)
                      ?.label ||
                      order.category ||
                      "N/A"}
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
                          router.push(`/admin/orders/${order.id}/edit`)
                        }
                      >
                        <Edit className="h-4 w-4 text-blue-500" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setDeletingId(order.id)}
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
