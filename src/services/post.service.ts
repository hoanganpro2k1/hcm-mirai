import { apiClient } from "@/lib/axios";
import { IPost, PostResponse } from "@/types/post.type";

export const postService = {
  // Public APIs
  getPosts: async (page = 1, limit = 9, category = "all"): Promise<PostResponse> => {
    const response = await apiClient.get("/posts", {
      params: { page, limit, category },
    });
    return response.data;
  },

  getPostBySlug: async (slug: string): Promise<IPost> => {
    const response = await apiClient.get(`/posts/${slug}`);
    return response.data;
  },

  // Admin APIs
  getAdminPosts: async (page = 1, limit = 100): Promise<PostResponse> => {
    const response = await apiClient.get("/admin/posts", {
      params: { page, limit },
    });
    return response.data;
  },

  getAdminPostById: async (id: string): Promise<IPost> => {
    const response = await apiClient.get(`/admin/posts/${id}`);
    return response.data;
  },

  createPost: async (data: Partial<IPost>): Promise<IPost> => {
    const response = await apiClient.post("/admin/posts", data);
    return response.data;
  },

  updatePost: async (id: string, data: Partial<IPost>): Promise<IPost> => {
    const response = await apiClient.patch(`/admin/posts/${id}`, data);
    return response.data;
  },

  deletePost: async (id: string): Promise<{ message: string }> => {
    const response = await apiClient.delete(`/admin/posts/${id}`);
    return response.data;
  },
};
