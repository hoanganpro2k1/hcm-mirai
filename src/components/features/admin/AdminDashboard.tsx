"use client";

import { useAdminDashboard } from "./hooks/useAdminDashboard";
import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  const { admin, isLoading, isLoggingOut, handleLogout, navItems } = useAdminDashboard();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4"></div>
          <p className="text-slate-500">Đang tải cấu hình...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50 w-full dark:bg-slate-950">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex flex-col w-64 border-r bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
        <div className="flex h-16 items-center border-b px-6 border-slate-200 dark:border-slate-800">
          <span className="text-lg font-bold tracking-tight text-primary">
            Mirai System
          </span>
        </div>

        <nav className="flex-1 space-y-2 p-4">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Button
                key={index}
                variant={item.active ? "secondary" : "ghost"}
                className={`w-full justify-start ${item.active ? "font-semibold" : "text-slate-500"}`}
              >
                <Icon className="mr-3 h-4 w-4" />
                {item.label}
              </Button>
            );
          })}
        </nav>

        <div className="border-t p-4 border-slate-200 dark:border-slate-800">
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
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <header className="lg:hidden flex h-16 items-center justify-between border-b bg-white dark:bg-slate-900 px-4">
          <span className="font-bold text-lg text-primary">Mirai Admin</span>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
          </Button>
        </header>

        <div className="flex-1 p-8">
          <div className="max-w-4xl mx-auto space-y-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Chào mừng trở lại, {admin?.username || "Admin"}!
              </h1>
              <p className="text-slate-500 mt-2">
                Hệ thống xác thực Tokens bằng Axios Interceptor đã hoạt động
                hoàn hảo.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-xl border bg-white p-6 shadow-sm">
                <div className="text-sm font-medium text-slate-500 mb-1">
                  Tổng số người dùng
                </div>
                <div className="text-3xl font-bold">1,248</div>
              </div>
              <div className="rounded-xl border bg-white p-6 shadow-sm">
                <div className="text-sm font-medium text-slate-500 mb-1">
                  Số dư hoạt động
                </div>
                <div className="text-3xl font-bold text-green-600">+24%</div>
              </div>
              <div className="rounded-xl border bg-white p-6 shadow-sm">
                <div className="text-sm font-medium text-slate-500 mb-1">
                  Trạng thái Token
                </div>
                <div className="flex items-center mt-2">
                  <span className="relative flex h-3 w-3 mr-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  <span className="text-sm font-medium text-green-700">
                    Đang hoạt động (Kích trích Auto-refresh)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
