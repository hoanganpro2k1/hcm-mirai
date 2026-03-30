import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  title: "Admin Panel | HCM Mirai",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {children}
      {/* Component thông báo toàn cục */}
      <Toaster position="top-right" richColors />
    </div>
  );
}
