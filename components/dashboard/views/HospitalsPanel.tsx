import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { approveBloodBank, rejectBloodBank, suspendBloodBank } from "@/server/admin";
import type { DashboardViewProps } from "@/types/types";
import SectionPanelShell from "@/components/dashboard/views/SectionPanelShell";

function HospitalsPanel({ sectionName, title, description, snapshot, ui }: DashboardViewProps) {
  const router = useRouter();
  const approved = snapshot.hospitals.approvedItems;
  const pending = snapshot.hospitals.pendingItems;
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  const approvedFiltered = useMemo(
    () => approved.filter((bank) => bank.name.toLowerCase().includes(query.toLowerCase()) || bank.city.toLowerCase().includes(query.toLowerCase())),
    [approved, query]
  );
  const pendingFiltered = useMemo(
    () => pending.filter((bank) => bank.name.toLowerCase().includes(query.toLowerCase()) || bank.city.toLowerCase().includes(query.toLowerCase())),
    [pending, query]
  );

  const handleAction = (action: "approve" | "reject" | "suspend", id: string) => {
    startTransition(() => {
      void (async () => {
        if (action === "approve") {
          await approveBloodBank(id);
        }

        if (action === "reject") {
          await rejectBloodBank(id);
        }

        if (action === "suspend") {
          await suspendBloodBank(id);
        }

        router.refresh();
      })();
    });
  };

  return (
    <SectionPanelShell sectionName={sectionName} title={title} description={description}>
      <div className="mb-4">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={ui.hospitals.searchPlaceholder}
          className="h-11 w-full rounded-xl border border-(--hero-border-soft) bg-white px-3 text-sm text-(--hero-ink) outline-none"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-2xl border border-(--hero-border-soft) p-4">
          <p className="mb-3 text-sm font-semibold text-(--hero-copy)">
            {ui.common.approved}: {snapshot.hospitals.approvedTotal}
          </p>
          <div className="space-y-3">
            {approvedFiltered.length === 0 ? (
              <div className="rounded-xl bg-(--hero-card) p-3 text-sm text-(--hero-copy)">{ui.hospitals.noApproved}</div>
            ) : (
              approvedFiltered.map((bank) => (
                <div key={bank.id} className="rounded-xl bg-(--hero-card) p-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-semibold text-(--hero-ink)">{bank.name}</p>
                    <button
                      type="button"
                      disabled={isPending}
                      onClick={() => handleAction("suspend", bank.id)}
                      className="rounded-lg border border-(--hero-border-soft) bg-white px-3 py-1 text-xs font-semibold text-(--hero-ink) disabled:opacity-50"
                    >
                      {ui.common.suspend}
                    </button>
                  </div>
                  <p className="text-sm text-(--hero-copy)">{bank.city} • {bank.phone}</p>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="rounded-2xl border border-(--hero-border-soft) p-4">
          <p className="mb-3 text-sm font-semibold text-(--hero-copy)">
            {ui.common.pending}: {snapshot.hospitals.pendingTotal}
          </p>
          <div className="space-y-3">
            {pendingFiltered.length === 0 ? (
              <div className="rounded-xl bg-(--hero-card) p-3 text-sm text-(--hero-copy)">{ui.hospitals.noPending}</div>
            ) : (
              pendingFiltered.map((bank) => (
                <div key={bank.id} className="rounded-xl bg-(--hero-card) p-3">
                  <p className="font-semibold text-(--hero-ink)">{bank.name}</p>
                  <p className="text-sm text-(--hero-copy)">{bank.city} • {bank.phone}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      type="button"
                      disabled={isPending}
                      onClick={() => handleAction("approve", bank.id)}
                      className="rounded-lg border border-(--hero-border-soft) bg-white px-3 py-1 text-xs font-semibold text-(--hero-ink) disabled:opacity-50"
                    >
                      {ui.common.approve}
                    </button>
                    <button
                      type="button"
                      disabled={isPending}
                      onClick={() => handleAction("reject", bank.id)}
                      className="rounded-lg border border-(--hero-border-soft) bg-white px-3 py-1 text-xs font-semibold text-(--hero-ink) disabled:opacity-50"
                    >
                      {ui.common.reject}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </SectionPanelShell>
  );
}

export default HospitalsPanel;
