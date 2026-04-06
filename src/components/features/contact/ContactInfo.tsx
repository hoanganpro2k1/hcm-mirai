"use client";

import { useTranslations } from "next-intl";
import { Mail, MapPin, Phone } from "lucide-react";

export function ContactInfo() {
  const t = useTranslations("Contact.info");

  const contactItems = [
    {
      icon: MapPin,
      label: t("address"),
      value: t("address_val"),
      color: "bg-blue-100/50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    },
    {
      icon: Phone,
      label: t("phone"),
      value: t("phone_val"),
      color: "bg-orange-100/50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
    },
    {
      icon: Mail,
      label: t("email"),
      value: t("email_val"),
      color: "bg-green-100/50 text-green-600 dark:bg-green-900/30 dark:text-green-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
      {contactItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <div
            key={index}
            className="flex flex-col items-center text-center p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-700 transition-all hover:scale-105 active:scale-95 group"
          >
            <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              <Icon className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {item.label}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 font-medium whitespace-pre-line">
              {item.value}
            </p>
          </div>
        );
      })}
    </div>
  );
}
