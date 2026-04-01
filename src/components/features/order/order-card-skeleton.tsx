import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function OrderCardSkeleton() {
  return (
    <Card className="flex flex-col h-full bg-white pt-0 dark:bg-gray-900 border-gray-100 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm">
      {/* Header with Image Skeleton */}
      <CardHeader className="p-0 relative h-64 overflow-hidden">
        <Skeleton className="h-64 w-full rounded-none" />
      </CardHeader>

      <CardContent className="flex-1 p-6 space-y-4">
        {/* Title Skeleton */}
        <div className="space-y-2 mb-4">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-4/5" />
        </div>

        {/* Info Grid Skeleton */}
        <div className="grid grid-cols-1 gap-4 pt-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-start gap-3">
              <Skeleton className="h-8 w-8 rounded-lg shrink-0" />
              <div className="space-y-2 w-full">
                <Skeleton className="h-2 w-16" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ))}
        </div>

        {/* Note Section Skeleton */}
        <div className="pt-4 border-t border-gray-50 dark:border-gray-800 space-y-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-2/3" />
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0 flex justify-end">
        <Skeleton className="h-8 w-24 rounded-full" />
      </CardFooter>
    </Card>
  );
}
