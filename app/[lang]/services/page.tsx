import { notFound } from "next/navigation";

import ServicesAdditionalFeaturesSection from "@/components/ServicesAdditionalFeaturesSection";
import HeadSection from "@/components/HeadSection";
import ServicesFeatureSection from "@/components/ServicesFeatureSection";
import { hasLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import ReadySection from "@/components/ReadySection";

type ServicesPageProps = {
  params: Promise<{ lang: string }>;
};

async function ServicesPage({ params }: ServicesPageProps) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dict = await getDictionary(lang);

  return (
    <section>
      <HeadSection surface title={dict.services.title} description={dict.services.description} />

      <ServicesFeatureSection lang={lang} labels={dict.services.features} />
      <ServicesAdditionalFeaturesSection lang={lang} labels={dict.services.additionalFeatures} />
      <ReadySection lang={lang} labels={dict.ready} />

    </section>
  );
}

export default ServicesPage;