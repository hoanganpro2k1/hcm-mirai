import SearchCard from "@/components/features/search/SearchCard";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { orderService } from "@/services/order.service";
import { ArrowLeft, ArrowRight, Search } from "lucide-react";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ s?: string; page?: string }>;
}) {
  const { s = "" } = await searchParams;
  const { page = "1" } = await searchParams;
  const currentPage = parseInt(page) || 1;
  const limit = 10;

  const results = await orderService.searchOrders({
    s,
    page: currentPage,
    limit,
  });

  const totalPages = results?.totalPages || 0;

  // Basic pagination numbers logic
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) pages.push(i);

      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  const CATEGORIES = [
    { id: "all", label: "Tất cả", count: results?.total || 0 },
    { id: "order", label: "Đơn hàng", count: results?.total || 0 },
  ];

  return (
    <main className="h-auto bg-[#F7FAFC]">
      <div className="container mx-auto pb-8 px-4">
        {/* Search Header */}
        <div className="sticky top-[108px] z-40 mb-2 flex items-center gap-3 border-b border-gray-200 bg-[#F7FAFC] py-6">
          <Search className="size-6 text-[#373737]" />
          <h1 className="text-xl font-semibold uppercase leading-none tracking-wide text-[#373737] md:text-2xl">
            KẾT QUẢ TÌM KIẾM:{" "}
            {s && (
              <span className="italic text-[#373737]">&quot;{s}&quot;</span>
            )}
          </h1>
        </div>

        <div className="flex flex-col gap-0 lg:flex-row">
          {/* Sidebar Filters */}
          <aside className="w-full shrink-0 lg:w-64 lg:border-r lg:border-gray-300 lg:pr-8">
            <div className="h-fit lg:sticky lg:top-[200px]">
              <nav className="flex flex-col">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    className={cn(
                      "group flex w-full items-center gap-3 border-b border-gray-50 py-4 text-left transition-all duration-200 last:border-0",
                      cat.id === "order"
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
                        cat.id === "order"
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

          {/* Results List */}
          <div className="flex-1 pt-6 lg:pl-12 lg:pt-0">
            <div className="flex flex-col gap-6">
              {results && results.data.length > 0 ? (
                results.data.map((order, index) => (
                  <SearchCard
                    key={order.id || index}
                    type="order"
                    variant="list"
                    title={order.title ?? ""}
                    description={order.description ?? ""}
                    image={order.coverImage ?? ""}
                    href={`/don-hang/${order.id}`}
                    date={
                      order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString("vi-VN")
                        : undefined
                    }
                    author={order.createdBy?.username || "HCM-Mirai"}
                  />
                ))
              ) : (
                <div className="rounded-3xl border border-dashed border-gray-200 bg-white p-20 text-center shadow-sm">
                  <Search className="mx-auto size-16 text-gray-200 mb-4" />
                  <p className="text-lg text-gray-500">
                    Không tìm thấy kết quả phù hợp cho{" "}
                    <span className="font-bold text-[#373737]">
                      &quot;{s}&quot;
                    </span>
                  </p>
                  <Link
                    href="/"
                    className="mt-6 inline-block font-bold text-primary hover:underline"
                  >
                    Quay lại trang chủ
                  </Link>
                </div>
              )}
            </div>

            {/* Pagination */}
            {results && results.data.length > 0 && totalPages > 1 && (
              <div className="mt-12 flex justify-center gap-2">
                <Link
                  href={
                    currentPage > 1
                      ? `?s=${encodeURIComponent(s)}&page=${currentPage - 1}`
                      : "#"
                  }
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
                        href={`?s=${encodeURIComponent(s)}&page=${page}`}
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
                  href={
                    currentPage < totalPages
                      ? `?s=${encodeURIComponent(s)}&page=${currentPage + 1}`
                      : "#"
                  }
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
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
