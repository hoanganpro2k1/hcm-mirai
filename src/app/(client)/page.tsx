import HeroBanner from "@/features/home/HeroBanner";

export default function Home() {
  return (
    <div className="w-full relative min-h-[500px] md:min-h-[600px] lg:min-h-[700px] bg-gray-100 overflow-hidden font-sans">
      <HeroBanner />
      <div className="text-center text-2xl font-bold text-red-600 py-10">
        Chắp cánh ước mơ du học quốc tế cùng HCM-MIRAI
      </div>
    </div>
  );
}
