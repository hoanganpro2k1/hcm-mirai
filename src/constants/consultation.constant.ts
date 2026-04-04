export const statusColors = {
  pending: "bg-yellow-500/10 text-yellow-600 border-yellow-200",
  processed: "bg-green-500/10 text-green-600 border-green-200",
  cancelled: "bg-red-500/10 text-red-600 border-red-200",
} as const;

export const statusLabels = {
  pending: "Đang chờ",
  processed: "Đã xử lý",
  cancelled: "Đã hủy",
} as const;
