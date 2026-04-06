"use client";

import { Link } from "@/i18n/routing";
import { cn, getPageNumbers } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface SearchPaginationProps {
  currentPage: number;
  totalPages: number;
  searchQuery: string;
  onPageChange?: (page: number) => void;
}

export const SearchPagination = ({
  currentPage,
  totalPages,
  searchQuery,
  onPageChange,
}: SearchPaginationProps) => {
  if (totalPages <= 1) return null;

  const pageNumbers = getPageNumbers(currentPage, totalPages);

  const getPageHref = (page: number) => {
    return `?s=${encodeURIComponent(searchQuery)}&page=${page}`;
  };

  const handlePageClick = (page: number) => {
    if (onPageChange) {
      onPageChange(page);
    }
  };

  return (
    <div className="mt-12 flex justify-center gap-2">
      <Link
        href={currentPage > 1 ? getPageHref(currentPage - 1) : "#"}
        onClick={() => currentPage > 1 && handlePageClick(currentPage - 1)}
        className={cn(
          "flex size-8 items-center justify-center rounded-full border border-gray-100 bg-white font-bold text-[#373737] shadow-sm transition-all",
          currentPage === 1
            ? "cursor-not-allowed opacity-50 pointer-events-none"
            : "hover:bg-primary hover:text-white",
        )}
      >
        <ArrowLeft className="size-4" />
      </Link>

      <div className="flex gap-1">
        {pageNumbers.map((page, index) =>
          typeof page === "number" ? (
            <Link
              key={page}
              href={getPageHref(page)}
              onClick={() => handlePageClick(page)}
              className={cn(
                "flex size-8 items-center justify-center rounded-full text-sm font-bold transition-all",
                currentPage === page
                  ? "bg-primary text-white shadow-md"
                  : "text-[#373737] opacity-50 hover:bg-gray-100 hover:opacity-100",
              )}
            >
              {page}
            </Link>
          ) : (
            <span
              key={`ellipsis-${index}`}
              className="flex size-8 items-center justify-center text-sm font-bold text-[#373737] opacity-50"
            >
              {page}
            </span>
          ),
        )}
      </div>

      <Link
        href={currentPage < totalPages ? getPageHref(currentPage + 1) : "#"}
        onClick={() => currentPage < totalPages && handlePageClick(currentPage + 1)}
        className={cn(
          "flex size-8 items-center justify-center rounded-full border border-gray-100 bg-white font-bold text-[#373737] shadow-sm transition-all",
          currentPage === totalPages
            ? "cursor-not-allowed opacity-50 pointer-events-none"
            : "hover:bg-primary hover:text-white",
        )}
      >
        <ArrowRight className="size-4" />
      </Link>
    </div>
  );
};
