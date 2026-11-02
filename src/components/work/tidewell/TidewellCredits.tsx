import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function TidewellCredits() {
  return (
    <section className="w-full py-16 md:py-24 bg-[var(--surface)] border-b border-[var(--line)]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <div className="max-w-2xl">
          <span className="block text-xs uppercase font-mono tracking-widest text-[var(--muted)] mb-3">
            07 · Project notes & attribution
          </span>
          <h2 className="text-[clamp(1.75rem,3.2vw,2.5rem)] font-bold text-[var(--ink)] leading-snug tracking-tight mb-6">
            Credits & disclosures.
          </h2>

          <div className="space-y-4 text-sm md:text-base text-[var(--muted)] leading-relaxed">
            <p className="font-semibold text-[var(--ink)]">
              Tidewell is a fictional brand created for a motion-identity exercise.
            </p>
            <p>
              <strong className="text-[var(--ink)] font-semibold">
                Concept, motion system and renders:
              </strong>{" "}
              Orvilyn.
            </p>
            <p>
              Built in Diffusion Studio. All scenes rendered directly from Canvas2D procedural water,
              vector shapes, and typography. Zero stock footage, photography, 3D models, or fluid
              simulation were used.
            </p>
            <p className="text-xs font-mono text-[var(--muted)] pt-2 border-t border-[var(--line)]">
              Display typography set in Fraunces; functional sans set in Outfit (SIL Open Font
              License). Wordmark, bottle silhouette, label graphics, and audio recordings are
              placeholders.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm md:text-base bg-[var(--orange)] text-[var(--on-orange)] hover:bg-[var(--orange-strong)] active:scale-[0.97] transition-[background-color,transform] focus-visible:outline-2 focus-visible:outline-[var(--orange)] cursor-pointer"
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
