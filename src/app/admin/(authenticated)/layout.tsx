"use client";

import { AdminSidebar } from "@/components/features/admin/AdminSidebar";
import { AdminHeader } from "@/components/features/admin/AdminHeader";
import { useAdminDashboard } from "@/components/features/admin/hooks/useAdminDashboard";
import { ReactNode } from "react";

export default function AuthenticatedLayout({ children }: { children: ReactNode }) {
  const { isLoading } = useAdminDashboard();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4"></div>
          <p className="text-slate-500 font-sans">Đang tải hệ thống...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50 w-full dark:bg-slate-950 font-sans">
      {/* Sidebar Desktop */}
      <AdminSidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen min-w-0">
        {/* Mobile Header */}
        <AdminHeader />

        {/* Dynamic Page Content */}
        <div className="flex-1 p-4 md:p-8 overflow-y-auto min-w-0">
          {children}
        </div>
      </main>
    </div>
  );
}
