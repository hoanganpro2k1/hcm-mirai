import { ContactForm } from "@/components/features/contact/ContactForm";
import { ContactHero } from "@/components/features/contact/ContactHero";
import { ContactInfo } from "@/components/features/contact/ContactInfo";

const MAP_URL =
  "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d581.3002592414904!2d105.6706893!3d18.6920496!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3139cf003f442797%3A0x65ad8d011faa48b9!2zVHJ1bmcgdMOibSBuaOG6rXQgbmfhu68gSENNIE1pcmFp!5e1!3m2!1svi!2s!4v1775444016155!5m2!1svi!2s";

export default function ContactPage() {
  return (
    <main className="w-full bg-white dark:bg-gray-950 font-sans">
      <ContactHero />

      <section className="py-20">
        <div className="container mx-auto px-6">
          <ContactInfo />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: Form */}
            <div className="order-2 lg:order-1">
              <ContactForm />
            </div>

            {/* Right: Map and extra info */}
            <div className="order-1 lg:order-2 h-full min-h-[500px]">
              <div className="bg-gray-100 dark:bg-gray-800 w-full h-full rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-700 relative">
                {/* Google Maps Embed */}
                <iframe
                  src={MAP_URL}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="HCM-MIRAI Location"
                  className="rounded-[2.5rem]"
                ></iframe>

                {/* Floating Map Label */}
                <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md dark:bg-gray-900/90 p-4 rounded-2xl shadow-xl border border-white/20 dark:border-gray-700 z-10 hidden md:block">
                  <p className="text-sm font-bold text-gray-900 dark:text-white leading-tight italic">
                    &ldquo;Chào mừng bạn đến với HCM-MIRAI!&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative background bottom ornament */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] translate-y-1/2 translate-x-1/2 pointer-events-none" />
    </main>
  );
}
