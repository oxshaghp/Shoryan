import { notFound } from "next/navigation";

import HeadSection from "@/components/HeadSection";
import HospitalsDirectorySection from "@/components/HospitalsDirectorySection";
import { hasLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

type HospitalsPageProps = {
  params: Promise<{ lang: string }>;
};

async function HospitalsPage({ params }: HospitalsPageProps) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dict = await getDictionary(lang);

  return (
    <section className="bg-white">
      <HeadSection
        surface
        title={dict.hospitals.title}
        description={dict.hospitals.description}
        highlightSecondWord={false}
        titleClassName="mx-auto max-w-5xl"
      />

      <HospitalsDirectorySection lang={lang} labels={dict.hospitals} />
    </section>
  );
}

export default HospitalsPage;