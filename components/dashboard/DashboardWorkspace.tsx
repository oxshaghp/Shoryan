"use client";

import { useMemo, useState, useTransition } from "react";
import {
  Bell,
  Building2,
  ChartColumn,
  Droplets,
  HandHeart,
  LayoutGrid,
} from "lucide-react";
import { useRouter } from "next/navigation";

import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { logoutAdmin } from "@/server/auth";
import type {
  DashboardUiLabels,
  DashboardSectionKey,
  DashboardSectionLabels,
  DashboardSectionMeta,
  DashboardSnapshot,
  DashboardViewComponent,
} from "@/types/types";
import AnalyticsPanel from "./views/AnalyticsPanel";
import BloodRequestsPanel from "./views/BloodRequestsPanel";
import DonorsPanel from "./views/DonorsPanel";
import HospitalsPanel from "./views/HospitalsPanel";
import NotificationsPanel from "./views/NotificationsPanel";
import OverviewPanel from "./views/OverviewPanel";
import ProjectInfoPanel from "./views/ProjectInfoPanel";

type DashboardViewContent = {
  title: string;
  description: string;
};

type DashboardWorkspaceProps = {
  labels: DashboardSectionLabels;
  content: Record<DashboardSectionKey, DashboardViewContent>;
  ui: DashboardUiLabels;
  snapshot: DashboardSnapshot;
  locale: string;
};

const SECTION_COMPONENTS: Record<DashboardSectionKey, DashboardViewComponent> = {
  overview: OverviewPanel,
  projectInfo: ProjectInfoPanel,
  bloodRequests: BloodRequestsPanel,
  donors: DonorsPanel,
  hospitals: HospitalsPanel,
  notifications: NotificationsPanel,
  analytics: AnalyticsPanel,
};

function DashboardWorkspace({ labels, content, ui, snapshot, locale }: DashboardWorkspaceProps) {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<DashboardSectionKey>("overview");
  const [isLoggingOut, startLogoutTransition] = useTransition();

  const sidebarLabels = useMemo(
    () => ({
      ...labels,
      profileName: snapshot.projectInfo.profile.fullName || labels.profileName,
      profileEmail: snapshot.projectInfo.profile.email || labels.profileEmail,
    }),
    [labels, snapshot.projectInfo.profile.email, snapshot.projectInfo.profile.fullName]
  );

  const sections = useMemo<DashboardSectionMeta[]>(
    () => [
      { key: "overview", icon: LayoutGrid, label: labels.sections.overview },
      { key: "bloodRequests", icon: Droplets, label: labels.sections.bloodRequests },
      { key: "donors", icon: HandHeart, label: labels.sections.donors },
      { key: "hospitals", icon: Building2, label: labels.sections.hospitals },
      { key: "notifications", icon: Bell, label: labels.sections.notifications },
      { key: "analytics", icon: ChartColumn, label: labels.sections.analytics },
    ],
    [labels.sections]
  );

  const ActivePanel = SECTION_COMPONENTS[activeSection];
  const activeSectionContent = content[activeSection];

  const handleLogout = () => {
    startLogoutTransition(() => {
      void (async () => {
        await logoutAdmin();
        localStorage.removeItem("token");
        router.replace(`/${locale}/admin`);
        router.refresh();
      })();
    });
  };

  return (
    <section className="w-full min-h-[calc(100vh-7.5rem)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <DashboardSidebar
          labels={sidebarLabels}
          ui={ui.sidebar}
          sections={sections}
          activeSection={activeSection}
          onSectionSelect={setActiveSection}
          onLogout={handleLogout}
          isLoggingOut={isLoggingOut}
        />

        <div className="min-h-[68vh] flex-1 rounded-3xl border border-(--hero-border-soft) bg-white p-5 shadow-[0_20px_50px_rgb(19_31_57/0.08)] sm:p-8">
          <ActivePanel
            sectionName={labels.sections[activeSection]}
            title={activeSectionContent.title}
            description={activeSectionContent.description}
            locale={locale}
            sectionLabels={labels.sections}
            ui={ui}
            snapshot={snapshot}
            onNavigateSection={setActiveSection}
          />
        </div>
      </div>
    </section>
  );
}

export default DashboardWorkspace;
