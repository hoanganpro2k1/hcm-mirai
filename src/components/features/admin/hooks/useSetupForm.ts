import { setupSchema, type SetupFormValues } from "@/schemas/auth.schema";
import { authService } from "@/services/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const useSetupForm = () => {
  const router = useRouter();

  const form = useForm<SetupFormValues>({
    resolver: zodResolver(setupSchema) as any,
    defaultValues: { username: "", password: "" },
  });

  const mutation = useMutation({
    mutationFn: (values: SetupFormValues) => authService.setup(values),
    onSuccess: (data) => {
      toast.success(data.message || "Tạo tài khoản User thành công!");
      router.push("/admin/login");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message ||
        "Đã xảy ra lỗi hệ thống. Không thể tạo user.";
      toast.error(message);
    },
  });

  return {
    form,
    isLoading: mutation.isPending,
    onSubmit: form.handleSubmit((values) => mutation.mutate(values)),
  };
};
