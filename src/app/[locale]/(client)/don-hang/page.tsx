"use client";

import { OrderCard } from "@/components/features/order/order-card";
import { OrderCardSkeleton } from "@/components/features/order/order-card-skeleton";
import { OrderFilter } from "@/components/features/order/order-filter";
import { Pagination } from "@/components/ui/pagination";
import { SectionHeader } from "@/components/ui/section-header";
import { useOrders } from "@/hooks/use-orders";
import { OrderFilterParams } from "@/types/order.type";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function OrderPage() {
  const t = useTranslations("Orders");

  const {
    orders,
    loading,
    pagination,
    params,
    updateParams,
    handlePageChange,
  } = useOrders();

  // Local state to track filter selections before the user clicks 'Search'
  const [localFilters, setLocalFilters] = useState<Partial<OrderFilterParams>>(
    {},
  );

  const handleFilterChange = (
    key: keyof OrderFilterParams,
    value: string | null,
  ) => {
    setLocalFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    console.log("localFilters", localFilters);
    // Apply local filters to the search params triggering the useOrders fetch
    updateParams({ ...localFilters, page: 1 });
    console.log("Triggering API call with filters:", localFilters);
  };

  return (
    <div className="py-12 bg-gray-50/50 dark:bg-black transition-colors min-h-screen">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Title Section */}
        <SectionHeader title={t("title")} align="center" className="mb-12" />

        {/* Filter Section */}
        <OrderFilter
          // Display the local selections in the UI
          filters={{ ...params, ...localFilters }}
          onFilterChange={handleFilterChange}
          onSearch={handleSearch}
        />

        {/* Orders Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[600px]">
            {Array.from({ length: 6 }).map((_, i) => (
              <OrderCardSkeleton key={i} />
            ))}
          </div>
        ) : orders.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="animate-fade-in transition-all"
                  style={{ animationDelay: `${orders.indexOf(order) * 100}ms` }}
                >
                  <OrderCard order={order} />
                </div>
              ))}
            </div>

            {/* Pagination Section */}
            <div className="pb-12">
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
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
