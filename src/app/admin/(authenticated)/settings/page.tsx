"use client";

import { UnderDevelopment } from "@/components/ui/under-development";
import { Settings } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <UnderDevelopment
      icon={Settings}
      title="Cài đặt hệ thống"
      description="Các tùy chọn cấu hình hệ thống đang được phát triển."
    />
  );
}
