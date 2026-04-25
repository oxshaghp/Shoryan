"use client";

import Image from "next/image";
import Link from "next/link";
import { Building2, HeartPulse, ShieldCheck, Users } from "lucide-react";
import { motion } from "motion/react";

import type { AppLocale } from "@/lib/i18n/config";
import { Button } from "@/components/ui/button";

type HeroLabels = {
  badge: string;
  titleLeading: string;
  titleHighlight: string;
  description: string;
  needBlood: string;
  donate: string;
  statValue: string;
  statLabel: string;
  logoAlt: string;
  floating: {
    donors: string;
    hospitals: string;
    response: string;
    bloodTypes: string;
  };
};

type HeroSectionProps = {
  lang: AppLocale;
  labels: HeroLabels;
};

function HeroSection({ lang, labels }: HeroSectionProps) {
  const withLocale = (href: string) => `/${lang}${href === "/" ? "" : href}`;

  return (
    <section data-lang={lang} className="relative w-full overflow-hidden hero-surface-gradient">
      <div className="mx-auto w-full max-w-7xl px-4 pb-16 pt-14 sm:px-6 lg:pb-24 lg:pt-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.08fr] lg:gap-16">
            {/* Left Column */}
          <div className="max-w-xl">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-(--hero-border-soft) bg-white/70 px-4 py-2 text-sm font-semibold text-(--hero-accent) shadow-sm"
            >
              <HeartPulse className="size-4" />
              {labels.badge}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="text-balance text-4xl font-extrabold leading-[1.1] tracking-tight text-(--hero-ink) sm:text-5xl lg:text-6xl"
            >
              {labels.titleLeading}
              <br />
              <span className="text-(--hero-accent)">{labels.titleHighlight}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.55, delay: 0.15, ease: "easeOut" }}
              className="mt-6 max-w-lg text-lg leading-relaxed text-(--hero-copy) sm:text-xl"
            >
              {labels.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.55, delay: 0.2, ease: "easeOut" }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <Button
                asChild
                className="h-12 rounded-xl bg-(--hero-accent) px-7 text-base font-bold text-white shadow-[0_10px_30px_-12px_var(--hero-shadow-strong)] hover:bg-(--hero-accent-strong)"
                size="lg"
              >
                <Link href={withLocale("/hospitals")}>{labels.needBlood}</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-12 rounded-xl border-(--hero-accent) bg-white/70 px-7 text-base font-bold text-(--hero-accent) hover:bg-(--hero-soft-accent)"
                size="lg"
              >
                <Link href={withLocale("/contact")}>{labels.donate}</Link>
              </Button>
            </motion.div>
          </div>
            {/* Right Column */}
          <div className="relative mx-auto w-full max-w-xl">
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, ease: "easeOut" }}
              className="relative overflow-hidden rounded-[2rem] border border-(--hero-border-soft) bg-(--hero-card) p-6 shadow-[0_26px_60px_-32px_var(--hero-shadow)] sm:p-8"
            >
              <div className="pointer-events-none absolute inset-0 hero-grid opacity-35" />
              <motion.div
                className="pointer-events-none absolute -left-2 top-16 size-16 rounded-xl border border-(--hero-border-soft) bg-white/60"
                animate={{ x: [0, 8, 0], y: [0, -7, 0], rotate: [0, 4, 0] }}
                transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="pointer-events-none absolute right-10 top-8 size-10 rounded-lg bg-(--hero-soft-accent)"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut", delay: 0.25 }}
              />
              <motion.div
                className="pointer-events-none absolute bottom-24 left-6 size-12 rounded-md border border-(--hero-border-soft) bg-white/70"
                animate={{ y: [0, -9, 0] }}
                transition={{ duration: 7.6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
              />

              <div className="relative flex min-h-90 items-center justify-center rounded-[1.65rem] border border-(--hero-border-soft) bg-(--hero-panel) sm:min-h-107.5">
                <motion.div
                  className="absolute inset-s-5 top-5 rounded-xl border border-(--hero-border-soft) bg-white/85 px-4 py-2 text-sm font-bold text-(--hero-ink) shadow-sm backdrop-blur"
                  animate={{ y: [0, -9, 0] }}
                  transition={{ duration: 7.2, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
                >
                  {labels.floating.bloodTypes}
                </motion.div>

                <motion.div
                  className="absolute inset-e-5 top-14 rounded-xl border border-(--hero-border-soft) bg-white/90 px-4 py-2 text-sm font-semibold text-(--hero-copy) shadow-sm"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 8.1, repeat: Infinity, ease: "easeInOut", delay: 0.35 }}
                >
                  <div className="flex items-center gap-2">
                    <Building2 className="size-4 text-(--hero-accent)" />
                    {labels.floating.hospitals}
                  </div>
                </motion.div>

                <motion.div
                  className="absolute inset-s-7 bottom-7 rounded-xl border border-(--hero-border-soft) bg-white/90 px-4 py-2 text-sm font-semibold text-(--hero-copy) shadow-sm"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 6.4, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                >
                  <div className="flex items-center gap-2">
                    <Users className="size-4 text-(--hero-accent)" />
                    {labels.floating.donors}
                  </div>
                </motion.div>

                <div className="relative">
                  <motion.div
                    className="absolute -inset-7 rounded-full bg-(--hero-soft-accent)/70 blur-2xl"
                    animate={{ opacity: [0.55, 0.85, 0.55], scale: [0.95, 1.05, 0.95] }}
                    transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <div className="relative flex size-28 items-center justify-center rounded-[1.7rem] border border-(--hero-border-soft) bg-white/90 shadow-lg sm:size-32">
                    <Image
                      src="/logo.png"
                      alt={labels.logoAlt}
                      width={84}
                      height={84}
                      priority
                      className="size-16 object-contain sm:size-20"
                    />
                  </div>
                </div>

                <motion.div
                  className="absolute inset-e-9 bottom-24 rounded-xl border border-(--hero-border-soft) bg-white/90 px-4 py-2 text-sm font-semibold text-(--hero-copy) shadow-sm"
                  animate={{ y: [0, -9, 0] }}
                  transition={{ duration: 8.7, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}
                >
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="size-4 text-(--hero-accent)" />
                    {labels.floating.response}
                  </div>
                </motion.div>
              </div>

              <motion.div
                className="absolute -bottom-4 inset-e-3 rounded-2xl bg-(--hero-accent) px-6 py-4 text-white shadow-xl sm:inset-e-4"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.45, delay: 0.25, ease: "easeOut" }}
              >
                <p className="text-3xl font-extrabold leading-none">{labels.statValue}</p>
                <p className="mt-1 text-sm font-medium opacity-95">{labels.statLabel}</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
        {/* Background Elements */}
      <div className="pointer-events-none absolute -bottom-20 inset-s-1/3 h-56 w-56 rounded-full bg-(--hero-soft-accent)/70 blur-3xl" />
      <div className="pointer-events-none absolute -top-24 inset-e-0 h-64 w-64 rounded-full bg-white/60 blur-3xl" />
    </section>
  );
}

export default HeroSection;