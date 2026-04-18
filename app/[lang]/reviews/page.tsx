import { notFound } from "next/navigation";

import CustomerReviewsSection from "@/components/reviews/CustomerReviewsSection";
import HeadSection from "@/components/shared/HeadSection";
import ReviewsHighlightsSection from "@/components/reviews/ReviewsHighlightsSection";
import ReviewsTrustSection from "@/components/reviews/ReviewsTrustSection";
import { hasLocale } from "@/lib/i18n/config";
import ReadySection from "@/components/shared/ReadySection";
import { getDictionary } from "@/lib/i18n/dictionaries";

type ReviewsPageProps = {
  params: Promise<{ lang: string }>;
};

const pageCopy = {
  en: {
    title: "What Our Community Says",
    description:
      "Real stories from donors, patients, and healthcare professionals who have experienced the impact of Sharyan",
  },
  ar: {
    title: "ماذا يقول مجتمعنا",
    description:
      "قصص حقيقية من المتبرعين والمرضى والكوادر الطبية الذين لمسوا أثر منصة شريان",
  },
} as const;

async function ReviewsPage({ params }: ReviewsPageProps) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }
  const dict = await getDictionary(lang);

  const copy = pageCopy[lang];

  return (
    <section className="bg-white">
      <HeadSection surface title={copy.title} description={copy.description} />

      <ReviewsHighlightsSection lang={lang} />
      <CustomerReviewsSection lang={lang} />
      <ReviewsTrustSection lang={lang} />
      <ReadySection lang={lang} labels={dict.ready} />
    
    </section>
  );
}

export default ReviewsPage;