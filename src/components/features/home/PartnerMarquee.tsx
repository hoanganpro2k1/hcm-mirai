"use client";

import { SectionHeader } from "@/components/ui/section-header";
import { IMAGES } from "@/constants/images";
import { useTranslations } from "next-intl";
import Image from "next/image";

const partners = [
  { name: "University 1", logo: IMAGES.PARTNERS.partner1 },
  { name: "University 2", logo: IMAGES.PARTNERS.partner2 },
  { name: "University 3", logo: IMAGES.PARTNERS.partner3 },
  { name: "University 4", logo: IMAGES.PARTNERS.partner4 },
  { name: "University 5", logo: IMAGES.PARTNERS.partner5 },
  { name: "University 6", logo: IMAGES.PARTNERS.partner6 },
  { name: "University 7", logo: IMAGES.PARTNERS.partner7 },
];

export default function PartnerMarquee() {
  const t = useTranslations("HomePartners");
  // Duplicate partners to create seamless scroll
  const doublePartners = [...partners, ...partners, ...partners];

  return (
    <section className="py-12 md:py-16 bg-white dark:bg-gray-950 overflow-hidden transition-colors border-t border-gray-50 dark:border-gray-900">
      <div className="container mx-auto px-6">
        <SectionHeader
          title={t("title")}
          subtitle={t("subtitle")}
          description={t("description")}
        />

        <div className="relative mt-10">
          {/* Gradient Overlays */}
          <div className="absolute inset-y-0 left-0 w-20 bg-linear-to-r from-white dark:from-gray-950 to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-20 bg-linear-to-l from-white dark:from-gray-950 to-transparent z-10" />

          {/* Scrolling Content */}
          <div className="flex w-fit animate-marquee">
            {doublePartners.map((partner, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center min-w-[200px] px-8 h-24 grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={partner.logo}
                    alt={t("partner_name", {
                      number: (idx % partners.length) + 1,
                    })}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
