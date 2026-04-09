"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSettingMutations } from "@/hooks/use-setting-mutations";
import { useAdminSettings } from "@/hooks/use-settings";
import { Loader2, Save } from "lucide-react";

const topbarSchema = z.object({
  vi: z.string().min(1, "Nội dung tiếng Việt không được để trống"),
  en: z.string().min(1, "Nội dung tiếng Anh không được để trống"),
});

type TopbarFormValues = z.infer<typeof topbarSchema>;

export function SettingsForm() {
  const { data: settings, isLoading } = useAdminSettings();
  const { updateSetting, isUpdating } = useSettingMutations();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty },
  } = useForm<TopbarFormValues>({
    resolver: zodResolver(topbarSchema),
    defaultValues: {
      vi: "",
      en: "",
    },
  });

  const viValue = watch("vi");
  const enValue = watch("en");
  const isFormValid = viValue?.trim() && enValue?.trim();

  useEffect(() => {
    if (settings) {
      const topbarSetting = settings.find((s: any) => s.key === "topbar_text");
      if (topbarSetting) {
        reset(topbarSetting.value);
      }
    }
  }, [settings, reset]);

  const onSubmit = async (values: TopbarFormValues) => {
    await updateSetting({
      key: "topbar_text",
      value: values,
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="border-slate-200 shadow-sm overflow-hidden">
          <CardHeader className="bg-slate-50/50 border-b">
            <div>
              <CardTitle>Thông báo thanh tiêu đề (Topbar Text)</CardTitle>
              <CardDescription>
                Cập nhật dòng chữ thông báo hiển thị ở phía trên cùng của trang web cho cả hai ngôn ngữ.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="vi" className="text-slate-900 font-bold">Nội dung Tiếng Việt</Label>
              <Input
                id="vi"
                placeholder="VD: ĐƠN HÀNG MỚI NHẤT THÁNG 4/2026"
                {...register("vi")}
                className={errors.vi ? "border-red-500" : ""}
              />
              {errors.vi && (
                <p className="text-sm text-red-500">{errors.vi.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="en" className="text-slate-900 font-bold">English Content</Label>
              <Input
                id="en"
                placeholder="EX: LATEST JOBS APRIL 2026"
                {...register("en")}
                className={errors.en ? "border-red-500" : ""}
              />
              {errors.en && (
                <p className="text-sm text-red-500">{errors.en.message}</p>
              )}
            </div>
            
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 flex gap-3 text-sm text-amber-800">
               <div className="bg-amber-100 w-8 h-8 rounded-full shrink-0 flex items-center justify-center font-bold">!</div>
               <p>
                 Thay đổi này sẽ áp dụng ngay lập tức cho tất cả người dùng trên toàn hệ thống. 
                 Vui lòng kiểm tra kỹ nội dung trước khi lưu.
               </p>
            </div>
          </CardContent>
          <CardFooter className="bg-slate-50/50 border-t justify-end py-3">
            <Button type="submit" disabled={isUpdating || !isDirty || !isFormValid} className="gap-2">
              {isUpdating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Đang lưu...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Lưu thay đổi
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
