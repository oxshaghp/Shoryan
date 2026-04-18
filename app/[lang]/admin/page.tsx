import { notFound } from "next/navigation";

import LogIn from "@/components/logIn/LogIn";
import { hasLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

type AdminPageProps = {
  params: Promise<{ lang: string }>;
};

async function page({ params }: AdminPageProps) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dict = await getDictionary(lang);

  return (
    <section>
      <LogIn labels={dict.login} />
    </section>
  );
}

export default page;