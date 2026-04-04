"use client";

import { LucideIcon, Hammer } from "lucide-react";
import { cn } from "@/lib/utils";

interface UnderDevelopmentProps {
  title?: string;
  description?: string;
  icon?: LucideIcon;
  className?: string;
}

export function UnderDevelopment({
  title = "Chức năng đang được phát triển...",
  description,
  icon: Icon = Hammer,
  className,
}: UnderDevelopmentProps) {
  return (
    <div
      className={cn(
        "flex min-h-[400px] w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-8 text-center dark:border-slate-800 dark:bg-slate-900/50 animate-in fade-in zoom-in duration-500",
        className
      )}
    >
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary animate-bounce">
        <Icon className="h-8 w-8" />
      </div>
      <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 italic">
        {title}
      </h3>
      {description && (
        <p className="mt-2 max-w-sm text-slate-500 dark:text-slate-400">
          {description}
        </p>
      )}
    </div>
  );
}
