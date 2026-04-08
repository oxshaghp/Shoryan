import { notFound } from "next/navigation";

import HeadSection from "@/components/HeadSection";
import HowAbout from "@/components/HowAbout";
import OfferAboutSection from "@/components/OfferAboutSection";
import OurMission from "@/components/OurMission";
import { hasLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import ReadySection from "@/components/ReadySection";

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
      <section className="relative overflow-hidden hero-surface-gradient py-16 sm:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
          <HeadSection title={dict.about.title} description={dict.about.description} />
        </div>

        <div className="pointer-events-none absolute -bottom-24 inset-s-1/3 h-60 w-60 rounded-full bg-(--hero-soft-accent)/70 blur-3xl" />
        <div className="pointer-events-none absolute -top-20 inset-e-8 h-56 w-56 rounded-full bg-white/60 blur-3xl" />
      </section>

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