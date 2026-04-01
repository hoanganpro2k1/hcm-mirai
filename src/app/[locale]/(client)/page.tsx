import BlogSection from "@/components/features/home/BlogSection";
import ConsultationForm from "@/components/features/home/ConsultationForm";
import GallerySection from "@/components/features/home/GallerySection";
import HeroBanner from "@/components/features/home/HeroBanner";
import Introduction from "@/components/features/home/Introduction";
import PartnerMarquee from "@/components/features/home/PartnerMarquee";
import ProgramSection from "@/components/features/home/ProgramSection";
import SchoolHighlights from "@/components/features/home/SchoolHighlights";
import StatsSection from "@/components/features/home/StatsSection";
import TestimonialsSection from "@/components/features/home/TestimonialsSection";

export default function Home() {
  return (
    <main className="w-full relative bg-background overflow-hidden font-sans">
      <HeroBanner />
      <div className="relative z-10 bg-white dark:bg-gray-950">
        <Introduction />
        <StatsSection />
        <ProgramSection />
        <ConsultationForm />
        <PartnerMarquee />
        <SchoolHighlights />
        <TestimonialsSection />
        <GallerySection />
        <BlogSection />
      </div>
    </main>
  );
}
