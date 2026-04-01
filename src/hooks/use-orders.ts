"use client";

import { useState, useCallback, useEffect } from "react";
import { orderService } from "@/services/order.service";
import { JobOrder, OrderFilterParams } from "@/types/order.type";

export function useOrders(initialParams: OrderFilterParams = {}) {
  const [data, setData] = useState<JobOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0,
  });
  const [params, setParams] = useState<OrderFilterParams>({
    page: 1,
    limit: 6,
    ...initialParams,
  });

  const fetchOrders = useCallback(async (currentParams: OrderFilterParams) => {
    setLoading(true);
    try {
      const response = await orderService.getOrders(currentParams);
      setData(response.data);
      setPagination({
        page: response.page,
        totalPages: response.totalPages,
        total: response.total,
      });
      setError(null);
    } catch (err) {
      setError("Failed to fetch orders. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders(params);
  }, [params, fetchOrders]);

  const updateParams = (newParams: Partial<OrderFilterParams>) => {
    setParams((prev) => ({ ...prev, ...newParams }));
  };

  const handlePageChange = (page: number) => {
    updateParams({ page });
    // Scroll to top of list
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return {
    orders: data,
    loading,
    error,
    pagination,
    params,
    updateParams,
    handlePageChange,
    refresh: () => fetchOrders(params),
  };
}
