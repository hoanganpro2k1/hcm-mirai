"use client";

import Image from "next/image";
import { SectionHeader } from "@/components/ui/section-header";

const partners = [
  { name: "University 1", logo: "https://picsum.photos/200/100?logo1" },
  { name: "University 2", logo: "https://picsum.photos/200/100?logo2" },
  { name: "University 3", logo: "https://picsum.photos/200/100?logo3" },
  { name: "University 4", logo: "https://picsum.photos/200/100?logo4" },
  { name: "University 5", logo: "https://picsum.photos/200/100?logo5" },
  { name: "University 6", logo: "https://picsum.photos/200/100?logo6" },
];

export default function PartnerMarquee() {
  // Duplicate partners to create seamless scroll
  const doublePartners = [...partners, ...partners, ...partners];

  return (
    <section className="py-16 bg-white dark:bg-gray-950 overflow-hidden transition-colors border-t border-gray-50 dark:border-gray-900">
      <div className="container mx-auto px-6">
        <SectionHeader
          title="Đối tác chiến lược"
          subtitle="Hợp tác vươn xa"
          description="Chúng tôi tự hào là đối tác của hơn 200 trường đại học và tổ chức giáo dục uy tín trên toàn thế giới."
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
                    alt={partner.name}
                    fill
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
