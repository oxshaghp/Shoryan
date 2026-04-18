import { notFound } from "next/navigation";

import HeroSection from "@/components/home/HeroSection";
import HowWorkSection from "@/components/home/HowWorkSection";
import NumbersSection from "@/components/home/NumbersSection";
import ReadySection from "@/components/shared/ReadySection";
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
      <ReadySection lang={lang} labels={dict.ready} />
    </div>
  );
}

export default page;