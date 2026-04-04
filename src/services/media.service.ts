import { apiClient } from "@/lib/axios";

export interface MediaItem {
  id: string;
  url: string;
  public_id: string;
  fileName: string;
  mimeType: string;
  size: number;
  width?: number;
  height?: number;
  folder?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MediaListResponse {
  data: MediaItem[];
  total: number;
  page: number;
  totalPages: number;
  hasMore: boolean;
}

export const mediaService = {
  getMedia: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    folder?: string;
  }): Promise<MediaListResponse> => {
    const { data } = await apiClient.get("/media", { params });
    return data;
  },

  saveMedia: async (mediaData: Partial<MediaItem>): Promise<MediaItem> => {
    const { data } = await apiClient.post("/media", mediaData);
    return data;
  },

  deleteMedia: async (ids: string[]): Promise<{ message: string }> => {
    const { data } = await apiClient.delete("/media", { data: { ids } });
    return data;
  },
};
