import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  CheckCircle2,
  Clock3,
  Droplet,
  MapPin,
  Phone,
  TrendingUp,
  UserRound,
  Users,
} from "lucide-react";

import { approveBloodRequest } from "@/server/admin";
import type { DashboardViewProps } from "@/types/types";
import SectionPanelShell from "@/components/dashboard/views/SectionPanelShell";

function OverviewPanel({ sectionName, title, description, snapshot, ui, locale }: DashboardViewProps) {
  const router = useRouter();
  const [approvedIds, setApprovedIds] = useState<string[]>([]);
  const [openedRequestId, setOpenedRequestId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const totalDonations =
    snapshot.donors.items.reduce((sum, item) => sum + item.donationsCount, 0) ||
    snapshot.overview.stats.bloodRequests * 3 + snapshot.overview.stats.donors;

  const activeDonorsCount = snapshot.donors.items.filter((item) => item.isAvailable).length;
  const urgentRequestsCount = snapshot.bloodRequests.items.filter(
    (item) => item.urgency === "URGENT" || item.urgency === "EMERGENCY"
  ).length;

  const emergencyRequests = useMemo(
    () =>
      snapshot.bloodRequests.items
        .filter(
          (item) =>
            (item.urgency === "URGENT" || item.urgency === "EMERGENCY") &&
            !approvedIds.includes(item.id)
        )
        .slice(0, 3),
    [approvedIds, snapshot.bloodRequests.items]
  );

  const recentRequests = useMemo(
    () =>
      [...snapshot.bloodRequests.items]
        .sort((first, second) => new Date(second.createdAt).getTime() - new Date(first.createdAt).getTime())
        .slice(0, 5),
    [snapshot.bloodRequests.items]
  );

  const availableDonors = useMemo(
    () => snapshot.donors.items.filter((item) => item.isAvailable).slice(0, 5),
    [snapshot.donors.items]
  );

  const handleApprove = (requestId: string) => {
    startTransition(() => {
      void (async () => {
        const result = await approveBloodRequest(requestId);
        if (result.ok) {
          setApprovedIds((previous) => [...previous, requestId]);
        }
        router.refresh();
      })();
    });
  };

  return (
    <SectionPanelShell sectionName={sectionName} title={title} description={description}>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-2xl border border-(--hero-border-soft) bg-white p-5 shadow-[0_1px_2px_rgb(17_24_39/0.08)]">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-lg font-medium text-(--hero-copy)">{ui.overview.totalDonations}</p>
              <p className="mt-2 text-5xl font-black text-(--hero-ink)">{totalDonations}</p>
              <p className="mt-2 text-sm font-semibold text-[#0ea34a]">+12% {ui.overview.thisMonth}</p>
            </div>
            <span className="grid size-12 place-items-center rounded-xl bg-(--hero-accent) text-white">
              <Droplet className="size-5" />
            </span>
          </div>
        </article>

        <article className="rounded-2xl border border-(--hero-border-soft) bg-white p-5 shadow-[0_1px_2px_rgb(17_24_39/0.08)]">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-lg font-medium text-(--hero-copy)">{ui.overview.activeDonors}</p>
              <p className="mt-2 text-5xl font-black text-(--hero-ink)">{activeDonorsCount}</p>
              <p className="mt-2 text-sm font-semibold text-(--hero-copy)">
                {snapshot.donors.total} {ui.overview.totalRegistered}
              </p>
            </div>
            <span className="grid size-12 place-items-center rounded-xl bg-[#2563eb] text-white">
              <Users className="size-5" />
            </span>
          </div>
        </article>

        <article className="rounded-2xl border border-(--hero-border-soft) bg-white p-5 shadow-[0_1px_2px_rgb(17_24_39/0.08)]">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-lg font-medium text-(--hero-copy)">{ui.overview.urgentRequests}</p>
              <p className="mt-2 text-5xl font-black text-(--hero-ink)">{urgentRequestsCount}</p>
              <p className="mt-2 text-sm font-semibold text-[#dc2626]">{ui.overview.requiresAttention}</p>
            </div>
            <span className="grid size-12 place-items-center rounded-xl bg-[#f97316] text-white">
              <AlertCircle className="size-5" />
            </span>
          </div>
        </article>

        <article className="rounded-2xl border border-(--hero-border-soft) bg-white p-5 shadow-[0_1px_2px_rgb(17_24_39/0.08)]">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-lg font-medium text-(--hero-copy)">{ui.overview.pendingActions}</p>
              <p className="mt-2 text-5xl font-black text-(--hero-ink)">{snapshot.notifications.unreadCount}</p>
              <p className="mt-2 text-sm font-semibold text-(--hero-copy)">{ui.overview.unreadNotifications}</p>
            </div>
            <span className="grid size-12 place-items-center rounded-xl bg-[#16a34a] text-white">
              <TrendingUp className="size-5" />
            </span>
          </div>
        </article>
      </div>

      <section>
        <h3 className="mb-3 flex items-center gap-2 text-3xl font-black text-(--hero-ink)">
          <AlertCircle className="size-5 text-(--hero-accent)" />
          {ui.overview.emergencyBloodRequests}
        </h3>

        <div className="space-y-3">
          {emergencyRequests.map((request, index) => {
            const requestCode = `REQ-${String(index + 1).padStart(3, "0")}`;

            return (
              <article
                key={request.id}
                className="rounded-2xl border border-(--hero-border-soft) bg-white p-4 shadow-[0_1px_2px_rgb(17_24_39/0.08)]"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-xl bg-(--hero-accent) px-3 py-2 text-sm font-black text-white">{request.bloodType.replace(" POSITIVE", "+").replace(" NEGATIVE", "-")}</span>
                      <span className="rounded-full bg-[#fee2e2] px-3 py-1 text-xs font-semibold text-[#b91c1c]">{ui.overview.urgent}</span>
                      <span className="text-sm text-(--hero-copy)">{requestCode}</span>
                    </div>

                    <p className="mt-3 text-3xl font-black text-(--hero-ink)">{request.patientName}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-(--hero-copy)">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="size-4" />
                        {request.hospitalName}, {request.location}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Phone className="size-4" />
                        {request.contactPhone}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock3 className="size-4" />
                        {new Date(request.createdAt).toLocaleDateString(locale)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={isPending}
                      onClick={() => handleApprove(request.id)}
                      className="rounded-xl bg-(--hero-accent) px-4 py-2 text-sm font-bold text-white hover:bg-(--hero-accent-strong) disabled:opacity-60"
                    >
                      {ui.common.approve}
                    </button>
                    <button
                      type="button"
                      onClick={() => setOpenedRequestId((prev) => (prev === request.id ? null : request.id))}
                      className="rounded-xl bg-[#eef2f7] px-4 py-2 text-sm font-bold text-(--hero-ink)"
                    >
                      {ui.overview.viewDetails}
                    </button>
                  </div>
                </div>

                {openedRequestId === request.id && (
                  <div className="mt-3 rounded-xl border border-(--hero-border-soft) bg-[#f9fbff] p-3 text-sm text-(--hero-copy)">
                    {ui.overview.lastSync}: {new Date(snapshot.fetchedAt).toLocaleString(locale)}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <article className="rounded-2xl border border-(--hero-border-soft) bg-white shadow-[0_1px_2px_rgb(17_24_39/0.08)]">
          <header className="border-b border-(--hero-border-soft) px-4 py-3">
            <h4 className="flex items-center gap-2 text-3xl font-black text-(--hero-ink)">
              <Droplet className="size-5 text-(--hero-accent)" />
              {ui.overview.recentBloodRequests}
            </h4>
          </header>
          <div>
            {recentRequests.map((request) => {
              const badgeColor =
                request.status.includes("FULFILLED")
                  ? "bg-[#dbeafe] text-[#1d4ed8]"
                  : request.status.includes("OPEN")
                    ? "bg-[#dcfce7] text-[#15803d]"
                    : "bg-[#fef3c7] text-[#a16207]";

              return (
                <div key={request.id} className="flex items-center justify-between gap-2 border-b border-(--hero-border-soft) px-4 py-3 last:border-b-0">
                  <div>
                    <p className="font-bold text-(--hero-ink)">{request.patientName}</p>
                    <p className="text-sm text-(--hero-copy)">{request.hospitalName}</p>
                    <p className="text-xs text-(--hero-copy)">{new Date(request.createdAt).toLocaleDateString(locale)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-lg bg-(--hero-accent) px-2 py-1 text-xs font-bold text-white">{request.bloodType.replace(" POSITIVE", "+").replace(" NEGATIVE", "-")}</span>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeColor}`}>{request.status}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </article>

        <article className="rounded-2xl border border-(--hero-border-soft) bg-white shadow-[0_1px_2px_rgb(17_24_39/0.08)]">
          <header className="border-b border-(--hero-border-soft) px-4 py-3">
            <h4 className="flex items-center gap-2 text-3xl font-black text-(--hero-ink)">
              <Users className="size-5 text-[#2563eb]" />
              {ui.overview.availableDonors}
            </h4>
          </header>
          <div>
            {availableDonors.map((donor) => (
              <div key={donor.id} className="flex items-center justify-between gap-2 border-b border-(--hero-border-soft) px-4 py-3 last:border-b-0">
                <div>
                  <p className="font-bold text-(--hero-ink)">{donor.name}</p>
                  <p className="text-sm text-(--hero-copy)">{donor.city}</p>
                  <p className="text-xs text-(--hero-copy)">{donor.donationsCount} donations</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-lg bg-(--hero-accent) px-2 py-1 text-xs font-bold text-white">{donor.bloodType.replace(" POSITIVE", "+").replace(" NEGATIVE", "-")}</span>
                  <span className="rounded-full bg-[#dcfce7] px-3 py-1 text-xs font-semibold text-[#15803d]">{ui.common.available}</span>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section>
        <h4 className="text-3xl font-black text-(--hero-ink)">{ui.overview.quickActions}</h4>
        <div className="mt-3 grid gap-4 md:grid-cols-3">
          <button type="button" className="rounded-2xl border border-(--hero-border-soft) bg-white p-5 text-start shadow-[0_1px_2px_rgb(17_24_39/0.08)]">
            <Droplet className="size-7 text-(--hero-accent)" />
            <p className="mt-3 text-2xl font-black text-(--hero-ink)">{ui.overview.createBloodRequest}</p>
            <p className="mt-1 text-sm text-(--hero-copy)">{ui.overview.createBloodRequestDesc}</p>
          </button>
          <button type="button" className="rounded-2xl border border-(--hero-border-soft) bg-white p-5 text-start shadow-[0_1px_2px_rgb(17_24_39/0.08)]">
            <UserRound className="size-7 text-[#2563eb]" />
            <p className="mt-3 text-2xl font-black text-(--hero-ink)">{ui.overview.registerDonor}</p>
            <p className="mt-1 text-sm text-(--hero-copy)">{ui.overview.registerDonorDesc}</p>
          </button>
          <button type="button" className="rounded-2xl border border-(--hero-border-soft) bg-white p-5 text-start shadow-[0_1px_2px_rgb(17_24_39/0.08)]">
            <CheckCircle2 className="size-7 text-[#16a34a]" />
            <p className="mt-3 text-2xl font-black text-(--hero-ink)">{ui.overview.sendAlert}</p>
            <p className="mt-1 text-sm text-(--hero-copy)">{ui.overview.sendAlertDesc}</p>
          </button>
        </div>
      </section>
    </SectionPanelShell>
  );
}

export default OverviewPanel;
