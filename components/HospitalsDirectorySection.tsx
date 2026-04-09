"use client";

import { useMemo, useState } from "react";

import { Building2, Clock3, Filter, MapPin, Phone, Search, X } from "lucide-react";

type StockLevel = "high" | "medium" | "low" | "critical";

type BloodStock = {
  type: string;
  level: StockLevel;
};

type HospitalCard = {
  name: string;
  location: string;
  phone: string;
  hours: string;
  stocks: BloodStock[];
};

type HospitalsDirectoryLabels = {
  searchPlaceholder: string;
  bloodTypeFilter: string;
  allBloodTypes: string;
  clearFilters: string;
  noResultsTitle: string;
  noResultsDescription: string;
  stats: {
    partnerHospitals: {
      value: string;
      label: string;
    };
    emergencySupport: {
      value: string;
      label: string;
    };
    verifiedFacilities: {
      value: string;
      label: string;
    };
  };
  foundTitle: string;
  foundDescription: string;
  stockStatusTitle: string;
  requestBlood: string;
  guideTitle: string;
  guide: {
    high: { label: string; description: string };
    medium: { label: string; description: string };
    low: { label: string; description: string };
    critical: { label: string; description: string };
  };
};

type HospitalsDirectorySectionProps = {
  lang: "ar" | "en";
  labels: HospitalsDirectoryLabels;
};

const stockStyles: Record<StockLevel, string> = {
  high: "bg-emerald-100 text-emerald-700",
  medium: "bg-amber-100 text-amber-700",
  low: "bg-orange-100 text-orange-700",
  critical: "bg-rose-100 text-rose-600",
};

const stockLabelByLocale: Record<"ar" | "en", Record<StockLevel, string>> = {
  en: {
    high: "High",
    medium: "Medium",
    low: "Low",
    critical: "Critical",
  },
  ar: {
    high: "مرتفع",
    medium: "متوسط",
    low: "منخفض",
    critical: "حرج",
  },
};

const guideBadgeByLocale: Record<"ar" | "en", Record<StockLevel, string>> = {
  en: {
    high: "High",
    medium: "Med",
    low: "Low",
    critical: "Crit",
  },
  ar: {
    high: "مرتفع",
    medium: "متوسط",
    low: "منخفض",
    critical: "حرج",
  },
};

const bloodTypeOptions = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"] as const;

