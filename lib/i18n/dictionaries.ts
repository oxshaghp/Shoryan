import "server-only";

import type { AppLocale } from "@/lib/i18n/config";

const dictionaries = {
  ar: () => import("@/messages/ar.json").then((module) => module.default),
  en: () => import("@/messages/en.json").then((module) => module.default),
};

export type Dictionary = Awaited<ReturnType<(typeof dictionaries)[AppLocale]>>;

export async function getDictionary(locale: AppLocale): Promise<Dictionary> {
  return dictionaries[locale]();
}
