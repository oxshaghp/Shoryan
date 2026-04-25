import type { ReactNode } from "react";

type SectionPanelShellProps = {
  sectionName: string;
  title: string;
  description: string;
  children: ReactNode;
};

function SectionPanelShell({ sectionName, title, description, children }: SectionPanelShellProps) {
  return (
    <article className="space-y-8">
      <header className="space-y-3 border-b border-(--hero-border-soft) pb-6">
        <p className="inline-flex rounded-full bg-(--hero-soft-accent) px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-(--hero-accent)">
          {sectionName}
        </p>
        <h1 className="text-3xl font-black text-(--hero-ink) sm:text-4xl">{title}</h1>
        <p className="max-w-3xl text-base leading-7 text-(--hero-copy)">{description}</p>
      </header>

      {children}
    </article>
  );
}

export default SectionPanelShell;
