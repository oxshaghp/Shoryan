"use client";

import { Heart, UserPlus } from "lucide-react";
import { motion } from "motion/react";

import type { AppLocale } from "@/lib/i18n/config";

type ServiceFeatureCard = {
  title: string;
  description: string;
  points: string[];
};

type ServicesFeatureLabels = {
  cards: ServiceFeatureCard[];
};

type ServicesFeatureSectionProps = {
  lang: AppLocale;
  labels: ServicesFeatureLabels;
};

const cardClassName =
  "rounded-3xl border border-[#e5dfe1] bg-[#f3eaec] p-8 shadow-[0_8px_24px_-18px_rgb(0_0_0/0.35)] sm:p-9";

function ServicesFeatureSection({ lang, labels }: ServicesFeatureSectionProps) {
  const icons = [Heart, UserPlus] as const;

  return (
    <section data-lang={lang} className=" py-14 sm:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-2">
          {labels.cards.map((card, index) => {
            const Icon = icons[index] ?? Heart;

            return (
              <motion.article
                key={`${card.title}-${index}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
                className={cardClassName}
              >
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
                  className="inline-flex size-16 items-center justify-center rounded-2xl bg-(--hero-accent) text-white"
                >
                  <Icon className="size-8" />
                </motion.div>

                <h3 className="mt-8 text-5xl font-extrabold tracking-tight text-(--hero-ink)">{card.title}</h3>
                <p className="mt-4 text-xl leading-relaxed text-(--hero-copy)">{card.description}</p>

                <ul className="mt-7 space-y-3">
                  {card.points.map((point, pointIndex) => (
                    <li key={`${point}-${pointIndex}`} className="flex items-start gap-3 text-xl text-(--hero-ink)">
                      <span className="mt-1.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-(--hero-soft-accent)">
                        <span className="size-2.5 rounded-full bg-(--hero-accent)" />
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ServicesFeatureSection;
