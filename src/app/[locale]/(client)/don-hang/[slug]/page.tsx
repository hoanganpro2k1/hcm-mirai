"use client";

import { JsonLd } from "@/components/common/JsonLd";
import PageBreadcrumbs from "@/components/common/PageBreadcrumbs";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CATEGORY_OPTIONS } from "@/constants/order.constant";
import { useOrderDetails } from "@/hooks/use-order-details";
import { Link, useRouter } from "@/i18n/routing";
import { format, isValid, parseISO } from "date-fns";
import DOMPurify from "isomorphic-dompurify";
import {
  ArrowLeft,
  Briefcase,
  Calendar,
  ChevronRight,
  Clock,
  DollarSign,
  MapPin,
  Share2,
  User,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { use } from "react";
import type { BreadcrumbList, Graph, JobPosting } from "schema-dts";

interface OrderDetailPageProps {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

export default function OrderDetailPage({ params }: OrderDetailPageProps) {
  const localeParams = use(params);
  const { slug, locale } = localeParams;
  const t = useTranslations("Orders");
  const tHeader = useTranslations("Header");
  const router = useRouter();

  const { order, loading } = useOrderDetails(slug);

  const breadcrumbItems = [
    {
      label: tHeader("nav.home"),
      href: "/",
    },
    {
      label: tHeader("nav.donhang"),
      href: "/don-hang",
    },
    { label: order?.title || "..." },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50/50 dark:bg-black py-12">
        <div className="container mx-auto px-6 max-w-7xl">
          <Skeleton className="h-8 w-64 mb-8 rounded-full" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <Skeleton className="h-[400px] w-full rounded-3xl" />
              <Skeleton className="h-12 w-3/4 rounded-xl" />
              <div className="space-y-4">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-2/3" />
              </div>
            </div>
            <div className="space-y-6">
              <Skeleton className="h-[500px] w-full rounded-3xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50/50 dark:bg-black px-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {t("empty")}
        </h2>
        <Button
          onClick={() => router.push("/don-hang")}
          variant="default"
          className="rounded-full"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {tHeader("nav.donhang")}
        </Button>
      </div>
    );
  }

  const categoryLabel =
    CATEGORY_OPTIONS.find((opt) => opt.value === order.category)?.label ||
    order.category ||
    "N/A";

  const dateValue = order.date ? parseISO(order.date) : null;
  const formattedDate =
    dateValue && isValid(dateValue) ? format(dateValue, "dd/MM/yyyy") : "N/A";

  const infoItems = [
    {
      icon: Briefcase,
      label: t("labels.category"),
      value: categoryLabel,
      color: "bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400",
    },
    {
      icon: DollarSign,
      label: t("labels.salary"),
      value: order.salary,
      color:
        "bg-green-50 text-green-600 dark:bg-green-950/30 dark:text-green-400",
    },
    {
      icon: MapPin,
      label: t("labels.location"),
      value: order.location,
      color:
        "bg-orange-50 text-orange-600 dark:bg-orange-950/30 dark:text-orange-400",
    },
    {
      icon: Calendar,
      label: t("labels.date"),
      value: formattedDate,
      color: "bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400",
    },
    {
      icon: User,
      label: t("labels.age"),
      value: order.age,
      color:
        "bg-purple-50 text-purple-600 dark:bg-purple-950/30 dark:text-purple-400",
    },
  ];

  const jsonLd: Graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "JobPosting",
        title: order.title,
        description: order.description || order.title,
        datePosted: new Date(
          (order as any).createdAt || new Date(),
        ).toISOString(),
        validThrough:
          dateValue && isValid(dateValue) ? dateValue.toISOString() : undefined,
        hiringOrganization: {
          "@type": "Organization",
          name: "HCM Mirai",
          sameAs: "https://hcmmirai.com",
          logo: "https://hcmmirai.com/logo.png",
        },
        jobLocation: {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressLocality: order.location,
            addressCountry: "VN",
          },
        },
        baseSalary: {
          "@type": "MonetaryAmount",
          currency: "VND",
          value: {
            "@type": "QuantitativeValue",
            value: order.salary,
            unitText: "MONTH",
          },
        },
      } as JobPosting,
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: tHeader("nav.home"),
            item: `https://hcmmirai.com/${locale}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: tHeader("nav.donhang"),
            item: `https://hcmmirai.com/${locale}/don-hang`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: order.title,
            item: `https://hcmmirai.com/${locale}/don-hang/${order.slug}`,
          },
        ],
      } as BreadcrumbList,
    ],
  };

  return (
    <div className="bg-gray-50/50 dark:bg-black transition-colors min-h-screen pb-24">
      <JsonLd data={jsonLd} />
      {/* Hero Header */}
      <div className="relative h-[40vh] min-h-[400px] overflow-hidden">
        <Image
          src={order.coverImage || "/logo.png"}
          alt={order.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/60 to-gray-50/50 dark:to-black" />

        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="max-w-3xl space-y-6">
              <div className="flex items-center gap-2 text-white/80 text-sm font-medium animate-fade-in">
                <span className="px-3 py-1 bg-primary/20 backdrop-blur-md border border-primary/30 rounded-full text-primary-foreground">
                  {categoryLabel}
                </span>
                <ChevronRight className="w-4 h-4" />
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {formattedDate}
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight animate-slide-up">
                {order.title}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-7xl -mt-12 relative z-10">
        <div className="mb-8">
          <PageBreadcrumbs
            items={breadcrumbItems}
            className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm p-4 rounded-2xl inline-flex"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Description Card */}
            <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 md:p-10 shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <div className="w-2 h-8 bg-primary rounded-full" />
                {t("labels.note")}
              </h2>
              <div
                className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(order.description || ""),
                }}
              />

              <div className="mt-12 pt-12 border-t border-gray-100 dark:border-gray-800">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                  <div className="w-2 h-8 bg-primary rounded-full" />
                  {t("labels.details")}
                </h2>
                {order.content && (
                  <div>
                    <div
                      className="prose prose-lg dark:prose-invert max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(order.content),
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Application Section */}
            <div className="bg-linear-to-br from-primary to-primary-foreground rounded-[2.5rem] p-10 text-white shadow-2xl shadow-primary/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl group-hover:bg-white/20 transition-all duration-700" />
              <div className="relative z-10 space-y-6">
                <h3 className="text-3xl font-bold">{t("apply_now")}</h3>
                <p className="text-white/80 text-lg max-w-xl">
                  {t("apply_desc")}
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <Link href="/lien-he">
                    <Button
                      variant="secondary"
                      size="lg"
                      className="rounded-full font-bold px-10 h-14 text-primary hover:scale-105 transition-transform"
                    >
                      {t("free_consult")}
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-full font-bold px-10 h-14 text-primary border-white/30 hover:bg-white/10"
                  >
                    {t("call_hotline")}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="sticky top-24 space-y-8">
              {/* Quick Info Card */}
              <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800">
                <div className="space-y-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {t("recruitment_info")}
                    </h3>
                    <button className="p-2 text-gray-400 hover:text-primary transition-colors">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-6">
                    {infoItems.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-4 group">
                        <div
                          className={`mt-0.5 p-3 rounded-2xl transition-transform group-hover:scale-110 duration-300 ${item.color}`}
                        >
                          <item.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block mb-0.5">
                            {item.label}
                          </span>
                          <p className="text-gray-900 dark:text-white font-semibold text-lg truncate">
                            {item.value || "N/A"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-8 border-t border-gray-100 dark:border-gray-800 space-y-4">
                    <Link href="/lien-he" className="block">
                      <Button className="w-full rounded-2xl h-14 font-bold text-lg">
                        {t("register_now")}
                      </Button>
                    </Link>
                    <p className="text-center text-xs text-gray-500 dark:text-gray-400">
                      {t("security_commitment")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Helpful Note */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-3xl p-6 border border-blue-100 dark:border-blue-900/30">
                <div className="flex gap-4">
                  <div className="bg-blue-500 text-white p-2 rounded-xl h-fit">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-900 dark:text-blue-200 mb-1">
                      {t("need_support")}
                    </h4>
                    <p className="text-sm text-blue-800/70 dark:text-blue-300/60 leading-relaxed">
                      {t("support_desc")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
