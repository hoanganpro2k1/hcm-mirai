import { Link } from "@/i18n/routing";
import { Mail, MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

import { Facebook, Tiktok } from "@/components/ui/icons";

const MAP_URL =
  "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d581.3002592414904!2d105.6706893!3d18.6920496!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3139cf003f442797%3A0x65ad8d011faa48b9!2zVHJ1bmcgdMOibSBuaOG6rXQgbmfhu68gSENNIE1pcmFp!5e1!3m2!1svi!2s!4v1775444016155!5m2!1svi!2s";

export function Footer() {
  const t = useTranslations("Footer");
  const currentYear = new Date().getFullYear();

  const tContact = useTranslations("Contact.info");

  return (
    <footer className="bg-primary text-white pt-16 pb-8 font-sans">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Column 1: Map & Contact Info */}
          <div className="space-y-8">
            <Link href="/" className="inline-block shrink-0 mb-4">
              <Image
                src="/logo.png"
                alt="HCM Mirai Logo"
                width={180}
                height={56}
                className="w-auto h-10 sm:h-12 object-contain"
                priority
              />
            </Link>

            <div className="space-y-6">
              <h3 className="text-base font-bold uppercase relative mb-2 inline-block tracking-normal">
                {t("info.title")}
              </h3>
              <div className="aspect-video w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl ring-1 ring-white/20">
                <iframe
                  src={MAP_URL}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="HCM Mirai Map"
                  className="transition-all duration-500"
                ></iframe>
              </div>

              <div className="flex flex-col gap-y-4 pt-2">
                <Link
                  href="https://maps.app.goo.gl/Emw9oxUejwWgmQJ48"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-3 group hover:bg-white/5 p-2 -m-2 rounded-xl transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-white/10 transition-colors">
                    <MapPin className="w-5 h-5 text-white/80" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-black uppercase tracking-widest text-white/90">
                      {t("info.address")}
                    </p>
                    <p className="text-sm font-medium leading-relaxed">
                      {tContact("address_val")}
                    </p>
                  </div>
                </Link>

                <Link
                  href={`tel:${tContact("phone_val").replace(/\s/g, "")}`}
                  className="flex gap-3 group hover:bg-white/5 p-2 -m-2 rounded-xl transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-white/10 transition-colors">
                    <Phone className="w-5 h-5 text-white/80" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-black uppercase tracking-widest text-white/90">
                      {t("info.phone")}
                    </p>
                    <p className="text-sm font-bold tracking-tight">
                      {tContact("phone_val")}
                    </p>
                  </div>
                </Link>

                <Link
                  href={`mailto:${tContact("email_val")}`}
                  className="flex gap-3 group hover:bg-white/5 p-2 -m-2 rounded-xl transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-white/10 transition-colors">
                    <Mail className="w-5 h-5 text-white/80" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-black uppercase tracking-widest text-white/90">
                      {t("info.email")}
                    </p>
                    <p className="text-sm font-medium">
                      {tContact("email_val")}
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Column 2: Về HCM-Mirai & Kết nối */}
          <div className="space-y-12">
            {/* Về HCM-Mirai */}
            <div>
              <h3 className="text-base font-bold uppercase mb-8 relative inline-block tracking-normal">
                {t("categories.about")}
                <span className="absolute -bottom-2 left-0 w-8 h-1 bg-white/20 rounded-full"></span>
              </h3>
              <ul className="space-y-4">
                {[
                  { label: t("links.about_mirai"), href: "/gioi-thieu" },
                  { label: t("links.services"), href: "/dich-vu" },
                  { label: t("links.gallery"), href: "/thu-vien-hinh-anh" },
                  {
                    label: t("links.testimonials"),
                    href: "/cam-nhan-hoc-vien",
                  },
                ].map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/80 hover:text-white hover:translate-x-1 transition-all flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-white/40 transition-colors"></span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Kết nối */}
            <div>
              <h3 className="text-base font-bold uppercase mb-8 relative inline-block tracking-normal">
                {t("categories.connect")}
                <span className="absolute -bottom-2 left-0 w-8 h-1 bg-white/20 rounded-full"></span>
              </h3>
              <div className="flex gap-4">
                <Link
                  href="#"
                  className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-white/10 hover:-translate-y-1 transition-all border border-white/10 group"
                  title="Facebook"
                >
                  <Facebook className="w-6 h-6 text-white/70 group-hover:text-white" />
                </Link>
                <Link
                  href="#"
                  className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-white/10 hover:-translate-y-1 transition-all border border-white/10 group"
                  title="TikTok"
                >
                  <Tiktok className="w-6 h-6 text-white/70 group-hover:text-white" />
                </Link>
              </div>
            </div>
          </div>

          {/* Column 3: Trung tâm hỗ trợ & Pháp lý */}
          <div className="space-y-12">
            {/* Trung tâm hỗ trợ */}
            <div>
              <h3 className="text-base font-bold uppercase mb-8 relative inline-block tracking-normal">
                {t("categories.support")}
                <span className="absolute -bottom-2 left-0 w-8 h-1 bg-white/20 rounded-full"></span>
              </h3>
              <ul className="space-y-4">
                {[
                  { label: t("links.contact_consult"), href: "/lien-he" },
                  { label: t("links.study_overseas"), href: "/du-hoc-xkld" },
                  {
                    label: t("links.train_language"),
                    href: "/dao-tao-ngoai-ngu",
                  },
                  { label: t("links.news_events"), href: "/tin-tuc" },
                ].map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/80 hover:text-white hover:translate-x-1 transition-all flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-white/40 transition-colors"></span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Thông tin pháp lý */}
            <div>
              <h3 className="text-base font-bold uppercase mb-8 relative inline-block tracking-normal">
                {t("categories.legal")}
                <span className="absolute -bottom-2 left-0 w-8 h-1 bg-white/20 rounded-full"></span>
              </h3>
              <ul className="space-y-4">
                {[
                  {
                    label: t("links.privacy"),
                    href: "/chinh-sach-bao-mat",
                  },
                  { label: t("links.terms"), href: "/dieu-khoan-su-dung" },
                ].map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/80 hover:text-white hover:translate-x-1 transition-all flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-white/40 transition-colors"></span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-white font-black uppercase tracking-[0.3em]">
            {t("copyright", { year: currentYear })}
          </p>
          <div className="flex gap-8">
            <p className="text-xs text-white font-black uppercase tracking-[0.3em]">
              {t("designed_by")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
