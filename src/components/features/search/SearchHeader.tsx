"use client";

import { useTranslations } from "next-intl";
import { Search } from "lucide-react";

interface SearchHeaderProps {
  query: string;
}

export const SearchHeader = ({ query }: SearchHeaderProps) => {
  const t = useTranslations("Search");

  return (
    <div className="sticky top-[108px] z-40 mb-2 flex items-center gap-3 border-b border-gray-200 bg-[#F7FAFC] py-6">
      <Search className="size-6 text-[#373737]" />
      <h1 className="text-xl font-semibold uppercase leading-none tracking-wide text-[#373737] md:text-2xl">
        {t("title")}:{" "}
        {query && (
          <span className="italic text-[#373737]">&quot;{query}&quot;</span>
        )}
      </h1>
    </div>
  );
};
