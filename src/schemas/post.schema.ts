import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(5, "Tiêu đề bài viết phải có ít nhất 5 ký tự"),
  slug: z
    .string()
    .min(1, "Vui lòng nhập đường dẫn (slug)")
    .regex(/^[a-z0-9-]+$/, "Slug chỉ bao gồm chữ thường, số và dấu gạch ngang"),
  category: z.enum(["news", "event", "admission"], {
    message: "Vui lòng chọn danh mục bài viết",
  }),
  status: z.enum(["draft", "published"], {
    message: "Vui lòng chọn trạng thái bài viết",
  }),


  content: z.string().min(10, "Nội dung bài viết quá ngắn"),
  summary: z.string().nullable().optional(),
  thumbnail: z.string().nullable().optional(),
});


export type PostFormValues = z.infer<typeof postSchema>;
