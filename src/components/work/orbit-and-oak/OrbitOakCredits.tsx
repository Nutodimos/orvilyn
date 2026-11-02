import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function OrbitOakCredits() {
  return (
    <section className="w-full py-16 md:py-24 bg-[var(--surface)] border-b border-[var(--line)]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <div className="max-w-2xl">
          <span className="block text-xs uppercase font-mono tracking-widest text-[var(--muted)] mb-3">
            06 · Project notes &amp; attribution
          </span>
          <h2 className="text-[clamp(1.75rem,3.2vw,2.5rem)] font-bold text-[var(--ink)] leading-snug tracking-tight mb-6">
            Credits &amp; disclosures.
          </h2>

          <div className="space-y-4 text-sm md:text-base text-[var(--muted)] leading-relaxed">
            <p className="font-semibold text-[var(--ink)]">
              Orbit &amp; Oak is a fictional subscription brand created as a motion design,
              character animation, and educational storytelling case study.
            </p>
            <p>
              <strong className="text-[var(--ink)] font-semibold">
                Brand narrative, character rigging, motion design, and sound composition:
              </strong>{" "}
              Orvilyn.
            </p>
            <p>
              Built in Diffusion Studio. Executed using 2D layered vector artwork, custom character rigs,
              organic paper and wood textures, hand-timed squash-and-stretch curves, and synchronized
              acoustic foley and chimes. Zero generative AI video models or stock footage clips were used.
            </p>
            <p className="text-xs font-mono text-[var(--muted)] pt-2 border-t border-[var(--line)]">
              Display typography set in Fredoka, body set in Nunito Sans (both Open Font Licensed).
              All deliverables rendered at constant 30 fps H.264 High profile with faststart streaming.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm md:text-base bg-[#C89B65] text-[#1B1E4A] hover:bg-[#b58752] active:scale-[0.97] transition-[transform,background-color] duration-160 ease-out focus-visible:outline-2 focus-visible:outline-[#C89B65] cursor-pointer"
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
