"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { usePermissions } from "@/hooks/use-permissions";
import { IPopulatedRole } from "@/types/role.type";
import { ShieldCheck } from "lucide-react";
import { useState } from "react";

interface RoleFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  role: IPopulatedRole | null;
  onSubmit: (data: any) => Promise<void>;
  loading: boolean;
}

export function RoleForm({
  open,
  onOpenChange,
  role,
  onSubmit,
  loading,
}: RoleFormProps) {
  const { groupedPermissions, loading: loadingPermissions } = usePermissions();
  const [formData, setFormData] = useState({
    name: role?.name || "",
    description: role?.description || "",
  });
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(
    role?.permissions?.map((p) => p.id) || [],
  );

  const togglePermission = (id: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    );
  };

  const handleSelectAllInModule = (module: string, permissionIds: string[]) => {
    const allSelected = permissionIds.every((id) =>
      selectedPermissions.includes(id),
    );
    if (allSelected) {
      setSelectedPermissions((prev) =>
        prev.filter((id) => !permissionIds.includes(id)),
      );
    } else {
      setSelectedPermissions((prev) =>
        Array.from(new Set([...prev, ...permissionIds])),
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({
      ...formData,
      permissions: selectedPermissions,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto scrollbar-thin">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <ShieldCheck className="h-5 w-5 text-primary" />
            {role ? "Cập nhật vai trò" : "Thêm vai trò mới"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Tên vai trò *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Ví dụ: Editor, Manager..."
                required
              />
            </div>
            <div className="space-y-2 col-span-1 md:col-span-2">
              <Label htmlFor="description">Mô tả</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Mô tả chức năng của vai trò này"
                className="h-20"
              />
            </div>
          </div>

          <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <Label className="text-base font-bold">Phân quyền chi tiết</Label>
              {loadingPermissions && (
                <div className="animate-pulse text-xs text-slate-400">
                  Đang tải danh sách quyền...
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 gap-6">
              {Object.entries(groupedPermissions).map(
                ([module, permissions]) => (
                  <div
                    key={module}
                    className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800"
                  >
                    <div className="flex items-center justify-between mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">
                      <h4 className="font-bold text-sm uppercase tracking-wider text-slate-600 dark:text-slate-400">
                        Module: {module}
                      </h4>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          handleSelectAllInModule(
                            module,
                            permissions.map((p) => p.id),
                          )
                        }
                        className="text-xs h-7"
                      >
                        {permissions.every((p) =>
                          selectedPermissions.includes(p.id),
                        )
                          ? "Bỏ chọn tất cả"
                          : "Chọn tất cả"}
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-4">
                      {permissions.map((p) => (
                        <div
                          key={p.id}
                          className="flex items-center space-x-2 bg-white dark:bg-slate-950 p-2 rounded border border-slate-100 dark:border-slate-800 shadow-sm"
                        >
                          <Checkbox
                            id={`perm-${p.id}`}
                            checked={selectedPermissions.includes(p.id)}
                            onCheckedChange={() => togglePermission(p.id)}
                          />
                          <div className="grid gap-0.5 leading-none">
                            <label
                              htmlFor={`perm-${p.id}`}
                              className="text-sm font-medium leading-none cursor-pointer"
                              title={p.description}
                            >
                              {p.name}
                            </label>
                            <p className="text-[10px] text-slate-400 truncate max-w-[150px]">
                              {p.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800 sticky bottom-0 bg-white dark:bg-slate-950">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Hủy
            </Button>
            <Button type="submit" disabled={loading}>
              {loading
                ? "Đang xử lý..."
                : role
                  ? "Lưu thay đổi"
                  : "Tạo vai trò"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
