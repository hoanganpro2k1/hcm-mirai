import BlogSection from "@/features/home/BlogSection";
import ConsultationForm from "@/features/home/ConsultationForm";
import GallerySection from "@/features/home/GallerySection";
import HeroBanner from "@/features/home/HeroBanner";
import Introduction from "@/features/home/Introduction";
import PartnerMarquee from "@/features/home/PartnerMarquee";
import ProgramSection from "@/features/home/ProgramSection";
import SchoolHighlights from "@/features/home/SchoolHighlights";
import StatsSection from "@/features/home/StatsSection";
import TestimonialsSection from "@/features/home/TestimonialsSection";

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
