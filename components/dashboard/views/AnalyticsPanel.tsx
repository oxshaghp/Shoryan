import type { DashboardViewProps } from "@/types/types";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import SectionPanelShell from "@/components/dashboard/views/SectionPanelShell";

const CHART_COLORS = ["#ea3a3a", "#1f3b8f", "#00a5a5", "#ef7d00", "#6b7280", "#6aa84f"];

function AnalyticsPanel({ sectionName, title, description, snapshot, ui }: DashboardViewProps) {
  const urgencyData = snapshot.analytics.requestsByUrgency;
  const usersData = snapshot.analytics.usersDistribution;
  const bloodTypeData = snapshot.analytics.bloodTypesDistribution.slice(0, 6);

  return (
    <SectionPanelShell sectionName={sectionName} title={title} description={description}>
      <div className="grid gap-4 xl:grid-cols-[2fr_1fr]">
        <div className="rounded-2xl border border-(--hero-border-soft) bg-(--hero-card) p-4">
          <p className="mb-3 text-sm font-semibold text-(--hero-ink)">{ui.analytics.requestsByUrgency}</p>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={urgencyData}>
                <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#eadfe0" />
                <XAxis dataKey="name" tick={{ fill: "#445575", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#445575", fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: "#f9d8d8" }} />
                <Bar dataKey="value" radius={[8, 8, 0, 0]} fill="#ea3a3a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-(--hero-border-soft) bg-(--hero-card) p-4">
            <p className="mb-3 text-sm font-semibold text-(--hero-ink)">{ui.analytics.usersDistribution}</p>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={usersData} dataKey="value" nameKey="name" outerRadius={78} innerRadius={44}>
                    {usersData.map((entry, index) => (
                      <Cell key={entry.name} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-2xl border border-(--hero-border-soft) bg-(--hero-card) p-4">
            <p className="mb-3 text-sm font-semibold text-(--hero-ink)">{ui.analytics.topBloodTypes}</p>
            <div className="space-y-2">
              {bloodTypeData.length === 0 ? (
                <p className="text-sm text-(--hero-copy)">{ui.analytics.noBloodTypes}</p>
              ) : (
                bloodTypeData.map((item, index) => (
                  <div key={item.name} className="flex items-center justify-between rounded-xl bg-white px-3 py-2">
                    <span className="text-sm font-semibold text-(--hero-ink)">{item.name}</span>
                    <span
                      className="inline-flex min-w-10 items-center justify-center rounded-full px-2 py-1 text-xs font-bold text-white"
                      style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}
                    >
                      {item.value}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </SectionPanelShell>
  );
}

export default AnalyticsPanel;
