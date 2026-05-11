import { orderService } from "@/services/order.service";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

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
    const image = order.coverImage?.startsWith("http")
      ? order.coverImage
      : `${SITE_URL}${order.coverImage || "/logo.png"}`;
    const url = `${SITE_URL}/${locale}/don-hang/${order.slug}`;

    return {
      metadataBase: new URL(SITE_URL),
      title,
      description: "",
      alternates: {
        canonical: url,
      },
      openGraph: {
        title,
        description: "test",
        images: [
          {
            // url: image,
            url: "https://res.cloudinary.com/dgdrdmgbx/image/upload/v1778492236/orders/mjiqqjqleovp6q7rfgn7.jpg",
            width: 1200,
            height: 630,
            alt: order.title,
          },
        ],
        type: "article",
        url,
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

export default function OrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
