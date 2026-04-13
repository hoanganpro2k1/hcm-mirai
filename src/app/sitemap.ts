import { orderService } from "@/services/order.service";
import { postService } from "@/services/post.service";
import { MetadataRoute } from "next";

const domain = "https://hcmmirai.com";
const locales = ["vi", "en"];

const staticRoutes = [
  "",
  "/gioi-thieu",
  "/tin-tuc",
  "/don-hang",
  "/dao-tao-ngoai-ngu",
  "/du-hoc-xkld",
  "/cung-ung-ld-trong-nuoc",
  "/cung-ung-ld-nuoc-ngoai",
  "/cam-nhan-hoc-vien",
  "/thu-vien-hinh-anh",
  "/lien-he",
  "/chinh-sach-bao-mat",
  "/dieu-khoan-su-dung",
  "/dich-vu",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Static Routes
  const staticEntries = locales.flatMap((locale) =>
    staticRoutes.map((route) => ({
      url: `${domain}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    }))
  );

  // 2. Dynamic News Routes
  let newsEntries: MetadataRoute.Sitemap = [];
  try {
    const posts = await postService.getPosts(1, 100); // Lấy tối đa 100 bài mới nhất
    newsEntries = locales.flatMap((locale) =>
      posts.data.map((post) => ({
        url: `${domain}/${locale}/tin-tuc/${post.slug}`,
        lastModified: new Date(post.updatedAt || post.publishedAt || new Date()),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }))
    );
  } catch (error) {
    console.error("Sitemap error (news):", error);
  }

  // 3. Dynamic Order Routes
  let orderEntries: MetadataRoute.Sitemap = [];
  try {
    const orders = await orderService.getOrders({ page: 1, limit: 100 });
    orderEntries = locales.flatMap((locale) =>
      orders.data.map((order) => ({
        url: `${domain}/${locale}/don-hang/${order.slug}`,
        lastModified: new Date(order.updatedAt || new Date()),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }))
    );
  } catch (error) {
    console.error("Sitemap error (orders):", error);
  }

  return [...staticEntries, ...newsEntries, ...orderEntries];
}
