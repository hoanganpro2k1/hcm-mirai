import { OrderFilterParams, OrderResponse, IOrder } from "@/types/order.type";
import { apiClient } from "@/lib/axios";

export const orderService = {
  getOrders: async (params: OrderFilterParams): Promise<OrderResponse> => {
    const res = await apiClient.get<OrderResponse>("/orders", { params });
    return res.data;
  },

  getOrderById: async (id: string): Promise<IOrder> => {
    const res = await apiClient.get<IOrder>(`/orders/${id}`);
    return res.data;
  },

  createOrder: async (data: Partial<IOrder>): Promise<IOrder> => {
    const res = await apiClient.post<IOrder>("/orders", data);
    return res.data;
  },

  updateOrder: async (id: string, data: Partial<IOrder>): Promise<IOrder> => {
    const res = await apiClient.put<IOrder>(`/orders/${id}`, data);
    return res.data;
  },

  deleteOrder: async (id: string): Promise<{ message: string }> => {
    const res = await apiClient.delete<{ message: string }>(`/orders/${id}`);
    return res.data;
  },
};
