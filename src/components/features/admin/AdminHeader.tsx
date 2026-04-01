"use client";

import { useState } from "react";
import { useAdminDashboard } from "./hooks/useAdminDashboard";
import { LogOut, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { AdminNav } from "./AdminNav";
import { AdminUserSection } from "./AdminUserSection";

export function AdminHeader() {
  const { handleLogout, isLoggingOut } = useAdminDashboard();
  const [open, setOpen] = useState(false);

  return (
    <header className="lg:hidden flex h-16 items-center justify-between border-b bg-white dark:bg-slate-900 px-4 sticky top-0 z-40">
      <div className="flex items-center gap-2">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            }
          />
          <SheetContent side="left" className="p-0 flex flex-col w-72">
            <SheetHeader className="h-16 flex items-center border-b px-6 text-left shrink-0">
              <SheetTitle className="text-lg font-bold text-primary">
                Mirai System
              </SheetTitle>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto">
              <AdminNav onItemClick={() => setOpen(false)} />
            </div>
            <AdminUserSection />
          </SheetContent>
        </Sheet>
        <span className="font-bold text-lg text-primary">Mirai Admin</span>
      </div>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleLogout}
        disabled={isLoggingOut}
      >
        <LogOut className="h-4 w-4 mr-2" />
        {isLoggingOut ? "..." : "Thoát"}
      </Button>
    </header>
  );
}
