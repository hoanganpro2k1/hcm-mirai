import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return {
    title: `${t("Header.nav.services")} | HCM-MIRAI`,
    description: t("Services.hero.seo_desc", { fallback: "Các dịch vụ chính của HCM-MIRAI" }),
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
