import { OrderFilterParams, OrderResponse } from "@/types/order.type";
import { MOCK_ORDERS } from "@/constants/orders";

export const orderService = {
  getOrders: async (params: OrderFilterParams): Promise<OrderResponse> => {
    // In a real app, we would call the API:
    // const res = await apiClient.get("/orders", { params });
    // return res.data;

    // Simulating API call with mock data
    console.log("Fetching orders with params:", params);
    
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const { page = 1, limit = 6, country, category, gender } = params;
    
    let filteredOrders = [...MOCK_ORDERS];

    if (country && country !== "all") {
      filteredOrders = filteredOrders.filter(order => order.country === country);
    }
    if (category && category !== "all") {
      filteredOrders = filteredOrders.filter(order => order.category.includes(category));
    }
    if (gender && gender !== "all") {
      filteredOrders = filteredOrders.filter(order => order.gender === gender || order.gender === "both");
    }

    const total = filteredOrders.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const end = start + limit;
    const data = filteredOrders.slice(start, end);

    return {
      data,
      total,
      page,
      totalPages,
    };
  },
};
