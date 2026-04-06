"use client";

import { useAdminDashboard } from "@/components/features/admin/hooks/useAdminDashboard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Activity,
  ArrowUpRight,
  BriefcaseBusiness,
  ChevronRight,
  Clock,
  Image as ImageIcon,
  PlusCircle,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function DashboardOverviewPage() {
  const { user, stats, isStatsLoading } = useAdminDashboard();

  const statCards = [
    {
      title: "Người dùng",
      value: stats?.stats?.users?.total || 0,
      description: `${stats?.stats?.users?.active || 0} đang hoạt động`,
      icon: Users,
      color: "bg-blue-500",
      link: "/admin/users",
    },
    {
      title: "Đơn hàng XKLĐ",
      value: stats?.stats?.orders?.total || 0,
      description: "Tổng số đơn tuyển dụng",
      icon: BriefcaseBusiness,
      color: "bg-emerald-500",
      link: "/admin/orders",
    },
    {
      title: "Thư viện Media",
      value: stats?.stats?.media?.total || 0,
      description: "Ảnh và tài nguyên hệ thống",
      icon: ImageIcon,
      color: "bg-purple-500",
      link: "/admin/dashboard", // Assuming media library is part of dashboard or a separate page
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Welcome Section */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-8 text-white shadow-2xl">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Badge
              variant="outline"
              className="text-white border-white/20 bg-white/10 backdrop-blur-sm px-3 py-1"
            >
              <Activity className="h-3.5 w-3.5 mr-1" />
              Sẵn sàng làm việc
            </Badge>
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            Chào mừng trở lại, {user?.name || user?.username || "Admin"}! 👋
          </h1>
          <p className="text-slate-400 max-w-xl text-lg">
            Hệ thống HCM Mirai đang hoạt động ổn định. Bạn có{" "}
            {stats?.stats?.orders?.total || 0} đơn hàng cần quản lý hôm nay.
          </p>

          <div className="flex gap-3 mt-8">
            <Link href="/admin/orders">
              <Button className="cursor-pointer bg-white text-slate-900 hover:bg-slate-100 font-semibold gap-2">
                <PlusCircle className="h-4 w-4" />
                Đơn hàng mới
              </Button>
            </Link>
            <Link href="/admin/users">
              <Button className="cursor-pointer border-white/20 hover:bg-white/10 text-white font-medium">
                Quản lý User
              </Button>
            </Link>
          </div>
        </div>

        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-primary/20 to-transparent opacity-50 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
      </div>

      {/* KPI Stats Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {statCards.map((stat, index) => (
          <Card
            key={index}
            className="group hover:shadow-lg transition-all duration-300 border-slate-200 overflow-hidden"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div
                  className={cn(
                    "p-3 rounded-2xl text-white shadow-lg",
                    stat.color,
                  )}
                >
                  <stat.icon className="h-6 w-6" />
                </div>
                <Link href={stat.link}>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-slate-500">
                  {stat.title}
                </p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-3xl font-bold tracking-tight">
                    {isStatsLoading ? "..." : stat.value}
                  </h3>
                </div>
                <p className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {stat.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Orders */}
        <Card className="rounded-2xl shadow-sm border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <BriefcaseBusiness className="h-5 w-5 text-emerald-500" />
              Đơn hàng vừa cập nhật
            </CardTitle>
            <Link href="/admin/orders">
              <Button
                variant="ghost"
                size="sm"
                className="cursor-pointer text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 font-medium"
              >
                Xem tất cả
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {!stats?.recent?.orders?.length && !isStatsLoading ? (
                <div className="text-center py-8 text-slate-400 text-sm italic">
                  Chưa có đơn hàng nào
                </div>
              ) : (
                stats?.recent?.orders?.map((order: any) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                        {order.coverImage ? (
                          <Image
                            src={order.coverImage}
                            alt={order.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover"
                          />
                        ) : (
                          <ImageIcon className="h-6 w-6 m-auto text-slate-300" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 line-clamp-1">
                          {order.title}
                        </p>
                        <p className="text-xs text-slate-400">
                          {order.location} • {order.salary}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={cn(
                        "capitalize border-transparent",
                        order.status === "active"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                          : "bg-slate-50 text-slate-700 border-slate-100",
                      )}
                    >
                      {order.status || "Active"}
                    </Badge>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Media Assets */}
        <Card className="rounded-2xl shadow-sm border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-purple-500" />
              Ảnh mới tải lên
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className="cursor-pointer text-slate-500 font-medium"
            >
              Thư viện
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-3">
              {!stats?.recent?.media?.length && !isStatsLoading ? (
                <div className="col-span-4 text-center py-12 text-slate-400 text-sm italic">
                  Thư viện ảnh đang trống
                </div>
              ) : (
                stats?.recent?.media?.map((media: any) => (
                  <div
                    key={media.id}
                    className="group relative aspect-square rounded-xl overflow-hidden border border-slate-200 bg-slate-50 hover:ring-2 ring-primary ring-offset-2 transition-all cursor-pointer shadow-sm"
                  >
                    <Image
                      src={media.url}
                      alt={media.fileName}
                      fill
                      className="object-cover transition-transform group-hover:scale-110"
                      sizes="(max-width: 768px) 25vw, 10vw"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-[10px] text-white font-medium px-1 truncate max-w-full">
                        {media.fileName}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Health / Status Banner */}
      <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </div>
          <div>
            <p className="text-sm font-semibold text-indigo-900">
              Mã Access Token đang được tự động làm mới
            </p>
            <p className="text-xs text-indigo-700/70">
              Hệ thống của bạn an toàn và luôn được đồng bộ hóa.
            </p>
          </div>
        </div>
        <Badge className="bg-indigo-600">Stable</Badge>
      </div>
    </div>
  );
}
