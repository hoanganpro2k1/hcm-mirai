"use client";

import { orderService } from "@/services/order.service";
import { OrderFilterParams } from "@/types/order.type";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export function useOrders(initialParams: OrderFilterParams = {}) {
  const [params, setParams] = useState<OrderFilterParams>({
    page: 1,
    limit: 6,
    ...initialParams,
  });

  const { data, isLoading, isPlaceholderData, error, refetch } = useQuery({
    queryKey: ["orders", params],
    queryFn: () => orderService.getOrders(params),
    placeholderData: (previousData) => previousData,
  });

  const updateParams = (newParams: Partial<OrderFilterParams>) => {
    setParams((prev) => ({ ...prev, ...newParams }));
  };

  const handlePageChange = (page: number) => {
    updateParams({ page });
    // Scroll to top of list
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return {
    orders: data?.data || [],
    loading: isLoading || (isPlaceholderData && !data), // Show loading when fetching first time or no data
    error: error ? "Failed to fetch orders. Please try again later." : null,
    pagination: {
      page: data?.page || (params.page as number),
      totalPages: data?.totalPages || 1,
      total: data?.total || 0,
    },
    params,
    updateParams,
    handlePageChange,
    refresh: refetch,
  };
}
