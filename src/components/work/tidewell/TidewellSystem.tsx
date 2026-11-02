import React from "react";
import Image from "next/image";

interface Swatch {
  name: string;
  hex: string;
  usage: string;
  textDark?: boolean;
}

const swatches: Swatch[] = [
  { name: "Deep", hex: "#1F5F5B", usage: "Primary field, baseline ground" },
  { name: "Mid", hex: "#4F8F87", usage: "Secondary water wave, brine" },
  { name: "Foam", hex: "#F4F7F5", usage: "Page ground, typography", textDark: true },
  { name: "Sand", hex: "#E6D9C3", usage: "Flavour field, dry shore", textDark: true },
  { name: "Citrus Accent", hex: "#F2C94C", usage: "Single fizz flash only", textDark: true },
  { name: "Ink", hex: "#123B38", usage: "Deep contrast typography" },
  { name: "Mint", hex: "#CFE0D6", usage: "Cucumber field, cool tone", textDark: true },
  { name: "Blood", hex: "#A96850", usage: "Blood orange field, bitter edge" },
];

export function TidewellSystem() {
  return (
    <section className="w-full py-16 md:py-24 border-b border-[var(--line)]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <div className="max-w-2xl mb-12">
          <span className="block text-xs uppercase font-mono tracking-widest text-[var(--muted)] mb-3">
            06 · Design & motion tokens
          </span>
          <h2 className="text-[clamp(1.75rem,3.2vw,2.5rem)] font-bold text-[var(--ink)] leading-snug tracking-tight mb-3">
            The system.
          </h2>
          <p className="text-[var(--muted)] text-base md:text-lg leading-relaxed">
            A five-colour family, two typefaces, four motion rules, and one signature accent beat
            per piece.
          </p>
        </div>

        {/* Scoped System Subject Matter */}
        <div className="tidewell-scope space-y-12">
          {/* 1. Palette Swatches */}
          <div>
            <h3 className="text-xs uppercase font-mono tracking-wider text-[var(--muted)] mb-4">
              Palette & Usage Guidelines
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              {swatches.map((s) => (
                <div
                  key={s.name}
                  className="flex flex-col rounded-xl overflow-hidden border border-black/10 bg-[var(--surface)]"
                >
                  <div
                    style={{ backgroundColor: s.hex }}
                    className="h-16 w-full flex items-end justify-end p-1.5"
                  >
                    {s.hex === "#F2C94C" && (
                      <span className="text-[9px] font-mono font-bold bg-black/80 text-[#F2C94C] px-1 rounded">
                        fizz only
                      </span>
                    )}
                  </div>
                  <div className="p-2.5">
                    <span className="font-semibold text-xs text-[var(--ink)] block truncate">
                      {s.name}
                    </span>
                    <span className="font-mono text-[11px] text-[var(--muted)] block">{s.hex}</span>
                    <span className="text-[10px] text-[var(--muted)] block mt-1 leading-tight line-clamp-2">
                      {s.usage}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Typography Specimen & Motion Curves Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            {/* Type Specimen */}
            <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--line)]">
              <h3 className="text-xs uppercase font-mono tracking-wider text-[var(--muted)] mb-4">
                Typography System
              </h3>
              <div className="space-y-6">
                <div>
                  <div className="flex items-baseline justify-between mb-1">
                    <span className="font-serif text-2xl text-[var(--ink)] font-light">Fraunces</span>
                    <span className="text-xs font-mono text-[var(--muted)]">300 Light · Display</span>
                  </div>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">
                    Used for the wordmark, titles, and flavour names with -0.02em to -0.04em tight tracking.
                  </p>
                </div>
                <div className="pt-4 border-t border-[var(--line)]">
                  <div className="flex items-baseline justify-between mb-1">
                    <span className="font-sans text-xl text-[var(--ink)] font-normal">Outfit</span>
                    <span className="text-xs font-mono text-[var(--muted)]">300 / 500 · Functional Sans</span>
                  </div>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">
                    Used for body copy, technical labels, and captions. Labels set in 0.18em–0.24em uppercase tracking.
                  </p>
                </div>
              </div>
            </div>

            {/* Motion Curves & The One-Fizz Rule */}
            <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--line)] flex flex-col justify-between">
              <div>
                <h3 className="text-xs uppercase font-mono tracking-wider text-[var(--muted)] mb-4">
                  Motion Curves & Punctuation
                </h3>
                <ul className="space-y-3 text-xs md:text-sm">
                  <li className="flex items-start justify-between gap-4 pb-2 border-b border-[var(--line)]">
                    <span className="font-mono font-semibold text-[var(--ink)]">waterOut</span>
                    <span className="text-[var(--muted)] text-right">
                      cubic-bezier(0.23, 1, 0.32, 1) — Fast surge, long settle
                    </span>
                  </li>
                  <li className="flex items-start justify-between gap-4 pb-2 border-b border-[var(--line)]">
                    <span className="font-mono font-semibold text-[var(--ink)]">settle</span>
                    <span className="text-[var(--muted)] text-right">Fluid relaxation into equilibrium</span>
                  </li>
                  <li className="flex items-start justify-between gap-4 pb-2 border-b border-[var(--line)]">
                    <span className="font-mono font-semibold text-[var(--ink)]">tension</span>
                    <span className="text-[var(--muted)] text-right">Viscous bridge stretch before merge</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--line)] bg-[var(--orange-tint)] p-3 rounded-xl">
                <span className="text-xs font-bold text-[var(--ink)] block mb-0.5">
                  The One-Fizz Rule
                </span>
                <p className="text-xs text-[var(--muted)] leading-relaxed">
                  Exactly one fizz sound and citrus yellow flash per narrative piece. Zero incidental UI clicks, whooshes, or background music. Silence after the fizz is non-negotiable.
                </p>
              </div>
            </div>
          </div>

          {/* 3. Production Contact Sheet */}
          <div className="pt-4">
            <h3 className="text-xs uppercase font-mono tracking-wider text-[var(--muted)] mb-4">
              Motion Scene Contact Sheet
            </h3>
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-[var(--line)] shadow-xs bg-[#123B38]">
              <Image
                src="/work/tidewell/img/tidewell-contact-sheet.jpg"
                alt="Tidewell motion system contact sheet showing scene frames from the logo reveal, hero spot, flavour launch, social loops, and principles."
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
