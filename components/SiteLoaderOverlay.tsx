"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

import type { AppLocale } from "@/lib/i18n/config";

type SiteLoaderOverlayProps = {
  lang: AppLocale;
};

function SiteLoaderOverlay({ lang }: SiteLoaderOverlayProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  const initialMountRef = useRef(true);
  const animationFrameRef = useRef<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  }, []);

  const startLoader = useCallback((durationMs: number) => {
    clearTimers();
    setIsVisible(true);
    setProgress(0);

    const startedAt = Date.now();

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startedAt;
      const nextProgress = Math.min(100, Math.round((elapsed / durationMs) * 100));

      setProgress(nextProgress);

      if (nextProgress >= 100) {
        clearTimers();
        hideTimeoutRef.current = setTimeout(() => {
          setIsVisible(false);
        }, 120);
      }
    }, 30);

    hideTimeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, durationMs + 250);
  }, [clearTimers]);

  useEffect(() => {
    const durationMs = initialMountRef.current ? 1300 : 900;
    initialMountRef.current = false;

    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = window.requestAnimationFrame(() => {
      startLoader(durationMs);
    });

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }

      clearTimers();
    };
  }, [clearTimers, lang, startLoader]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-80 overflow-hidden bg-linear-to-br from-white via-[#fff7f8] to-[#f9eef0]">
      <div className="pointer-events-none absolute inset-0 hero-grid opacity-20" />
      <div className="pointer-events-none absolute -top-24 inset-s-1/3 h-72 w-72 rounded-full bg-(--hero-soft-accent)/70 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 inset-e-0 h-72 w-72 rounded-full bg-white/70 blur-3xl" />

      <div className="relative flex h-full items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="w-full max-w-sm rounded-[2rem] border border-white/80 bg-white/80 p-6 shadow-[0_18px_60px_-28px_rgb(0_0_0/0.35)] backdrop-blur-md sm:p-8"
        >
          <div className="mb-6 flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.06, 1], rotate: [0, 3, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <span className="absolute -inset-5 rounded-full border border-(--hero-soft-accent) opacity-70" />
              <span className="absolute -inset-2 rounded-full bg-(--hero-soft-accent)/60 blur-lg" />
              <Image src="/logo.png" alt="Shoryan Logo" width={88} height={88} priority className="relative" />
            </motion.div>
          </div>

          <p className="mb-3 text-center text-sm font-semibold text-(--hero-copy)">
            {lang === "ar" ? "جاري التحميل..." : "Loading..."}
          </p>

          <div className="h-3 w-full overflow-hidden rounded-full bg-black/8">
            <motion.div
              className="h-full rounded-full bg-linear-to-r from-(--hero-accent) via-[#ff5a5a] to-(--hero-accent-strong)"
              initial={{ width: "14%" }}
              animate={{ width: `${Math.max(progress, 14)}%` }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            />
          </div>

          <div className="mt-4 flex items-center justify-center gap-1.5">
            {[0, 1, 2].map((dot) => (
              <motion.span
                key={dot}
                className="size-2 rounded-full bg-(--hero-accent)"
                animate={{ opacity: [0.35, 1, 0.35], y: [0, -2, 0] }}
                transition={{ duration: 1.1, repeat: Infinity, delay: dot * 0.15, ease: "easeInOut" }}
              />
            ))}
          </div>

          <p className="mt-3 text-center text-sm font-bold text-(--hero-ink)">{progress}%</p>
        </motion.div>
      </div>
    </div>
  );
}

export default SiteLoaderOverlay;
