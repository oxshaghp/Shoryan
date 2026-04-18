import { notFound } from "next/navigation";

import ContactFormSection from "@/components/contact/ContactFormSection";
import ContactInfoCardsSection from "@/components/contact/ContactInfoCardsSection";
import HeadSection from "@/components/shared/HeadSection";
import { hasLocale } from "@/lib/i18n/config";

type ContactPageProps = {
  params: Promise<{ lang: string }>;
};

const pageCopy = {
  en: {
    title: (
      <>
        Get in <span className="text-(--hero-accent)">Touch</span>
      </>
    ),
    description: "Have questions or need assistance? We're here to help 24/7. Reach out to us anytime.",
  },
  ar: {
    title: (
      <>
        تواصل <span className="text-(--hero-accent)">معنا</span>
      </>
    ),
    description: "هل لديك استفسار أو تحتاج مساعدة؟ فريقنا متاح لخدمتك على مدار الساعة.",
  },
} as const;

async function ContactPage({ params }: ContactPageProps) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const copy = pageCopy[lang];

  return (
    <section className="bg-white">
      <HeadSection
        surface
        title={copy.title}
        description={copy.description}
        highlightSecondWord={false}
        descriptionClassName="mx-auto max-w-4xl"
      />

      <ContactInfoCardsSection lang={lang} />
      <ContactFormSection lang={lang} />
    </section>
  );
}

export default ContactPage;