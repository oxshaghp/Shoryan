"use client";

import { Globe, Heart, Target, Users } from "lucide-react";
import { motion } from "motion/react";

import type { AppLocale } from "@/lib/i18n/config";

type MissionStat = {
  value: string;
  label: string;
};

type OurMissionLabels = {
  badge: string;
  title: string;
  paragraphOne: string;
  paragraphTwo: string;
  stats: {
    livesSaved: MissionStat;
    donors: MissionStat;
    donations: MissionStat;
    hospitals: MissionStat;
  };
};

type OurMissionProps = {
  lang: AppLocale;
  labels: OurMissionLabels;
};

const statCardClassName =
  "rounded-3xl border border-[#eadfe0] bg-[#f3eaec] p-6 shadow-[0_10px_26px_-22px_rgb(0_0_0/0.38)] sm:p-7";

function OurMission({ lang, labels }: OurMissionProps) {
  const stats = [
    {
      icon: <Heart className="size-8 text-(--hero-accent)" />,
      value: labels.stats.livesSaved.value,
      label: labels.stats.livesSaved.label,
    },
    {
      icon: <Users className="size-8 text-(--hero-accent)" />,
      value: labels.stats.donors.value,
      label: labels.stats.donors.label,
    },
    {
      icon: <Target className="size-8 text-(--hero-accent)" />,
      value: labels.stats.donations.value,
      label: labels.stats.donations.label,
    },
    {
      icon: <Globe className="size-8 text-(--hero-accent)" />,
      value: labels.stats.hospitals.value,
      label: labels.stats.hospitals.label,
    },
  ];

  return (
    <section data-lang={lang} className="mt-14 bg-white sm:mt-16 lg:mt-20">
      <div className="grid items-start gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10">
        <motion.div
          initial={{ opacity: 0, x: -18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="text-start"
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="inline-flex items-center gap-2 rounded-full bg-(--hero-soft-accent) px-4 py-2 text-sm font-bold text-(--hero-accent)"
          >
            <Heart className="size-4" />
            {labels.badge}
          </motion.p>

          <h2 className="mt-7 text-4xl font-extrabold tracking-tight text-(--hero-ink) sm:text-5xl">{labels.title}</h2>

          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-(--hero-copy)">{labels.paragraphOne}</p>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-(--hero-copy)">{labels.paragraphTwo}</p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
          {stats.map((item, index) => (
            <motion.article
              key={`${item.label}-${index}`}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
              className={statCardClassName}
            >
              {item.icon}
              <p className="mt-6 text-4xl font-extrabold leading-none text-(--hero-ink)">{item.value}</p>
              <p className="mt-2 text-xl text-(--hero-copy)">{item.label}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default OurMission;
