"use client";

import { useSetupForm } from "./hooks/useSetupForm";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SetupForm() {
  const { form, isLoading, onSubmit } = useSetupForm();
  const { register, formState: { errors } } = form;

  return (
    <div className="flex h-screen w-full items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg border-primary/10">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Kích hoạt Hệ Thống
          </CardTitle>
          <CardDescription>
            Thiết lập tài khoản Quản Trị Viên (Admin) đầu tiên để quản lý.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Tên đăng nhập mới</Label>
              <Input
                id="username"
                type="text"
                placeholder="admin..."
                {...register("username")}
                className={errors.username ? "border-red-500 ring-red-500" : ""}
              />
              {errors.username && (
                <p className="text-sm font-medium text-red-500">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••"
                {...register("password")}
                className={errors.password ? "border-red-500 ring-red-500" : ""}
              />
              {errors.password && (
                <p className="text-sm font-medium text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full transition-all duration-200"
              disabled={isLoading}
            >
              {isLoading ? "Đang xử lý..." : "Khởi tạo ngay"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-sm text-slate-500 mt-2">
          Sau khi khởi tạo thành công tính năng này sẽ tự động bị khóa.
        </CardFooter>
      </Card>
    </div>
  );
}
