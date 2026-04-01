"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

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
    <div className="flex min-h-[calc(100vh-74px)] w-full items-center justify-center bg-linear-to-b from-white to-zinc-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-black/10 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-5 flex items-center justify-center">
          <Image src="/logo.png" alt="Shoryan Logo" width={72} height={72} priority />
        </div>

        <p className="mb-3 text-center text-sm font-semibold text-black/70">
          {isArabic ? "جاري التحميل..." : "Loading..."}
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
