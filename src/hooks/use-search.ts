import { orderService } from "@/services/order.service";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "./use-debounce";

interface UseSearchProps {
  initialQuery?: string;
  initialPage?: number;
  limit?: number;
  isOpen?: boolean;
  name?: string; // Add name to identify instance
}

export const useSearch = ({
  initialQuery = "",
  initialPage = 1,
  limit = 10,
  isOpen,
  name = "Search", // Default name
}: UseSearchProps = {}) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [activeFilter, setActiveFilter] = useState("all");
  const [page, setPage] = useState(initialPage);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounce the search query to avoid calling API on every keystroke
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Sync state with initial values (e.g. from URL) during render to avoid cascading renders
  const [prevInitialQuery, setPrevInitialQuery] = useState(initialQuery);
  if (initialQuery !== prevInitialQuery) {
    setPrevInitialQuery(initialQuery);
    setSearchQuery(initialQuery);
  }

  const [prevInitialPage, setPrevInitialPage] = useState(initialPage);
  if (initialPage !== prevInitialPage) {
    setPrevInitialPage(initialPage);
    setPage(initialPage);
  }

  // Sync state during render to avoid cascading renders when overlay opens/closes
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);

  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen === false) {
      setSearchQuery("");
      setPage(1);
    }
  }

  // Focus logic for Overlay
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["search", debouncedSearchQuery, page, limit],
    queryFn: () =>
      orderService.searchOrders({
        s: debouncedSearchQuery,
        page,
        limit,
      }),
    // Chỉ chặn fetch khi công cụ tìm kiếm (Overlay) đang đóng hoàn toàn.
    // Nếu ở trang tìm kiếm (isOpen === undefined) hoặc Overlay đang mở (isOpen === true) thì luôn cho phép fetch.
    enabled: isOpen !== false,
    placeholderData: (previousData) => previousData,
    staleTime: 5000,
  });

  return {
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
    page,
    setPage,
    results: data || null,
    isLoading,
    error,
    inputRef,
  };
};
