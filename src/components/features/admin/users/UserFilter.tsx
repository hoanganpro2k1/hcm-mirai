"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRoles } from "@/hooks/use-roles";
import { USER_STATUS_OPTIONS } from "@/constants/user.constant";
import { UserStatus } from "@/types/auth.type";
import { Filter, RotateCcw, Search } from "lucide-react";

interface UserFilterProps {
  onSearch: (s: string) => void;
  onStatusChange: (status?: UserStatus) => void;
  onRoleChange: (role?: string) => void;
  onReset: () => void;
  currentFilters: {
    s?: string;
    role?: string;
    status?: UserStatus;
  };
}

const STATUS_OPTIONS = [
  { value: "all", label: "Tất cả trạng thái" },
  ...USER_STATUS_OPTIONS,
];

export function UserFilter({
  onSearch,
  onStatusChange,
  onRoleChange,
  onReset,
  currentFilters,
}: UserFilterProps) {
  const { roles } = useRoles();

  const roleOptions = [
    { value: "all", label: "Tất cả vai trò" },
    ...roles.map((role) => ({ value: role.id, label: role.name })),
  ];

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <Input
          placeholder="Tìm theo tên, username, SĐT..."
          className="pl-10"
          value={currentFilters.s || ""}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Select
          value={currentFilters.status || "all"}
          onValueChange={(val) =>
            onStatusChange(
              val === "all" || val === null ? undefined : (val as UserStatus),
            )
          }
          items={STATUS_OPTIONS}
        >
          <SelectTrigger className="w-[140px]">
            <Filter className="mr-2 h-3.5 w-3.5 text-slate-400" />
            <SelectValue placeholder="Trạng thái" />
          </SelectTrigger>
          <SelectContent>
            {STATUS_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={currentFilters.role || "all"}
          onValueChange={(val) =>
            onRoleChange(val === "all" || val === null ? undefined : val)
          }
          items={roleOptions}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Vai trò" />
          </SelectTrigger>
          <SelectContent>
            {roleOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button variant="outline" size="icon" onClick={onReset} title="Đặt lại">
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
