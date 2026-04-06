"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import Image from "next/image";
import { useAdminDashboard } from "./hooks/useAdminDashboard";

interface AdminUserSectionProps {
  className?: string;
}

export function AdminUserSection({ className }: AdminUserSectionProps) {
  const { user, isLoggingOut, handleLogout, isLoading } = useAdminDashboard();

  const displayName = user?.name || user?.username || "Admin";
  const initials = (user?.name || user?.username || "A")
    .charAt(0)
    .toUpperCase();

  if (isLoading) {
    return (
      <div
        className={cn(
          "border-t p-4 border-slate-200 dark:border-slate-800",
          className,
        )}
      >
        <div className="flex items-center gap-3 mb-6 px-2">
          <Skeleton className="h-12 w-12 rounded-full shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "border-t p-4 border-slate-200 dark:border-slate-800",
        className,
      )}
    >
      <div className="flex items-center gap-3 mb-6 px-2">
        <div className="relative h-12 w-12 shrink-0">
          {user?.avatar ? (
            <Image
              src={user.avatar}
              alt={displayName}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="rounded-full object-cover border-2 border-primary/20"
              unoptimized // Use unoptimized for dynamic URLs if not configured in next.config.js
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center rounded-full bg-linear-to-br from-primary/20 to-primary/10 text-primary font-bold text-lg border-2 border-primary/20">
              {initials}
            </div>
          )}
          <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-slate-900" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold truncate leading-tight">
            {displayName}
          </p>
          <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-0.5">
            {user?.role}
          </p>
        </div>
      </div>
      <Button
        variant="destructive"
        className="w-full justify-start h-10 group transition-all duration-200 hover:shadow-lg hover:shadow-red-500/10"
        disabled={isLoggingOut}
        onClick={handleLogout}
      >
        <LogOut className="mr-3 h-4 w-4 transition-transform group-hover:-translate-x-1" />
        <span className="font-medium text-sm">
          {isLoggingOut ? "Đang xử lý..." : "Đăng xuất"}
        </span>
      </Button>
    </div>
  );
}
