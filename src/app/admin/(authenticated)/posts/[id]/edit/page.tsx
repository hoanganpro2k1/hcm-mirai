"use client";

import { PostForm } from "@/components/features/admin/posts/PostForm";
import { useAdminPost } from "@/hooks/use-posts";
import { Loader2 } from "lucide-react";
import { use } from "react";

export default function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { post, loading, error } = useAdminPost(id);

  if (loading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="flex h-[400px] flex-col items-center justify-center gap-4">
        <p className="text-red-500 font-medium">{error || "Không tìm thấy bài viết"}</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Chỉnh sửa bài viết</h1>
        <p className="text-slate-500">Cập nhật thông tin và nội dung bài viết.</p>
      </div>
      
      <div className="max-w-6xl">
        <PostForm key={post.id} initialData={post} />
      </div>

    </div>
  );
}
