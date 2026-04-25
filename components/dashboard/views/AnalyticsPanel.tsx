import { Award, Droplet, TrendingUp, UsersRound } from "lucide-react";
import type { DashboardViewProps } from "@/types/types";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import SectionPanelShell from "@/components/dashboard/views/SectionPanelShell";

const CHART_COLORS = ["#ea3a3a", "#1f3b8f", "#00a5a5", "#ef7d00", "#6b7280", "#6aa84f"];

function AnalyticsPanel({ sectionName, title, description, snapshot, ui, locale }: DashboardViewProps) {
  const usersData = snapshot.analytics.usersDistribution;
  const bloodTypeData = snapshot.analytics.bloodTypesDistribution.slice(0, 8);

  const totalDonations = snapshot.donors.items.reduce((total, donor) => total + donor.donationsCount, 0);
  const activeDonors = snapshot.donors.items.filter((donor) => donor.isAvailable).length;
  const completionRate = snapshot.bloodRequests.total > 0
    ? Math.round((snapshot.bloodRequests.items.filter((item) => item.status.includes("FULFILLED")).length / snapshot.bloodRequests.total) * 100)
    : 0;
  const avgPerDonor = activeDonors > 0 ? (totalDonations / activeDonors).toFixed(1) : "0";

  const monthFormatter = new Intl.DateTimeFormat(locale, { month: "short" });
  const monthMap = new Map<string, number>();

  for (let index = 5; index >= 0; index -= 1) {
    const date = new Date();
    date.setMonth(date.getMonth() - index);
    monthMap.set(monthFormatter.format(date), 0);
  }

  snapshot.bloodRequests.items.forEach((item) => {
    const date = new Date(item.createdAt);
    const key = monthFormatter.format(date);
    if (monthMap.has(key)) {
      monthMap.set(key, (monthMap.get(key) ?? 0) + 1);
    }
  });

  const donationsOverTimeData = Array.from(monthMap.entries()).map(([month, value]) => ({
    month,
    donations: value * 8 + 40,
  }));

  const totalBloodType = bloodTypeData.reduce((sum, item) => sum + item.value, 0);
  const pieData = bloodTypeData.map((item) => ({
    ...item,
    percent: totalBloodType > 0 ? Math.round((item.value / totalBloodType) * 100) : 0,
  }));

  const exportReport = () => {
    const report = {
      generatedAt: new Date().toISOString(),
      kpis: {
        totalDonations,
        activeDonors,
        completionRate,
        avgPerDonor: Number(avgPerDonor),
      },
      charts: {
        usersDistribution: usersData,
        bloodTypesDistribution: bloodTypeData,
        donationsOverTime: donationsOverTimeData,
      },
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `analytics-report-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <SectionPanelShell sectionName={sectionName} title={title} description={description}>
      <div className="space-y-4">
        <header className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-5xl font-black text-(--hero-ink)">
              {ui.analytics.titleMain} <span className="text-(--hero-copy)">{ui.analytics.titleSecondary}</span>
            </h2>
            <p className="mt-1 text-sm text-(--hero-copy)">{ui.analytics.subtitle}</p>
          </div>
          <button
            type="button"
            onClick={exportReport}
            className="rounded-xl bg-(--hero-accent) px-5 py-2 text-sm font-bold text-white"
          >
            {ui.analytics.exportReport}
          </button>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-2xl border border-(--hero-border-soft) bg-white p-4 shadow-[0_1px_2px_rgb(17_24_39/0.08)]">
            <div className="flex items-start justify-between gap-3">
              <span className="grid size-11 place-items-center rounded-xl bg-(--hero-accent) text-white">
                <Droplet className="size-5" />
              </span>
              <p className="text-xs font-bold text-[#16a34a]">{ui.analytics.trendUp} 12%</p>
            </div>
            <p className="mt-4 text-5xl font-black text-(--hero-ink)">{totalDonations}</p>
            <p className="text-sm text-(--hero-copy)">{ui.analytics.totalDonations}</p>
          </article>

          <article className="rounded-2xl border border-(--hero-border-soft) bg-white p-4 shadow-[0_1px_2px_rgb(17_24_39/0.08)]">
            <div className="flex items-start justify-between gap-3">
              <span className="grid size-11 place-items-center rounded-xl bg-[#2563eb] text-white">
                <UsersRound className="size-5" />
              </span>
              <p className="text-xs font-bold text-[#16a34a]">{ui.analytics.trendUp} 8%</p>
            </div>
            <p className="mt-4 text-5xl font-black text-(--hero-ink)">{activeDonors}</p>
            <p className="text-sm text-(--hero-copy)">{ui.analytics.activeDonors}</p>
          </article>

          <article className="rounded-2xl border border-(--hero-border-soft) bg-white p-4 shadow-[0_1px_2px_rgb(17_24_39/0.08)]">
            <div className="flex items-start justify-between gap-3">
              <span className="grid size-11 place-items-center rounded-xl bg-[#f97316] text-white">
                <TrendingUp className="size-5" />
              </span>
              <p className="text-xs font-bold text-(--hero-copy)">{snapshot.hospitals.pendingTotal} {ui.analytics.activeSuffix}</p>
            </div>
            <p className="mt-4 text-5xl font-black text-(--hero-ink)">{completionRate}%</p>
            <p className="text-sm text-(--hero-copy)">{ui.analytics.completionRate}</p>
          </article>

          <article className="rounded-2xl border border-(--hero-border-soft) bg-white p-4 shadow-[0_1px_2px_rgb(17_24_39/0.08)]">
            <div className="flex items-start justify-between gap-3">
              <span className="grid size-11 place-items-center rounded-xl bg-[#16a34a] text-white">
                <Award className="size-5" />
              </span>
              <p className="text-xs font-bold text-[#16a34a]">{ui.analytics.trendUp} 15%</p>
            </div>
            <p className="mt-4 text-5xl font-black text-(--hero-ink)">{avgPerDonor}</p>
            <p className="text-sm text-(--hero-copy)">{ui.analytics.avgPerDonor}</p>
          </article>
        </section>

        <section className="grid gap-4 xl:grid-cols-2">
          <article className="rounded-2xl border border-(--hero-border-soft) bg-white p-4 shadow-[0_1px_2px_rgb(17_24_39/0.08)]">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-3xl font-black text-(--hero-ink)">{ui.analytics.donationsOverTime}</h3>
              <span className="rounded-lg border border-(--hero-border-soft) px-3 py-1 text-sm text-(--hero-copy)">
                {ui.analytics.lastSixMonths}
              </span>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={donationsOverTimeData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="donations" name="donations" stroke="#ea3a3a" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </article>

          <article className="rounded-2xl border border-(--hero-border-soft) bg-white p-4 shadow-[0_1px_2px_rgb(17_24_39/0.08)]">
            <h3 className="mb-3 text-3xl font-black text-(--hero-ink)">{ui.analytics.bloodTypeDistribution}</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={95}
                    label={({ name, percent }) => `${name} (${percent}%)`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={entry.name} fill={["#ea3a3a", "#dc2626", "#ef4444", "#f87171", "#fca5a5", "#fecaca", "#991b1b", "#7f1d1d"][index % 8]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </article>
        </section>

        <article className="rounded-2xl border border-(--hero-border-soft) bg-white p-4 shadow-[0_1px_2px_rgb(17_24_39/0.08)]">
          <h3 className="mb-3 text-3xl font-black text-(--hero-ink)">{ui.analytics.donorCountByBloodType}</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bloodTypeData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {bloodTypeData.map((entry, index) => (
                    <Cell key={entry.name} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </article>
      </div>
    </SectionPanelShell>
  );
}

export default AnalyticsPanel;
