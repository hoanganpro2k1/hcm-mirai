"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CATEGORY_OPTIONS,
  COUNTRY_OPTIONS,
  GENDER_OPTIONS,
} from "@/constants/order.constant";
import { OrderFilterParams } from "@/types/order.type";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";

interface OrderFilterProps {
  filters: OrderFilterParams;
  onFilterChange: (key: keyof OrderFilterParams, value: string | null) => void;
  onSearch: () => void;
}

const FilterSelect = ({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string | null;
  options: { value: string; label: string }[];
  onChange: (val: string | null) => void;
}) => (
  <div className="flex-1 min-w-[140px]">
    <Select
      value={value || "all"}
      onValueChange={(val) => onChange(val)}
      items={options}
    >
      <SelectTrigger className="w-full h-auto p-0 pb-2 bg-transparent border-0 border-b border-gray-200 dark:border-gray-800 rounded-none shadow-none focus:ring-0 focus:border-primary transition-colors text-sm font-medium text-gray-700 dark:text-gray-300">
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

export function OrderFilter({
  filters,
  onFilterChange,
  onSearch,
}: OrderFilterProps) {
  const t = useTranslations("Filters");

  const countryOptions = [
    { value: "all", label: t("country") || "Quốc gia" },
    ...COUNTRY_OPTIONS,
  ];

  const categoryOptions = [
    { value: "all", label: t("category") || "Ngành nghề" },
    ...CATEGORY_OPTIONS,
  ];

  const genderOptions = [
    { value: "all", label: t("gender") || "Giới tính" },
    ...GENDER_OPTIONS.filter((opt) => opt.value !== "both"), // Search usually filters by Nam/Nữ
  ];

  return (
    <div className="bg-white dark:bg-gray-950 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-900 mb-10">
      <div className="flex flex-wrap items-end gap-8">
        <FilterSelect
          label={t("country")}
          value={filters.country || null}
          options={countryOptions}
          onChange={(val) => onFilterChange("country", val)}
        />
        <FilterSelect
          label={t("category")}
          value={filters.category || null}
          options={categoryOptions}
          onChange={(val) => onFilterChange("category", val)}
        />
        <FilterSelect
          label={t("gender")}
          value={filters.gender || null}
          options={genderOptions}
          onChange={(val) => onFilterChange("gender", val)}
        />
        <Button
          onClick={onSearch}
          className="bg-[#22c55e] hover:bg-[#16a34a] text-white rounded-lg px-8 h-12 flex items-center gap-2 font-bold transition-all shadow-lg shadow-green-200 dark:shadow-none ml-auto"
        >
          <Search className="w-5 h-5" />
          {t("search")}
        </Button>
      </div>
    </div>
  );
}
