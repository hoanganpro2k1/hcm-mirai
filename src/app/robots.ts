import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin",
        "/api",
        "/admin/*",
        "/api/*",
        "/*/tim-kiem",
        "/*/tim-kiem/*",
      ],
    },
    sitemap: "https://hcmmirai.com/sitemap.xml",
  };
}
