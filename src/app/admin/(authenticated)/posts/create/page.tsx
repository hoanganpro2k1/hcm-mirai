import { PostForm } from "@/components/features/admin/posts/PostForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Viết bài mới | HCM Mirai Admin",
};

export default function CreatePostPage() {
  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Viết bài mới</h1>
        <p className="text-slate-500">Tạo nội dung mới để đăng tải lên website.</p>
      </div>
      
      <div className="max-w-6xl">
        <PostForm />
      </div>
    </div>
  );
}
