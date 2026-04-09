import * as z from "zod";

export const getConsultationSchema = (t: (key: string) => string) => z.object({
  name: z.string().min(2, t("name_min")),
  phone: z.string().regex(/^[0-9]{10,11}$/, t("phone_invalid")),
  email: z.string().email(t("email_invalid")).optional().or(z.literal("")),
  note: z.string().min(5, t("note_min")).optional().or(z.literal("")),
});

export type ConsultationFormValues = z.infer<ReturnType<typeof getConsultationSchema>>;
