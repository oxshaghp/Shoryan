import Link from "next/link";
import { notFound } from "next/navigation";

import { hasLocale, locales } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dict = await getDictionary(lang);

  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <section className="w-full max-w-2xl space-y-6 rounded-2xl border border-black/10 p-8 shadow-sm">
        <h1 className="text-3xl font-bold">{dict.home.title}</h1>
        <p className="text-base text-black/70">{dict.home.subtitle}</p>

        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-black/60">{dict.home.switchLabel}:</span>
          {locales.map((locale) => (
            <Link
              key={locale}
              href={`/${locale}`}
              className={`rounded-md px-3 py-1.5 text-sm transition ${
                lang === locale
                  ? "bg-black text-white"
                  : "bg-black/5 text-black hover:bg-black/10"
              }`}
            >
              {dict.nav[locale]}
            </Link>
          ))}
        </div>

        <button className="rounded-lg bg-black px-4 py-2 text-white">
          {dict.home.cta}
        </button>
      </section>
    </main>
  );
}
