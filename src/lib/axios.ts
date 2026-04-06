import { useAuthStore } from "@/store";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const getBaseURL = () => {
  if (typeof window !== "undefined") {
    return "/api";
  }
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
};

// Tạo axios instance riêng cho API call
export const apiClient = axios.create({
  baseURL: getBaseURL(),
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Cho phép trình duyệt gửi Cookie (Refresh Token)
});

// Flag để ngăn việc gọi refresh API nhiều lần cùng lúc
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Không ném header auth vào các route liên quan login/refresh/setup để tránh lỗi logic
    if (
      config.url?.includes("/auth/login") ||
      config.url?.includes("/auth/refresh") ||
      config.url?.includes("/auth/setup")
    ) {
      return config;
    }

    const { accessToken } = useAuthStore.getState();
    if (accessToken) {
      // Sử dụng .set để đảm bảo tính tương thích với AxiosHeaders
      config.headers.set("Authorization", `Bearer ${accessToken}`);
    } else {
      // Silent warnings for known public routes
      const publicRoutes = ["/search", "/orders", "/blogs", "/categories", "/consultation"];
      const isPublicRoute = publicRoutes.some(route => config.url?.includes(route));

      if (!isPublicRoute) {
        console.warn(
          "Axios Interceptor: Access Token is missing for request to",
          config.url,
        );
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response Interceptor: Xử lý 401 và gọi Refresh Token tự động
apiClient.interceptors.response.use(
  (response) => {
    // Trả về luồng bình thường nếu không có lỗi
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Nếu mã lỗi là 401 và không phải đang gọi API auth
    if (
      error.response?.status === 401 &&
      !originalRequest.url?.includes("/auth/")
    ) {
      if (originalRequest._retry) {
        // Tránh vòng lặp vô tận nếu đã retry mà vẫn tịt
        useAuthStore.getState().clearAuth();
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.set("Authorization", "Bearer " + token);
            return apiClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Gọi lên backend để lấy Token mới dựa vào Refresh Token Cookie
        const { data } = await axios.post(
          "/api/auth/refresh",
          {},
          { withCredentials: true },
        );

        const newAccessToken = data.accessToken;

        if (newAccessToken) {
          // Lưu token mới vào Zustand
          useAuthStore.getState().setAuth(newAccessToken);

          processQueue(null, newAccessToken);
          originalRequest.headers.set(
            "Authorization",
            "Bearer " + newAccessToken,
          );
          return apiClient(originalRequest);
        }
      } catch (err) {
        processQueue(err, null);
        // Logout user hoàn toàn nếu Refresh Token cũng tịt (Lỗi 403 / hết hạn)
        useAuthStore.getState().clearAuth();
        // Option: Chuyển hướng người dùng về '/admin/login'
        if (typeof window !== "undefined") {
          window.location.href = "/admin/login";
        }
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);
