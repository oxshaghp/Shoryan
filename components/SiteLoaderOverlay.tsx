"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import type { AppLocale } from "@/lib/i18n/config";

type SiteLoaderOverlayProps = {
  lang: AppLocale;
};

function SiteLoaderOverlay({ lang }: SiteLoaderOverlayProps) {
  const pathname = usePathname();

  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  const mountedRef = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback(() => {
    if (startTimeoutRef.current) {
      clearTimeout(startTimeoutRef.current);
      startTimeoutRef.current = null;
    }

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
    startTimeoutRef.current = setTimeout(() => {
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
    }, 0);
  }, [clearTimers]);

  useEffect(() => {
    startLoader(1200);

    return () => {
      clearTimers();
    };
  }, [clearTimers, startLoader]);

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }

    startLoader(700);
  }, [pathname, startLoader]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-80 flex items-center justify-center bg-white/95 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl border border-black/10 bg-white p-6 shadow-lg sm:p-8">
        <div className="mb-5 flex items-center justify-center">
          <Image src="/logo.png" alt="Shoryan Logo" width={80} height={80} priority />
        </div>

        <p className="mb-3 text-center text-sm font-semibold text-black/75">
          {lang === "ar" ? "جاري التحميل..." : "Loading..."}
        </p>

        <div className="h-3 w-full overflow-hidden rounded-full bg-black/10">
          <div
            className="h-full rounded-full bg-black transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="mt-3 text-center text-sm font-bold text-black">{progress}%</p>
      </div>
    </div>
  );
}

export default SiteLoaderOverlay;
