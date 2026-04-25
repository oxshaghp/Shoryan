import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { markNotificationRead } from "@/server/admin";
import type { DashboardViewProps } from "@/types/types";
import SectionPanelShell from "@/components/dashboard/views/SectionPanelShell";

function NotificationsPanel({ sectionName, title, description, snapshot, ui, locale }: DashboardViewProps) {
  const router = useRouter();
  const notifications = snapshot.notifications.items;
  const [query, setQuery] = useState("");
  const [readFilter, setReadFilter] = useState(ui.common.all);
  const [page, setPage] = useState(1);
  const [isPending, startTransition] = useTransition();

  const filtered = useMemo(() => {
    return notifications.filter((notification) => {
      const matchesQuery =
        notification.title.toLowerCase().includes(query.toLowerCase()) ||
        notification.body.toLowerCase().includes(query.toLowerCase());

      if (readFilter === ui.common.all) {
        return matchesQuery;
      }

      if (readFilter === ui.common.read) {
        return matchesQuery && notification.isRead;
      }

      return matchesQuery && !notification.isRead;
    });
  }, [notifications, query, readFilter, ui.common.all, ui.common.read]);

  const pageSize = 5;
  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, pages);
  const paged = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  const handleMarkRead = (id: string) => {
    startTransition(() => {
      void (async () => {
        await markNotificationRead(id);
        router.refresh();
      })();
    });
  };

  return (
    <SectionPanelShell sectionName={sectionName} title={title} description={description}>
      <div className="rounded-2xl border border-(--hero-border-soft) p-4">
        <p className="mb-3 text-sm font-semibold text-(--hero-copy)">
          {ui.common.unread}: {snapshot.notifications.unreadCount}
        </p>

        <div className="mb-4 grid gap-3 sm:grid-cols-2">
          <input
            value={query}
            onChange={(event) => {
              setPage(1);
              setQuery(event.target.value);
            }}
            placeholder={ui.notifications.searchPlaceholder}
            className="h-11 rounded-xl border border-(--hero-border-soft) bg-white px-3 text-sm text-(--hero-ink) outline-none"
          />

          <select
            value={readFilter}
            onChange={(event) => {
              setPage(1);
              setReadFilter(event.target.value);
            }}
            className="h-11 rounded-xl border border-(--hero-border-soft) bg-white px-3 text-sm text-(--hero-ink) outline-none"
          >
            <option value={ui.common.all}>{ui.common.all}</option>
            <option value={ui.common.read}>{ui.common.read}</option>
            <option value={ui.common.unread}>{ui.common.unread}</option>
          </select>
        </div>

        <div className="space-y-3">
          {paged.length === 0 ? (
            <div className="rounded-xl bg-(--hero-card) p-4 text-sm text-(--hero-copy)">{ui.common.noData}</div>
          ) : (
            paged.map((notification) => (
              <div
                key={notification.id}
                className="rounded-2xl border border-(--hero-border-soft) bg-linear-to-r from-(--hero-card) to-white p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-bold text-(--hero-ink)">{notification.title}</p>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-(--hero-copy)">
                    {notification.isRead ? ui.common.read : ui.common.unread}
                  </span>
                </div>
                <p className="mt-2 text-sm text-(--hero-copy)">{notification.body}</p>
                <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                  <p className="text-xs text-(--hero-copy)">{new Date(notification.createdAt).toLocaleString(locale)}</p>
                  {!notification.isRead && (
                    <button
                      type="button"
                      disabled={isPending}
                      onClick={() => handleMarkRead(notification.id)}
                      className="rounded-lg border border-(--hero-border-soft) bg-white px-3 py-1 text-xs font-semibold text-(--hero-ink) disabled:opacity-50"
                    >
                      {ui.common.markRead}
                    </button>
                  )}
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

export default NotificationsPanel;
