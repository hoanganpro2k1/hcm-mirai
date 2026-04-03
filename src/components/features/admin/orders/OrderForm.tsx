"use client";

import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  COUNTRY_OPTIONS,
  GENDER_OPTIONS,
  STATUS_OPTIONS,
} from "@/constants/order.constant";
import { orderService } from "@/services/order.service";
import { JobOrder } from "@/types/order.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const orderSchema = z.object({
  title: z.string().min(5, "Tiêu đề phải ít nhất 5 ký tự"),
  country: z.string().min(1, "Vui lòng chọn quốc gia"),
  category: z.string().min(1, "Vui lòng nhập ngành nghề"),
  salary: z.string().min(1, "Vui lòng nhập mức lương"),
  gender: z.enum(["male", "female", "both"]),
  status: z.string(),
  age: z.string().optional(),
  location: z.string().optional(),
  description: z.string().optional(),
  content: z.string().optional(),
  coverImage: z.string().optional(),
});

type OrderFormValues = z.infer<typeof orderSchema>;

interface OrderFormProps {
  initialData?: JobOrder | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export const OrderForm = ({
  initialData,
  onSuccess,
  onCancel,
}: OrderFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      title: initialData?.title || "",
      country: initialData?.country || "",
      category: initialData?.category || "",
      salary: initialData?.salary || "",
      gender: (initialData?.gender as "male" | "female" | "both") || "both",
      status: initialData?.status || "active",
      age: initialData?.age || "",
      location: initialData?.location || "",
      description: initialData?.description || "",
      content: initialData?.content || "",
      coverImage: initialData?.coverImage || "",
    },
  });

  const genderValue = watch("gender");

  const onSubmit = async (data: OrderFormValues) => {
    try {
      setIsSubmitting(true);
      if (initialData?._id || initialData?.id) {
        const id = initialData._id?.toString() || initialData.id;
        await orderService.updateOrder(id, data as any);
        toast.success("Cập nhật đơn hàng thành công.");
      } else {
        await orderService.createOrder(data as any);
        toast.success("Thêm đơn hàng mới thành công.");
      }
      onSuccess();
    } catch (error) {
      console.error("Error submitting order:", error);
      toast.error("Lỗi khi lưu đơn hàng.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg border p-6 shadow-sm">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={onCancel}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-bold">
          {initialData ? "Chỉnh sửa đơn hàng" : "Thêm đơn hàng mới"}
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="title">Tiêu đề đơn hàng</Label>
            <Input
              id="title"
              {...register("title")}
              placeholder="Ví dụ: Đơn hàng linh kiện điện tử Nhật Bản"
            />
            {errors.title && (
              <p className="text-xs text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="country">Quốc gia</Label>
            <Select
              value={watch("country") || ""}
              onValueChange={(val: string | null) => {
                if (val) setValue("country", val);
              }}
              items={COUNTRY_OPTIONS}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn quốc gia" />
              </SelectTrigger>
              <SelectContent>
                {COUNTRY_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.country && (
              <p className="text-xs text-red-500">{errors.country.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Ngành nghề</Label>
            <Input
              id="category"
              {...register("category")}
              placeholder="Ví dụ: Cơ khí, Thực phẩm..."
            />
            {errors.category && (
              <p className="text-xs text-red-500">{errors.category.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="salary">Mức lương</Label>
            <Input
              id="salary"
              {...register("salary")}
              placeholder="Ví dụ: 30-35 triệu/tháng"
            />
            {errors.salary && (
              <p className="text-xs text-red-500">{errors.salary.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="gender">Giới tính</Label>
            <Select
              value={genderValue}
              onValueChange={(val: string | null) => {
                if (val) setValue("gender", val as any);
              }}
              items={GENDER_OPTIONS}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn giới tính" />
              </SelectTrigger>
              <SelectContent>
                {GENDER_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="age">Độ tuổi</Label>
            <Input
              id="age"
              {...register("age")}
              placeholder="Ví dụ: 18-30 tuổi"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Địa điểm làm việc</Label>
            <Input
              id="location"
              {...register("location")}
              placeholder="Ví dụ: Tokyo, Osaka..."
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label>Ảnh bìa đơn hàng</Label>
            <Controller
              name="coverImage"
              control={control}
              render={({ field }) => (
                <ImageUpload
                  value={field.value || ""}
                  onChange={field.onChange}
                  onRemove={() => field.onChange("")}
                  folder="orders"
                />
              )}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Trạng thái</Label>
            <Select
              value={watch("status") || "active"}
              onValueChange={(val: string | null) => {
                if (val) setValue("status", val);
              }}
              items={STATUS_OPTIONS}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn trạng thái" />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Mô tả ngắn</Label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <RichTextEditor
                value={field.value || ""}
                onChange={field.onChange}
                placeholder="Mô tả tóm tắt về đơn hàng..."
              />
            )}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">Chi tiết đơn hàng</Label>
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <RichTextEditor
                value={field.value || ""}
                onChange={field.onChange}
                placeholder="Thông tin chi tiết, yêu cầu, quyền lợi..."
              />
            )}
          />
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Hủy bỏ
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {initialData ? "Cập nhật đơn hàng" : "Lưu đơn hàng"}
          </Button>
        </div>
      </form>
    </div>
  );
};
