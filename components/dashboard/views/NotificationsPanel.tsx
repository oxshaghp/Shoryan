import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, Bell, CheckCircle2, Clock3, Info } from "lucide-react";

import { deleteNotification, markAllNotificationsRead, markNotificationRead } from "@/server/admin";
import type { DashboardViewProps } from "@/types/types";
import SectionPanelShell from "@/components/dashboard/views/SectionPanelShell";

function NotificationsPanel({ sectionName, title, description, snapshot, ui, locale }: DashboardViewProps) {
  const router = useRouter();
  const [deletedIds, setDeletedIds] = useState<string[]>([]);
  const [forceReadIds, setForceReadIds] = useState<string[]>([]);
  const notifications = useMemo(
    () =>
      snapshot.notifications.items
        .filter((item) => !deletedIds.includes(item.id))
        .map((item) => ({
          ...item,
          isRead: item.isRead || forceReadIds.includes(item.id),
        })),
    [deletedIds, forceReadIds, snapshot.notifications.items]
  );
  const [query, setQuery] = useState("");
  const [readFilter, setReadFilter] = useState(ui.notifications.allTab);
  const [isPending, startTransition] = useTransition();

  const filtered = useMemo(() => {
    return notifications.filter((notification) => {
      const matchesQuery =
        notification.title.toLowerCase().includes(query.toLowerCase()) ||
        notification.body.toLowerCase().includes(query.toLowerCase());

      if (readFilter === ui.notifications.allTab) {
        return matchesQuery;
      }

      if (readFilter === ui.notifications.readTab) {
        return matchesQuery && notification.isRead;
      }

      return matchesQuery && !notification.isRead;
    });
  }, [notifications, query, readFilter, ui.notifications.allTab, ui.notifications.readTab]);

  const unreadCount = notifications.filter((item) => !item.isRead).length;
  const readCount = notifications.length - unreadCount;

  const getTone = (notification: (typeof notifications)[number]) => {
    const title = notification.title.toLowerCase();
    if (title.includes("urgent") || title.includes("emergency")) {
      return {
        wrapper: "border-[#fca5a5] bg-[#fff1f1]",
        accent: "text-[#dc2626]",
        icon: AlertCircle,
      };
    }
    if (title.includes("pending") || title.includes("approval")) {
      return {
        wrapper: "border-[#facc15] bg-[#fffce8]",
        accent: "text-[#ca8a04]",
        icon: CheckCircle2,
      };
    }
    if (title.includes("system")) {
      return {
        wrapper: "border-[#d1d5db] bg-[#f9fafb]",
        accent: "text-[#2563eb]",
        icon: Bell,
      };
    }

    return {
      wrapper: "border-[#d1d5db] bg-[#f9fafb]",
      accent: "text-[#4b5563]",
      icon: Info,
    };
  };

  const handleMarkRead = (id: string) => {
    startTransition(() => {
      void (async () => {
        const result = await markNotificationRead(id);
        if (result.ok) {
          setForceReadIds((prev) => [...prev, id]);
        }
        router.refresh();
      })();
    });
  };

  const handleDelete = (id: string) => {
    startTransition(() => {
      void (async () => {
        const result = await deleteNotification(id);
        if (result.ok) {
          setDeletedIds((prev) => [...prev, id]);
        }
        router.refresh();
      })();
    });
  };

  const handleMarkAllRead = () => {
    startTransition(() => {
      void (async () => {
        const result = await markAllNotificationsRead();
        if (result.ok) {
          setForceReadIds((prev) => [
            ...prev,
            ...notifications.filter((item) => !item.isRead).map((item) => item.id),
          ]);
        }
        router.refresh();
      })();
    });
  };

  return (
    <SectionPanelShell sectionName={sectionName} title={title} description={description}>
      <div className="space-y-4">
        <header className="rounded-2xl border border-(--hero-border-soft) bg-white p-4 shadow-[0_1px_2px_rgb(17_24_39/0.08)]">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setReadFilter(ui.notifications.allTab)}
                className={`rounded-xl px-4 py-2 text-lg font-bold ${
                  readFilter === ui.notifications.allTab
                    ? "bg-(--hero-accent) text-white"
                    : "bg-[#f3f4f6] text-(--hero-ink)"
                }`}
              >
                {ui.notifications.allTab} ({notifications.length})
              </button>
              <button
                type="button"
                onClick={() => setReadFilter(ui.notifications.unreadTab)}
                className={`rounded-xl px-4 py-2 text-lg font-bold ${
                  readFilter === ui.notifications.unreadTab
                    ? "bg-(--hero-accent) text-white"
                    : "bg-[#f3f4f6] text-(--hero-ink)"
                }`}
              >
                {ui.notifications.unreadTab} ({unreadCount})
              </button>
              <button
                type="button"
                onClick={() => setReadFilter(ui.notifications.readTab)}
                className={`rounded-xl px-4 py-2 text-lg font-bold ${
                  readFilter === ui.notifications.readTab
                    ? "bg-(--hero-accent) text-white"
                    : "bg-[#f3f4f6] text-(--hero-ink)"
                }`}
              >
                {ui.notifications.readTab} ({readCount})
              </button>
            </div>

            <button
              type="button"
              disabled={isPending || unreadCount === 0}
              onClick={handleMarkAllRead}
              className="text-sm font-semibold text-(--hero-accent) disabled:opacity-50"
            >
              {ui.notifications.markAllRead}
            </button>
          </div>

          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={ui.notifications.searchPlaceholder}
            className="mt-4 h-11 w-full rounded-xl border border-(--hero-border-soft) bg-white px-3 text-sm text-(--hero-ink) outline-none"
          />
        </header>

        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="rounded-xl bg-(--hero-card) p-4 text-sm text-(--hero-copy)">{ui.common.noData}</div>
          ) : (
            filtered.map((notification) => {
              const tone = getTone(notification);
              const ToneIcon = tone.icon;

              return (
                <article
                  key={notification.id}
                  className={`rounded-2xl border p-4 shadow-[0_1px_2px_rgb(17_24_39/0.08)] ${tone.wrapper}`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="flex min-w-0 flex-1 items-start gap-3">
                      <ToneIcon className={`mt-1 size-5 shrink-0 ${tone.accent}`} />
                      <div>
                        <h3 className="text-3xl font-black text-(--hero-ink)">{notification.title}</h3>
                        <p className="mt-2 text-xl text-(--hero-copy)">{notification.body}</p>
                        <div className="mt-3 flex items-center gap-3 text-sm">
                          {!notification.isRead && (
                            <button
                              type="button"
                              disabled={isPending}
                              onClick={() => handleMarkRead(notification.id)}
                              className="font-semibold text-(--hero-accent) disabled:opacity-50"
                            >
                              {ui.common.markRead}
                            </button>
                          )}
                          <button
                            type="button"
                            disabled={isPending}
                            onClick={() => handleDelete(notification.id)}
                            className="font-semibold text-(--hero-copy) disabled:opacity-50"
                          >
                            {ui.notifications.delete}
                          </button>
                        </div>
                      </div>
                    </div>

                    <p className="inline-flex items-center gap-1 text-sm text-(--hero-copy)">
                      <Clock3 className="size-4" />
                      {new Date(notification.createdAt).toLocaleDateString(locale)}
                    </p>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </div>
    </SectionPanelShell>
  );
}

export default NotificationsPanel;
