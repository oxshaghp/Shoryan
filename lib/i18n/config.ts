export const locales = ["ar", "en"] as const;

export type AppLocale = (typeof locales)[number];

export const defaultLocale: AppLocale = "ar";

export function hasLocale(locale: string): locale is AppLocale {
  return locales.includes(locale as AppLocale);
}
