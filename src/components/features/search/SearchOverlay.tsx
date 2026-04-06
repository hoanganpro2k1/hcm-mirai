"use client";

import SearchCard from "@/components/features/search/SearchCard";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearch } from "@/hooks/use-search";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { ChevronRight, Loader2, SearchIcon, X } from "lucide-react";
import React, { useEffect, useState } from "react";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchOverlay = ({ isOpen, onClose }: SearchOverlayProps) => {
  const [isAnimate, setIsAnimate] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // Đồng bộ state trong render để tránh warning cascading renders
  if (isOpen && isClosing) {
    setIsClosing(false);
  }
  if (!isOpen && isAnimate && !isClosing) {
    setIsAnimate(false);
    setIsClosing(true);
  }

  // Derive shouldRender: render nếu đang mở HOẶC đang trong quá trình đóng
  const shouldRender = isOpen || isClosing;

  const {
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
    results,
    isLoading,
    inputRef,
  } = useSearch(isOpen);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setIsAnimate(true), 10);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => setIsClosing(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  const FILTERS = [
    { id: "all", label: "Tất cả", count: results?.total || 0 },
    { id: "order", label: "Đơn hàng", count: results?.total || 0 },
  ];

  if (!shouldRender) return null;

  return (
    <div
      onClick={onClose}
      className={cn(
        "fixed left-0 top-[69px] z-98 flex h-screen w-screen flex-col bg-black/20 backdrop-blur-md transition-all duration-300 dark:bg-black/80",
        isAnimate ? "opacity-100" : "opacity-0 pointer-events-none",
      )}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "h-[70vh] w-full bg-white transition-all duration-300 lg:border-t lg:border-b-gray-primary dark:lg:border-t-gray-500/90",
          isAnimate ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0",
        )}
      >
        <div className="container mx-auto flex max-w-7xl h-full md:h-auto flex-1 flex-col px-4 py-6 xl:px-0">
          <div className="flex items-center justify-between gap-4 pb-2 md:pb-4">
            <InputGroup className="relative h-14 border-none! px-4 shadow-none! ring-0!">
              <SearchIcon className="size-7 text-gray-400" />
              <InputGroupInput
                ref={inputRef}
                value={searchQuery}
                onKeyDown={handleKeyDown}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchQuery(e.target.value)
                }
                className="text-lg! font-medium! text-[#373737] outline-none! placeholder:text-gray-300!"
                placeholder="Tìm kiếm đơn hàng trên HCM-Mirai"
              />
              <div className="flex items-center gap-2 pr-2">
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="transition-colors hover:text-gray-600"
                  >
                    <X className="size-5 text-gray-400" />
                  </button>
                )}
              </div>
            </InputGroup>
          </div>

          <div className="h-px w-full bg-gray-100" />

          {isLoading ? (
            <div className="my-auto flex h-full items-center justify-center py-10">
              <Loader2 className="size-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="flex h-full flex-col overflow-hidden">
              {/* Filters */}
              <div className="flex items-center gap-4 py-4">
                <span className="text-sm font-normal tracking-wider text-gray-400">
                  Lọc kết quả
                </span>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {FILTERS.map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setActiveFilter(filter.id)}
                      className={cn(
                        "flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all",
                        activeFilter === filter.id
                          ? "bg-primary/5 border-primary text-primary"
                          : "border-gray-100 bg-gray-50 text-gray-600 hover:bg-gray-100",
                      )}
                    >
                      {filter.label}
                      <span
                        className={cn(
                          "rounded-full px-1.5 py-0.5 text-[10px]",
                          activeFilter === filter.id
                            ? "bg-primary text-white"
                            : "bg-gray-200 text-gray-500",
                        )}
                      >
                        {filter.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex-1 overflow-y-auto pr-2 pb-10 custom-scrollbar overscroll-contain">
                <div className="grid grid-cols-1">
                  <div className="flex flex-col gap-12">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                        <h2 className="text-sm font-normal tracking-wider text-gray-400">
                          Đơn hàng
                        </h2>
                      </div>
                      {isLoading ? (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
                          {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="flex flex-col gap-3">
                              <Skeleton className="aspect-video w-full rounded-xl" />
                              <Skeleton className="h-4 w-3/4 rounded-lg" />
                              <Skeleton className="h-4 w-1/2 rounded-lg" />
                            </div>
                          ))}
                        </div>
                      ) : results && results.data.length > 0 ? (
                        <>
                          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
                            {results.data.map((order, index) => (
                              <SearchCard
                                key={order.id || index}
                                type="order"
                                title={order.title ?? ""}
                                image={order.coverImage ?? ""}
                                description={`${order.salary || "Lương thỏa thuận"} - ${order.location || "Toàn quốc"}`}
                                href={`/don-hang/${order.id}`}
                              />
                            ))}
                          </div>
                          <Link
                            href={`/tim-kiem?s=${encodeURIComponent(searchQuery)}`}
                            className="text-back group mt-2 flex items-center text-xs font-semibold text-gray-500 hover:text-primary"
                            onClick={() => onClose()}
                          >
                            Xem thêm {results.total} kết quả{" "}
                            <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </Link>
                        </>
                      ) : searchQuery ? (
                        <div className="py-10 text-center text-gray-400">
                          Không tìm thấy đơn hàng nào phù hợp
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Bottom Area - Close on hover */}
      <div className="w-full flex-1" onMouseEnter={onClose} />
    </div>
  );
};

export default SearchOverlay;
