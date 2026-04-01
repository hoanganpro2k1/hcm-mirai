"use client";

import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAdminDashboard } from "./hooks/useAdminDashboard";
import { cn } from "@/lib/utils";

interface AdminUserSectionProps {
  className?: string;
}

export function AdminUserSection({ className }: AdminUserSectionProps) {
  const { admin, isLoggingOut, handleLogout } = useAdminDashboard();

  return (
    <div className={cn("border-t p-4 border-slate-200 dark:border-slate-800", className)}>
      <div className="flex items-center gap-3 mb-4 px-2">
        <div className="h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
          {admin?.username?.charAt(0).toUpperCase() || "A"}
        </div>
        <div>
          <p className="text-sm font-medium">
            {admin?.username || "Admin"}
          </p>
          <p className="text-xs text-slate-500">Quản trị viên</p>
        </div>
      </div>
      <Button
        variant="destructive"
        className="w-full justify-start"
        disabled={isLoggingOut}
        onClick={handleLogout}
      >
        <LogOut className="mr-3 h-4 w-4" />
        {isLoggingOut ? "Đang xử lý..." : "Đăng xuất"}
      </Button>
    </div>
  );
}
