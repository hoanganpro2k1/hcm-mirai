"use client";

import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface SearchSidebarProps {
  resultsCount: number;
  activeFilter: string;
  onFilterChange: (id: string) => void;
}

export const SearchSidebar = ({
  resultsCount,
  activeFilter,
  onFilterChange,
}: SearchSidebarProps) => {
  const t = useTranslations("Search");

  const CATEGORIES = [
    { id: "all", label: t("categories.all"), count: resultsCount },
    { id: "order", label: t("categories.order"), count: resultsCount },
  ];

  return (
    <aside className="w-full shrink-0 lg:w-64 lg:border-r lg:border-gray-300 lg:pr-8">
      <div className="h-fit lg:sticky lg:top-[200px]">
        <nav className="flex flex-col">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onFilterChange(cat.id)}
              className={cn(
                "group flex w-full items-center gap-3 border-b border-gray-50 py-4 text-left transition-all duration-200 last:border-0",
                activeFilter === cat.id
                  ? "font-bold text-primary"
                  : "text-[#373737] hover:text-primary",
              )}
            >
              <span className="whitespace-nowrap text-sm md:text-base">
                {cat.label}
              </span>
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[10px] font-bold transition-colors",
                  activeFilter === cat.id
                    ? "bg-primary text-white"
                    : "group-hover:bg-primary/20 bg-gray-100 text-gray-400 group-hover:text-primary",
                )}
              >
                {cat.count}
              </span>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
};
