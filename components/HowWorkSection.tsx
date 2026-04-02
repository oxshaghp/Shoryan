import { Clock3, MapPin, ShieldCheck } from "lucide-react";

import type { AppLocale } from "@/lib/i18n/config";

type HowWorkLabels = {
  title: string;
  subtitle: string;
  cards: {
    nearby: {
      title: string;
      description: string;
    };
    alerts: {
      title: string;
      description: string;
    };
    verified: {
      title: string;
      description: string;
    };
  };
};

type HowWorkSectionProps = {
  lang: AppLocale;
  labels: HowWorkLabels;
};

const cardClassName =
  "rounded-2xl border border-black/6 bg-white p-8 shadow-[0_8px_18px_-16px_rgb(0_0_0/0.35)]";

function HowWorkSection({ lang, labels }: HowWorkSectionProps) {
  return (
    <section data-lang={lang} className="bg-[#f4f5f6] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <header className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-(--hero-ink) sm:text-5xl">{labels.title}</h2>
          <p className="mt-5 text-xl leading-relaxed text-(--hero-copy)">{labels.subtitle}</p>
        </header>

        <div className="mt-12 grid gap-6 lg:mt-14 lg:grid-cols-3 lg:gap-8">
          <article className={cardClassName}>
            <div className="mb-6 flex size-14 items-center justify-center rounded-xl bg-(--hero-soft-accent) text-(--hero-accent)">
              <MapPin className="size-6" />
            </div>
            <h3 className="text-4xl font-bold text-(--hero-ink)">{labels.cards.nearby.title}</h3>
            <p className="mt-4 text-xl leading-relaxed text-(--hero-copy)">{labels.cards.nearby.description}</p>
          </article>

          <article className={cardClassName}>
            <div className="mb-6 flex size-14 items-center justify-center rounded-xl bg-(--hero-soft-accent) text-(--hero-accent)">
              <Clock3 className="size-6" />
            </div>
            <h3 className="text-4xl font-bold text-(--hero-ink)">{labels.cards.alerts.title}</h3>
            <p className="mt-4 text-xl leading-relaxed text-(--hero-copy)">{labels.cards.alerts.description}</p>
          </article>

          <article className={cardClassName}>
            <div className="mb-6 flex size-14 items-center justify-center rounded-xl bg-(--hero-soft-accent) text-(--hero-accent)">
              <ShieldCheck className="size-6" />
            </div>
            <h3 className="text-4xl font-bold text-(--hero-ink)">{labels.cards.verified.title}</h3>
            <p className="mt-4 text-xl leading-relaxed text-(--hero-copy)">{labels.cards.verified.description}</p>
          </article>
        </div>
      </div>
    </section>
  );
}

export default HowWorkSection;