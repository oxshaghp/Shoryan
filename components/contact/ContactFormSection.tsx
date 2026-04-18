import { Clock3, Heart, Send } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

import type { AppLocale } from "@/lib/i18n/config";

type ContactFormSectionProps = {
  lang: AppLocale;
};

const copyByLocale = {
  en: {
    formTitle: "Send Us a Message",
    formDescription: "Fill out the form below and we'll get back to you as soon as possible",
    fullName: "Full Name *",
    fullNamePlaceholder: "Enter your name",
    email: "Email Address *",
    emailPlaceholder: "your.email@example.com",
    phone: "Phone Number",
    phonePlaceholder: "+1 (555) 123-4567",
    subject: "Subject *",
    message: "Message *",
    messagePlaceholder: "Tell us how we can help you...",
    sendMessage: "Send Message",
    quickActions: "Quick Actions",
    needBlood: "I Need Blood Urgently",
    donateBlood: "I Want to Donate Blood",
    officeHours: "Office Hours",
    hotline: "Emergency Hotline",
    hotlineTime: "Available 24/7",
    support: "General Support",
    supportTime: "Mon-Sun: 8AM-10PM",
    office: "Office",
    officeTime: "Mon-Fri: 9AM-6PM",
    followUs: "Follow Us",
    followDescription:
      "Stay connected with us on social media for updates, stories, and community events",
  },
  ar: {
    formTitle: "أرسل لنا رسالة",
    formDescription: "املأ النموذج وسنعاود التواصل معك في أقرب وقت ممكن",
    fullName: "الاسم الكامل *",
    fullNamePlaceholder: "اكتب اسمك",
    email: "البريد الإلكتروني *",
    emailPlaceholder: "your.email@example.com",
    phone: "رقم الهاتف",
    phonePlaceholder: "+20 100 123 4567",
    subject: "الموضوع *",
    message: "الرسالة *",
    messagePlaceholder: "اكتب كيف نقدر نساعدك...",
    sendMessage: "إرسال الرسالة",
    quickActions: "إجراءات سريعة",
    needBlood: "أحتاج دم بشكل عاجل",
    donateBlood: "أرغب في التبرع بالدم",
    officeHours: "مواعيد العمل",
    hotline: "الخط الساخن للطوارئ",
    hotlineTime: "متاح 24/7",
    support: "الدعم العام",
    supportTime: "الأحد-السبت: 8 ص - 10 م",
    office: "المكتب",
    officeTime: "الاثنين-الجمعة: 9 ص - 6 م",
    followUs: "تابعنا",
    followDescription: "ابق على تواصل معنا عبر منصات التواصل لمتابعة الأخبار والقصص والفعاليات",
  },
} as const;

