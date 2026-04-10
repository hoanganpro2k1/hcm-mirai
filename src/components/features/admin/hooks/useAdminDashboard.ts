import { authService } from "@/services/auth.service";
import { useAuthStore, useDashboardStore } from "@/store";
import {
  BriefcaseBusiness,
  ClipboardList,
  KeyRound,
  LayoutDashboard,
  Newspaper,
  Settings,
  ShieldCheck,
  Users,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

export const NAV_ITEMS = [
  {
    id: "overview",
    icon: LayoutDashboard,
    label: "Tổng quan",
    href: "/admin/dashboard",
    requiredPermission: "dashboard:view",
  },
  {
    id: "posts",
    icon: Newspaper,
    label: "Tin tức & Sự kiện",
    href: "/admin/posts",
    requiredPermission: "posts:view",
  },
  {
    id: "orders",

    icon: BriefcaseBusiness,
    label: "Đơn hàng XKLĐ",
    href: "/admin/orders",
    requiredPermission: "orders:view",
  },
  {
    id: "consultations",
    icon: ClipboardList,
    label: "Đăng ký tư vấn",
    href: "/admin/consultations",
    requiredPermission: "consultations:view",
  },
  {
    id: "users",
    icon: Users,
    label: "Người dùng",
    href: "/admin/users",
    requiredPermission: "users:view",
  },
  {
    id: "roles",
    icon: ShieldCheck,
    label: "Vai trò",
    href: "/admin/roles",
    requiredPermission: "roles:view",
  },
  {
    id: "permissions",
    icon: KeyRound,
    label: "Quyền hạn",
    href: "/admin/permissions",
    requiredPermission: "permissions:view",
  },
  {
    id: "settings",
    icon: Settings,
    label: "Cài đặt",
    href: "/admin/settings",
    requiredPermission: "settings:view",
  },
];

export const useAdminDashboard = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, accessToken, setAuth, clearAuth } = useAuthStore();
  const { stats, isLoading: isStatsLoading, fetchStats } = useDashboardStore();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Lọc NAV_ITEMS dựa trên quyền hạn
  const filteredNavItems = useMemo(() => {
    if (!user) return [];

    // Admin có toàn quyền
    if (user.role?.toLowerCase() === "admin") return NAV_ITEMS;

    // Các vai trò khác lọc theo permissions
    const userPermissions = user.permissions || [];
    return NAV_ITEMS.filter((item) => {
      if (!item.requiredPermission) return true;
      return userPermissions.includes(item.requiredPermission);
    });
  }, [user]);

  // Khởi tạo Auth khi reload trang
  useEffect(() => {
    const initializeAuth = async () => {
      if (accessToken) {
        setIsLoading(false);
        // Nếu đã có token và đang ở trang dashboard, fetch stats qua store
        if (pathname === "/admin/dashboard") {
          fetchStats();
        }
        return;
      }

      try {
        const response = await fetch("/api/auth/refresh", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          const data = await response.json();
          setAuth(data.accessToken, data.user);
          if (pathname === "/admin/dashboard") {
            fetchStats();
          }
        } else {
          clearAuth();
          router.push("/admin/login");
        }
      } catch (error) {
        console.error("Auth Initialization Error:", error);
        clearAuth();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, [accessToken, setAuth, clearAuth, router, pathname, fetchStats]);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await authService.logout();
      clearAuth();
      toast.success("Đã đăng xuất thành công.");
      router.push("/admin/login");
    } catch {
      toast.error("Lỗi khi đăng xuất!");
    } finally {
      setIsLoggingOut(false);
    }
  };

  const isActive = (href: string) => {
    if (href === "/admin/dashboard" && pathname === "/admin/dashboard")
      return true;
    if (href !== "/admin/dashboard" && pathname.startsWith(href)) return true;
    return false;
  };

  return {
    user,
    isLoading,
    isLoggingOut,
    handleLogout,
    navItems: filteredNavItems,
    pathname,
    isActive,
    // Add Dashboard Stats from Store
    stats,
    isStatsLoading,
    refreshStats: () => fetchStats(true), // Force refresh
  };
};
