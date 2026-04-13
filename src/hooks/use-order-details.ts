"use client";

import { orderService } from "@/services/order.service";
import { useQuery } from "@tanstack/react-query";

export function useOrderDetails(slug: string) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["order", slug],
    queryFn: () => orderService.getOrderBySlug(slug),
    enabled: !!slug,
  });

  return {
    order: data,
    loading: isLoading,
    error: error ? "Failed to fetch order details. Please try again later." : null,
    refresh: refetch,
  };
}
