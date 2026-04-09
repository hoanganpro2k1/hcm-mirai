import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import PageBreadcrumbs from "@/components/common/PageBreadcrumbs";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "TermsOfService" });
  return {
    title: t("title"),
    description: t("title"),
  };
}

export default async function TermsOfServicePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "TermsOfService" });
  const tNav = await getTranslations({ locale, namespace: "Header.nav" });

  const articleKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9"] as const;

  return (
    <main className="min-h-screen bg-slate-50/50 dark:bg-slate-950/50 pb-20">
      <PageBreadcrumbs
        items={[{ label: tNav("home"), href: "/" }, { label: t("title") }]}
      />

      <div className="container mx-auto px-6 mt-12">
        <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 p-8 md:p-16">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-8 border-b border-slate-100 dark:border-slate-800 pb-8 text-center uppercase tracking-tight">
            {t("title")}
          </h1>

          <div className="mb-12 p-6 bg-primary/5 rounded-2xl border border-primary/10 italic text-slate-600 dark:text-slate-400 leading-relaxed">
            {t("intro")}
          </div>

          <div className="space-y-12">
            {articleKeys.map((key) => (
              <section key={key} className="space-y-4">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-sm font-black text-primary">
                    {key}
                  </span>
                  {t(`articles.${key}.title`)}
                </h2>
                <div className="pl-11 space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                  {typeof t.raw(`articles.${key}.content`) === "string" ? (
                    <p>{t(`articles.${key}.content`)}</p>
                  ) : (
                    <ul className="list-disc list-outside space-y-2 pl-4">
                      {(t.raw(`articles.${key}.content`) as string[]).map(
                        (item, idx) => <li key={idx}>{item}</li>,
                      )}
                    </ul>
                  )}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-20 pt-12 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-slate-500 dark:text-slate-500 italic">
              HCM Mirai - hcm-mirai.com
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
