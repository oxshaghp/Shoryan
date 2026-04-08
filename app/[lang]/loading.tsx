"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";

export default function Loading() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(8);

  const isArabic = useMemo(() => pathname?.startsWith("/ar"), [pathname]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }

        const next = prev + (prev > 84 ? 2 : 6);
        return next > 100 ? 100 : next;
      });
    }, 90);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-[calc(100vh-74px)] w-full items-center justify-center overflow-hidden bg-linear-to-br from-white via-[#fff7f8] to-[#f9eef0] px-4">
      <div className="pointer-events-none absolute inset-0 hero-grid opacity-15" />
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="relative w-full max-w-md rounded-[2rem] border border-white/80 bg-white/80 p-6 shadow-[0_18px_60px_-28px_rgb(0_0_0/0.32)] backdrop-blur-md sm:p-8"
      >
        <div className="mb-5 flex items-center justify-center">
          <motion.div
            animate={{ rotate: [0, 3, 0], scale: [1, 1.04, 1] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <span className="absolute -inset-4 rounded-full border border-(--hero-soft-accent) opacity-70" />
            <Image src="/logo.png" alt="Shoryan Logo" width={74} height={74} priority />
          </motion.div>
        </div>

        <p className="mb-4 text-center text-sm font-semibold text-(--hero-copy)">
          {isArabic ? "جاري التحميل..." : "Loading..."}
        </p>

        <div className="h-3 w-full overflow-hidden rounded-full bg-black/8">
          <motion.div
            className="h-full rounded-full bg-linear-to-r from-(--hero-accent) via-[#ff5a5a] to-(--hero-accent-strong)"
            initial={{ width: "10%" }}
            animate={{ width: `${progress}%` }}
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
  );
}
