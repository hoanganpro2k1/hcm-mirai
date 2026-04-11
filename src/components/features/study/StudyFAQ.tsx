"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import { useTranslations } from "next-intl";

export default function StudyFAQ() {
  const t = useTranslations("StudyAbroad.faq");

  const faqs = [
    { id: "f1" },
    { id: "f2" },
    { id: "f3" },
    { id: "f4" },
  ];

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="lg:w-1/3">
            <div className="sticky top-24">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <HelpCircle className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white uppercase leading-tight tracking-tighter mb-6">
                {t("title")}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 italic font-medium">
                Chúng tôi giải đáp mọi thắc mắc của bạn về hành trình vươn ra biển lớn. Nếu bạn không tìm thấy câu trả lời, hãy nhắn tin ngay cho tư vấn viên.
              </p>
            </div>
          </div>

          <div className="lg:w-2/3 w-full">
            <Accordion
              className="w-full space-y-4"
            >
              {faqs.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 px-6 py-2 shadow-sm"
                >
                  <AccordionTrigger className="text-left font-bold text-lg hover:no-underline hover:text-primary transition-colors">
                    {t(`items.${faq.id}.q`)}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-400 leading-relaxed text-base pt-2">
                    {t(`items.${faq.id}.a`)}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
