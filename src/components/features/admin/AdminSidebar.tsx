"use client";

import { AdminNav } from "./AdminNav";
import { AdminUserSection } from "./AdminUserSection";

export function AdminSidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-64 border-r bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 h-screen sticky top-0">
      <div className="flex h-16 items-center border-b px-6 border-slate-200 dark:border-slate-800">
        <span className="text-lg font-bold tracking-tight text-primary">
          Mirai System
        </span>
      </div>

      <AdminNav />
      <AdminUserSection />
    </aside>
  );
}
