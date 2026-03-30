import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { type LoginFormValues, loginSchema } from "@/schemas/auth.schema";
import { useAuthStore } from "@/store";
import { authService } from "@/services/auth.service";

export const useLoginForm = () => {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema) as any,
    defaultValues: { username: "", password: "" },
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      setIsLoading(true);
      const data = await authService.login(values);

      const { accessToken, admin } = data;

      // Lưu lại token vào state Zustand
      setAuth(accessToken, admin);

      toast.success("Đăng nhập thành công!");

      // Chuyển hướng vô Dashboard
      router.push("/admin/dashboard");
      router.refresh();
    } catch (error: any) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Sai thông tin đăng nhập hoặc lỗi hệ thống.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    isLoading,
    onSubmit: form.handleSubmit(onSubmit),
  };
};
