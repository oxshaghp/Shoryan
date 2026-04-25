import { notFound } from "next/navigation";

import DashboardWorkspace from "@/components/dashboard/DashboardWorkspace";
import { hasLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getDashboardSnapshot } from "@/server/dashboard";

type DashboardPageProps = {
  params: Promise<{ lang: string }>;
};

async function page({ params }: DashboardPageProps) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dict = await getDictionary(lang);
  const snapshot = await getDashboardSnapshot();

  return (
    <DashboardWorkspace
      labels={dict.dashboard.sidebar}
      content={dict.dashboard.sections}
      ui={dict.dashboard.ui}
      snapshot={snapshot}
      locale={lang}
    />
  );
}

export default page;