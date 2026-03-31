import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";
import { routing } from "./routing";

export default getRequestConfig(async ({ locale }) => {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value;

  let currentLocale: string = (locale ||
    cookieLocale ||
    routing.defaultLocale) as string;

  if (!routing.locales.includes(currentLocale as any)) {
    currentLocale = routing.defaultLocale;
  }

  return {
    locale: currentLocale,
    messages: (await import(`../../messages/${currentLocale}.json`)).default,
  };
});
