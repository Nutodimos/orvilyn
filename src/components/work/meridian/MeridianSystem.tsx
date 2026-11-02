import React from "react";
import Image from "next/image";

export function MeridianSystem() {
  const swatches = [
    { name: "Deep Obsidian", hex: "#07090E", note: "Ground foundation", textDark: false },
    { name: "Deep Slate", hex: "#0B0E17", note: "Canvas mid-tones", textDark: false },
    { name: "Slate Surface", hex: "#101420", note: "Atmospheric ambient", textDark: false },
    { name: "Slate Card Fill", hex: "#151B2B", note: "Dark glass panels", textDark: false },
    { name: "Electric Mint", hex: "#00E599", note: "Safe balances & checks", textDark: true },
    { name: "Warm Gold", hex: "#F59E0B", note: "Signature horizon", textDark: true },
    { name: "Signal Coral", hex: "#EF4444", note: "Chaos & overdue warnings", textDark: false },
    { name: "Cyan", hex: "#06B6D4", note: "Client metadata chips", textDark: true },
  ];

  return (
    <section className="w-full py-16 md:py-24 border-b border-[var(--line)]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <div className="max-w-2xl mb-12">
          <span className="block text-xs uppercase font-mono tracking-widest text-[var(--muted)] mb-3">
            05 · System & design tokens
          </span>
          <h2 className="text-[clamp(1.75rem,3.2vw,2.5rem)] font-bold text-[var(--ink)] leading-snug tracking-tight mb-3">
            Disciplined obsidian slate.
          </h2>
          <p className="text-[var(--muted)] text-base md:text-lg leading-relaxed">
            The visual and motion architecture is grounded in dark glass panels, high-contrast
            typographic hierarchy, and restrained accent hues that signal certainty rather than alarm.
          </p>
        </div>

        {/* Color Palette Swatches */}
        <div className="mb-14">
          <h3 className="text-sm font-mono uppercase tracking-wider text-[var(--muted)] mb-4">
            Color System
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {swatches.map((swatch) => (
              <div
                key={swatch.name}
                className="flex flex-col rounded-xl overflow-hidden border border-[var(--line)] bg-[var(--surface)] shadow-xs"
              >
                <div
                  className="h-16 w-full flex items-end p-2"
                  style={{ backgroundColor: swatch.hex }}
                >
                  <span
                    className={`font-mono text-[0.65rem] font-bold px-1.5 py-0.5 rounded ${
                      swatch.textDark
                        ? "bg-black/20 text-black"
                        : "bg-white/20 text-white"
                    }`}
                  >
                    {swatch.hex}
                  </span>
                </div>
                <div className="p-2.5">
                  <span className="block font-semibold text-xs text-[var(--ink)] truncate">
                    {swatch.name}
                  </span>
                  <span className="block text-[0.7rem] text-[var(--muted)] truncate mt-0.5">
                    {swatch.note}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Typography & Hierarchy Specs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14">
          <div className="p-6 md:p-8 rounded-[20px] bg-[var(--surface)] border border-[var(--line)]">
            <h3 className="text-base font-bold text-[var(--ink)] mb-4">
              Typography Hierarchy (Inter)
            </h3>
            <div className="space-y-4 text-xs md:text-sm">
              <div className="pb-3 border-b border-[var(--line)] flex justify-between items-baseline">
                <div>
                  <span className="font-mono text-[var(--muted)]">Hero Wordmark</span>
                  <div className="font-[family-name:var(--font-sans)] text-2xl font-extrabold tracking-widest text-[var(--ink)] mt-1">
                    M E R I D I A N
                  </div>
                </div>
                <span className="font-mono text-[var(--muted)]">52px / 800</span>
              </div>

              <div className="pb-3 border-b border-[var(--line)] flex justify-between items-baseline">
                <div>
                  <span className="font-mono text-[var(--muted)]">Core Metrics</span>
                  <div className="font-[family-name:var(--font-sans)] text-xl font-extrabold text-[#00E599] mt-1">
                    $4,280
                  </div>
                </div>
                <span className="font-mono text-[var(--muted)]">68px / 800</span>
              </div>

              <div className="pb-3 border-b border-[var(--line)] flex justify-between items-baseline">
                <div>
                  <span className="font-mono text-[var(--muted)]">Card Headings</span>
                  <div className="font-[family-name:var(--font-sans)] text-base font-bold text-[var(--ink)] mt-1">
                    Tax Reserve · Safe Balance
                  </div>
                </div>
                <span className="font-mono text-[var(--muted)]">28–48px / 700</span>
              </div>

              <div className="flex justify-between items-baseline">
                <div>
                  <span className="font-mono text-[var(--muted)]">Taglines & Body</span>
                  <div className="font-[family-name:var(--font-sans)] text-sm font-medium text-[var(--muted)] mt-1">
                    Steady money for unsteady months.
                  </div>
                </div>
                <span className="font-mono text-[var(--muted)]">20–22px / 500</span>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8 rounded-[20px] bg-[#07090E] border border-white/[0.08] text-white flex flex-col justify-between">
            <div>
              <span className="block text-xs font-mono uppercase text-[#F59E0B] tracking-wider mb-2">
                Motion Curves
              </span>
              <h4 className="text-xl font-bold mb-3">
                Physics of Settle & Hold
              </h4>
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                Fintech interfaces often suffer from either sterile static tables or hyperactive
                whimsical bouncy springs. Meridian deploys weighted deceleration curves
                that start with responsive speed and settle with rock-solid physical mass.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.04] border border-white/[0.08] font-mono text-xs text-white/80 space-y-1.5">
              <div>{"// Settle & Horizon Deceleration"}</div>
              <div className="text-[#00E599]">--ease-out: cubic-bezier(0.23, 1, 0.32, 1);</div>
              <div className="text-[#F59E0B]">--ease-horizon: cubic-bezier(0.16, 1, 0.3, 1);</div>
            </div>
          </div>
        </div>

        {/* Narrative Contact Sheet */}
        <div>
          <h3 className="text-sm font-mono uppercase tracking-wider text-[var(--muted)] mb-4">
            Process & Story Compilation
          </h3>
          <figure className="relative rounded-[20px] overflow-hidden border border-[var(--line)] bg-[var(--surface)] shadow-md">
            <Image
              src="/work/meridian/previews/meridian-contact-sheet.jpg"
              alt="Meridian contact sheet showing sequential frames from chaotic jagged graphs to golden horizon and tax reserves"
              width={2560}
              height={1440}
              className="w-full h-auto object-cover"
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
            <figcaption className="p-4 text-xs md:text-sm text-[var(--muted)] border-t border-[var(--line)]">
              Chronological contact sheet showing the progression from financial chaos spikes,
              through the golden horizon transition, to automated tax jars and the final wordmark.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
