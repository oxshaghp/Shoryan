import { notFound } from "next/navigation";

import HeroSection from "@/components/HeroSection";
import HowWorkSection from "@/components/HowWorkSection";
import MapSection from "@/components/MapSection";
import NumbersSection from "@/components/NumbersSection";
import ReadySection from "@/components/ReadySection";
import { hasLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

type PageProps = {
  params: Promise<{ lang: string }>;
};

async function page({ params }: PageProps) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dict = await getDictionary(lang);

  return (
    <div className="relative h-full w-full">
      <HeroSection lang={lang} labels={dict.hero} />
      <NumbersSection lang={lang} labels={dict.numbers} />
      <HowWorkSection lang={lang} labels={dict.howWork} />
      <MapSection lang={lang} labels={dict.map} />
      <ReadySection lang={lang} labels={dict.ready} />
    </div>
  );
}

export default page;