"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

type HeadSectionProps = {
  title: ReactNode;
  description: ReactNode;
  highlightSecondWord?: boolean;
  surface?: boolean;
  surfaceClassName?: string;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
};

function renderTitle(title: ReactNode, highlightSecondWord: boolean) {
  if (!highlightSecondWord || typeof title !== "string") {
    return title;
  }

  const words = title.trim().split(/\s+/);

  if (words.length < 2) {
    return title;
  }

  return (
    <>
      {words[0]} <span className="text-(--hero-accent)">{words[1]}</span>
      {words.length > 2 ? ` ${words.slice(2).join(" ")}` : ""}
    </>
  );
}

function HeadSection({
  title,
  description,
  highlightSecondWord = true,
  surface = false,
  surfaceClassName,
  className,
  titleClassName,
  descriptionClassName,
}: HeadSectionProps) {
  const header = (
    <motion.header
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className={cn("mx-auto max-w-4xl text-center", className)}
    >
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5, delay: 0.05, ease: "easeOut" }}
        className={cn(
          "text-4xl font-extrabold tracking-tight text-(--hero-ink) sm:text-5xl",
          titleClassName
        )}
      >
        {renderTitle(title, highlightSecondWord)}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5, delay: 0.12, ease: "easeOut" }}
        className={cn(
          "mt-5 text-xl leading-relaxed text-(--hero-copy)",
          descriptionClassName
        )}
      >
        {description}
      </motion.p>
    </motion.header>
  );

  if (!surface) {
    return header;
  }

  return (
    <section className={cn("relative overflow-hidden hero-surface-gradient py-16 sm:py-20 lg:py-24", surfaceClassName)}>
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="pointer-events-none absolute -bottom-24 inset-s-1/3 h-60 w-60 rounded-full bg-(--hero-soft-accent)/60 blur-3xl"
      />
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.75, delay: 0.05, ease: "easeOut" }}
        className="pointer-events-none absolute -top-20 inset-e-8 h-56 w-56 rounded-full bg-white/60 blur-3xl"
      />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">{header}</div>
    </section>
  );
}

export default HeadSection;