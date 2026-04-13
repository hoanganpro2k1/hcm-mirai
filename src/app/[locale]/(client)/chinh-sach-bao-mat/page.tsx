import PageBreadcrumbs from "@/components/common/PageBreadcrumbs";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "PrivacyPolicy" });
  return {
    title: t("title"),
    description: t("title"),
  };
}

export default async function PrivacyPolicyPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "PrivacyPolicy" });
  const tNav = await getTranslations({ locale, namespace: "Header.nav" });

  const sections = ["a", "b", "c", "d", "e", "f"] as const;

  return (
    <main className="min-h-screen bg-slate-50/50 dark:bg-slate-950/50 pb-20">
      <PageBreadcrumbs
        items={[{ label: tNav("home"), href: "/" }, { label: t("title") }]}
      />

      <div className="container mx-auto px-6 mt-12">
        <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-2xl md:rounded-[2.5rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 p-8 md:p-16">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-8 border-b border-slate-100 dark:border-slate-800 pb-8 text-center uppercase tracking-tight">
            {t("title")}
          </h1>

          <div className="space-y-12">
            {sections.map((section) => (
              <section key={section} className="space-y-4">
                <h2 className="text-xl font-bold text-primary flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm">
                    {section.toUpperCase()}
                  </span>
                  {t(`sections.${section}.title`)}
                </h2>
                <div className="pl-11 space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                  {typeof t.raw(`sections.${section}.content`) === "string" ? (
                    <p>{t(`sections.${section}.content`)}</p>
                  ) : (
                    (t.raw(`sections.${section}.content`) as string[]).map(
                      (para, idx) => <p key={idx}>{para}</p>,
                    )
                  )}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-20 pt-12 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-slate-500 dark:text-slate-500 italic">
              {tNav("home")} - HCM Mirai
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
