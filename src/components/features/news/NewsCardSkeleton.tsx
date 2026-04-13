"use client";

import { Skeleton } from "@/components/ui/skeleton";

export const NewsCardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col h-full">
      {/* Thumbnail Skeleton */}
      <div className="relative h-60 w-full overflow-hidden">
        <Skeleton className="h-full w-full rounded-none" />
      </div>

      <div className="p-8 flex flex-col flex-1">
        {/* Date & Author Skeleton */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1.5 w-24">
            <Skeleton className="w-3.5 h-3.5 rounded-sm" />
            <Skeleton className="h-3 w-16" />
          </div>
          <div className="flex items-center gap-1.5 w-24">
            <Skeleton className="w-3.5 h-3.5 rounded-full" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>

        {/* Title Skeleton */}
        <div className="space-y-2 mb-4 h-[56px]">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-4/5" />
        </div>

        {/* Summary Skeleton */}
        <div className="space-y-2 mt-4 flex-1">
          <Skeleton className="h-3.5 w-full" />
          <Skeleton className="h-3.5 w-full" />
          <Skeleton className="h-3.5 w-2/3" />
        </div>

        {/* Footer Link Skeleton */}
        <div className="mt-8 pt-6 border-t border-gray-50 dark:border-gray-800">
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
    </div>
  );
};
