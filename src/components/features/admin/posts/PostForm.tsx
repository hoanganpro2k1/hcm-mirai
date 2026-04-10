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
import { Textarea } from "@/components/ui/textarea";
import { usePostMutations } from "@/hooks/use-post-mutations";
import { slugify } from "@/lib/utils";
import { IPost } from "@/types/post.type";
import { postSchema, PostFormValues } from "@/schemas/post.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";

interface PostFormProps {
  initialData?: IPost | null;
}

export const PostForm = ({ initialData }: PostFormProps) => {
  const router = useRouter();
  const { createPost, updatePost, isCreating, isUpdating } = usePostMutations();
  const isPending = isCreating || isUpdating;

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: initialData?.title || "",
      slug: initialData?.slug || "",
      category: initialData?.category || "news",
      status: initialData?.status || "draft",
      content: initialData?.content || "",
      summary: initialData?.summary || "",
      thumbnail: initialData?.thumbnail || "",
    },
  });

  const onSubmit = async (data: PostFormValues) => {
    if (initialData) {
      await updatePost({ id: initialData.id, data });
    } else {
      await createPost(data);
    }
  };

  const titleValue = watch("title");

  // Auto-generate slug when title changes (only for new posts)
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setValue("title", title);
    if (!initialData) {
      setValue("slug", slugify(title));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="flex items-center justify-between">
        <Button
          type="button"
          variant="ghost"
          onClick={() => router.back()}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Quay lại
        </Button>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/posts")}
            disabled={isPending}
          >
            Hủy
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            {initialData ? "Cập nhật" : "Đăng bài"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Tiêu đề bài viết</Label>
            <Input
              id="title"
              placeholder="Nhập tiêu đề hấp dẫn..."
              {...register("title")}
              onChange={handleTitleChange}
            />
            {errors.title && (
              <p className="text-xs text-red-500 font-medium">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Đường dẫn (Slug)</Label>
            <Input
              id="slug"
              placeholder="duong-dan-bai-viet"
              {...register("slug")}
              onChange={(e) => setValue("slug", slugify(e.target.value))}
            />
            {errors.slug && (
              <p className="text-xs text-red-500 font-medium">{errors.slug.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="summary">Tóm tắt ngắn</Label>
            <Textarea
              id="summary"
              placeholder="Mô tả ngắn gọn nội dung bài viết..."
              {...register("summary")}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Nội dung chi tiết</Label>
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <RichTextEditor
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Viết nội dung bài viết tại đây..."
                />
              )}
            />
            {errors.content && (
              <p className="text-xs text-red-500 font-medium">{errors.content.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-6 border rounded-xl bg-white dark:bg-slate-900 space-y-6 shadow-sm">
            <div className="space-y-2">
              <Label>Ảnh đại diện (Thumbnail)</Label>
              <Controller
                name="thumbnail"
                control={control}
                render={({ field }) => (
                  <ImageUpload
                    value={field.value || ""}
                    onChange={field.onChange}
                    onRemove={() => field.onChange("")}
                    folder="news"
                  />
                )}
              />
            </div>

            <div className="space-y-2">
              <Label>Danh mục</Label>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full h-10">
                      <SelectValue placeholder="Chọn danh mục" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="news">Tin tức</SelectItem>
                      <SelectItem value="event">Sự kiện</SelectItem>
                      <SelectItem value="admission">Tuyển sinh</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.category && (
                <p className="text-xs text-red-500 font-medium">{errors.category.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Trạng thái</Label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full h-10">
                      <SelectValue placeholder="Trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Bản nháp</SelectItem>
                      <SelectItem value="published">Công khai</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.status && (
                <p className="text-xs text-red-500 font-medium">{errors.status.message}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
