import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, "Vui lòng nhập tên tài khoản"),
  password: z.string().min(1, "Vui lòng nhập mật khẩu"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const setupSchema = z.object({
  username: z.string().min(3, "Tài khoản phải chứa ít nhất 3 ký tự."),
  password: z.string().min(6, "Mật khẩu phải chứa từ 6 ký tự trở lên."),
});

export type SetupFormValues = z.infer<typeof setupSchema>;
