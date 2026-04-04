"use client";

import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TableCell, TableRow } from "@/components/ui/table";
import { statusColors, statusLabels } from "@/constants/consultation.constant";
import { IConsultation } from "@/types/consultation.type";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

interface ConsultationTableRowProps {
  item: IConsultation;
  onUpdateStatus: (id: string, newStatus: string) => Promise<void>;
}

export function ConsultationTableRow({
  item,
  onUpdateStatus,
}: ConsultationTableRowProps) {
  return (
    <TableRow className="group transition-colors">
      <TableCell className="font-semibold">{item.name}</TableCell>
      <TableCell>
        <div className="flex flex-col text-sm">
          <span>{item.phone}</span>
          <span className="text-muted-foreground text-xs">
            {item.email || "---"}
          </span>
        </div>
      </TableCell>
      <TableCell className="max-w-[300px] truncate text-sm" title={item.note}>
        {item.note || "---"}
      </TableCell>
      <TableCell>
        <Badge variant="outline" className={statusColors[item.status]}>
          {statusLabels[item.status]}
        </Badge>
      </TableCell>
      <TableCell>
        {item.processedBy ? (
          <div className="flex flex-col text-xs">
            <span className="font-medium text-primary">
              {item.processedBy.name}
            </span>
            <span className="text-muted-foreground italic">
              {item.processedAt &&
                format(new Date(item.processedAt), "HH:mm dd/MM/yy", {
                  locale: vi,
                })}
            </span>
          </div>
        ) : (
          <span className="text-muted-foreground italic text-xs">
            Chưa xử lý
          </span>
        )}
      </TableCell>
      <TableCell className="text-sm">
        {format(new Date(item.createdAt), "dd/MM/yyyy", { locale: vi })}
      </TableCell>
      <TableCell className="text-right">
        <Select
          defaultValue={item.status}
          onValueChange={(val) => val && onUpdateStatus(item.id, val)}
          items={statusLabels}
        >
          <SelectTrigger className="w-[120px] ml-auto h-8 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(statusLabels).map(([key, value]) => (
              <SelectItem key={key} value={key}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </TableCell>
    </TableRow>
  );
}
