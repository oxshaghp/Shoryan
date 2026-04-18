"use client";

import { useEffect, useRef, useState } from "react";
import { Building2, Heart, UsersRound } from "lucide-react";
import { animate } from "motion";
import { motion, useInView } from "motion/react";

import type { AppLocale } from "@/lib/i18n/config";

type NumbersLabels = {
  donors: {
    value: number;
    suffix: string;
    label: string;
  };
  hospitals: {
    value: number;
    suffix: string;
    label: string;
  };
  donations: {
    value: number;
    suffix: string;
    label: string;
  };
};

type NumbersSectionProps = {
  lang: AppLocale;
  labels: NumbersLabels;
};

type CounterItemProps = {
  target: number;
  suffix: string;
  label: string;
  icon: React.ReactNode;
  lang: AppLocale;
  delay: number;
};

function CounterItem({ target, suffix, label, icon, lang, delay }: CounterItemProps) {
  const numberRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(numberRef, { once: true, amount: 0.75 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, target, {
      duration: 1.4,
      delay,
      ease: "easeOut",
      onUpdate: (latest) => setValue(Math.round(latest)),
    });

    return () => controls.stop();
  }, [delay, isInView, target]);

  const formatter = new Intl.NumberFormat(lang === "ar" ? "ar-EG" : "en-US");

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className="flex flex-col items-center text-center"
    >
      <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-(--hero-soft-accent) text-(--hero-accent)">
        {icon}
      </div>
      <p className="text-5xl font-extrabold leading-none tracking-tight text-(--hero-ink) sm:text-6xl">
        <span ref={numberRef}>{formatter.format(value)}</span>
        {suffix}
      </p>
      <p className="mt-3 text-xl text-(--hero-copy)">{label}</p>
    </motion.article>
  );
}

function NumbersSection({ lang, labels }: NumbersSectionProps) {
  return (
    <section className="bg-[#fff] py-14 sm:py-18 lg:py-20">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:gap-16">
        <CounterItem
          lang={lang}
          target={labels.donors.value}
          suffix={labels.donors.suffix}
          label={labels.donors.label}
          delay={0.05}
          icon={<UsersRound className="size-8" />}
        />
        <CounterItem
          lang={lang}
          target={labels.hospitals.value}
          suffix={labels.hospitals.suffix}
          label={labels.hospitals.label}
          delay={0.15}
          icon={<Building2 className="size-8" />}
        />
        <CounterItem
          lang={lang}
          target={labels.donations.value}
          suffix={labels.donations.suffix}
          label={labels.donations.label}
          delay={0.25}
          icon={<Heart className="size-8" />}
        />
      </div>
    </section>
  );
}

export default NumbersSection;