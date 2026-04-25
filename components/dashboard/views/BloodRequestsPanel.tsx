import { useMemo, useState } from "react";

import type { DashboardViewProps } from "@/types/types";
import SectionPanelShell from "@/components/dashboard/views/SectionPanelShell";

function BloodRequestsPanel({ sectionName, title, description, snapshot, ui, locale }: DashboardViewProps) {
  const requests = snapshot.bloodRequests.items;
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState(ui.bloodRequests.allStatuses);
  const [urgency, setUrgency] = useState(ui.bloodRequests.allUrgencies);
  const [page, setPage] = useState(1);

  const statuses = useMemo(() => [ui.bloodRequests.allStatuses, ...new Set(requests.map((item) => item.status))], [requests, ui.bloodRequests.allStatuses]);
  const urgencies = useMemo(() => [ui.bloodRequests.allUrgencies, ...new Set(requests.map((item) => item.urgency))], [requests, ui.bloodRequests.allUrgencies]);

  const filtered = useMemo(() => {
    return requests.filter((request) => {
      const matchesQuery =
        request.patientName.toLowerCase().includes(query.toLowerCase()) ||
        request.bloodType.toLowerCase().includes(query.toLowerCase());

      const matchesStatus = status === ui.bloodRequests.allStatuses || request.status === status;
      const matchesUrgency = urgency === ui.bloodRequests.allUrgencies || request.urgency === urgency;

      return matchesQuery && matchesStatus && matchesUrgency;
    });
  }, [query, requests, status, ui.bloodRequests.allStatuses, ui.bloodRequests.allUrgencies, urgency]);

  const pageSize = 4;
  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, pages);
  const paged = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  return (
    <SectionPanelShell sectionName={sectionName} title={title} description={description}>
      <div className="rounded-2xl border border-(--hero-border-soft) p-4">
        <p className="mb-3 text-sm font-semibold text-(--hero-copy)">
          {ui.common.total}: {snapshot.bloodRequests.total}
        </p>

        <div className="mb-4 grid gap-3 lg:grid-cols-3">
          <input
            value={query}
            onChange={(event) => {
              setPage(1);
              setQuery(event.target.value);
            }}
            placeholder={ui.bloodRequests.searchPlaceholder}
            className="h-11 rounded-xl border border-(--hero-border-soft) bg-white px-3 text-sm text-(--hero-ink) outline-none"
          />

          <select
            value={status}
            onChange={(event) => {
              setPage(1);
              setStatus(event.target.value);
            }}
            className="h-11 rounded-xl border border-(--hero-border-soft) bg-white px-3 text-sm text-(--hero-ink) outline-none"
          >
            {statuses.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            value={urgency}
            onChange={(event) => {
              setPage(1);
              setUrgency(event.target.value);
            }}
            className="h-11 rounded-xl border border-(--hero-border-soft) bg-white px-3 text-sm text-(--hero-ink) outline-none"
          >
            {urgencies.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-3">
          {paged.length === 0 ? (
            <div className="rounded-xl bg-(--hero-card) p-4 text-sm text-(--hero-copy)">{ui.common.noData}</div>
          ) : (
            paged.map((request) => (
              <div key={request.id} className="rounded-xl border border-(--hero-border-soft) bg-(--hero-card) p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-bold text-(--hero-ink)">{request.patientName}</p>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-(--hero-copy)">{request.status}</span>
                </div>
                <p className="mt-2 text-sm text-(--hero-copy)">{request.bloodType} • {request.urgency}</p>
                <p className="mt-1 text-xs text-(--hero-copy)">{new Date(request.createdAt).toLocaleString(locale)}</p>
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

export default BloodRequestsPanel;
