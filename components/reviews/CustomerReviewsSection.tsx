import { Star } from "lucide-react";

import type { AppLocale } from "@/lib/i18n/config";

type CustomerReview = {
  name: string;
  role: string;
  date: string;
  text: string;
};

type CustomerReviewsSectionProps = {
  lang: AppLocale;
};

const reviewsByLocale: Record<AppLocale, CustomerReview[]> = {
  en: [
    {
      name: "Sarah Johnson",
      role: "Blood Donor",
      date: "March 15, 2026",
      text: "Sharyan made blood donation so easy. I registered in minutes and was matched with a nearby hospital the same day.",
    },
    {
      name: "Dr. Ahmed Hassan",
      role: "Emergency Physician, Central Medical",
      date: "March 10, 2026",
      text: "As an emergency physician, time is critical. Sharyan has transformed how we quickly find verified blood donors.",
    },
    {
      name: "Michael Chen",
      role: "Patient Family Member",
      date: "March 5, 2026",
      text: "When my father urgently needed blood, Sharyan connected us with donors faster than we expected. It made all the difference.",
    },
  ],
  ar: [
    {
      name: "سارة جونسون",
      role: "متبرعة بالدم",
      date: "15 مارس 2026",
      text: "منصة شريان سهلت التبرع جدًا. سجلت خلال دقائق وتم توصيلي بأقرب مستشفى في نفس اليوم.",
    },
    {
      name: "د. أحمد حسن",
      role: "طبيب طوارئ - سنترال ميديكال",
      date: "10 مارس 2026",
      text: "في الطوارئ كل دقيقة مهمة. شريان غيرت طريقة الوصول السريع لمتبرعين موثقين بالدم.",
    },
    {
      name: "مايكل تشين",
      role: "أحد أفراد أسرة مريض",
      date: "5 مارس 2026",
      text: "لما والدي احتاج نقل دم بشكل عاجل، شريان وصلتنا بمتبرعين بسرعة كبيرة وكان ده فارق جدًا.",
    },
  ],
};

function initialsFromName(name: string) {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((part) => part.charAt(0)).join("").toUpperCase();
}

function CustomerReviewsSection({ lang }: CustomerReviewsSectionProps) {
  const reviews = reviewsByLocale[lang];

  return (
    <section className=" py-14 sm:py-16">
      <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-3">
        {reviews.map((review) => (
          <article
            key={`${review.name}-${review.date}`}
            className="rounded-3xl border border-[#e7eaef] bg-white p-7 shadow-[0_10px_28px_rgb(19_31_57/0.06)]"
          >
            <header className="mb-5 flex items-start gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-(--hero-accent) text-base font-bold text-white">
                {initialsFromName(review.name)}
              </div>

              <div>
                <h3 className="text-2xl font-bold leading-tight text-(--hero-ink)">{review.name}</h3>
                <p className="mt-1 text-base text-(--hero-copy)">{review.role}</p>
              </div>
            </header>

            <div className="mb-5 flex items-center gap-3">
              <div className="flex items-center gap-1 text-[#f2b701]" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="size-4 fill-current" />
                ))}
              </div>
              <p className="text-sm font-medium text-(--hero-copy)">{review.date}</p>
            </div>

            <p className="text-base leading-8 text-(--hero-copy)">{review.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default CustomerReviewsSection;