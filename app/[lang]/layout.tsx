import type { Metadata } from "next";
import { Cairo, JetBrains_Mono } from "next/font/google";
import { notFound } from "next/navigation";

import "../globals.css";
import { hasLocale, locales } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import SiteLoaderOverlay from "@/components/SiteLoaderOverlay";

const appSans = Cairo({
  variable: "--font-sans",
  subsets: ["arabic", "latin"],
});

const appMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shoryan",
  description:
    "Sharyan (شريان) is an innovative blood donation platform that connects donors, patients, and hospitals in real-time. It enables fast blood requests, smart matching by blood type and location, and builds a trusted life-saving community.",
  keywords: [
    "Shoryan",
    "blood donation",
    "donors",
    "patients",
    "hospitals",
    "real-time",
    "blood requests",
    "smart matching",
    "blood type",
    "location",
    "life-saving community",
  ],
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dict = await getDictionary(lang);

  return (
    <html
      lang={lang}
      dir={lang === "ar" ? "rtl" : "ltr"}
      className={`${appSans.variable} ${appMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SiteLoaderOverlay lang={lang} />
        <NavBar lang={lang} labels={dict.nav} />
        <main className="flex-1">{children}</main>
        <Footer lang={lang} brand={dict.nav.brand} navLinks={dict.nav.links} labels={dict.footer} />
      </body>
    </html>
  );
}
