"use client";

import { Pagination } from "@/components/ui/pagination";
import { useRouter, usePathname } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";

interface PaginationWrapperProps {
  currentPage: number;
  totalPages: number;
}

export function PaginationWrapper({ currentPage, totalPages }: PaginationWrapperProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
  );
}
