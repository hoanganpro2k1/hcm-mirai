"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  getConsultationSchema,
  type ConsultationFormValues as FormValues,
} from "@/schemas/consultation.schema";
import { useTranslations } from "next-intl";
import { Loader2, Send } from "lucide-react";
import { useConsultationMutations } from "@/hooks/use-consultation-mutations";

interface ConsultationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ConsultationModal({
  open,
  onOpenChange,
}: ConsultationModalProps) {
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
      onOpenChange(false);
    } catch {
      // Error handled by hook
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-primary">
            {t("title")}
          </DialogTitle>
          <DialogDescription>{t("subtitle")}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="name">
              {t("name_label")} <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              placeholder={t("name_placeholder")}
              {...register("name")}
            />
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">
              {t("phone_label")} <span className="text-destructive">*</span>
            </Label>
            <Input
              id="phone"
              placeholder={t("phone_placeholder")}
              {...register("phone")}
            />
            {errors.phone && (
              <p className="text-xs text-red-500">{errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{t("email_label")}</Label>
            <Input
              id="email"
              placeholder={t("email_placeholder")}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="note">{t("interest_label")}</Label>
            <Controller
              name="note"
              control={control}
              render={({ field }) => (
                <Textarea
                  id="note"
                  placeholder={t("interest_placeholder")}
                  className="min-h-[100px]"
                  {...field}
                />
              )}
            />
            {errors.note && (
              <p className="text-xs text-red-500">{errors.note.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-primary font-bold transition flex gap-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {t("sending_label") || "Đang gửi..."}
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                {t("submit")}
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
