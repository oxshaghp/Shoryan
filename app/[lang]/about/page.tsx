import { notFound } from "next/navigation";

import HeadSection from "@/components/shared/HeadSection";
import HowAbout from "@/components/about/HowAbout";
import OfferAboutSection from "@/components/about/OfferAboutSection";
import OurMission from "@/components/about/OurMission";
import { hasLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import ReadySection from "@/components/shared/ReadySection";

type AboutPageProps = {
  params: Promise<{ lang: string }>;
};

async function AboutPage({ params }: AboutPageProps) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dict = await getDictionary(lang);

  return (
    <section className="bg-white">
      <HeadSection surface title={dict.about.title} description={dict.about.description} />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <OurMission lang={lang} labels={dict.about.mission} />
      </div>

      <OfferAboutSection lang={lang} labels={dict.about.offer} />
      <HowAbout lang={lang} labels={dict.about.how} />
      <ReadySection lang={lang} labels={dict.ready} />
    </section>
  );
}

export default AboutPage;