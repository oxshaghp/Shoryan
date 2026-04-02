import { ArrowRight } from "lucide-react";

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
    <section data-lang={lang} className="bg-[#ea3535] py-18 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-4xl px-4 text-center sm:px-6">
        <h2 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl">{labels.title}</h2>
        <p className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-white/95 sm:text-2xl">{labels.subtitle}</p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            className="inline-flex h-14 items-center gap-2 rounded-xl bg-white px-9 text-lg font-bold text-[#e43a3a] transition hover:bg-white/95"
          >
            {labels.learnMore}
            <ArrowRight className="size-5" />
          </button>

          <button
            type="button"
            className="inline-flex h-14 items-center rounded-xl border-2 border-white bg-transparent px-9 text-lg font-bold text-white transition hover:bg-white/10"
          >
            {labels.getStarted}
          </button>
        </div>
      </div>
    </section>
  );
}

export default ReadySection;