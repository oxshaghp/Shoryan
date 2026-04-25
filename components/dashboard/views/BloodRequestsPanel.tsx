import { FormEvent, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { CircleX, Clock3, Eye, Filter, MapPin, Phone, Plus, Search } from "lucide-react";

import { approveBloodRequest, completeBloodRequest, createBloodRequest, rejectBloodRequest } from "@/server/admin";
import type { DashboardViewProps } from "@/types/types";
import SectionPanelShell from "@/components/dashboard/views/SectionPanelShell";

function BloodRequestsPanel({ sectionName, title, description, snapshot, ui, locale }: DashboardViewProps) {
  const router = useRouter();
  const [createdRequests, setCreatedRequests] = useState<typeof snapshot.bloodRequests.items>([]);
  const requests = [...createdRequests, ...snapshot.bloodRequests.items];
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState(ui.bloodRequests.allStatuses);
  const [urgency, setUrgency] = useState(ui.bloodRequests.allUrgencies);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [mutedIds, setMutedIds] = useState<string[]>([]);
  const [localStatus, setLocalStatus] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    patientName: "",
    hospitalName: "",
    location: "",
    contactPhone: "",
    bloodType: "O POSITIVE",
    urgency: "URGENT",
  });
  const [isPending, startTransition] = useTransition();

  const copy = locale === "ar"
    ? {
        heading: "إدارة طلبات التبرع",
        headingEn: "Blood Requests Management",
        desc: "إدارة وتتبع جميع طلبات التبرع بالدم",
        newRequest: "+ طلب جديد",
        allStatus: "كل الحالات",
        allUrgency: "كل درجات الاستعجال",
        createDialogTitle: ui.bloodRequests.createDialogTitle,
        createDialogDescription: ui.bloodRequests.createDialogDescription,
        patientNameLabel: ui.bloodRequests.patientNameLabel,
        hospitalNameLabel: ui.bloodRequests.hospitalNameLabel,
        locationLabel: ui.bloodRequests.locationLabel,
        contactPhoneLabel: ui.bloodRequests.contactPhoneLabel,
        bloodTypeLabel: ui.bloodRequests.bloodTypeLabel,
        urgencyLabel: ui.bloodRequests.urgencyLabel,
        createSubmit: ui.bloodRequests.createSubmit,
        createSubmitting: ui.bloodRequests.createSubmitting,
        cancel: ui.bloodRequests.cancel,
        showing: "عرض",
        requestsWord: "طلبات",
        clearFilters: "مسح الفلاتر",
        requestedOn: "تم الطلب في",
        view: "عرض",
        complete: "إكمال",
        pending: "قيد الانتظار",
        active: "نشط",
        completed: "مكتمل",
        urgent: "عاجل",
      }
    : {
        heading: "Blood Requests Management",
        headingEn: "إدارة طلبات التبرع",
        desc: "Manage and track all blood donation requests",
        newRequest: "+ New Request",
        allStatus: "All Status",
        allUrgency: "All Urgency",
        createDialogTitle: ui.bloodRequests.createDialogTitle,
        createDialogDescription: ui.bloodRequests.createDialogDescription,
        patientNameLabel: ui.bloodRequests.patientNameLabel,
        hospitalNameLabel: ui.bloodRequests.hospitalNameLabel,
        locationLabel: ui.bloodRequests.locationLabel,
        contactPhoneLabel: ui.bloodRequests.contactPhoneLabel,
        bloodTypeLabel: ui.bloodRequests.bloodTypeLabel,
        urgencyLabel: ui.bloodRequests.urgencyLabel,
        createSubmit: ui.bloodRequests.createSubmit,
        createSubmitting: ui.bloodRequests.createSubmitting,
        cancel: ui.bloodRequests.cancel,
        showing: "Showing",
        requestsWord: "requests",
        clearFilters: "Clear Filters",
        requestedOn: "Requested on",
        view: "View",
        complete: "Complete",
        pending: "Pending",
        active: "Active",
        completed: "Completed",
        urgent: "Urgent",
      };

  const normalizedStatus = (value: string) => {
    if (value.includes("FULFILLED") || value.includes("COMPLETED")) {
      return copy.completed;
    }
    if (value.includes("OPEN") || value.includes("ACTIVE")) {
      return copy.active;
    }

    return copy.pending;
  };

  const statusOptions = [copy.allStatus, copy.pending, copy.active, copy.completed];
  const urgencyOptions = [copy.allUrgency, copy.urgent];

  const filtered = requests.filter((request) => {
    const currentStatus = localStatus[request.id] ?? request.status;
    const displayStatus = normalizedStatus(currentStatus);
    const matchesQuery =
      request.patientName.toLowerCase().includes(query.toLowerCase()) ||
      request.bloodType.toLowerCase().includes(query.toLowerCase()) ||
      request.hospitalName.toLowerCase().includes(query.toLowerCase()) ||
      request.location.toLowerCase().includes(query.toLowerCase());

    const matchesStatus = status === copy.allStatus || displayStatus === status;
    const matchesUrgency = urgency === copy.allUrgency || request.urgency.toLowerCase().includes("urgent") || request.urgency.toLowerCase().includes("emergency");

    return matchesQuery && matchesStatus && matchesUrgency && !mutedIds.includes(request.id);
  });

  const handleAction = (action: "approve" | "reject" | "complete", id: string) => {
    startTransition(() => {
      void (async () => {
        if (action === "approve") {
          const result = await approveBloodRequest(id);
          if (result.ok) {
            setLocalStatus((prev) => ({ ...prev, [id]: "OPEN" }));
          }
        }

        if (action === "reject") {
          const result = await rejectBloodRequest(id);
          if (result.ok) {
            setMutedIds((prev) => [...prev, id]);
          }
        }

        if (action === "complete") {
          const result = await completeBloodRequest(id);
          if (result.ok) {
            setLocalStatus((prev) => ({ ...prev, [id]: "FULFILLED" }));
          }
        }

        router.refresh();
      })();
    });
  };

  const handleCreateRequest = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload = {
      patientName: formData.patientName.trim(),
      hospitalName: formData.hospitalName.trim(),
      location: formData.location.trim(),
      contactPhone: formData.contactPhone.trim(),
      bloodType: formData.bloodType,
      urgency: formData.urgency,
    };

    if (!payload.patientName || !payload.hospitalName || !payload.location || !payload.contactPhone) {
      return;
    }

    startTransition(() => {
      void (async () => {
        const result = await createBloodRequest(payload);

        if (result.ok) {
          setCreatedRequests((prev) => [
            {
              id: `client-created-${crypto.randomUUID()}`,
              patientName: payload.patientName,
              hospitalName: payload.hospitalName,
              location: payload.location,
              contactPhone: payload.contactPhone,
              bloodType: payload.bloodType,
              urgency: payload.urgency,
              status: "OPEN",
              createdAt: new Date().toISOString(),
            },
            ...prev,
          ]);
          setShowCreateDialog(false);
          setFormData({
            patientName: "",
            hospitalName: "",
            location: "",
            contactPhone: "",
            bloodType: "O POSITIVE",
            urgency: "URGENT",
          });
          router.refresh();
        }
      })();
    });
  };

  return (
    <SectionPanelShell sectionName={sectionName} title={title} description={description}>
      <div className="space-y-4">
        <header className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-4xl font-black text-(--hero-ink)">
              {copy.heading} <span className="text-(--hero-copy)">{copy.headingEn}</span>
            </h2>
            <p className="mt-1 text-sm text-(--hero-copy)">{copy.desc}</p>
          </div>
          <button
            type="button"
            onClick={() => setShowCreateDialog(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-(--hero-accent) px-5 py-2 text-sm font-bold text-white"
          >
            <Plus className="size-4" />
            {copy.newRequest}
          </button>
        </header>

        {showCreateDialog && (
          <section className="rounded-2xl border border-(--hero-border-soft) bg-white p-4 shadow-[0_1px_2px_rgb(17_24_39/0.08)]">
            <h3 className="text-xl font-black text-(--hero-ink)">{copy.createDialogTitle}</h3>
            <p className="mt-1 text-sm text-(--hero-copy)">{copy.createDialogDescription}</p>

            <form onSubmit={handleCreateRequest} className="mt-4 grid gap-3 md:grid-cols-2">
              <label className="text-sm font-semibold text-(--hero-copy)">
                {copy.patientNameLabel}
                <input
                  required
                  value={formData.patientName}
                  onChange={(event) => setFormData((prev) => ({ ...prev, patientName: event.target.value }))}
                  className="mt-1 h-10 w-full rounded-xl border border-(--hero-border-soft) px-3 text-sm text-(--hero-ink) outline-none"
                />
              </label>

              <label className="text-sm font-semibold text-(--hero-copy)">
                {copy.hospitalNameLabel}
                <input
                  required
                  value={formData.hospitalName}
                  onChange={(event) => setFormData((prev) => ({ ...prev, hospitalName: event.target.value }))}
                  className="mt-1 h-10 w-full rounded-xl border border-(--hero-border-soft) px-3 text-sm text-(--hero-ink) outline-none"
                />
              </label>

              <label className="text-sm font-semibold text-(--hero-copy)">
                {copy.locationLabel}
                <input
                  required
                  value={formData.location}
                  onChange={(event) => setFormData((prev) => ({ ...prev, location: event.target.value }))}
                  className="mt-1 h-10 w-full rounded-xl border border-(--hero-border-soft) px-3 text-sm text-(--hero-ink) outline-none"
                />
              </label>

              <label className="text-sm font-semibold text-(--hero-copy)">
                {copy.contactPhoneLabel}
                <input
                  required
                  value={formData.contactPhone}
                  onChange={(event) => setFormData((prev) => ({ ...prev, contactPhone: event.target.value }))}
                  className="mt-1 h-10 w-full rounded-xl border border-(--hero-border-soft) px-3 text-sm text-(--hero-ink) outline-none"
                />
              </label>

              <label className="text-sm font-semibold text-(--hero-copy)">
                {copy.bloodTypeLabel}
                <select
                  value={formData.bloodType}
                  onChange={(event) => setFormData((prev) => ({ ...prev, bloodType: event.target.value }))}
                  className="mt-1 h-10 w-full rounded-xl border border-(--hero-border-soft) px-3 text-sm text-(--hero-ink) outline-none"
                >
                  <option value="O POSITIVE">O+</option>
                  <option value="A POSITIVE">A+</option>
                  <option value="B POSITIVE">B+</option>
                  <option value="AB POSITIVE">AB+</option>
                  <option value="O NEGATIVE">O-</option>
                  <option value="A NEGATIVE">A-</option>
                  <option value="B NEGATIVE">B-</option>
                  <option value="AB NEGATIVE">AB-</option>
                </select>
              </label>

              <label className="text-sm font-semibold text-(--hero-copy)">
                {copy.urgencyLabel}
                <select
                  value={formData.urgency}
                  onChange={(event) => setFormData((prev) => ({ ...prev, urgency: event.target.value }))}
                  className="mt-1 h-10 w-full rounded-xl border border-(--hero-border-soft) px-3 text-sm text-(--hero-ink) outline-none"
                >
                  <option value="EMERGENCY">EMERGENCY</option>
                  <option value="URGENT">URGENT</option>
                  <option value="NORMAL">NORMAL</option>
                </select>
              </label>

              <div className="md:col-span-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateDialog(false)}
                  className="rounded-lg border border-(--hero-border-soft) px-4 py-2 text-sm font-semibold text-(--hero-ink)"
                >
                  {copy.cancel}
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="rounded-lg bg-(--hero-accent) px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
                >
                  {isPending ? copy.createSubmitting : copy.createSubmit}
                </button>
              </div>
            </form>
          </section>
        )}

        <section className="rounded-2xl border border-(--hero-border-soft) bg-white p-4 shadow-[0_1px_2px_rgb(17_24_39/0.08)]">
          <div className="grid gap-3 lg:grid-cols-[1.7fr_0.8fr_0.8fr]">
            <label className="relative block">
              <Search className="pointer-events-none absolute inset-y-0 left-3 my-auto size-4 text-(--hero-copy)" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={ui.bloodRequests.searchPlaceholder}
                className="h-11 w-full rounded-xl border border-(--hero-border-soft) bg-white pl-10 pr-3 text-sm text-(--hero-ink) outline-none"
              />
            </label>

            <label className="relative block">
              <Filter className="pointer-events-none absolute inset-y-0 left-3 my-auto size-4 text-(--hero-copy)" />
              <select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                className="h-11 w-full appearance-none rounded-xl border border-(--hero-border-soft) bg-white pl-10 pr-3 text-sm text-(--hero-ink) outline-none"
              >
                {statusOptions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label className="relative block">
              <Filter className="pointer-events-none absolute inset-y-0 left-3 my-auto size-4 text-(--hero-copy)" />
              <select
                value={urgency}
                onChange={(event) => setUrgency(event.target.value)}
                className="h-11 w-full appearance-none rounded-xl border border-(--hero-border-soft) bg-white pl-10 pr-3 text-sm text-(--hero-ink) outline-none"
              >
                {urgencyOptions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm text-(--hero-copy)">
            <p>
              {copy.showing} {filtered.length} {copy.requestsWord}
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setStatus(copy.allStatus);
                setUrgency(copy.allUrgency);
              }}
              className="font-semibold text-(--hero-accent)"
            >
              {copy.clearFilters}
            </button>
          </div>
        </section>

        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="rounded-xl bg-(--hero-card) p-4 text-sm text-(--hero-copy)">{ui.common.noData}</div>
          ) : (
            filtered.map((request, index) => {
              const code = `REQ-${String(index + 1).padStart(3, "0")}`;
              const currentStatus = localStatus[request.id] ?? request.status;
              const displayStatus = normalizedStatus(currentStatus);
              const urgent = request.urgency.toLowerCase().includes("urgent") || request.urgency.toLowerCase().includes("emergency");

              return (
                <article
                  key={request.id}
                  className="rounded-2xl border border-(--hero-border-soft) bg-white p-4 shadow-[0_1px_2px_rgb(17_24_39/0.08)]"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-xl bg-(--hero-accent) px-3 py-2 text-sm font-black text-white">
                          {request.bloodType.replace(" POSITIVE", "+").replace(" NEGATIVE", "-")}
                        </span>
                        {urgent && (
                          <span className="rounded-full bg-[#fee2e2] px-3 py-1 text-xs font-semibold text-[#b91c1c]">
                            {copy.urgent}
                          </span>
                        )}
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            displayStatus === copy.completed
                              ? "bg-[#dbeafe] text-[#1d4ed8]"
                              : displayStatus === copy.active
                                ? "bg-[#dcfce7] text-[#15803d]"
                                : "bg-[#fef3c7] text-[#a16207]"
                          }`}
                        >
                          {displayStatus}
                        </span>
                        <span className="text-sm text-(--hero-copy)">{code}</span>
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
                          {copy.requestedOn} {new Date(request.createdAt).toLocaleDateString(locale)}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <button
                        type="button"
                        onClick={() => setExpandedId((prev) => (prev === request.id ? null : request.id))}
                        className="inline-flex items-center justify-center gap-1 rounded-xl bg-[#eef2f7] px-4 py-2 text-sm font-bold text-(--hero-ink)"
                      >
                        <Eye className="size-4" />
                        {copy.view}
                      </button>

                      {displayStatus === copy.active ? (
                        <button
                          type="button"
                          disabled={isPending}
                          onClick={() => handleAction("complete", request.id)}
                          className="rounded-xl bg-(--hero-accent) px-4 py-2 text-sm font-bold text-white disabled:opacity-60"
                        >
                          {copy.complete}
                        </button>
                      ) : (
                        <>
                          <button
                            type="button"
                            disabled={isPending}
                            onClick={() => handleAction("approve", request.id)}
                            className="rounded-xl bg-[#16a34a] px-4 py-2 text-sm font-bold text-white disabled:opacity-60"
                          >
                            {ui.common.approve}
                          </button>
                          <button
                            type="button"
                            disabled={isPending}
                            onClick={() => handleAction("reject", request.id)}
                            className="inline-flex items-center justify-center gap-1 rounded-xl bg-[#dc2626] px-4 py-2 text-sm font-bold text-white disabled:opacity-60"
                          >
                            <CircleX className="size-4" />
                            {ui.common.reject}
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {expandedId === request.id && (
                    <div className="mt-3 rounded-xl border border-(--hero-border-soft) bg-[#f9fbff] p-3 text-sm text-(--hero-copy)">
                      {ui.overview.lastSync}: {new Date(snapshot.fetchedAt).toLocaleString(locale)}
                    </div>
                  )}
                </article>
              );
            })
          )}
        </div>
      </div>
    </SectionPanelShell>
  );
}

export default BloodRequestsPanel;
