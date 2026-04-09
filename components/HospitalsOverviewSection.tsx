import { Filter, Search } from "lucide-react";

type HospitalsOverviewLabels = {
  searchPlaceholder: string;
  bloodTypeFilter: string;
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
};

type HospitalsOverviewSectionProps = {
  labels: HospitalsOverviewLabels;
};

function HospitalsOverviewSection({ labels }: HospitalsOverviewSectionProps) {
  // Render the search controls and high-level summary cards above the directory.
  return (
    <section className="bg-[#f7f9fb] py-12 sm:py-14 lg:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_250px]">
          <label className="flex h-16 items-center gap-3 rounded-2xl border border-[#dce2ea] bg-white px-5 shadow-[0_8px_24px_rgb(19_31_57/0.04)]">
            <Search className="size-5 shrink-0 text-slate-400" />
            <input
              type="text"
              readOnly
              aria-label={labels.searchPlaceholder}
              placeholder={labels.searchPlaceholder}
              defaultValue=""
              className="h-full w-full bg-transparent text-lg text-slate-500 outline-none placeholder:text-slate-400"
            />
          </label>

          <div className="flex h-16 items-center gap-3 rounded-2xl border border-[#dce2ea] bg-white px-5 shadow-[0_8px_24px_rgb(19_31_57/0.04)]">
            <Filter className="size-5 shrink-0 text-slate-400" />
            <span className="text-lg text-slate-900">{labels.bloodTypeFilter}</span>
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
      </div>
    </section>
  );
}

export default HospitalsOverviewSection;