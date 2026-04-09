import type { AppLocale } from "@/lib/i18n/config";

type ReviewsTrustSectionProps = {
  lang: AppLocale;
};

const copyByLocale = {
  en: {
    title: "Trusted by Thousands",
    description: "Join our community of life-savers making a difference every day",
    cards: [
      {
        value: "100%",
        title: "Verified Users",
        description: "All donors and hospitals undergo thorough verification",
      },
      {
        value: "24/7",
        title: "Support",
        description: "Round-the-clock assistance for urgent requests",
      },
      {
        value: "<15m",
        title: "Average Response Time",
        description: "Fast matching for urgent blood needs",
      },
    ],
  },
  ar: {
    title: "موثوق بنا من الآلاف",
    description: "انضم لمجتمع من صناع الأثر ينقذ حياة كل يوم",
    cards: [
      {
        value: "100%",
        title: "مستخدمون موثقون",
        description: "جميع المتبرعين والمستشفيات يمرون بعملية تحقق دقيقة",
      },
      {
        value: "24/7",
        title: "دعم متواصل",
        description: "مساعدة مستمرة على مدار الساعة للحالات العاجلة",
      },
      {
        value: "<15m",
        title: "متوسط وقت الاستجابة",
        description: "مطابقة سريعة لطلبات الدم الطارئة",
      },
    ],
  },
} as const;

function ReviewsTrustSection({ lang }: ReviewsTrustSectionProps) {
  const copy = copyByLocale[lang];

  return (
    <section className="bg-[#eef1f4] py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <header className="mx-auto max-w-3xl text-center">
          <h2 className="text-5xl font-extrabold tracking-tight text-(--hero-ink)">{copy.title}</h2>
          <p className="mt-5 text-xl text-(--hero-copy)">{copy.description}</p>
        </header>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {copy.cards.map((card) => (
            <article
              key={card.title}
              className="rounded-3xl border border-[#dde2e9] bg-white p-8 text-center shadow-[0_12px_30px_rgb(19_31_57/0.06)]"
            >
              <p className="text-6xl font-extrabold leading-none tracking-tight text-(--hero-accent)">{card.value}</p>
              <h3 className="mt-5 text-3xl font-bold text-(--hero-ink)">{card.title}</h3>
              <p className="mt-4 text-lg leading-8 text-(--hero-copy)">{card.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ReviewsTrustSection;