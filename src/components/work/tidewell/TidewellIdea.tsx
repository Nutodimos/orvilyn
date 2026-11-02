import React from "react";

export function TidewellIdea() {
  return (
    <section className="w-full py-16 md:py-24 border-b border-[var(--line)]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <div className="max-w-3xl">
          <span className="block text-xs uppercase font-mono tracking-widest text-[var(--muted)] mb-3">
            01 · The core premise
          </span>

          <h2 className="text-[clamp(1.75rem,3.2vw,2.5rem)] font-bold text-[var(--ink)] leading-snug tracking-tight mb-6">
            Water does not arrive on a straight line.
          </h2>

          <blockquote className="border-l-2 border-[var(--orange)] pl-5 my-6 text-lg md:text-xl text-[var(--ink)] font-normal leading-relaxed italic">
            &ldquo;It finds the lowest point, settles, and then holds. The Tidewell system is built
            from that behaviour: fast first, then a long release; one loud moment, then
            silence.&rdquo;
          </blockquote>

          {/* Taglines Display */}
          <div className="mt-10 pt-8 border-t border-[var(--line)] grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex flex-col">
              <span className="text-xs uppercase font-mono tracking-wider text-[var(--muted)] mb-1">
                Primary
              </span>
              <span className="font-semibold text-base text-[var(--ink)]">
                Pure at the source.
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs uppercase font-mono tracking-wider text-[var(--muted)] mb-1">
                Secondary
              </span>
              <span className="font-semibold text-base text-[var(--ink)]">
                Drawn from the edge.
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs uppercase font-mono tracking-wider text-[var(--muted)] mb-1">
                Call to action
              </span>
              <span className="font-semibold text-base text-[var(--ink)]">
                Rise to it.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
