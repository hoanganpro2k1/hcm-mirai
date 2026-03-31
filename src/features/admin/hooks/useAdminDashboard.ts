import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store";
import { authService } from "@/services/auth.service";
import { toast } from "sonner";
import { LayoutDashboard, Users, Settings } from "lucide-react";

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Tổng quan", active: true },
  { icon: Users, label: "Người dùng", active: false },
  { icon: Settings, label: "Cài đặt", active: false },
];

export const useAdminDashboard = () => {
  const router = useRouter();
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

  return {
    admin,
    isLoading,
    isLoggingOut,
    handleLogout,
    navItems: NAV_ITEMS,
  };
};
