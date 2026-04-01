"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  options: string[];
  onChange: (val: string | null) => void;
}) => (
  <div className="flex-1 min-w-[140px]">
    <Select
      value={value || undefined}
      onValueChange={(val) => onChange(val === "all" ? null : val)}
    >
      <SelectTrigger className="w-full h-auto p-0 pb-2 bg-transparent border-0 border-b border-gray-200 dark:border-gray-800 rounded-none shadow-none focus:ring-0 focus:border-primary transition-colors text-sm font-medium text-gray-700 dark:text-gray-300">
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">{label}</SelectItem>
        {options
          .filter((opt) => opt !== "all")
          .map((opt) => (
            <SelectItem key={opt} value={opt}>
              {opt === "male" ? "Nam" : opt === "female" ? "Nữ" : opt}
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

  const filterOptions = {
    country: ["all", "Nhật Bản", "Hàn Quốc", "Đài Loan", "Úc"],
    category: [
      "all",
      "Linh kiện ô tô",
      "Chế biến thực phẩm",
      "Bảo dưỡng ô tô",
      "Công xưởng",
      "Đóng gói",
    ],
    gender: ["all", "male", "female"],
    birthYear: [
      "all",
      ...Array.from({ length: 30 }, (_, i) => (2008 - i).toString()),
    ],
  };

  return (
    <div className="bg-white dark:bg-gray-950 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-900 mb-10">
      <div className="flex flex-wrap items-end gap-8">
        <FilterSelect
          label={t("country")}
          value={filters.country || null}
          options={filterOptions.country}
          onChange={(val) => onFilterChange("country", val)}
        />
        <FilterSelect
          label={t("category")}
          value={filters.category || null}
          options={filterOptions.category}
          onChange={(val) => onFilterChange("category", val)}
        />
        <FilterSelect
          label={t("gender")}
          value={filters.gender || null}
          options={filterOptions.gender}
          onChange={(val) => onFilterChange("gender", val)}
        />
        <FilterSelect
          label={t("birthYear")}
          value={filters.birthYear || null}
          options={filterOptions.birthYear}
          onChange={(val) => onFilterChange("birthYear", val)}
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
