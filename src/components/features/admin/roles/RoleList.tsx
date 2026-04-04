"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IPopulatedRole } from "@/types/role.type";
import { Edit2, Shield, Trash2 } from "lucide-react";

interface RoleListProps {
  roles: IPopulatedRole[];
  loading: boolean;
  onEdit: (role: IPopulatedRole) => void;
  onDelete: (id: string) => void;
}

export function RoleList({ roles, loading, onEdit, onDelete }: RoleListProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (roles.length === 0) {
    return (
      <div className="text-center p-12 bg-slate-50 dark:bg-slate-900 rounded-lg border-2 border-dashed border-slate-200 dark:border-slate-800">
        <Shield className="mx-auto h-12 w-12 text-slate-300 mb-4" />
        <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">
          Chưa có vai trò nào
        </h3>
        <p className="text-slate-500 mt-1">
          Hãy tạo vai trò mới để bắt đầu phân quyền cho hệ thống.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-md border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-950">
      <Table>
        <TableHeader className="bg-slate-50 dark:bg-slate-900">
          <TableRow>
            <TableHead className="w-[200px]">Tên vai trò</TableHead>
            <TableHead>Mô tả</TableHead>
            <TableHead className="text-center">Số quyền</TableHead>
            <TableHead className="text-right">Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {roles.map((role) => (
            <TableRow
              key={role.id}
              className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors"
            >
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  {role.name}
                </div>
              </TableCell>
              <TableCell className="text-slate-500 max-w-md truncate">
                {role.description || "---"}
              </TableCell>
              <TableCell className="text-center">
                <Badge variant="secondary" className="font-mono">
                  {role.permissions?.length || 0}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(role)}
                    className="hover:text-primary"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      if (
                        window.confirm(
                          `Bạn có chắc muốn xóa vai trò "${role.name}"?`,
                        )
                      ) {
                        onDelete(role.id);
                      }
                    }}
                    disabled={role.name.toLowerCase() === "admin"}
                    className="hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
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
