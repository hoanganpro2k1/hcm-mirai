"use client";

import { postService } from "@/services/post.service";
import { useQuery } from "@tanstack/react-query";

export const useAdminPosts = (page = 1, limit = 100) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["admin-posts", page, limit],
    queryFn: () => postService.getAdminPosts(page, limit),
  });

  return {
    posts: data?.data || [],
    loading: isLoading,
    error: error ? (error as any).response?.data?.message || "Lỗi tải danh sách bài viết" : null,
    refresh: refetch,
    total: data?.total || 0,
    totalPages: data?.totalPages || 0,
  };
};

export const useAdminPost = (id: string | null) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-post", id],
    queryFn: () => (id ? postService.getAdminPostById(id) : null),
    enabled: !!id,
  });

  return {
    post: data,
    loading: isLoading,
    error: error ? (error as any).response?.data?.message || "Lỗi tải nội dung bài viết" : null,
  };
};
