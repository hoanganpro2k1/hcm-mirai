import { z } from "zod";

export const orderSchema = z.object({
  title: z.string().min(1, "Vui lòng nhập tiêu đề đơn hàng"),
  image: z.string().optional(),
  salary: z.string().optional(),
  date: z.string().optional(),
  location: z.string().optional(),
  age: z.string().optional(),
  description: z.string().optional(),
  content: z.string().optional(),
  category: z.string().optional(),
  country: z.string().optional(),
  gender: z.enum(["male", "female", "both"]).default("both"),
  status: z.string().default("pending"),
});

export type OrderFormValues = z.infer<typeof orderSchema>;
