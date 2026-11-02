import React from "react";
import { Globe, AppWindow, Wrench, Smartphone, Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { BuildServiceItem } from "@/data/servicesDetail";
import { Reveal } from "@/components/ui/Reveal";

const iconMap: Record<string, LucideIcon> = {
  Globe,
  AppWindow,
  Wrench,
  Smartphone,
};

export interface ServiceRowProps {
  item: BuildServiceItem;
}

export function ServiceRow({ item }: ServiceRowProps) {
  const Icon = iconMap[item.icon] ?? Globe;

  return (
    <section
      id={item.id}
      className="scroll-mt-24 border-t border-[var(--line)] py-14 md:py-20"
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-[48px] items-start">
            {/* Left Block (5 columns on md+) */}
            <div className="md:col-span-5 flex flex-col items-start">
              <span className="font-[family-name:var(--font-display)] text-[3rem] font-extrabold leading-none text-[var(--ink)]/25 mb-4 select-none">
                {item.number}
              </span>
              <div className="w-[44px] h-[44px] rounded-xl bg-[var(--ink)]/[0.06] flex items-center justify-center text-[var(--ink)] mb-6">
                <Icon size={22} className="text-[var(--ink)]" aria-hidden="true" />
              </div>
              <h2 className="text-[clamp(1.6rem,3vw,2.25rem)] font-bold leading-[1.15] text-[var(--ink)] tracking-[-0.02em] mb-4">
                {item.title}
              </h2>
              <p className="text-[var(--muted)] text-[1.125rem] leading-relaxed mb-6">
                {item.description}
              </p>
              <span className="text-[0.8rem] uppercase tracking-[0.06em] text-[var(--muted)] font-semibold">
                {item.tech}
              </span>
            </div>

            {/* Right Panel (7 columns on md+) */}
            <div className="md:col-span-7">
              <div className="bg-[var(--surface)] border border-[var(--line)] rounded-[20px] p-[28px] shadow-[var(--shadow-card)] transition-[transform,box-shadow] duration-160 ease-out [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-[2px] [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[var(--shadow-hover)]">
                <span className="text-[0.8rem] uppercase font-bold tracking-[0.08em] text-[var(--muted)] block mb-2">
                  Good for
                </span>
                <p className="text-[var(--ink)] text-base md:text-[1.0625rem] leading-relaxed">
                  {item.goodFor}
                </p>

                <div className="my-6 border-t border-[var(--line)]" />

                <span className="text-[0.8rem] uppercase font-bold tracking-[0.08em] text-[var(--muted)] block mb-4">
                  What you get
                </span>
                <ul className="space-y-[10px]">
                  {item.gets.map((getItem, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-[12px] text-[var(--ink)] text-base leading-snug"
                    >
                      <Check
                        size={18}
                        className="text-[var(--ink)] shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{getItem}</span>
                    </li>
                  ))}
                </ul>

                {item.timelineConfirmed && (
                  <>
                    <div className="my-6 border-t border-[var(--line)]" />
                    <span className="text-[0.8rem] uppercase font-bold tracking-[0.08em] text-[var(--muted)] block mb-2">
                      Typical timeline
                    </span>
                    <p className="text-[var(--ink)] text-base leading-relaxed">
                      {item.timeline}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
