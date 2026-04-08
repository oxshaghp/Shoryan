"use client";

import {
  Activity,
  Award,
  Bell,
  Building2,
  Calendar,
  Clock3,
  Heart,
  MapPin,
  Search,
  ShieldCheck,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

import HeadSection from "@/components/HeadSection";
import type { AppLocale } from "@/lib/i18n/config";

type AdditionalFeatureCard = {
  title: string;
  description: string;
  icon: string;
};

type ServicesAdditionalFeaturesLabels = {
  title: string;
  subtitle: string;
  cards: AdditionalFeatureCard[];
};

type ServicesAdditionalFeaturesSectionProps = {
  lang: AppLocale;
  labels: ServicesAdditionalFeaturesLabels;
};

const iconMap = {
  search: Search,
  activity: Activity,
  award: Award,
  calendar: Calendar,
  heart: Heart,
  bell: Bell,
  mappin: MapPin,
  building: Building2,
  users: Users,
  shield: ShieldCheck,
  clock: Clock3,
} as const;

const cardClassName =
  "rounded-3xl border border-black/8 bg-white p-7 shadow-[0_8px_20px_-16px_rgb(0_0_0/0.3)] sm:p-8";

function ServicesAdditionalFeaturesSection({ lang, labels }: ServicesAdditionalFeaturesSectionProps) {
  return (
    <section data-lang={lang} className="bg-[#f4f5f6] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <HeadSection
          title={labels.title}
          description={labels.subtitle}
          highlightSecondWord={false}
          className="max-w-4xl"
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {labels.cards.map((card, index) => {
            const Icon = iconMap[card.icon as keyof typeof iconMap] ?? Heart;

            return (
              <motion.article
                key={`${card.title}-${index}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.22 }}
                transition={{ duration: 0.45, delay: index * 0.05, ease: "easeOut" }}
                className={cardClassName}
              >
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: index * 0.15 }}
                  className="inline-flex size-14 items-center justify-center rounded-xl bg-(--hero-soft-accent) text-(--hero-accent)"
                >
                  <Icon className="size-7" />
                </motion.div>

                <h3 className="mt-6 text-4xl font-extrabold tracking-tight text-(--hero-ink)">{card.title}</h3>
                <p className="mt-4 text-xl leading-relaxed text-(--hero-copy)">{card.description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ServicesAdditionalFeaturesSection;
