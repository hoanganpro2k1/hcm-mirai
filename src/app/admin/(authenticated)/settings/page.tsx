import { SettingsForm } from "@/components/features/admin/settings/SettingsForm";

export default function AdminSettingsPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Cài đặt hệ thống</h1>
        <p className="text-slate-500">Quản lý các cấu hình chung của website.</p>
      </div>

      <SettingsForm />
    </div>
  );
}
