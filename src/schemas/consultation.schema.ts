import * as z from "zod";

export const consultationSchema = z.object({
  name: z.string().min(2, "Họ tên phải có ít nhất 2 ký tự"),
  phone: z.string().regex(/^[0-9]{10,11}$/, "Số điện thoại không hợp lệ (10-11 chữ số)"),
  email: z.string().email("Email không hợp lệ").optional().or(z.literal("")),
  note: z.string().min(5, "Nội dung phải có ít nhất 5 ký tự").optional().or(z.literal("")),
});

export type ConsultationFormValues = z.infer<typeof consultationSchema>;
