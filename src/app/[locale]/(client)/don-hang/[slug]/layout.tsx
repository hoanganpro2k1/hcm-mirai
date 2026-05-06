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
  const { slug } = await params;

  try {
    const order = await orderService.getOrderBySlug(slug);

    if (!order) {
      return {
        title: "Đơn hàng không tồn tại | HCM Mirai",
      };
    }

    const title = `${order.title} | HCM Mirai`;
    // Lọc bỏ thẻ HTML từ mô tả để làm metadata description
    const description = order.description
      ?.replace(/<[^>]*>/g, "")
      .slice(0, 160);
    const image = order.coverImage || "/logo.png";

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: order.title,
          },
        ],
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [image],
      },
    };
  } catch (error) {
    return {
      title: "Chi tiết đơn hàng | HCM Mirai",
    };
  }
}

export default function OrderLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
