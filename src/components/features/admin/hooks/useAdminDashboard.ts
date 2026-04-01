"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store";
import { authService } from "@/services/auth.service";
import { toast } from "sonner";
import { LayoutDashboard, Users, Settings, BriefcaseBusiness } from "lucide-react";

export const NAV_ITEMS = [
  { id: "overview", icon: LayoutDashboard, label: "Tổng quan", href: "/admin/dashboard" },
  { id: "orders", icon: BriefcaseBusiness, label: "Đơn hàng XKLĐ", href: "/admin/orders" },
  { id: "users", icon: Users, label: "Người dùng", href: "/admin/users" },
  { id: "settings", icon: Settings, label: "Cài đặt", href: "/admin/settings" },
];

export const useAdminDashboard = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { admin, clearAuth } = useAuthStore();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Giả lập trạng thái load lần đầu để Zustand hydrate
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await authService.logout();
      clearAuth();
      toast.success("Đã đăng xuất thành công.");
      // Chuyển lại trang login
      router.push("/admin/login");
    } catch {
      toast.error("Lỗi khi đăng xuất!");
    } finally {
      setIsLoggingOut(false);
    }
  };

  const isActive = (href: string) => {
    if (href === "/admin/dashboard" && pathname === "/admin/dashboard") return true;
    if (href !== "/admin/dashboard" && pathname.startsWith(href)) return true;
    return false;
  };

  return {
    admin,
    isLoading,
    isLoggingOut,
    handleLogout,
    navItems: NAV_ITEMS,
    pathname,
    isActive,
  };
};