const hospitalsByLocale: Record<"ar" | "en", HospitalCard[]> = {
  // Demo data modeled after well-known Egyptian hospitals and blood banks for a realistic presentation.
  en: [
    {
      name: "Kasr Al Ainy University Hospital",
      location: "El Manial, Cairo Governorate",
      phone: "+20 2 2363 6525",
      hours: "24/7 Emergency",
      stocks: [
        { type: "A+", level: "high" },
        { type: "A-", level: "medium" },
        { type: "B+", level: "high" },
        { type: "B-", level: "low" },
        { type: "O+", level: "high" },
        { type: "O-", level: "critical" },
        { type: "AB+", level: "medium" },
        { type: "AB-", level: "low" },
      ],
    },
    {
      name: "Ain Shams University Hospitals",
      location: "Abbassia, Cairo Governorate",
      phone: "+20 2 2402 3127",
      hours: "24/7 Emergency",
      stocks: [
        { type: "A+", level: "medium" },
        { type: "A-", level: "low" },
        { type: "B+", level: "high" },
        { type: "B-", level: "medium" },
        { type: "O+", level: "high" },
        { type: "O-", level: "low" },
        { type: "AB+", level: "high" },
        { type: "AB-", level: "critical" },
      ],
    },
    {
      name: "Dar Al Fouad Hospital",
      location: "6th of October City, Giza",
      phone: "+20 2 3835 6000",
      hours: "Mon-Sun: 24/7",
      stocks: [
        { type: "A+", level: "high" },
        { type: "A-", level: "high" },
        { type: "B+", level: "medium" },
        { type: "B-", level: "low" },
        { type: "O+", level: "high" },
        { type: "O-", level: "medium" },
        { type: "AB+", level: "high" },
        { type: "AB-", level: "medium" },
      ],
    },
    {
      name: "Alexandria Main University Hospital",
      location: "Smouha, Alexandria Governorate",
      phone: "+20 3 486 5731",
      hours: "24/7 Emergency",
      stocks: [
        { type: "A+", level: "medium" },
        { type: "A-", level: "medium" },
        { type: "B+", level: "high" },
        { type: "B-", level: "medium" },
        { type: "O+", level: "high" },
        { type: "O-", level: "critical" },
        { type: "AB+", level: "low" },
        { type: "AB-", level: "low" },
      ],
    },
    {
      name: "Al Salam International Hospital",
      location: "Heliopolis, Cairo Governorate",
      phone: "+20 2 2414 3900",
      hours: "Mon-Sun: 24/7",
      stocks: [
        { type: "A+", level: "high" },
        { type: "A-", level: "medium" },
        { type: "B+", level: "high" },
        { type: "B-", level: "medium" },
        { type: "O+", level: "high" },
        { type: "O-", level: "medium" },
        { type: "AB+", level: "high" },
        { type: "AB-", level: "critical" },
      ],
    },
    {
      name: "Misr International University Hospital",
      location: "Obour City, Cairo Governorate",
      phone: "+20 2 2405 0000",
      hours: "Mon-Sat: 8AM-10PM",
      stocks: [
        { type: "A+", level: "high" },
        { type: "A-", level: "low" },
        { type: "B+", level: "medium" },
        { type: "B-", level: "low" },
        { type: "O+", level: "high" },
        { type: "O-", level: "high" },
        { type: "AB+", level: "medium" },
        { type: "AB-", level: "low" },
      ],
    },
  ],
  // Arabic copy keeps the same demo facilities but localizes the presentation layer.
  ar: [
    {
      name: "مستشفى قصر العيني الجامعي",
      location: "المنيل، محافظة القاهرة",
      phone: "+20 2 2363 6525",
      hours: "طوارئ 24/7",
      stocks: [
        { type: "A+", level: "high" },
        { type: "A-", level: "medium" },
        { type: "B+", level: "high" },
        { type: "B-", level: "low" },
        { type: "O+", level: "high" },
        { type: "O-", level: "critical" },
        { type: "AB+", level: "medium" },
        { type: "AB-", level: "low" },
      ],
    },
    {
      name: "مستشفيات جامعة عين شمس",
      location: "العباسية، محافظة القاهرة",
      phone: "+20 2 2402 3127",
      hours: "طوارئ 24/7",
      stocks: [
        { type: "A+", level: "medium" },
        { type: "A-", level: "low" },
        { type: "B+", level: "high" },
        { type: "B-", level: "medium" },
        { type: "O+", level: "high" },
        { type: "O-", level: "low" },
        { type: "AB+", level: "high" },
        { type: "AB-", level: "critical" },
      ],
    },
    {
      name: "مستشفى دار الفؤاد",
      location: "مدينة 6 أكتوبر، الجيزة",
      phone: "+20 2 3835 6000",
      hours: "السبت-الجمعة: 24/7",
      stocks: [
        { type: "A+", level: "high" },
        { type: "A-", level: "high" },
        { type: "B+", level: "medium" },
        { type: "B-", level: "low" },
        { type: "O+", level: "high" },
        { type: "O-", level: "medium" },
        { type: "AB+", level: "high" },
        { type: "AB-", level: "medium" },
      ],
    },
    {
      name: "مستشفى الإسكندرية الجامعي الرئيسي",
      location: "سموحة، محافظة الإسكندرية",
      phone: "+20 3 486 5731",
      hours: "طوارئ 24/7",
      stocks: [
        { type: "A+", level: "medium" },
        { type: "A-", level: "medium" },
        { type: "B+", level: "high" },
        { type: "B-", level: "medium" },
        { type: "O+", level: "high" },
        { type: "O-", level: "critical" },
        { type: "AB+", level: "low" },
        { type: "AB-", level: "low" },
      ],
    },
    {
      name: "مستشفى السلام الدولي",
      location: "مصر الجديدة، محافظة القاهرة",
      phone: "+20 2 2414 3900",
      hours: "السبت-الجمعة: 24/7",
      stocks: [
        { type: "A+", level: "high" },
        { type: "A-", level: "medium" },
        { type: "B+", level: "high" },
        { type: "B-", level: "medium" },
        { type: "O+", level: "high" },
        { type: "O-", level: "medium" },
        { type: "AB+", level: "high" },
        { type: "AB-", level: "critical" },
      ],
    },
    {
      name: "مستشفى مصر الدولي الجامعي",
      location: "مدينة العبور، محافظة القاهرة",
      phone: "+20 2 2405 0000",
      hours: "السبت-الخميس: 8 ص - 10 م",
      stocks: [
        { type: "A+", level: "high" },
        { type: "A-", level: "low" },
        { type: "B+", level: "medium" },
        { type: "B-", level: "low" },
        { type: "O+", level: "high" },
        { type: "O-", level: "high" },
        { type: "AB+", level: "medium" },
        { type: "AB-", level: "low" },
      ],
    },
  ],
};

