"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAdminDashboard } from "./hooks/useAdminDashboard";

interface AdminNavProps {
  onItemClick?: () => void;
}

export function AdminNav({ onItemClick }: AdminNavProps) {
  const { navItems, isActive } = useAdminDashboard();

  return (
    <nav className="flex-1 space-y-2 p-4">
      {navItems.map((item, index) => {
        const Icon = item.icon;
        const active = isActive(item.href);
        return (
          <Link key={index} href={item.href} onClick={onItemClick}>
            <Button
              variant={active ? "secondary" : "ghost"}
              className={`w-full justify-start mb-1 ${
                active ? "font-semibold text-primary" : "text-slate-500"
              }`}
            >
              <Icon className="mr-3 h-4 w-4" />
              {item.label}
            </Button>
          </Link>
        );
      })}
    </nav>
  );
}
