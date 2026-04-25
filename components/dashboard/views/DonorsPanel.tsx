import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { toggleDonorActive } from "@/server/admin";
import type { DashboardViewProps } from "@/types/types";
import SectionPanelShell from "@/components/dashboard/views/SectionPanelShell";

function DonorsPanel({ sectionName, title, description, snapshot, ui }: DashboardViewProps) {
  const router = useRouter();
  const donors = snapshot.donors.items;
  const [query, setQuery] = useState("");
  const [availability, setAvailability] = useState(ui.common.all);
  const [page, setPage] = useState(1);
  const [isPending, startTransition] = useTransition();

  const filtered = useMemo(() => {
    return donors.filter((donor) => {
      const matchesQuery =
        donor.name.toLowerCase().includes(query.toLowerCase()) ||
        donor.bloodType.toLowerCase().includes(query.toLowerCase()) ||
        donor.mobile.includes(query);

      if (availability === ui.common.all) {
        return matchesQuery;
      }

      const expected = availability === ui.common.available;
      return matchesQuery && donor.isAvailable === expected;
    });
  }, [availability, donors, query, ui.common.all, ui.common.available]);

  const pageSize = 4;
  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, pages);
  const paged = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  const handleToggle = (id: string) => {
    startTransition(() => {
      void (async () => {
        await toggleDonorActive(id);
        router.refresh();
      })();
    });
  };

  return (
    <SectionPanelShell sectionName={sectionName} title={title} description={description}>
      <div className="rounded-2xl border border-(--hero-border-soft) p-4">
        <p className="mb-3 text-sm font-semibold text-(--hero-copy)">
          {ui.common.total}: {snapshot.donors.total}
        </p>

        <div className="mb-4 grid gap-3 sm:grid-cols-2">
          <input
            value={query}
            onChange={(event) => {
              setPage(1);
              setQuery(event.target.value);
            }}
            placeholder={ui.donors.searchPlaceholder}
            className="h-11 rounded-xl border border-(--hero-border-soft) bg-white px-3 text-sm text-(--hero-ink) outline-none"
          />

          <select
            value={availability}
            onChange={(event) => {
              setPage(1);
              setAvailability(event.target.value);
            }}
            className="h-11 rounded-xl border border-(--hero-border-soft) bg-white px-3 text-sm text-(--hero-ink) outline-none"
          >
            <option value={ui.common.all}>{ui.common.all}</option>
            <option value={ui.common.available}>{ui.common.available}</option>
            <option value={ui.common.unavailable}>{ui.common.unavailable}</option>
          </select>
        </div>

        <div className="space-y-3">
          {paged.length === 0 ? (
            <div className="rounded-xl bg-(--hero-card) p-4 text-sm text-(--hero-copy)">{ui.common.noData}</div>
          ) : (
            paged.map((donor) => (
              <div key={donor.id} className="rounded-xl border border-(--hero-border-soft) bg-(--hero-card) p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-bold text-(--hero-ink)">{donor.name}</p>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-(--hero-copy)">{donor.bloodType}</span>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-(--hero-copy)">
                      {donor.isAvailable ? ui.common.available : ui.common.unavailable}
                    </span>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-(--hero-copy)">
                      {donor.isActive ? ui.common.active : ui.common.inactive}
                    </span>
                  </div>
                </div>
                <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm text-(--hero-copy)">{donor.mobile}</p>
                  <button
                    type="button"
                    disabled={isPending}
                    onClick={() => handleToggle(donor.id)}
                    className="rounded-lg border border-(--hero-border-soft) bg-white px-3 py-1 text-xs font-semibold text-(--hero-ink) disabled:opacity-50"
                  >
                    {ui.common.toggleStatus}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <button
            type="button"
            disabled={safePage <= 1}
            onClick={() => setPage((value) => Math.max(1, value - 1))}
            className="rounded-lg border border-(--hero-border-soft) px-3 py-2 text-xs font-semibold disabled:opacity-50"
          >
            {ui.common.previous}
          </button>

          <p className="text-xs text-(--hero-copy)">
            {ui.common.page} {safePage} {ui.common.of} {pages}
          </p>

          <button
            type="button"
            disabled={safePage >= pages}
            onClick={() => setPage((value) => Math.min(pages, value + 1))}
            className="rounded-lg border border-(--hero-border-soft) px-3 py-2 text-xs font-semibold disabled:opacity-50"
          >
            {ui.common.next}
          </button>
        </div>
      </div>
    </SectionPanelShell>
  );
}

export default DonorsPanel;
