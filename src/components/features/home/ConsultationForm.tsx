"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SectionHeader } from "@/components/ui/section-header";
import { IMAGES } from "@/constants/images";
import { useConsultationMutations } from "@/hooks/use-consultation-mutations";
import {
  getConsultationSchema,
  type ConsultationFormValues as FormValues,
} from "@/schemas/consultation.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function ConsultationForm() {
  const t = useTranslations("Consultation");
  const tValidation = useTranslations("Validation");
  const { submitConsultation, isSubmitting: isLoading } =
    useConsultationMutations();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(getConsultationSchema(tValidation)),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      note: "",
    },
  });

  async function onSubmit(values: FormValues) {
    try {
      await submitConsultation(values);
      toast.success(
        t("success_message") ||
          "Gửi yêu cầu thành công! Chúng tôi sẽ liên hệ sớm nhất.",
      );
      reset();
    } catch {
      // Error handled by hook
    }
  }

  return (
    <section id="consultation-form" className="py-20 bg-blue-50/50 dark:bg-gray-900 overflow-hidden relative transition-colors">
      <div className="container mx-auto px-6">
        <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700 flex flex-col lg:flex-row relative z-10">
          {/* Left: Form Content */}
          <div className="flex-1 p-8 md:p-12 lg:p-16">
            <SectionHeader
              title={t("title")}
              subtitle={t("subtitle")}
              align="left"
            />

            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullname">
                    {t("name_label")}{" "}
                    <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="fullname"
                    placeholder={t("name_placeholder")}
                    className="rounded-xl h-12"
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">
                    {t("phone_label")}{" "}
                    <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="phone"
                    placeholder={t("phone_placeholder")}
                    className="rounded-xl h-12"
                    {...register("phone")}
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-500">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">{t("email_label")}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t("email_placeholder")}
                  className="rounded-xl h-12"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">{t("interest_label")}</Label>
                <Controller
                  name="note"
                  control={control}
                  render={({ field }) => (
                    <textarea
                      {...field}
                      id="message"
                      className="w-full min-h-[120px] rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:focus-visible:ring-primary/50"
                      placeholder={t("interest_placeholder")}
                    />
                  )}
                />
                {errors.note && (
                  <p className="text-xs text-red-500">{errors.note.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-14 rounded-xl text-lg font-bold uppercase tracking-wider bg-accent hover:bg-accent/90 shadow-lg shadow-accent/20 flex gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    {t("sending_label") || "Đang gửi..."}
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    {t("submit")}
                  </>
                )}
              </Button>

              <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                {t("security_note")}
              </p>
            </form>
          </div>

          {/* Right: Illustration Image */}
          <div className="hidden lg:block lg:w-[40%] bg-blue-100 dark:bg-blue-900/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-t from-blue-100/50 dark:from-blue-950/20 to-transparent z-10" />
            <Image
              src={IMAGES.HOME.CONSULTATION.consultation}
              alt={t("image_alt")}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
              className="object-cover object-center z-0 scale-110 hover:scale-100 transition-transform duration-1000"
            />
            {/* Overlay Text/Badge */}
            <div className="absolute bottom-10 left-10 right-10 z-20 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
              <p className="text-white font-bold text-lg leading-tight italic">
                &ldquo;{t("quote")}&rdquo;
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