function ContactFormSection({ lang }: ContactFormSectionProps) {
  const copy = copyByLocale[lang];

  return (
    <section className="bg-[#f1f3f5] pb-16 sm:pb-20">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.02fr_1fr] lg:items-start">
        <article className="rounded-3xl border border-[#e2e6ec] bg-white p-8 shadow-[0_10px_28px_rgb(19_31_57/0.06)] sm:p-10">
          <h2 className="text-5xl font-extrabold tracking-tight text-(--hero-ink)">{copy.formTitle}</h2>
          <p className="mt-4 text-lg leading-8 text-(--hero-copy)">{copy.formDescription}</p>

          <form className="mt-8 space-y-5">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-(--hero-ink)">{copy.fullName}</span>
              <input
                type="text"
                placeholder={copy.fullNamePlaceholder}
                className="h-13 w-full rounded-xl border border-[#dde3ea] bg-white px-4 text-base text-(--hero-ink) outline-none transition focus:border-(--hero-accent) focus:ring-3 focus:ring-(--hero-soft-accent)"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-(--hero-ink)">{copy.email}</span>
              <input
                type="email"
                placeholder={copy.emailPlaceholder}
                className="h-13 w-full rounded-xl border border-[#dde3ea] bg-white px-4 text-base text-(--hero-ink) outline-none transition focus:border-(--hero-accent) focus:ring-3 focus:ring-(--hero-soft-accent)"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-(--hero-ink)">{copy.phone}</span>
              <input
                type="tel"
                placeholder={copy.phonePlaceholder}
                className="h-13 w-full rounded-xl border border-[#dde3ea] bg-white px-4 text-base text-(--hero-ink) outline-none transition focus:border-(--hero-accent) focus:ring-3 focus:ring-(--hero-soft-accent)"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-(--hero-ink)">{copy.subject}</span>
              <input
                type="text"
                defaultValue={lang === "ar" ? "استفسار عام" : "General Inquiry"}
                className="h-13 w-full rounded-xl border border-[#dde3ea] bg-white px-4 text-base text-(--hero-ink) outline-none transition focus:border-(--hero-accent) focus:ring-3 focus:ring-(--hero-soft-accent)"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-(--hero-ink)">{copy.message}</span>
              <textarea
                rows={6}
                placeholder={copy.messagePlaceholder}
                className="w-full rounded-xl border border-[#dde3ea] bg-white px-4 py-3 text-base text-(--hero-ink) outline-none transition focus:border-(--hero-accent) focus:ring-3 focus:ring-(--hero-soft-accent)"
              />
            </label>

            <button
              type="button"
              className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-(--hero-accent) px-6 text-xl font-bold text-white shadow-[0_12px_28px_-14px_var(--hero-shadow-strong)] transition hover:bg-(--hero-accent-strong)"
            >
              <Send className="size-5" />
              {copy.sendMessage}
            </button>
          </form>
        </article>

        <div className="space-y-6">
          <article className="rounded-3xl border border-[#e2e6ec] bg-white p-8 shadow-[0_10px_28px_rgb(19_31_57/0.06)]">
            <h3 className="text-4xl font-extrabold tracking-tight text-(--hero-ink)">{copy.quickActions}</h3>

            <div className="mt-5 space-y-3">
              <button
                type="button"
                className="inline-flex h-13 w-full items-center gap-3 rounded-xl bg-(--hero-accent) px-5 text-lg font-bold text-white"
              >
                <Heart className="size-5" />
                {copy.needBlood}
              </button>

              <button
                type="button"
                className="inline-flex h-13 w-full items-center gap-3 rounded-xl border-2 border-(--hero-accent) bg-white px-5 text-lg font-bold text-(--hero-accent)"
              >
                <Heart className="size-5" />
                {copy.donateBlood}
              </button>
            </div>
          </article>

          <article className="rounded-3xl border border-[#e2e6ec] bg-white p-8 shadow-[0_10px_28px_rgb(19_31_57/0.06)]">
            <h3 className="text-4xl font-extrabold tracking-tight text-(--hero-ink)">{copy.officeHours}</h3>

            <ul className="mt-6 space-y-5">
              <li className="flex items-start gap-3">
                <Clock3 className="mt-1 size-5 text-(--hero-accent)" />
                <div>
                  <p className="text-2xl font-bold text-(--hero-ink)">{copy.hotline}</p>
                  <p className="text-lg text-(--hero-copy)">{copy.hotlineTime}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock3 className="mt-1 size-5 text-(--hero-accent)" />
                <div>
                  <p className="text-2xl font-bold text-(--hero-ink)">{copy.support}</p>
                  <p className="text-lg text-(--hero-copy)">{copy.supportTime}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock3 className="mt-1 size-5 text-(--hero-accent)" />
                <div>
                  <p className="text-2xl font-bold text-(--hero-ink)">{copy.office}</p>
                  <p className="text-lg text-(--hero-copy)">{copy.officeTime}</p>
                </div>
              </li>
            </ul>
          </article>

          <article className="rounded-3xl border border-[#e2e6ec] bg-white p-8 shadow-[0_10px_28px_rgb(19_31_57/0.06)]">
            <h3 className="text-4xl font-extrabold tracking-tight text-(--hero-ink)">{copy.followUs}</h3>
            <p className="mt-4 text-lg leading-8 text-(--hero-copy)">{copy.followDescription}</p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="inline-flex size-12 items-center justify-center rounded-xl bg-(--hero-soft-accent) text-(--hero-accent) transition hover:bg-(--hero-accent) hover:text-white"
              >
                <FaFacebookF className="size-5" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="inline-flex size-12 items-center justify-center rounded-xl bg-(--hero-soft-accent) text-(--hero-accent) transition hover:bg-(--hero-accent) hover:text-white"
              >
                <FaXTwitter className="size-5" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="inline-flex size-12 items-center justify-center rounded-xl bg-(--hero-soft-accent) text-(--hero-accent) transition hover:bg-(--hero-accent) hover:text-white"
              >
                <FaInstagram className="size-5" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="inline-flex size-12 items-center justify-center rounded-xl bg-(--hero-soft-accent) text-(--hero-accent) transition hover:bg-(--hero-accent) hover:text-white"
              >
                <FaLinkedinIn className="size-5" />
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export default ContactFormSection;