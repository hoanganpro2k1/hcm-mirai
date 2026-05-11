import PageBreadcrumbs from "@/components/common/PageBreadcrumbs";
import { OrderCard } from "@/components/features/order/order-card";
import { OrderFilter } from "@/components/features/order/order-filter";
import { SectionHeader } from "@/components/ui/section-header";
import { orderService } from "@/services/order.service";
import { OrderFilterParams } from "@/types/order.type";
import { getTranslations } from "next-intl/server";
import { PaginationWrapper } from "@/components/common/PaginationWrapper";

interface OrderPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Partial<OrderFilterParams>>;
}

export default async function OrderPage({ params, searchParams }: OrderPageProps) {
  const { locale } = await params;
  const sParams = await searchParams;
  
  const t = await getTranslations("Orders");
  const tHeader = await getTranslations("Header");

  // Xử lý tham số filter từ URL
  const filterParams: OrderFilterParams = {
    page: Number(sParams.page) || 1,
    limit: Number(sParams.limit) || 9,
    country: sParams.country || undefined,
    category: sParams.category || undefined,
    gender: sParams.gender || undefined,
  };

  // Fetch dữ liệu trực tiếp trên server
  const response = await orderService.getOrders(filterParams);
  const orders = response.data;
  const pagination = {
    page: response.page,
    totalPages: response.totalPages,
  };

  const breadcrumbItems = [
    {
      label: tHeader("nav.home"),
      href: "/",
    },
    { label: tHeader("nav.donhang") },
  ];

  return (
    <div className="py-12 bg-gray-50/50 dark:bg-black transition-colors min-h-screen">
      <div className="container mx-auto px-6 max-w-7xl">
        <PageBreadcrumbs items={breadcrumbItems} className="mb-8" />
        <SectionHeader title={t("title")} align="center" className="mb-12" />

        <OrderFilter />

        {orders.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {orders.map((order, index) => (
                <div
                  key={order.id || index}
                  className="animate-fade-in transition-all"
                >
                  <OrderCard order={order} />
                </div>
              ))}
            </div>

            {/* Pagination Section */}
            <div className="pb-12">
              <PaginationWrapper
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
              />
            </div>
          </>
        ) : (
          <div className="text-center py-32 bg-white dark:bg-gray-950 rounded-3xl border border-dashed border-gray-200 dark:border-gray-800">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              {t("empty")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
