"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

import type { AppLocale } from "@/lib/i18n/config";

type ReadyLabels = {
  title: string;
  subtitle: string;
  learnMore: string;
  getStarted: string;
};

type ReadySectionProps = {
  lang: AppLocale;
  labels: ReadyLabels;
};

function ReadySection({ lang, labels }: ReadySectionProps) {
  return (
    <section data-lang={lang} className="relative overflow-hidden bg-[#ea3535] py-18 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute -bottom-16 inset-s-1/3 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -top-16 inset-e-0 h-56 w-56 rounded-full bg-white/15 blur-3xl" />

      <div className="mx-auto w-full max-w-4xl px-4 text-center sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-4xl font-extrabold leading-tight text-white sm:text-5xl"
        >
          {labels.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5, delay: 0.08, ease: "easeOut" }}
          className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-white/95 sm:text-2xl"
        >
          {labels.subtitle}
        </motion.p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: 0.12, ease: "easeOut" }}
            className="inline-flex h-14 items-center gap-2 rounded-xl bg-white px-9 text-lg font-bold text-[#e43a3a] transition hover:bg-white/95"
          >
            {labels.learnMore}
            <ArrowRight className="size-5" />
          </motion.button>

          <motion.button
            type="button"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: 0.18, ease: "easeOut" }}
            className="inline-flex h-14 items-center rounded-xl border-2 border-white bg-transparent px-9 text-lg font-bold text-white transition hover:bg-white/10"
          >
            {labels.getStarted}
          </motion.button>
        </div>
      </div>
    </section>
  );
}

export default ReadySection;