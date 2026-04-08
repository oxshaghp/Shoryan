"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

type HeadSectionProps = {
  title: ReactNode;
  description: ReactNode;
  highlightSecondWord?: boolean;
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
  className,
  titleClassName,
  descriptionClassName,
}: HeadSectionProps) {
  return (
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
}

export default HeadSection;