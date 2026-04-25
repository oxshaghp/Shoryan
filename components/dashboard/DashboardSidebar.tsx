"use client";

import { LogOut } from "lucide-react";

import type { DashboardSectionKey, DashboardSectionMeta, DashboardSectionLabels } from "@/types/types";
import { cn } from "@/lib/utils";

type DashboardSidebarProps = {
  labels: DashboardSectionLabels;
  ui: {
    logout: string;
    loggingOut: string;
  };
  sections: DashboardSectionMeta[];
  activeSection: DashboardSectionKey;
  onSectionSelect: (section: DashboardSectionKey) => void;
  onLogout: () => void;
  isLoggingOut: boolean;
};

function DashboardSidebar({
  labels,
  ui,
  sections,
  activeSection,
  onSectionSelect,
  onLogout,
  isLoggingOut,
}: DashboardSidebarProps) {
  return (
    <aside className="w-full rounded-3xl border border-(--hero-border-soft) bg-white/95 shadow-[0_18px_45px_rgb(19_31_57/0.08)] backdrop-blur lg:sticky lg:top-24 lg:h-[calc(100vh-7.5rem)] lg:w-72 lg:overflow-y-auto">
      <div className="border-b border-(--hero-border-soft) px-5 py-6">
        <h2 className="text-2xl font-black tracking-tight text-(--hero-ink)">{labels.brand}</h2>
        <p className="mt-1 text-sm text-(--hero-copy)">{labels.sidebarRole}</p>
      </div>

      <nav className="space-y-2 p-4" aria-label="Dashboard sections">
        {sections.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.key;

          return (
            <button
              key={section.key}
              type="button"
              onClick={() => onSectionSelect(section.key)}
              className={cn(
                "flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-start text-[15px] font-semibold transition-all",
                isActive
                  ? "bg-(--hero-accent) text-white shadow-[0_10px_24px_rgb(234_58_58/0.35)]"
                  : "text-(--hero-ink) hover:bg-(--hero-soft-accent)/55"
              )}
            >
              <Icon className={cn("size-5", isActive ? "text-white" : "text-(--hero-copy)")} aria-hidden="true" />
              <span>{section.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-(--hero-border-soft) bg-(--hero-card) p-4">
        <div className="flex items-center gap-3 rounded-2xl bg-white px-3 py-3">
          <span className="grid size-10 place-items-center rounded-full bg-(--hero-accent) text-base font-extrabold text-white">
            {labels.profileName.charAt(0).toUpperCase()}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-(--hero-ink)">{labels.profileName}</p>
            <p className="truncate text-xs text-(--hero-copy)">{labels.profileEmail}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={onLogout}
          disabled={isLoggingOut}
          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-(--hero-border-soft) bg-white px-3 py-2 text-sm font-semibold text-(--hero-ink) transition hover:bg-(--hero-soft-accent)/45 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <LogOut className="size-4" aria-hidden="true" />
          {isLoggingOut ? ui.loggingOut : ui.logout}
        </button>
      </div>
    </aside>
  );
}

export default DashboardSidebar;
