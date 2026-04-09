import PageBreadcrumbs from "@/components/common/PageBreadcrumbs";
import CenterImages from "@/components/features/gallery/CenterImages";
import CenterVideos from "@/components/features/gallery/CenterVideos";
import ConsultationForm from "@/components/features/home/ConsultationForm";
import PartnerMarquee from "@/components/features/home/PartnerMarquee";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Gallery" });
  
  return {
    title: `${t("hero.title")} | HCM-MIRAI`,
    description: t("images.subtitle"),
  };
}

export default function GalleryPage() {
  const tGallery = useTranslations("Gallery.hero");

  const breadcrumbItems = [
    { label: tGallery("breadcrumb"), href: "/" },
    { label: tGallery("title") },
  ];

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-6 py-4">
        <PageBreadcrumbs items={breadcrumbItems} />
      </div>

      {/* Center Images Section (3x3 Grid) */}
      <CenterImages />

      {/* Center Videos Section (3x2 Grid) */}
      <CenterVideos />

      {/* Partner Marquee */}
      <PartnerMarquee />

      {/* Registration Form */}
      <ConsultationForm />
    </main>
  );
}
