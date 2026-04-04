import { loginSchema, type LoginFormValues } from "@/schemas/auth.schema";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const useLoginForm = () => {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema) as any,
    defaultValues: { username: "", password: "" },
  });

  const mutation = useMutation({
    mutationFn: (values: LoginFormValues) => authService.login(values),
    onSuccess: (data) => {
      const { accessToken, user } = data;

      // Lưu lại token vào state Zustand
      setAuth(accessToken, user);

      toast.success("Đăng nhập thành công!");

      // Chuyển hướng vô Dashboard
      router.push("/admin/dashboard");
      router.refresh();
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message ||
        "Sai thông tin đăng nhập hoặc lỗi hệ thống.";
      toast.error(message);
    },
  });

  return {
    form,
    isLoading: mutation.isPending,
    onSubmit: form.handleSubmit((values) => mutation.mutate(values)),
  };
};
