"use client";

import { postService } from "@/services/post.service";
import { IPost } from "@/types/post.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const usePostMutations = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const createMutation = useMutation({
    mutationFn: (data: Partial<IPost>) => postService.createPost(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-posts"] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Tạo bài viết thành công!");
      router.push("/admin/posts");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Lỗi khi tạo bài viết");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<IPost> }) =>
      postService.updatePost(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-posts"] });
      queryClient.invalidateQueries({ queryKey: ["admin-post"] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Cập nhật bài viết thành công!");
      router.push("/admin/posts");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Lỗi khi cập nhật bài viết");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => postService.deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-posts"] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Xóa bài viết thành công!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Lỗi khi xóa bài viết");
    },
  });

  return {
    createPost: createMutation.mutateAsync,
    updatePost: updateMutation.mutateAsync,
    deletePost: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};
