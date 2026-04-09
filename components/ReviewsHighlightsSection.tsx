import { Heart, Quote, Star } from "lucide-react";

import type { AppLocale } from "@/lib/i18n/config";

type ReviewsHighlightsSectionProps = {
  lang: AppLocale;
};

const copyByLocale = {
  en: {
    average: "Average Rating",
    happyDonors: "Happy Donors",
    reviews: "Reviews",
    recommend: "Would Recommend",
  },
  ar: {
    average: "متوسط التقييم",
    happyDonors: "متبرعين سعداء",
    reviews: "تقييم",
    recommend: "يوصون بالمنصة",
  },
} as const;

function ReviewsHighlightsSection({ lang }: ReviewsHighlightsSectionProps) {
  const copy = copyByLocale[lang];

  return (
    <section className="bg-[#f4f6f8] py-12 sm:py-14">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:grid-cols-2 sm:gap-12 sm:px-6 lg:grid-cols-4 lg:gap-8">
        <article className="flex flex-col items-center text-center">
          <div className="mb-4 flex items-center gap-1 text-[#f2b701]" aria-label="5 out of 5 stars">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} className="size-6 fill-current" />
            ))}
          </div>
          <p className="text-5xl font-extrabold tracking-tight text-(--hero-ink)">4.9/5</p>
          <p className="mt-2 text-lg text-(--hero-copy)">{copy.average}</p>
        </article>

        <article className="flex flex-col items-center text-center">
          <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-(--hero-soft-accent) text-(--hero-accent)">
            <Heart className="size-7" />
          </div>
          <p className="text-5xl font-extrabold tracking-tight text-(--hero-ink)">15K+</p>
          <p className="mt-2 text-lg text-(--hero-copy)">{copy.happyDonors}</p>
        </article>

        <article className="flex flex-col items-center text-center">
          <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-(--hero-soft-accent) text-(--hero-accent)">
            <Quote className="size-7" />
          </div>
          <p className="text-5xl font-extrabold tracking-tight text-(--hero-ink)">5K+</p>
          <p className="mt-2 text-lg text-(--hero-copy)">{copy.reviews}</p>
        </article>

        <article className="flex flex-col items-center text-center">
          <p className="text-5xl font-extrabold tracking-tight text-(--hero-accent)">98%</p>
          <p className="mt-2 text-lg text-(--hero-copy)">{copy.recommend}</p>
        </article>
      </div>
    </section>
  );
}

export default ReviewsHighlightsSection;