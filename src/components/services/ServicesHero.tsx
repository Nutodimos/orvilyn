import React from "react";
import { Reveal } from "@/components/ui/Reveal";

const chips = [
  { label: "Websites", href: "#websites" },
  { label: "Web apps", href: "#web-apps" },
  { label: "Internal tools", href: "#internal-tools" },
  { label: "Mobile apps", href: "#mobile-apps" },
  { label: "Motion design", href: "#motion" },
];

export function ServicesHero() {
  return (
    <section className="w-full bg-[var(--bg)] py-20 md:pt-28 md:pb-12">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <Reveal>
          <h1 className="text-[var(--ink)]">Here’s what we make.</h1>
          <p className="text-[var(--muted)] text-[1.25rem] max-w-[36rem] mt-4 leading-relaxed">
            Five things, done properly. Not on the list? We’ll tell you straight.
          </p>
          <div className="flex flex-wrap gap-[12px] mt-[32px]">
            {chips.map((chip) => (
              <a
                key={chip.href}
                href={chip.href}
                className="inline-flex items-center rounded-full border border-[var(--line)] bg-[var(--surface)] px-[16px] py-[8px] font-semibold text-[0.9rem] text-[var(--ink)] hover:bg-[var(--orange-tint)] transition-colors duration-200 active:scale-[0.97]"
              >
                {chip.label}
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
