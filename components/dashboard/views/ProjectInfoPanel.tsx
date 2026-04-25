import type { DashboardViewProps } from "@/types/types";
import SectionPanelShell from "@/components/dashboard/views/SectionPanelShell";

function ProjectInfoPanel({ sectionName, title, description, snapshot, ui }: DashboardViewProps) {
  const profile = snapshot.projectInfo.profile;

  return (
    <SectionPanelShell sectionName={sectionName} title={title} description={description}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-(--hero-border-soft) bg-(--hero-card) p-5">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-(--hero-copy)">{ui.projectInfo.adminName}</p>
          <p className="mt-2 text-xl font-black text-(--hero-ink)">{profile.fullName}</p>
        </div>
        <div className="rounded-2xl border border-(--hero-border-soft) bg-(--hero-card) p-5">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-(--hero-copy)">{ui.projectInfo.email}</p>
          <p className="mt-2 text-xl font-black text-(--hero-ink)">{profile.email}</p>
        </div>
        <div className="rounded-2xl border border-(--hero-border-soft) bg-(--hero-card) p-5">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-(--hero-copy)">{ui.projectInfo.role}</p>
          <p className="mt-2 text-xl font-black text-(--hero-ink)">{profile.isSuperAdmin ? ui.projectInfo.superAdmin : ui.projectInfo.admin}</p>
        </div>
        <div className="rounded-2xl border border-(--hero-border-soft) bg-(--hero-card) p-5">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-(--hero-copy)">{ui.projectInfo.status}</p>
          <p className="mt-2 text-xl font-black text-(--hero-ink)">{profile.isActive ? ui.common.active : ui.common.inactive}</p>
        </div>
      </div>
    </SectionPanelShell>
  );
}

export default ProjectInfoPanel;
