import React from "react";

export function FernhillPremise() {
  return (
    <section className="w-full py-16 md:py-24 border-b border-[var(--line)]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <div className="max-w-3xl">
          <span className="block text-xs uppercase font-mono tracking-widest text-[var(--muted)] mb-3">
            01 · The core premise
          </span>

          <h2 className="text-[clamp(1.75rem,3.2vw,2.5rem)] font-bold text-[var(--ink)] leading-snug tracking-tight mb-6">
            Analogue vinyl demands presence.
          </h2>

          <blockquote className="border-l-2 border-[#6E1F24] pl-5 my-6 text-lg md:text-xl text-[var(--ink)] font-normal leading-relaxed italic">
            &ldquo;You slide the disc from its sleeve, align the spindle, drop the needle, and
            listen to an entire side without skipping. The motion identity reflects that
            physical ritual: mechanical timing, paper texture, and deliberate patience.&rdquo;
          </blockquote>

          {/* Taglines Display */}
          <div className="mt-10 pt-8 border-t border-[var(--line)] grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex flex-col p-4 rounded-xl bg-[#FBF6E8] border border-[#DCCFB0]">
              <span className="text-xs uppercase font-mono tracking-wider text-[#6E1F24] font-bold mb-1">
                Primary Tagline
              </span>
              <span className="font-bold text-lg text-[var(--ink)]">
                Turn it over.
              </span>
              <span className="text-xs text-[var(--muted)] mt-1 font-mono">
                Typewriter stamped mono
              </span>
            </div>

            <div className="flex flex-col p-4 rounded-xl bg-[var(--surface)] border border-[var(--line)]">
              <span className="text-xs uppercase font-mono tracking-wider text-[var(--muted)] mb-1">
                Secondary
              </span>
              <span className="font-semibold text-base text-[var(--ink)]">
                Slow music, good company.
              </span>
              <span className="text-xs text-[var(--muted)] mt-1 font-mono">
                Listening bar ethos
              </span>
            </div>

            <div className="flex flex-col p-4 rounded-xl bg-[var(--surface)] border border-[var(--line)]">
              <span className="text-xs uppercase font-mono tracking-wider text-[var(--muted)] mb-1">
                Tertiary
              </span>
              <span className="font-semibold text-base text-[var(--ink)]">
                Side A, side B, stay a while.
              </span>
              <span className="text-xs text-[var(--muted)] mt-1 font-mono">
                Community invitation
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
