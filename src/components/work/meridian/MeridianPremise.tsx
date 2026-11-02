import React from "react";
import { TrendingUp, ShieldCheck, DollarSign } from "lucide-react";

export function MeridianPremise() {
  return (
    <section className="w-full py-16 md:py-24 border-b border-[var(--line)]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <div className="max-w-2xl mb-12">
          <span className="block text-xs uppercase font-mono tracking-widest text-[var(--muted)] mb-3">
            01 · The core premise
          </span>
          <h2 className="text-[clamp(1.75rem,3.2vw,2.5rem)] font-bold text-[var(--ink)] leading-snug tracking-tight mb-4">
            From financial volatility to quiet certainty.
          </h2>
          <p className="text-[var(--muted)] text-base md:text-lg leading-relaxed">
            Freelancing isn&apos;t broken by lack of effort; it&apos;s strained by volatility.
            Meridian replaces the chaotic emotional spikes of variable cashflow with a single,
            unwavering horizon line.
          </p>
        </div>

        {/* Taglines Display */}
        <div className="p-6 md:p-8 rounded-[20px] bg-[#07090E] border border-white/[0.08] text-white mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="border-l-2 border-[#F59E0B] pl-4">
              <span className="block text-xs font-mono uppercase text-white/50 mb-1">
                Primary Brand Voice
              </span>
              <p className="text-lg md:text-xl font-bold text-white tracking-tight">
                &ldquo;Steady money for unsteady months.&rdquo;
              </p>
            </div>
            <div className="border-l-2 border-[#00E599] pl-4">
              <span className="block text-xs font-mono uppercase text-white/50 mb-1">
                Utility Promise
              </span>
              <p className="text-lg md:text-xl font-bold text-white tracking-tight">
                &ldquo;Know where you stand.&rdquo;
              </p>
            </div>
            <div className="border-l-2 border-[#06B6D4] pl-4">
              <span className="block text-xs font-mono uppercase text-white/50 mb-1">
                Mechanism
              </span>
              <p className="text-lg md:text-xl font-bold text-white tracking-tight">
                &ldquo;Income, evened out.&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div className="p-6 md:p-7 rounded-[20px] bg-[var(--surface)] border border-[var(--line)]">
            <div className="w-10 h-10 rounded-full bg-[#F59E0B]/10 text-[#F59E0B] flex items-center justify-center mb-5">
              <TrendingUp size={20} />
            </div>
            <h3 className="text-lg font-bold text-[var(--ink)] mb-2">
              The Horizon Line
            </h3>
            <p className="text-sm md:text-base text-[var(--muted)] leading-relaxed">
              Erratic revenue swings visually flatten into a continuous golden horizon,
              giving self-employed workers an instant, intuitive pulse of financial health.
            </p>
          </div>

          <div className="p-6 md:p-7 rounded-[20px] bg-[var(--surface)] border border-[var(--line)]">
            <div className="w-10 h-10 rounded-full bg-[#00E599]/10 text-[#00E599] flex items-center justify-center mb-5">
              <ShieldCheck size={20} />
            </div>
            <h3 className="text-lg font-bold text-[var(--ink)] mb-2">
              Automated Set-Asides
            </h3>
            <p className="text-sm md:text-base text-[var(--muted)] leading-relaxed">
              Every incoming invoice automatically sweeps a 25% tax allocation into a protected jar
              with tactile audio feedback, preventing end-of-year tax shock.
            </p>
          </div>

          <div className="p-6 md:p-7 rounded-[20px] bg-[var(--surface)] border border-[var(--line)]">
            <div className="w-10 h-10 rounded-full bg-[#06B6D4]/10 text-[#06B6D4] flex items-center justify-center mb-5">
              <DollarSign size={20} />
            </div>
            <h3 className="text-lg font-bold text-[var(--ink)] mb-2">
              Safe-to-Spend Balance
            </h3>
            <p className="text-sm md:text-base text-[var(--muted)] leading-relaxed">
              Raw bank account balances mislead. Meridian isolates true disposable cashflow
              so decisions are made with complete peace of mind.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
