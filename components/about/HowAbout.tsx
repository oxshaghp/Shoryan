"use client";

import HeadSection from "@/components/shared/HeadSection";
import { motion } from "motion/react";
import type { AppLocale } from "@/lib/i18n/config";

type HowStep = {
  title: string;
  description: string;
};

type HowAboutLabels = {
  title: string;
  subtitle: string;
  steps: HowStep[];
};

type HowAboutProps = {
  lang: AppLocale;
  labels: HowAboutLabels;
};

function HowAbout({ lang, labels }: HowAboutProps) {
  return (
    <section data-lang={lang} className="bg-[#f4f5f6] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <HeadSection
          title={labels.title}
          description={labels.subtitle}
          highlightSecondWord={false}
          className="max-w-5xl"
        />

        <div className="mx-auto mt-14 max-w-6xl space-y-9 sm:mt-16">
          {labels.steps.map((step, index) => (
            <motion.article
              key={`${step.title}-${index}`}
              initial={{ opacity: 0, x: -14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
              className="flex items-start gap-6 sm:gap-7"
            >
              <motion.span
                initial={{ scale: 0.92 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.35, delay: index * 0.08 + 0.05, ease: "easeOut" }}
                className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-(--hero-accent) text-2xl font-extrabold text-white sm:size-13"
              >
                {index + 1}
              </motion.span>

              <div className="pt-1">
                <h3 className="text-5xl font-extrabold tracking-tight text-(--hero-ink)">{step.title}</h3>
                <p className="mt-3 text-xl leading-relaxed text-(--hero-copy)">{step.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowAbout;