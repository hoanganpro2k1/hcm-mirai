"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { USER_STATUS_OPTIONS } from "@/constants/user.constant";
import { IUser } from "@/types/auth.type";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Edit, ShieldCheck, Trash2, UserCheck, UserX } from "lucide-react";
import Image from "next/image";

interface UserListProps {
  users: IUser[];
  loading: boolean;
  onEdit: (user: IUser) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (user: IUser) => void;
}

export function UserList({
  users,
  loading,
  onEdit,
  onDelete,
  onToggleStatus,
}: UserListProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-lg border-2 border-dashed text-slate-500">
        Không tìm thấy người dùng nào.
      </div>
    );
  }

  return (
    <div className="rounded-md border bg-white dark:bg-slate-900">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Người dùng</TableHead>
            <TableHead>Liên hệ</TableHead>
            <TableHead>Vai trò</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Ngày tạo</TableHead>
            <TableHead className="text-right">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary font-bold uppercase">
                    {user.avatar ? (
                      <Image
                        src={user.avatar}
                        alt={user.username}
                        width={36}
                        height={36}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="h-full w-full rounded-full object-cover"
                      />
                    ) : (
                      user.username.charAt(0)
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-slate-900 dark:text-slate-100">
                      {user.name || user.username}
                    </span>
                    <span className="text-xs text-slate-500">
                      @{user.username}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                {user.phoneNumber ? (
                  <span className="text-sm">{user.phoneNumber}</span>
                ) : (
                  <span className="text-xs text-slate-400 italic">
                    Chưa cập nhật
                  </span>
                )}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-blue-500" />
                  <span className="text-sm font-medium">
                    {(user as any).role?.name || "User"}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant={user.status === "active" ? "default" : "destructive"}
                  className="capitalize"
                >
                  {USER_STATUS_OPTIONS.find((opt) => opt.value === user.status)
                    ?.label || user.status}
                </Badge>
              </TableCell>
              <TableCell className="text-sm text-slate-500">
                {format(new Date(user.createdAt), "dd/MM/yyyy", { locale: vi })}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    title={
                      user.status === "active"
                        ? "Khóa tài khoản"
                        : "Mở khóa tài khoản"
                    }
                    onClick={() => onToggleStatus(user)}
                  >
                    {user.status === "active" ? (
                      <UserX className="h-4 w-4 text-orange-500" />
                    ) : (
                      <UserCheck className="h-4 w-4 text-green-500" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    title="Chỉnh sửa"
                    onClick={() => onEdit(user)}
                  >
                    <Edit className="h-4 w-4 text-blue-500" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    title="Xóa"
                    onClick={() => onDelete(user.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
