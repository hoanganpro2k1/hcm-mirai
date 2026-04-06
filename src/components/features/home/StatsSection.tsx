"use client";

import { Calendar, GraduationCap, School, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

function CountUp({ value }: { value: string }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);

  // Tách số và phần hậu tố (ví dụ: "5000+" -> { target: 5000, suffix: "+" })
  const match = value.match(/(\d+)(.*)/);
  const target = match ? parseInt(match[1]) : 0;
  const suffix = match ? match[2] : "";

  useEffect(() => {
    let frameId: number;
    let startTime: number;
    const duration = 2000; // Chạy trong 2 giây

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Công thức easing: easeOutExpo giúp số chạy chậm lại khi gần đến đích
      const easeOutExpo = (x: number) =>
        x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
      setCount(Math.floor(easeOutExpo(progress) * target));

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          frameId = requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (observer) observer.disconnect();
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [target]);

  return (
    <span ref={elementRef}>
      {count.toLocaleString("vi-VN")}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const t = useTranslations("Stats");

  const statsList = [
    {
      icon: Users,
      value: "5000+",
      label: t("students"),
    },
    {
      icon: School,
      value: "200+",
      label: t("schools"),
    },
    {
      icon: GraduationCap,
      value: "90%",
      label: t("visa"),
    },
    {
      icon: Calendar,
      value: `20 ${t("years")}`,
      label: t("experience"),
    },
  ];

  return (
    <section className="bg-primary py-12 md:py-16 text-white overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {statsList.map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center space-y-3 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-2 group-hover:bg-accent transition-all duration-300 transform group-hover:rotate-6">
                <stat.icon className="w-7 h-7 text-white" />
              </div>
              <div className="space-y-1">
                <h3 className="text-3xl md:text-4xl font-bold text-white group-hover:text-accent transition-colors">
                  <CountUp value={stat.value} />
                </h3>
                <p className="text-blue-100/80 font-medium uppercase tracking-wider text-xs md:text-sm">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
