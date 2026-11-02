import React from "react";
import { TidewellVideoPlayer } from "./TidewellVideoPlayer";

interface Flavour {
  name: string;
  descriptor: string;
  fieldHex: string;
  inkHex: string;
}

const flavours: Flavour[] = [
  {
    name: "Plain Sparkling",
    descriptor: "Still, with a pulse.",
    fieldHex: "#1F5F5B",
    inkHex: "#F4F7F5",
  },
  {
    name: "Sea Salt & Lime",
    descriptor: "Briny. Bright.",
    fieldHex: "#4F8F87",
    inkHex: "#F4F7F5",
  },
  {
    name: "Yuzu",
    descriptor: "Sharp. Sunlit.",
    fieldHex: "#E6D9C3",
    inkHex: "#1F5F5B",
  },
  {
    name: "Cucumber & Mint",
    descriptor: "Cool. Green.",
    fieldHex: "#CFE0D6",
    inkHex: "#1F5F5B",
  },
  {
    name: "Blood Orange",
    descriptor: "Bold. Bitter edge.",
    fieldHex: "#A96850",
    inkHex: "#F4F7F5",
  },
];

export function TidewellFlavourSystem() {
  return (
    <section className="w-full py-16 md:py-24 border-b border-[var(--line)]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <div className="max-w-2xl mb-8">
          <span className="block text-xs uppercase font-mono tracking-widest text-[var(--muted)] mb-3">
            04 · Flavour system
          </span>
          <h2 className="text-[clamp(1.75rem,3.2vw,2.5rem)] font-bold text-[var(--ink)] leading-snug tracking-tight mb-3">
            Five ways to rise.
          </h2>
          <p className="text-[var(--muted)] text-base md:text-lg leading-relaxed">
            One system, five fields. The bottle stays still; the water changes temperature and
            weight around it.
          </p>
        </div>

        {/* Flavour Launch Film */}
        <div className="w-full mb-12">
          <TidewellVideoPlayer
            id="flavour-launch"
            src="/work/tidewell/video/flavour-launch.mp4"
            poster="/work/tidewell/posters/flavour-launch.webp"
            aspectRatio="16/9"
            isLoop={false}
            fizzTime={13.8}
            preload="none"
            ariaLabel="Tidewell flavour launch film: cycling through five flavour color fields with wave wipes and a final lineup."
            caption="Flavour launch · 15 s · fizz at 13.8 s"
            transcript="The animation cycles through five distinct flavour fields using dynamic wave wipes: Plain Sparkling, Sea Salt and Lime, Yuzu, Cucumber and Mint, and Blood Orange. The bottles lock into a 5-column lineup before the signature fizz sounds at 13.8 s."
          />
        </div>

        {/* Five Scoped Flavour Colour Cards */}
        <div className="tidewell-scope grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {flavours.map((f) => (
            <div
              key={f.name}
              style={{
                backgroundColor: f.fieldHex,
                color: f.inkHex,
              }}
              className="p-6 rounded-2xl flex flex-col justify-between min-h-[170px] shadow-xs border border-black/5"
            >
              <div>
                <span className="text-[11px] uppercase font-mono tracking-wider opacity-75 block mb-1">
                  Flavour
                </span>
                <h3 className="text-xl font-bold tracking-tight mb-2" style={{ color: f.inkHex }}>
                  {f.name}
                </h3>
              </div>
              <div>
                <p className="text-sm font-medium opacity-90 leading-snug">{f.descriptor}</p>
                <span className="text-[11px] font-mono opacity-60 block mt-2">{f.fieldHex}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
