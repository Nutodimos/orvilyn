import React from "react";
import { Reveal } from "@/components/ui/Reveal";

export function Mission() {
  return (
    <section className="w-full bg-[var(--bg)] py-20 md:py-32">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <div>
          <Reveal delay={0}>
            <p className="font-[family-name:var(--font-display)] font-extrabold text-[clamp(2rem,5.5vw,4rem)] leading-[1.05] tracking-[-0.02em] text-[var(--ink)]">
              Small businesses are good at what they do.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="font-[family-name:var(--font-display)] font-extrabold text-[clamp(2rem,5.5vw,4rem)] leading-[1.05] tracking-[-0.02em] text-[var(--ink)] mt-1">
              The online part is where they get stuck.
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="font-[family-name:var(--font-display)] font-extrabold text-[clamp(2rem,5.5vw,4rem)] leading-[1.05] tracking-[-0.02em] text-[var(--orange-strong)] mt-1">
              That’s where I come in.
            </p>
          </Reveal>
        </div>

        <div className="mt-8 max-w-[40rem] flex flex-col gap-5 text-[1.25rem] text-[var(--muted)] leading-relaxed">
          <Reveal delay={0.24}>
            <p>
              The website that doesn’t get calls. The spreadsheet that quietly runs
              the whole operation. The app idea nobody could explain in plain
              English.
            </p>
          </Reveal>

          {/* TODO: keep "fixed prices" only if it is a promise you keep every time. */}
          <Reveal delay={0.32}>
            <p>
              I build the websites, apps, and tools that get you found and give
              your time and money more mileage. Plain language, fixed prices, and
              no disappearing acts.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
