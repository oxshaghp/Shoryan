"use client";

import { CircleCheck } from "lucide-react";
import { motion } from "motion/react";

import HeadSection from "@/components/HeadSection";
import type { AppLocale } from "@/lib/i18n/config";

type OfferCard = {
  title: string;
  description: string;
};

type OfferAboutLabels = {
  title: string;
  subtitle: string;
  cards: OfferCard[];
};

type OfferAboutSectionProps = {
  lang: AppLocale;
  labels: OfferAboutLabels;
};

const cardClassName =
  "rounded-2xl border border-black/8 bg-white p-7 shadow-[0_8px_20px_-16px_rgb(0_0_0/0.3)] sm:p-8";

function OfferAboutSection({ lang, labels }: OfferAboutSectionProps) {
  return (
    <section data-lang={lang} className="bg-[#f4f5f6] py-16 sm:py-20 lg:py-24 mt-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <HeadSection
          title={labels.title}
          description={labels.subtitle}
          highlightSecondWord={false}
          className="max-w-4xl"
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {labels.cards.map((card, index) => (
            <motion.article
              key={`${card.title}-${index}`}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: index * 0.07, ease: "easeOut" }}
              className={cardClassName}
            >
              <div className="inline-flex size-13 items-center justify-center rounded-xl bg-(--hero-soft-accent) text-(--hero-accent)">
                <CircleCheck className="size-7" />
              </div>

              <h3 className="mt-6 text-4xl font-extrabold tracking-tight text-(--hero-ink)">{card.title}</h3>
              <p className="mt-4 text-xl leading-relaxed text-(--hero-copy)">{card.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default OfferAboutSection;