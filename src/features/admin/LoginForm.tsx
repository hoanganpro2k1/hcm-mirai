"use client";

import { useLoginForm } from "./hooks/useLoginForm";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginForm() {
  const { form, isLoading, onSubmit } = useLoginForm();
  const { register, formState: { errors } } = form;

  return (
    <div className="flex bg-slate-100 dark:bg-slate-900 h-screen w-full items-center justify-center p-4">
      <Card className="w-full max-w-[400px] shadow-xl border-t-4 border-t-primary">
        <CardHeader className="space-y-1 text-center pb-8">
          <CardTitle className="text-3xl font-extrabold tracking-tight">
            Mirai Admin
          </CardTitle>
          <CardDescription>
            Điền thông tin định danh để truy cập trang quản trị
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="username">Tài khoản</Label>
              <Input
                id="username"
                type="text"
                autoComplete="username"
                placeholder="Nhập tài khoản"
                className={`py-6 text-md ${errors.username ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                {...register("username")}
              />
              {errors.username && (
                <p className="text-sm font-medium text-red-500">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Mật khẩu</Label>
              </div>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="Mật khẩu của bạn"
                className={`py-6 text-md ${errors.password ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                {...register("password")}
              />
              {errors.password && (
                <p className="text-sm font-medium text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full mt-4 text-md font-semibold"
              disabled={isLoading}
            >
              {isLoading ? "Đang xác thực..." : "Đăng Nhập Quản Trị"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
