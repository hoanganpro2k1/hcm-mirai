import { orderService } from "@/services/order.service";
import { Metadata } from "next";

interface OrderLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: OrderLayoutProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL!;

  try {
    const order = await orderService.getOrderBySlug(slug);

    if (!order) {
      return {
        title: "Đơn hàng không tồn tại | HCM Mirai",
      };
    }

    const title = `${order.title} | HCM Mirai`;
    const description = order.description
      ?.replace(/<[^>]*>/g, "")
      .slice(0, 160);

    // Đảm bảo URL ảnh là tuyệt đối và sử dụng https nếu có thể
    let image = order.coverImage || "/logo.png";
    if (!image.startsWith("http")) {
      image = `${SITE_URL}${image.startsWith("/") ? "" : "/"}${image}`;
    }
    // Zalo ưu tiên https
    image = image.replace("http://", "https://");

    const url = `${SITE_URL}/${locale}/don-hang/${order.slug}`;

    return {
      metadataBase: new URL(SITE_URL),
      title,
      description,
      alternates: {
        canonical: url,
      },
      openGraph: {
        title,
        description,
        url,
        siteName: "HCM Mirai",
        images: [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: order.title,
          },
        ],
        type: "article",
        locale: locale === "vi" ? "vi_VN" : "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [image],
      },
      // Thêm các thẻ này để Zalo chắc chắn nhận được ảnh
      other: {
        "og:image:secure_url": image,
        "og:image:width": "1200",
        "og:image:height": "630",
      },
    };
  } catch (error) {
    return {
      title: "Chi tiết đơn hàng | HCM Mirai",
    };
  }
}

export default function OrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
