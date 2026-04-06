"use client";

import { SectionHeader } from "@/components/ui/section-header";
import { Quote, Star } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Phạm Thu Thảo",
    role: "Sinh viên Đại học Yonsei",
    image: "https://picsum.photos/600/800?student1",
    feedback:
      "Em cảm ơn HCM-MIRAI rất nhiều vì đã đồng hành cùng em trong suốt quá trình làm hồ sơ. Nhờ sự tư vấn tận tình và sát sao của các anh chị, em đã đạt được visa và đang có những trải nghiệm tuyệt vời tại Hàn Quốc.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const testimonial = testimonials[0];

  return (
    <section className="py-20 bg-white dark:bg-gray-950 transition-colors relative overflow-hidden">
      {/* Decorative Ornaments */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl z-0" />
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl z-0" />

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeader
          title="Học viên cảm nhận về HCM-MIRAI"
          subtitle="Câu chuyện thành công"
        />

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          {/* Student Image */}
          <div className="w-full md:w-1/2 lg:w-[45%] relative">
            <div className="aspect-3/4 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800 z-10 relative">
              <Image
                src={testimonial.image}
                alt={testimonial.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            {/* Design Elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary rounded-3xl -z-10 rotate-12" />
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-accent rounded-full -z-10" />
          </div>

          {/* Testimonial Content */}
          <div className="w-full md:w-1/2 flex flex-col space-y-6">
            <div className="flex gap-1">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-accent text-accent" />
              ))}
            </div>

            <div className="relative">
              <Quote className="w-16 h-16 text-primary/10 absolute -top-8 -left-8" />
              <p className="text-xl md:text-2xl font-medium text-gray-800 dark:text-gray-200 leading-relaxed italic relative z-10">
                &ldquo;{testimonial.feedback}&rdquo;
              </p>
            </div>

            <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
              <h4 className="text-2xl font-bold text-primary dark:text-blue-400">
                {testimonial.name}
              </h4>
              <p className="text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-widest text-sm mt-1">
                {testimonial.role}
              </p>
            </div>

            {/* Slider Controls (Placeholders) */}
            <div className="flex gap-4 mt-8">
              <button className="w-12 h-12 rounded-full border-2 border-gray-200 dark:border-gray-800 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all">
                &larr;
              </button>
              <button className="w-12 h-12 rounded-full border-2 border-primary bg-primary text-white flex items-center justify-center hover:bg-accent hover:border-accent transition-all">
                &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
