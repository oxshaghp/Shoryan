import { notFound } from "next/navigation";

import { hasLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

type DashboardPageProps = {
  params: Promise<{ lang: string }>;
};

async function page({ params }: DashboardPageProps) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dict = await getDictionary(lang);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-(--hero-ink) sm:text-4xl">{dict.dashboard.title}</h1>
      <p className="mt-3 text-base text-(--hero-copy) sm:text-lg">{dict.dashboard.description}</p>
    </section>
  );
}

export default page;