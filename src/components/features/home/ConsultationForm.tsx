"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { SectionHeader } from "@/components/ui/section-header";

export default function ConsultationForm() {
  return (
    <section className="py-20 bg-blue-50/50 dark:bg-gray-900 overflow-hidden relative transition-colors">
      <div className="container mx-auto px-6">
        <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700 flex flex-col lg:flex-row relative z-10">
          
          {/* Left: Form Content */}
          <div className="flex-1 p-8 md:p-12 lg:p-16">
            <SectionHeader
              title="Tư vấn miễn phí - Dành riêng cho bạn!"
              subtitle="Liên hệ ngay"
              align="left"
            />
            
            <form className="mt-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullname">Họ và tên</Label>
                  <Input id="fullname" placeholder="Nguyễn Văn A" className="rounded-xl h-12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <Input id="phone" placeholder="0987 654 321" className="rounded-xl h-12" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="email@example.com" className="rounded-xl h-12" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Bạn đang quan tâm đến chương trình nào?</Label>
                <textarea
                  id="message"
                  className="w-full min-h-[120px] rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:focus-visible:ring-primary/50"
                  placeholder="Hãy cho chúng tôi biết nhu cầu của bạn..."
                />
              </div>

              <Button className="w-full h-14 rounded-xl text-lg font-bold uppercase tracking-wider bg-accent hover:bg-accent/90 shadow-lg shadow-accent/20">
                Gửi yêu cầu tư vấn
              </Button>

              <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                Chúng tôi cam kết bảo mật thông tin khách hàng 100%.
              </p>
            </form>
          </div>

          {/* Right: Illustration Image */}
          <div className="hidden lg:block lg:w-[40%] bg-blue-100 dark:bg-blue-900/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-t from-blue-100/50 dark:from-blue-950/20 to-transparent z-10" />
            <Image
              src="https://picsum.photos/600/900?young-woman" 
              alt="Consultant in Hanbok" 
              fill 
              className="object-cover object-center z-0 scale-110 hover:scale-100 transition-transform duration-1000"
            />
            {/* Overlay Text/Badge */}
            <div className="absolute bottom-10 left-10 right-10 z-20 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
              <p className="text-white font-bold text-lg leading-tight italic">
                &ldquo;Hành trình vạn dặm, luôn bắt đầu từ một bước chân tin cậy.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Ornaments (inspired by design) */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />
    </section>
  );
}
