import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { Toaster } from "@/components/ui/sonner";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import QueryProvider from "@/providers/query-provider";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Geist, Geist_Mono, Mulish } from "next/font/google";
import { notFound } from "next/navigation";
import type { LocalBusiness, WebSite, WithContext } from "schema-dts";

const mulish = Mulish({
  subsets: ["latin", "vietnamese"],
  variable: "--font-sans",
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "HCM Mirai - Du học & XKLĐ tại Nghệ An",
    template: "%s | HCM Mirai",
  },
  description: "Xây đắp hiện tại - Tạo dựng tương lai!",
  icons: {
    icon: "/logo.ico",
  },
  openGraph: {
    title: "HCM Mirai - Du học & XKLĐ tại Nghệ An",
    description: "Xây đắp hiện tại - Tạo dựng tương lai!",
    url: "https://hcmmirai.com",
    siteName: "HCM Mirai",
    images: [
      {
        url: "/site-logo.jpg",
        width: 1200,
        height: 630,
        alt: "HCM Mirai Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HCM Mirai - Du học & XKLĐ tại Nghệ An",
    description: "Xây đắp hiện tại - Tạo dựng tương lai!",
    images: ["/site-logo.jpg"],
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        mulish.variable,
        "font-sans",
      )}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        <NextIntlClientProvider
          key={locale}
          locale={locale}
          messages={messages}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <ScrollProgress />
            <QueryProvider>{children}</QueryProvider>
            <Analytics />
            <SpeedInsights />
            <Toaster position="top-right" richColors />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@graph": [
                    {
                      "@type": "LocalBusiness",
                      "@id": "https://hcmmirai.com/#organization",
                      name: "CÔNG TY CỔ PHẦN ĐÀO TẠO CUNG ỨNG PHÁI CỬ LAO ĐỘNG HCM MIRAI",
                      url: "https://hcmmirai.com",
                      logo: "https://hcmmirai.com/logo.png",
                      image: "https://hcmmirai.com/site-logo.jpg",
                      telephone: "+84973460999",
                      email: "contact@hcm-mirai.com",
                      address: {
                        "@type": "PostalAddress",
                        streetAddress: "152 Đ. Ngô Gia Tự, Lê Lợi",
                        addressLocality: "Vinh",
                        addressRegion: "Nghệ An",
                        addressCountry: "VN",
                        postalCode: "43000",
                      },
                      geo: {
                        "@type": "GeoCoordinates",
                        latitude: 18.6733,
                        longitude: 105.6813,
                      },
                      sameAs: [
                        "https://www.facebook.com/hcmmiraijis",
                        "https://www.tiktok.com/@hcmmiraijis",
                        "https://www.youtube.com/@hcmmirai",
                      ],
                      openingHoursSpecification: [
                        {
                          "@type": "OpeningHoursSpecification",
                          dayOfWeek: [
                            "Monday",
                            "Tuesday",
                            "Wednesday",
                            "Thursday",
                            "Friday",
                            "Saturday",
                          ],
                          opens: "08:00",
                          closes: "17:30",
                        },
                      ],
                    } as LocalBusiness,
                    {
                      "@type": "WebSite",
                      "@id": "https://hcmmirai.com/#website",
                      url: "https://hcmmirai.com",
                      name: "HCM Mirai",
                      publisher: {
                        "@id": "https://hcmmirai.com/#organization",
                      },
                      potentialAction: {
                        "@type": "SearchAction",
                        target: {
                          "@type": "EntryPoint",
                          urlTemplate:
                            "https://hcmmirai.com/vi/tim-kiem?s={search_term_string}",
                        },
                        "query-input": "required name=search_term_string",
                      },
                    } as WebSite,
                  ],
                } as WithContext<any>),
              }}
            />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
