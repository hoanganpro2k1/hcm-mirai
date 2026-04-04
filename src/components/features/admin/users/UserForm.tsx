"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ImageUpload } from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { USER_STATUS_OPTIONS } from "@/constants/user.constant";
import { useRoles } from "@/hooks/use-roles";
import { IUser } from "@/types/auth.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

const userSchema = z.object({
  username: z.string().min(3, "Tên đăng nhập phải ít nhất 3 ký tự"),
  password: z.string().optional(),
  name: z.string().min(2, "Họ tên phải ít nhất 2 ký tự"),
  phoneNumber: z.string().optional(),
  avatar: z.string().optional(),
  role: z.string().min(1, "Vui lòng chọn vai trò"),
  status: z.enum(["active", "inactive"]),
});

type UserFormValues = z.infer<typeof userSchema>;

interface UserFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: IUser | null;
  onSubmit: (data: any) => Promise<void>;
  isSubmitting: boolean;
}

export function UserForm({
  open,
  onOpenChange,
  initialData,
  onSubmit,
  isSubmitting,
}: UserFormProps) {
  const { roles, loading: loadingRoles } = useRoles();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: "",
      password: "",
      name: "",
      phoneNumber: "",
      avatar: "",
      role: "",
      status: "active",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        username: initialData.username,
        name: initialData.name || "",
        phoneNumber: initialData.phoneNumber || "",
        avatar: initialData.avatar || "",
        role: (initialData as any).role.id || (initialData as any).role || "",
        status: initialData.status as any,
        password: "", // Don't show old password
      });
    } else {
      reset({
        username: "",
        password: "",
        name: "",
        phoneNumber: "",
        avatar: "",
        role: "",
        status: "active",
      });
    }
  }, [initialData, reset, open]);

  const handleFormSubmit = async (data: UserFormValues) => {
    // If editing and password is empty, don't send it
    const payload = { ...data };
    if (initialData && !payload.password) {
      delete payload.password;
    }
    await onSubmit(payload);
    onOpenChange(false);
  };

  const roleOptions = [
    ...roles.map((role) => ({ value: role.id, label: role.name })),
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Chỉnh sửa người dùng" : "Thêm người dùng mới"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="max-h-[60vh] overflow-y-auto px-1 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="flex justify-center">
                <Controller
                  name="avatar"
                  control={control}
                  render={({ field }) => (
                    <ImageUpload
                      value={field.value || ""}
                      onChange={field.onChange}
                      onRemove={() => field.onChange("")}
                      folder="users"
                    />
                  )}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Tên đăng nhập</Label>
                <Input
                  id="username"
                  {...register("username")}
                  placeholder="Ví dụ: admin_hcm"
                  disabled={!!initialData}
                />
                {errors.username && (
                  <p className="text-xs text-red-500">
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">
                  Mật khẩu {initialData && "(Để trống nếu không đổi)"}
                </Label>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                  placeholder={
                    initialData ? "********" : "Mật khẩu cho account"
                  }
                />
                {errors.password && (
                  <p className="text-xs text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Họ và tên</Label>
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="Ví dụ: Nguyễn Văn A"
                />
                {errors.name && (
                  <p className="text-xs text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Số điện thoại</Label>
                  <Input
                    id="phoneNumber"
                    {...register("phoneNumber")}
                    placeholder="09xx..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Vai trò</Label>
                  <Controller
                    name="role"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value || ""}
                        items={roleOptions}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn vai trò" />
                        </SelectTrigger>
                        <SelectContent>
                          {loadingRoles ? (
                            <div className="p-2 text-xs">Đang tải...</div>
                          ) : (
                            roleOptions.map((role) => (
                              <SelectItem key={role.value} value={role.value}>
                                {role.label}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.role && (
                    <p className="text-xs text-red-500">
                      {errors.role.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Trạng thái</Label>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select
                      items={USER_STATUS_OPTIONS}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn trạng thái" />
                      </SelectTrigger>
                      <SelectContent>
                        {USER_STATUS_OPTIONS.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
          </div>

          <DialogFooter className="pt-2">
            <Button
              variant="outline"
              type="button"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Hủy
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {initialData ? "Lưu thay đổi" : "Tạo người dùng"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
