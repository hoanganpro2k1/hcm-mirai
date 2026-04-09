"use client";

import PageBreadcrumbs from "@/components/common/PageBreadcrumbs";
import BlogSection from "@/components/features/home/BlogSection";
import ConsultationForm from "@/components/features/home/ConsultationForm";
import ServiceGrid from "@/components/features/services/ServiceGrid";
import ServicesHero from "@/components/features/services/ServicesHero";
import WhyChooseUsBanner from "@/components/features/services/WhyChooseUsBanner";
import { useTranslations } from "next-intl";

export default function ServicesPage() {
  const tHeader = useTranslations("Header");
  const tServices = useTranslations("Services");

  const breadcrumbItems = [
    { label: tHeader("nav.about_mirai").replace("Về HCM-MIRAI", "Trang chủ"), href: "/" },
    { label: tHeader("nav.services") },
  ];

  const tuVanDuHocItems = [
    {
      id: "d4-1",
      title: tServices("studyAbroad.d41.title"),
      description: tServices("studyAbroad.d41.desc"),
      href: "du-hoc-xkld",
    },
    {
      id: "d2-6",
      title: tServices("studyAbroad.d26.title"),
      description: tServices("studyAbroad.d26.desc"),
      href: "du-hoc-xkld",
    },
    {
      id: "d2",
      title: tServices("studyAbroad.d2.title"),
      description: tServices("studyAbroad.d2.desc"),
      href: "du-hoc-xkld",
    },
    {
      id: "d2-4",
      title: tServices("studyAbroad.d24.title"),
      description: tServices("studyAbroad.d24.desc"),
      href: "du-hoc-xkld",
    },
    {
      id: "phd",
      title: tServices("studyAbroad.phd.title"),
      description: tServices("studyAbroad.phd.desc"),
      href: "du-hoc-xkld",
    },
  ];

  const daoTaoTiengHanItems = [
    {
      id: "teachers",
      title: tServices("languageTraining.teachers.title"),
      description: tServices("languageTraining.teachers.desc"),
    },
    {
      id: "facilities",
      title: tServices("languageTraining.facilities.title"),
      description: tServices("languageTraining.facilities.desc"),
    },
    {
      id: "comm",
      title: tServices("languageTraining.comm.title"),
      description: tServices("languageTraining.comm.desc"),
    },
    {
      id: "mid",
      title: tServices("languageTraining.mid.title"),
      description: tServices("languageTraining.mid.desc"),
    },
    {
      id: "topik",
      title: tServices("languageTraining.topik.title"),
      description: tServices("languageTraining.topik.desc"),
    },
    {
      id: "topik-adv",
      title: tServices("languageTraining.topikAdv.title"),
      description: tServices("languageTraining.topikAdv.desc"),
    },
  ];

  const hoTroHocSinhItems = [
    {
      id: "prep",
      title: tServices("studentSupport.prep.title"),
      description: tServices("studentSupport.prep.desc"),
    },
    {
      id: "dorm",
      title: tServices("studentSupport.dorm.title"),
      description: tServices("studentSupport.dorm.desc"),
    },
    {
      id: "airport",
      title: tServices("studentSupport.airport.title"),
      description: tServices("studentSupport.airport.desc"),
    },
    {
      id: "legal",
      title: tServices("studentSupport.legal.title"),
      description: tServices("studentSupport.legal.desc"),
    },
    {
      id: "job",
      title: tServices("studentSupport.job.title"),
      description: tServices("studentSupport.job.desc"),
    },
    {
      id: "rent",
      title: tServices("studentSupport.rent.title"),
      description: tServices("studentSupport.rent.desc"),
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-4">
        <PageBreadcrumbs items={breadcrumbItems} />
      </div>

      <ServicesHero />

      <ServiceGrid
        accentText="HCM-MIRAI"
        title={tServices("studyAbroad.title")}
        items={tuVanDuHocItems}
        seeMoreText={tServices("common.seeMore")}
      />

      <ServiceGrid
        accentText="HCM-MIRAI"
        title={tServices("languageTraining.title")}
        items={daoTaoTiengHanItems}
        seeMoreText={tServices("common.seeMore")}
      />

      <ServiceGrid
        accentText="HCM-MIRAI"
        title={tServices("studentSupport.title")}
        items={hoTroHocSinhItems}
        seeMoreText={tServices("common.seeMore")}
      />

      <WhyChooseUsBanner />

      <ConsultationForm />

      <BlogSection />
    </main>
  );
}
