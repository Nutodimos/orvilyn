import React from "react";
import Image from "next/image";

interface Swatch {
  name: string;
  hex: string;
  usage: string;
  textDark?: boolean;
}

const swatches: Swatch[] = [
  { name: "Paper Cream", hex: "#F1E7D0", usage: "Warm textured ground", textDark: true },
  { name: "Paper Cream Light", hex: "#FBF6E8", usage: "Stamped cards & labels", textDark: true },
  { name: "Paper Cream Dark", hex: "#DCCFB0", usage: "Aged border shading", textDark: true },
  { name: "Fern Green", hex: "#5F7B57", usage: "Primary botanical foliage" },
  { name: "Deep Fern", hex: "#46603F", usage: "Stem ink & shadow" },
  { name: "Oxblood Accent", hex: "#6E1F24", usage: "Needle-drop flash & rules" },
  { name: "Burnt Orange", hex: "#C2602B", usage: "Halftone paper sun" },
  { name: "Ink", hex: "#1A1714", usage: "Letterpress stamped type" },
  { name: "Vinyl", hex: "#14110F", usage: "Record lacquer & platter" },
];

export function FernhillSystem() {
  return (
    <section className="w-full py-16 md:py-24 border-b border-[var(--line)]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <div className="max-w-2xl mb-12">
          <span className="block text-xs uppercase font-mono tracking-widest text-[var(--muted)] mb-3">
            05 · Design & motion tokens
          </span>
          <h2 className="text-[clamp(1.75rem,3.2vw,2.5rem)] font-bold text-[var(--ink)] leading-snug tracking-tight mb-3">
            The analogue system.
          </h2>
          <p className="text-[var(--muted)] text-base md:text-lg leading-relaxed">
            Nine print-inspired swatches, two editorial typefaces, tactile mechanical
            foley, and zero digital synthetic whooshes.
          </p>
        </div>

        <div className="space-y-12">
          {/* 1. Palette Swatches */}
          <div>
            <h3 className="text-xs uppercase font-mono tracking-wider text-[var(--muted)] mb-4">
              Palette Swatches
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-3">
              {swatches.map((s) => (
                <div
                  key={s.name}
                  className="flex flex-col rounded-xl overflow-hidden border border-black/10 bg-[var(--surface)]"
                >
                  <div
                    style={{ backgroundColor: s.hex }}
                    className="h-16 w-full flex items-end justify-end p-1.5"
                  >
                    {s.hex === "#6E1F24" && (
                      <span className="text-[9px] font-mono font-bold bg-[#FBF6E8] text-[#6E1F24] px-1 rounded">
                        accent
                      </span>
                    )}
                  </div>
                  <div className="p-2.5">
                    <span className="font-semibold text-xs text-[var(--ink)] block truncate">
                      {s.name}
                    </span>
                    <span className="font-mono text-[11px] text-[var(--muted)] block">
                      {s.hex}
                    </span>
                    <span className="text-[10px] text-[var(--muted)] block mt-1 leading-tight line-clamp-2">
                      {s.usage}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Typography Specimen & Audio Engineering */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            {/* Typography Specimen */}
            <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--line)]">
              <h3 className="text-xs uppercase font-mono tracking-wider text-[var(--muted)] mb-4">
                Typography System
              </h3>
              <div className="space-y-6">
                <div>
                  <div className="flex items-baseline justify-between mb-1">
                    <span className="font-serif text-2xl text-[var(--ink)] font-bold">
                      Fraunces
                    </span>
                    <span className="text-xs font-mono text-[var(--muted)]">
                      Display Serif · Google Fonts
                    </span>
                  </div>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">
                    Used for the Fernhill Records wordmark, release headlines, and event
                    banners. Weighted with soft optical serifs that simulate ink bleed.
                  </p>
                </div>
                <div className="pt-4 border-t border-[var(--line)]">
                  <div className="flex items-baseline justify-between mb-1">
                    <span className="font-mono text-xl text-[var(--ink)] font-normal">
                      Courier Prime
                    </span>
                    <span className="text-xs font-mono text-[var(--muted)]">
                      Monospaced Typewriter
                    </span>
                  </div>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">
                    Used for catalogue stamps (FHL-042), 33 ⅓ RPM speed marks, tracklists,
                    and the signature tagline &ldquo;Turn it over.&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* Audio Engineering & The Needle Drop Moment */}
            <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--line)] flex flex-col justify-between">
              <div>
                <h3 className="text-xs uppercase font-mono tracking-wider text-[var(--muted)] mb-4">
                  Foley & Analogue Sound Mechanics
                </h3>
                <ul className="space-y-3 text-xs md:text-sm">
                  <li className="flex items-start justify-between gap-4 pb-2 border-b border-[var(--line)]">
                    <span className="font-mono font-semibold text-[var(--ink)]">
                      Needle Drop
                    </span>
                    <span className="text-[var(--muted)] text-right">
                      0 dB peak thump on stylus contact with the lead-in groove
                    </span>
                  </li>
                  <li className="flex items-start justify-between gap-4 pb-2 border-b border-[var(--line)]">
                    <span className="font-mono font-semibold text-[var(--ink)]">
                      Paper Foley
                    </span>
                    <span className="text-[var(--muted)] text-right">
                      Contact-mic sleeve slides and tactile paper rustles
                    </span>
                  </li>
                  <li className="flex items-start justify-between gap-4 pb-2 border-b border-[var(--line)]">
                    <span className="font-mono font-semibold text-[var(--ink)]">
                      Surface Hiss Bed
                    </span>
                    <span className="text-[var(--muted)] text-right">
                      -20 dB ambient analogue vinyl noise, zero digital hiss
                    </span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--line)] bg-[#FBF6E8] p-3 rounded-xl border border-[#DCCFB0]">
                <span className="text-xs font-bold text-[#6E1F24] block mb-0.5">
                  The Analogue Fidelity Rule
                </span>
                <p className="text-xs text-[#1A1714]/80 leading-relaxed">
                  Every sound cue mirrors physical friction: needle weight, paper card
                  landing, and vinyl runout groove. No artificial synthesizer risers or
                  generic notification beeps.
                </p>
              </div>
            </div>
          </div>

          {/* 3. Production Contact Sheet */}
          <div className="pt-4">
            <h3 className="text-xs uppercase font-mono tracking-wider text-[var(--muted)] mb-4">
              Motion Scene Contact Sheet
            </h3>
            <div className="relative aspect-[2576/1095] w-full rounded-2xl overflow-hidden border border-[var(--line)] shadow-xs bg-[#14110F]">
              <Image
                src="/work/fernhill-records/previews/fernhill-records-contact-sheet.jpg"
                alt="Fernhill Records motion system contact sheet showing scene frames from the label reel, logo sting, album announcement, and social loops."
                fill
                sizes="(min-width: 1200px) 1140px, 100vw"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
