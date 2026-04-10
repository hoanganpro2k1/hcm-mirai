export interface IPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  summary?: string | null;
  category: "news" | "event" | "admission";
  thumbnail?: string | null;
  status: "draft" | "published";
  author: any;
  publishedAt?: string | Date | null;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface PostResponse {
  data: IPost[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
