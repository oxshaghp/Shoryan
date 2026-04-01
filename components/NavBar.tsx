"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { FiGlobe, FiMenu, FiX } from "react-icons/fi";

import type { AppLocale } from "@/lib/i18n/config";

type NavBarLabels = {
    brand: string;
    links: {
        home: string;
        about: string;
        services: string;
        hospitals: string;
        reviews: string;
        contact: string;
    };
    mobileMenuOpen: string;
    mobileMenuClose: string;
    languageSwitch: string;
};

type NavBarProps = {
    lang: AppLocale;
    labels: NavBarLabels;
};

const links = [
    { key: "home", href: "/" },
    { key: "about", href: "/about" },
    { key: "services", href: "/services" },
    { key: "hospitals", href: "/hospitals" },
    { key: "reviews", href: "/reviews" },
    { key: "contact", href: "/contact" },
] as const;

function normalizePath(pathname: string, lang: AppLocale) {
    const withoutLocale = pathname.replace(new RegExp(`^/${lang}(?=/|$)`), "");
    return withoutLocale.length ? withoutLocale : "/";
}

function NavBar({ lang, labels }: NavBarProps) {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const otherLocale: AppLocale = lang === "ar" ? "en" : "ar";

    const currentPath = useMemo(() => normalizePath(pathname || "/", lang), [pathname, lang]);

    const localeHref = `/${otherLocale}${currentPath === "/" ? "" : currentPath}`;

    const withLocale = (href: string) => `/${lang}${href === "/" ? "" : href}`;

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-black/10 bg-white/90 shadow-sm backdrop-blur">
            <div className="mx-auto flex h-18.5 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
                <Link href={`/${lang}`} className="flex items-center gap-2">
                    <Image src="/logo.png" alt="Shoryan Logo" width={48} height={48} priority />
                    <span className="text-lg font-bold sm:text-xl">{labels.brand}</span>
                </Link>

                <div className="hidden items-center gap-6 lg:flex">
                    {links.map((link) => (
                        <Link
                            key={link.key}
                            href={withLocale(link.href)}
                            className="text-[15px] font-medium text-black/80 transition hover:text-red-600"
                        >
                            {labels.links[link.key]}
                        </Link>
                    ))}
                    <Link
                        href={localeHref}
                        className="inline-flex items-center gap-2 rounded-full border border-black/15 px-3 py-2 text-sm font-semibold transition hover:bg-black hover:text-white"
                        aria-label={labels.languageSwitch}
                    >
                        <FiGlobe className="text-base" />
                        <span>{labels.languageSwitch}</span>
                    </Link>
                </div>

                <div className="flex items-center gap-2 lg:hidden">
                    <Link
                        href={localeHref}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/15"
                        aria-label={labels.languageSwitch}
                    >
                        <FiGlobe className="text-lg" />
                    </Link>
                    <button
                        type="button"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/15"
                        aria-label={isOpen ? labels.mobileMenuClose : labels.mobileMenuOpen}
                        onClick={() => setIsOpen((prev) => !prev)}
                    >
                        {isOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
                    </button>
                </div>
            </div>

            {isOpen && (
                <div className="border-t border-black/10 bg-white px-4 py-4 lg:hidden">
                    <div className="flex flex-col gap-3">
                        {links.map((link) => (
                            <Link
                                key={link.key}
                                href={withLocale(link.href)}
                                className="rounded-lg px-3 py-2 text-base font-medium text-black/90 hover:bg-black/5"
                                onClick={() => setIsOpen(false)}
                            >
                                {labels.links[link.key]}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}

export default NavBar;