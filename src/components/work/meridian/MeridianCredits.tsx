import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function MeridianCredits() {
  return (
    <section className="w-full py-16 md:py-24 bg-[var(--surface)] border-b border-[var(--line)]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <div className="max-w-2xl">
          <span className="block text-xs uppercase font-mono tracking-widest text-[var(--muted)] mb-3">
            06 · Project notes & attribution
          </span>
          <h2 className="text-[clamp(1.75rem,3.2vw,2.5rem)] font-bold text-[var(--ink)] leading-snug tracking-tight mb-6">
            Credits & disclosures.
          </h2>

          <div className="space-y-4 text-sm md:text-base text-[var(--muted)] leading-relaxed">
            <p className="font-semibold text-[var(--ink)]">
              Meridian is a fictional challenger fintech app for freelancers,
              created as a motion identity and product film case study.
            </p>
            <p>
              <strong className="text-[var(--ink)] font-semibold">
                Concept, motion system, typographic architecture, and audio mix:
              </strong>{" "}
              Orvilyn.
            </p>
            <p>
              Built in Diffusion Studio. Executed using vector motion graphics, procedural
              graph curves, dark glass UI layering, tactile coin physics, and multi-track audio design.
              Zero stock footage, 3D CGI models, or generative video models were used.
            </p>
            <p className="text-xs font-mono text-[var(--muted)] pt-2 border-t border-[var(--line)]">
              Display and interface typography set in Inter (SIL Open Font License).
              All deliverables encoded in constant 30 fps H.264 High profile with faststart streaming headers.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm md:text-base bg-[#F59E0B] text-[#07090E] hover:bg-[#D97706] active:scale-[0.97] transition-[transform,background-color] duration-160 ease-out focus-visible:outline-2 focus-visible:outline-[#F59E0B] cursor-pointer"
            >
              <span>Back to all work</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
