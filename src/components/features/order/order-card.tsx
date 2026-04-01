"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { JobOrder } from "@/types/order.type";
import { Calendar, DollarSign, Info, MapPin, User } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface OrderCardProps {
  order: JobOrder;
}

export function OrderCard({ order }: OrderCardProps) {
  const t = useTranslations("Orders");

  return (
    <Card className="group flex flex-col h-full bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 pt-0 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500">
      {/* Header with Image */}
      <CardHeader className="p-0 relative h-64 overflow-hidden">
        <Image
          src={order.image}
          alt={order.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </CardHeader>

      <CardContent className="flex-1 p-6 space-y-4">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight line-clamp-2 min-h-[56px] group-hover:text-primary transition-colors">
          {order.title}
        </h3>

        {/* Info Grid */}
        <div className="grid grid-cols-1 gap-3 pt-2 text-sm">
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
                {order.salary}
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
                {order.date}
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
                {order.location}
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
                {order.age}
              </p>
            </div>
          </div>
        </div>

        {/* Note Section */}
        <div className="pt-4 border-t border-gray-50 dark:border-gray-800">
          <div className="flex items-start gap-2 text-[13px] text-gray-600 dark:text-gray-400 italic">
            <Info className="w-4 h-4 mt-0.5 shrink-0" />
            <p className="line-clamp-3">{order.description}</p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="px-6 py-3 flex justify-end">
        <Button
          variant="outline"
          className="rounded-full border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all text-xs font-bold px-6"
        >
          {t("labels.details")}
        </Button>
      </CardFooter>
    </Card>
  );
}
