import { PostList } from "@/components/features/admin/posts/PostList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản lý bài viết | HCM Mirai Admin",
};

export default function AdminPostsPage() {
  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Tin tức & Sự kiện</h1>
        <p className="text-slate-500">Quản lý các bài viết, tin tức và sự kiện trên hệ thống.</p>
      </div>
      
      <PostList />
    </div>
  );
}
