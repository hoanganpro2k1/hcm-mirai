import { IMAGES } from "@/constants/images";
import { CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function WhyChooseUsBanner() {
  const t = useTranslations("Services.whyChooseUs");

  const reasons = [
    {
      id: 1,
      title: t("reason1.title"),
      description: t("reason1.desc"),
    },
    {
      id: 2,
      title: t("reason2.title"),
      description: t("reason2.desc"),
    },
    {
      id: 3,
      title: t("reason3.title"),
      description: t("reason3.desc"),
    },
    {
      id: 4,
      title: t("reason4.title"),
      description: t("reason4.desc"),
    },
  ];

  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100">
          <div className="w-full lg:w-1/2 p-10 lg:p-16">
            <div className="inline-flex items-center space-x-2 text-primary font-bold text-xs tracking-wider uppercase mb-4">
              <span>{t("label")}</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-8 leading-tight">
              {t("title")}
            </h2>

            <div className="space-y-6">
              {reasons.map((reason) => (
                <div key={reason.id} className="flex gap-4">
                  <div className="shrink-0 mt-1">
                    <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-1">
                      {reason.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full lg:w-1/2 relative h-[400px] lg:h-auto self-stretch">
            <Image
              src={IMAGES.SERVICES.WHY_CHOOSE_US.whyChooseUs}
              alt="Why Choose Us"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
