import { BookOpen } from "lucide-react";

export default function Home() {
  return (
    <div className="w-full relative min-h-[500px] md:min-h-[600px] lg:min-h-[700px] bg-gray-100 overflow-hidden font-sans">
      {/* Background Image (Right side mostly visible) */}
      <div className="absolute inset-0 w-full h-full z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1541339907198-e08756ded88f?q=80&w=2070&auto=format&fit=crop"
          alt="Campus Building"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Blue Slanted Overlay */}
      <div 
        className="absolute top-0 left-0 bottom-0 w-full md:w-[75%] lg:w-[60%] z-10 bg-[#2b4c9b]/95 md:bg-[#1f3775] text-white flex flex-col justify-center"
        style={{ 
          clipPath: "polygon(0 0, 100% 0, 65% 100%, 0 100%)" 
        }}
      >
        <div className="pl-6 md:pl-12 lg:pl-20 pr-12 md:pr-40 h-full flex flex-col justify-center relative">
          
          {/* Small Logo Badge Top Left (absolute within the content container or relative) */}
          <div className="absolute top-8 left-6 md:left-12 lg:left-20 bg-white text-black p-2 rounded-full w-16 h-16 flex flex-col items-center justify-center shadow-lg">
            <BookOpen className="w-6 h-6 text-[#1c2559]" />
            <span className="text-[8px] font-bold text-red-600 mt-1 uppercase text-center leading-none">
              K-EDU
            </span>
          </div>

          <div className="mt-16 md:mt-24 space-y-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold italic uppercase leading-[1.1] tracking-wide text-white drop-shadow-lg">
              Tưng bừng
              <br />
              Khai trương
            </h1>

            <div className="text-lg md:text-xl lg:text-2xl font-light tracking-wider space-y-1 mt-8 opacity-90 border-l-4 border-white pl-4">
              <p className="uppercase font-semibold">Trung tâm luyện thi TOPIK</p>
              <p className="uppercase">Phú Cát, Quốc Oai, Hà Nội</p>
              <p className="mt-2 font-medium">15-07-2025</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
