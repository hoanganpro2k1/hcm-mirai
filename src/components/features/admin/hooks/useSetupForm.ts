import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { type SetupFormValues, setupSchema } from "@/schemas/auth.schema";
import { authService } from "@/services/auth.service";

export const useSetupForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SetupFormValues>({
    resolver: zodResolver(setupSchema) as any,
    defaultValues: { username: "", password: "" },
  });

  const onSubmit = async (values: SetupFormValues) => {
    try {
      setIsLoading(true);
      const data = await authService.setup(values);

      toast.success(data.message || "Tạo tài khoản Admin thành công!");
      router.push("/admin/login");
    } catch (error: any) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Đã xảy ra lỗi hệ thống. Không thể tạo admin.");
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
