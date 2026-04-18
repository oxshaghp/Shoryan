import Image from "next/image";
import Link from "next/link";

import type { AppLocale } from "@/lib/i18n/config";

type FooterLabels = {
  nativeBrand: string;
  description: string;
  rights: string;
  quickLinks: string;
  emergency: string;
  hotline: string;
  email: string;
  availability: string;
};

type FooterNavLinks = {
  home: string;
  about: string;
  services: string;
  hospitals: string;
  reviews: string;
  contact: string;
};

type FooterProps = {
  lang: AppLocale;
  brand: string;
  navLinks: FooterNavLinks;
  labels: FooterLabels;
};

const links = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "services", href: "/services" },
  { key: "hospitals", href: "/hospitals" },
  { key: "reviews", href: "/reviews" },
  { key: "contact", href: "/contact" },
] as const;

function Footer({ lang, brand, navLinks, labels }: FooterProps) {
  const withLocale = (href: string) => `/${lang}${href === "/" ? "" : href}`;

  return (
    <footer className="bg-[#071834] py-12 text-white sm:py-14 lg:py-16">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.6fr_0.8fr_1fr]">
        <div>
          <Link href={`/${lang}`} className="inline-flex items-center gap-3">
            <span className="mt-0.5 inline-flex  items-center justify-center rounded-xl ">
              <Image src="/logo.png" alt="Shoryan logo" width={100} height={100} className=" object-contain" />
            </span>
              <span className="block text-3xl font-extrabold leading-none">{brand}</span>
          </Link>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/75">{labels.description}</p>
          <p className="mt-6 text-sm text-white/50">{labels.rights}</p>
        </div>

        <div>
          <h3 className="text-3xl font-extrabold text-white">{labels.quickLinks}</h3>
          <ul className="mt-5 space-y-3">
            {links.map((link) => (
              <li key={link.key}>
                <Link
                  href={withLocale(link.href)}
                  className="text-base text-white/80 transition hover:text-white"
                >
                  {navLinks[link.key]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-3xl font-extrabold text-white">{labels.emergency}</h3>
          <div className="mt-5 space-y-3 text-base text-white/80">
            <p>{labels.hotline}</p>
            <p>{labels.email}</p>
            <p className="text-[#ff4b4b]">{labels.availability}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;