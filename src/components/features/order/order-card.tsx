"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { CATEGORY_OPTIONS } from "@/constants/order.constant";
import { Link } from "@/i18n/routing";
import { JobOrder } from "@/types/order.type";
import { format, isValid, parseISO } from "date-fns";
import DOMPurify from "isomorphic-dompurify";
import {
  Briefcase,
  Calendar,
  DollarSign,
  Info,
  MapPin,
  User,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface OrderCardProps {
  order: JobOrder;
}

export function OrderCard({ order }: OrderCardProps) {
  const t = useTranslations("Orders");

  console.log("order", order);

  const categoryLabel =
    CATEGORY_OPTIONS.find((opt) => opt.value === order.category)?.label ||
    order.category ||
    "N/A";

  const dateValue = order.date ? parseISO(order.date) : null;
  const formattedDate =
    dateValue && isValid(dateValue) ? format(dateValue, "dd/MM/yyyy") : "N/A";

  return (
    <Card className="group flex flex-col h-full bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 pt-0 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500">
      {/* Header with Image */}
      <CardHeader className="p-0 relative h-64 overflow-hidden">
        <Image
          src={order.coverImage || "/logo.png"}
          alt={order.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </CardHeader>

      <CardContent className="flex-1 p-6 space-y-4">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight line-clamp-3 h-auto group-hover:text-primary transition-colors">
          {order.title}
        </h3>

        {/* Info Grid */}
        <div className="grid grid-cols-1 gap-3 pt-2 text-sm">
          {/* Category */}
          <div className="flex items-start gap-3">
            <div className="mt-0.5 p-1.5 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 rounded-lg">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-gray-400 block text-[10px] uppercase tracking-wider">
                {t("labels.category") || "Ngành nghề"}
              </span>
              <p className="text-gray-700 dark:text-gray-300 font-medium">
                {categoryLabel}
              </p>
            </div>
          </div>

          {/* Salary */}
          <div className="flex items-start gap-3">
            <div className="mt-0.5 p-1.5 bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400 rounded-lg">
              <DollarSign className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-gray-400 block text-[10px] uppercase tracking-wider">
                {t("labels.salary")}
              </span>
              <p className="text-gray-700 dark:text-gray-300 font-medium">
                {order.salary || "N/A"}
              </p>
            </div>
          </div>

          {/* Date */}
          <div className="flex items-start gap-3">
            <div className="mt-0.5 p-1.5 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 rounded-lg">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-gray-400 block text-[10px] uppercase tracking-wider">
                {t("labels.date")}
              </span>
              <p className="text-gray-700 dark:text-gray-300 font-medium">
                {formattedDate}
              </p>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-start gap-3">
            <div className="mt-0.5 p-1.5 bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400 rounded-lg">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-gray-400 block text-[10px] uppercase tracking-wider">
                {t("labels.location")}
              </span>
              <p className="text-gray-700 dark:text-gray-300 font-medium line-clamp-1">
                {order.location || "N/A"}
              </p>
            </div>
          </div>

          {/* Age */}
          <div className="flex items-start gap-3">
            <div className="mt-0.5 p-1.5 bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 rounded-lg">
              <User className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-gray-400 block text-[10px] uppercase tracking-wider">
                {t("labels.age")}
              </span>
              <p className="text-gray-700 dark:text-gray-300 font-medium leading-tight">
                {order.age || "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* Note Section */}
        <div className="pt-4 border-t border-gray-50 dark:border-gray-800">
          <div className="flex items-start gap-2 text-[13px] text-gray-600 dark:text-gray-400 italic">
            <Info className="w-4 h-4 mt-0.5 shrink-0" />
            <div
              className="line-clamp-3 text-[13px] text-gray-600 dark:text-gray-400 italic"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(order.description || ""),
              }}
            />
          </div>
        </div>
      </CardContent>

      <CardFooter className="px-6 py-3 flex justify-end">
        <Link href={`/don-hang/${order.slug || order.id}`}>
          <Button
            variant="outline"
            className="rounded-full border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all text-xs font-bold px-6"
          >
            {t("labels.details")}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
