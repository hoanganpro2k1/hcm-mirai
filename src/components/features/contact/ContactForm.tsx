"use client";

import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { consultationSchema, type ConsultationFormValues } from "@/schemas/consultation.schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { useConsultationMutations } from "@/hooks/use-consultation-mutations";
import { toast } from "sonner";

const contactSchema = consultationSchema;

type ContactFormValues = ConsultationFormValues;

export function ContactForm() {
  const t = useTranslations("Contact.form");
  const { 
    submitConsultation, 
    isSubmitting, 
  } = useConsultationMutations();

  const [showSuccess, setShowSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      await submitConsultation(data);
      setShowSuccess(true);
      reset();
      setTimeout(() => setShowSuccess(false), 5000);
      toast.success(t("success"));
    } catch {
      // Error handled by hook
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-gray-700 h-full">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {t("title")}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {t("description")}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">{t("name")}</Label>
            <Input
              id="name"
              placeholder={t("placeholder_name")}
              className="rounded-xl h-12"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message as string}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">{t("phone")}</Label>
            <Input
              id="phone"
              placeholder={t("placeholder_phone")}
              className="rounded-xl h-12"
              {...register("phone")}
            />
            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone.message as string}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">{t("email")}</Label>
          <Input
            id="email"
            type="email"
            placeholder={t("placeholder_email")}
            className="rounded-xl h-12"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message as string}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="note">{t("message")}</Label>
          <textarea
            id="note"
            className="w-full min-h-[150px] rounded-xl border border-input bg-background px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:focus-visible:ring-primary/50 transition-all font-sans"
            placeholder={t("placeholder_message")}
            {...register("note")}
          />
          {errors.note && (
            <p className="text-sm text-red-500">{errors.note.message as string}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-14 rounded-xl text-lg font-bold uppercase tracking-wider bg-accent hover:bg-accent/90 shadow-lg shadow-accent/20 transition-all active:scale-95"
        >
          {isSubmitting ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : showSuccess ? (
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6" />
              {t("success")}
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Send className="w-5 h-5" />
              {t("submit")}
            </span>
          )}
        </Button>
      </form>
    </div>
  );
}
