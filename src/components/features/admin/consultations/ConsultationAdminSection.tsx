"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { statusLabels } from "@/constants/consultation.constant";
import { useConsultations } from "@/hooks/use-consultations";
import { Loader2, RefreshCw } from "lucide-react";
import { ConsultationTableRow } from "./ConsultationTableRow";

export function ConsultationAdminSection() {
  const {
    consultations,
    loading,
    filterStatus,
    setFilterStatus,
    refreshing,
    updateStatus,
    refresh,
  } = useConsultations();

  const statusOptions = [
    { value: "all", label: "Tất cả trạng thái" },
    ...Object.entries(statusLabels).map(([key, value]) => ({
      value: key,
      label: value,
    })),
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Đăng ký tư vấn</h1>
          <p className="text-muted-foreground">
            Theo dõi và xử lý các yêu cầu tư vấn từ khách hàng.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Select
            value={filterStatus}
            onValueChange={(val) => val && setFilterStatus(val)}
            items={statusOptions}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Lọc trạng thái" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="icon"
            onClick={refresh}
            disabled={loading || refreshing}
          >
            <RefreshCw
              className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
            />
          </Button>
        </div>
      </div>

      <Card className="border-none shadow-md bg-white/50 backdrop-blur-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[180px]">Khách hàng</TableHead>
                <TableHead>Liên hệ</TableHead>
                <TableHead className="max-w-[300px]">Lời nhắn</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Người xử lý</TableHead>
                <TableHead>Ngày đăng ký</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-64 text-center">
                    <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                      <span>Đang tải dữ liệu...</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : consultations.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="h-64 text-center text-muted-foreground"
                  >
                    Không tìm thấy yêu cầu nào.
                  </TableCell>
                </TableRow>
              ) : (
                consultations.map((item) => (
                  <ConsultationTableRow
                    key={item.id}
                    item={item}
                    onUpdateStatus={updateStatus}
                  />
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
