export const USER_STATUS_OPTIONS = [
  { value: "active", label: "Hoạt động" },
  { value: "inactive", label: "Bị khóa" },
] as const;

export type UserStatusValue = typeof USER_STATUS_OPTIONS[number]["value"];