function BloodBadge({ type, level, lang }: BloodStock & { lang: "ar" | "en" }) {
  const levelLabel = stockLabelByLocale[lang][level];

  return (
    <div className={`rounded-2xl px-3 py-3 text-center ${stockStyles[level]}`}>
      <p className="text-lg font-extrabold leading-none">{type}</p>
      <p className="mt-1 text-sm font-medium">{levelLabel}</p>
    </div>
  );
}

function normalizeText(value: string) {
  return value.toLowerCase().trim();
}

function HospitalsDirectorySection({ lang, labels }: HospitalsDirectorySectionProps) {
  const hospitals = hospitalsByLocale[lang];
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBloodType, setSelectedBloodType] = useState<(typeof bloodTypeOptions)[number] | "all">("all");

  // Keep the filtering logic client-side so the search bar and blood type selector react instantly.
  const filteredHospitals = useMemo(() => {
    const query = normalizeText(searchQuery);

    return hospitals.filter((hospital) => {
      const matchesQuery =
        query.length === 0 ||
        normalizeText(hospital.name).includes(query) ||
        normalizeText(hospital.location).includes(query);

      const matchesBloodType =
        selectedBloodType === "all" || hospital.stocks.some((stock) => stock.type === selectedBloodType);

      return matchesQuery && matchesBloodType;
    });
  }, [hospitals, searchQuery, selectedBloodType]);

  const resultCount = filteredHospitals.length;

  const foundTitle =
    lang === "ar"
      ? `تم العثور على ${resultCount} ${resultCount === 1 ? "مستشفى" : "مستشفيات"}`
      : `${resultCount} ${resultCount === 1 ? "Hospital" : "Hospitals"} Found`;

  const canClearFilters = searchQuery.length > 0 || selectedBloodType !== "all";

  // Match the directory cards and guide below the overview using localized demo data.
  return (
    <>
      <section className="bg-[#f7f9fb] py-12 sm:py-14 lg:py-16">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_250px]">
            <label className="flex h-16 items-center gap-3 rounded-2xl border border-[#dce2ea] bg-white px-5 shadow-[0_8px_24px_rgb(19_31_57/0.04)]">
              <Search className="size-5 shrink-0 text-slate-400" />
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder={labels.searchPlaceholder}
                aria-label={labels.searchPlaceholder}
                className="h-full w-full bg-transparent text-lg text-slate-500 outline-none placeholder:text-slate-400"
              />
            </label>

            <div className="flex h-16 items-center gap-3 rounded-2xl border border-[#dce2ea] bg-white px-5 shadow-[0_8px_24px_rgb(19_31_57/0.04)]">
              <Filter className="size-5 shrink-0 text-slate-400" />
              <select
                value={selectedBloodType}
                onChange={(event) =>
                  setSelectedBloodType(event.target.value === "all" ? "all" : (event.target.value as (typeof bloodTypeOptions)[number]))
                }
                aria-label={labels.bloodTypeFilter}
                className="h-full w-full cursor-pointer bg-transparent text-lg text-slate-900 outline-none"
              >
                <option value="all">{labels.allBloodTypes}</option>
                {bloodTypeOptions.map((bloodType) => (
                  <option key={bloodType} value={bloodType}>
                    {bloodType}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <article className="rounded-3xl border border-[#e6eaf0] bg-white p-8 text-center shadow-[0_10px_26px_rgb(19_31_57/0.05)]">
              <p className="text-5xl font-extrabold tracking-tight text-(--hero-accent)">
                {labels.stats.partnerHospitals.value}
              </p>
              <p className="mt-4 text-xl text-(--hero-copy)">{labels.stats.partnerHospitals.label}</p>
            </article>

            <article className="rounded-3xl border border-[#e6eaf0] bg-white p-8 text-center shadow-[0_10px_26px_rgb(19_31_57/0.05)]">
              <p className="text-5xl font-extrabold tracking-tight text-(--hero-accent)">
                {labels.stats.emergencySupport.value}
              </p>
              <p className="mt-4 text-xl text-(--hero-copy)">{labels.stats.emergencySupport.label}</p>
            </article>

            <article className="rounded-3xl border border-[#e6eaf0] bg-white p-8 text-center shadow-[0_10px_26px_rgb(19_31_57/0.05)]">
              <p className="text-5xl font-extrabold tracking-tight text-(--hero-accent)">
                {labels.stats.verifiedFacilities.value}
              </p>
              <p className="mt-4 text-xl text-(--hero-copy)">{labels.stats.verifiedFacilities.label}</p>
            </article>
          </div>

          <header className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-4xl font-extrabold tracking-tight text-(--hero-ink)">{foundTitle}</h2>
              <p className="mt-3 text-xl text-(--hero-copy)">{labels.foundDescription}</p>
            </div>

            {canClearFilters ? (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedBloodType("all");
                }}
                className="inline-flex h-12 items-center gap-2 self-start rounded-xl border border-[#dce2ea] bg-white px-5 text-base font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <X className="size-4" />
                {labels.clearFilters}
              </button>
            ) : null}
          </header>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {filteredHospitals.map((hospital) => (
              <article
                key={hospital.name}
                className="rounded-3xl border border-[#e2e6ed] bg-white p-6 shadow-[0_10px_28px_rgb(19_31_57/0.05)] sm:p-7"
              >
                <div className="flex items-start gap-4">
                  <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-[#fde8e8] text-(--hero-accent)">
                    <Building2 className="size-7" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-extrabold tracking-tight text-(--hero-ink)">{hospital.name}</h3>
                    <div className="mt-2 space-y-1 text-base text-(--hero-copy)">
                      <p className="flex items-center gap-2">
                        <MapPin className="size-4 shrink-0" />
                        {hospital.location}
                      </p>
                      <p className="flex items-center gap-2">
                        <Phone className="size-4 shrink-0" />
                        {hospital.phone}
                      </p>
                      <p className="flex items-center gap-2">
                        <Clock3 className="size-4 shrink-0" />
                        {hospital.hours}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 border-t border-slate-100 pt-5">
                  <p className="text-lg font-bold text-(--hero-ink)">{labels.stockStatusTitle}</p>
                  <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {hospital.stocks.map((stock) => (
                      <BloodBadge key={`${hospital.name}-${stock.type}`} lang={lang} {...stock} />
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  className="mt-6 inline-flex h-14 w-full items-center justify-center rounded-xl bg-(--hero-accent) px-6 text-lg font-bold text-white transition hover:bg-(--hero-accent-strong)"
                >
                  {labels.requestBlood}
                </button>
              </article>
            ))}
          </div>

          {resultCount === 0 ? (
            <div className="mt-8 rounded-3xl border border-dashed border-[#d8dee8] bg-white p-10 text-center">
              <h3 className="text-3xl font-extrabold tracking-tight text-(--hero-ink)">{labels.noResultsTitle}</h3>
              <p className="mt-3 text-lg text-(--hero-copy)">{labels.noResultsDescription}</p>
            </div>
          ) : null}
        </div>
      </section>

      <section className="bg-[#f7f9fb] py-12 sm:py-14 lg:py-16">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
          <article className="rounded-3xl border border-[#e2e6ed] bg-white p-8 shadow-[0_10px_28px_rgb(19_31_57/0.05)] sm:p-10">
            <h2 className="text-3xl font-extrabold tracking-tight text-(--hero-ink)">{labels.guideTitle}</h2>

            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {([
                ["high", labels.guide.high],
                ["medium", labels.guide.medium],
                ["low", labels.guide.low],
                ["critical", labels.guide.critical],
              ] as const).map(([key, item]) => (
                <div key={key} className="flex items-start gap-4">
                  <div className={`rounded-2xl px-4 py-4 text-xl font-extrabold ${stockStyles[key]}`}>
                    {guideBadgeByLocale[lang][key]}
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-(--hero-ink)">{item.label}</p>
                    <p className="mt-1 text-lg text-(--hero-copy)">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>
    </>
  );
}

export default HospitalsDirectorySection;