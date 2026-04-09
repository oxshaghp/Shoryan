import { Mail, MapPin, Phone } from "lucide-react";

import type { AppLocale } from "@/lib/i18n/config";

type ContactInfoCardsSectionProps = {
  lang: AppLocale;
};

const copyByLocale = {
  en: {
    cards: [
      {
        title: "Emergency Hotline",
        primary: "123-456-7890",
        secondary: "Available 24/7 for urgent requests",
        icon: Phone,
      },
      {
        title: "Email Us",
        primary: "info@sharyan.org",
        secondary: "Response within 24 hours",
        icon: Mail,
      },
      {
        title: "Visit Us",
        primary: "123 Healthcare Plaza",
        secondary: "Medical District, City\nMon-Fri: 9AM-6PM",
        icon: MapPin,
      },
    ],
  },
  ar: {
    cards: [
      {
        title: "الخط الساخن للطوارئ",
        primary: "123-456-7890",
        secondary: "متاح 24/7 للطلبات العاجلة",
        icon: Phone,
      },
      {
        title: "راسلنا بالبريد",
        primary: "info@sharyan.org",
        secondary: "الرد خلال 24 ساعة",
        icon: Mail,
      },
      {
        title: "زورنا",
        primary: "123 مجمع الرعاية الصحية",
        secondary: "الحي الطبي، المدينة\nالاثنين-الجمعة: 9 ص - 6 م",
        icon: MapPin,
      },
    ],
  },
} as const;

function ContactInfoCardsSection({ lang }: ContactInfoCardsSectionProps) {
  const copy = copyByLocale[lang];

  return (
    <section className="bg-[#f1f3f5] py-12 sm:py-14">
      <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-3">
        {copy.cards.map((card) => {
          const Icon = card.icon;

          return (
            <article
              key={card.title}
              className="rounded-3xl border border-[#e3e7ed] bg-[#fbf7f8] p-8 text-center shadow-[0_10px_26px_rgb(19_31_57/0.06)]"
            >
              <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-(--hero-accent) text-white">
                <Icon className="size-8" />
              </div>

              <h3 className="text-4xl font-extrabold tracking-tight text-(--hero-ink)">{card.title}</h3>
              <p className="mt-5 text-4xl font-bold text-(--hero-accent)">{card.primary}</p>
              <p className="mt-4 text-lg leading-8 text-(--hero-copy) whitespace-pre-line">{card.secondary}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default ContactInfoCardsSection;