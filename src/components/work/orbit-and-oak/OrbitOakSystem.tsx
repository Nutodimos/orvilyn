import React from "react";

export function OrbitOakSystem() {
  const swatches = [
    { name: "Twilight Indigo", hex: "#2A2F6B", note: "Main backdrop & wall", textDark: false },
    { name: "Night Sky", hex: "#1B1E4A", note: "Deep shadows & end card", textDark: false },
    { name: "Oak Tan", hex: "#C89B65", note: "Wooden box & rocket", textDark: true },
    { name: "Oak Dark", hex: "#A87A45", note: "Wood grain & acorn cap", textDark: false },
    { name: "Oak Light", hex: "#E3BE8C", note: "Lid & tagline accents", textDark: true },
    { name: "Moss Green", hex: "#6E9150", note: "Sprouts & rocket fins", textDark: false },
    { name: "Moss Dark", hex: "#52713A", note: "Shadow side of greenery", textDark: false },
    { name: "Marigold Spark", hex: "#F6B93B", note: "The spark & ampersand", textDark: true },
    { name: "Cream Paper", hex: "#FFF4DC", note: "Paper-cuts, doodles & text", textDark: true },
  ];

  const motionRules = [
    {
      action: "Pop-in",
      timing: "12 frames",
      rule: "Overshoot to scale 1.08, settling smoothly to 1.0 over 10 frames.",
    },
    {
      action: "Part Click",
      timing: "8 frames",
      rule: "Snappy slide followed by 4f contact squash (x 1.05, y 0.95).",
    },
    {
      action: "Rocket Crouch",
      timing: "12f in, 18f hold",
      rule: "Anticipatory pre-launch compress (y 0.92, x 1.06) held in stillness.",
    },
    {
      action: "Spark Bloom",
      timing: "12f in, 6f hold, 18f out",
      rule: "Radial marigold burst with gentle 15° ray rotation; zero harsh flicker.",
    },
    {
      action: "Follow-Through",
      timing: "4 to 6 frames late",
      rule: "Nutmeg’s acorn helmet and trailing paper scraps follow secondary physics.",
    },
  ];

  return (
    <section className="w-full py-16 md:py-24 border-b border-[var(--line)] bg-[var(--surface)]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <div className="max-w-2xl mb-12">
          <span className="block text-xs uppercase font-mono tracking-widest text-[var(--muted)] mb-3">
            05 · Design System &amp; Motion Tokens
          </span>
          <h2 className="text-[clamp(1.75rem,3.2vw,2.5rem)] font-bold text-[var(--ink)] leading-snug tracking-tight mb-3">
            Warm earth tones and physical weight.
          </h2>
          <p className="text-[var(--muted)] text-base md:text-lg leading-relaxed">
            The design language combines organic wood tones with a celestial twilight palette.
            Motion curves avoid mathematical ease-ins, instead prioritizing squash-and-stretch and
            tactile spring dynamics.
          </p>
        </div>

        {/* Color Palette Swatches */}
        <div className="mb-14">
          <h3 className="text-sm font-mono uppercase tracking-wider text-[var(--muted)] mb-4">
            Color System
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-3">
            {swatches.map((swatch) => (
              <div
                key={swatch.name}
                className="flex flex-col rounded-xl overflow-hidden border border-[var(--line)] bg-[var(--bg)] shadow-xs"
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
                  <span className="block text-[0.7rem] text-[var(--muted)] truncate">
                    {swatch.note}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Motion Rules Table */}
        <div className="mb-14">
          <h3 className="text-sm font-mono uppercase tracking-wider text-[var(--muted)] mb-4">
            Core Motion Tokens
          </h3>
          <div className="overflow-x-auto rounded-xl border border-[var(--line)] bg-[var(--bg)]">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-[var(--line)] bg-[var(--surface)] text-xs font-mono uppercase text-[var(--muted)]">
                <tr>
                  <th className="py-3 px-4">Move / Action</th>
                  <th className="py-3 px-4">Timing</th>
                  <th className="py-3 px-4">Physics &amp; Curve Rule</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--line)] text-[var(--ink)]">
                {motionRules.map((rule) => (
                  <tr key={rule.action} className="hover:bg-[var(--surface)]/50">
                    <td className="py-3 px-4 font-semibold">{rule.action}</td>
                    <td className="py-3 px-4 font-mono text-xs text-[#C89B65] font-medium">
                      {rule.timing}
                    </td>
                    <td className="py-3 px-4 text-xs text-[var(--muted)]">
                      {rule.rule}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Typography & Sound Tokens */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Typography */}
          <div className="p-6 rounded-2xl bg-[var(--bg)] border border-[var(--line)]">
            <h3 className="text-sm font-mono uppercase tracking-wider text-[var(--muted)] mb-4">
              Typography Stack
            </h3>
            <div className="space-y-4">
              <div>
                <span className="block text-xs font-mono text-[#C89B65]">Display (700)</span>
                <span className="text-xl font-bold text-[var(--ink)]">Fredoka Bold</span>
                <p className="text-xs text-[var(--muted)] mt-0.5">Wordmarks, hero callouts, and story titles</p>
              </div>
              <div className="pt-3 border-t border-[var(--line)]">
                <span className="block text-xs font-mono text-[#C89B65]">Body &amp; Instructions (400 / 700)</span>
                <span className="text-xl font-bold text-[var(--ink)]">Nunito Sans</span>
                <p className="text-xs text-[var(--muted)] mt-0.5">Clear, accessible step instructions and metadata labels</p>
              </div>
            </div>
          </div>

          {/* Sound Architecture */}
          <div className="p-6 rounded-2xl bg-[var(--bg)] border border-[var(--line)]">
            <h3 className="text-sm font-mono uppercase tracking-wider text-[var(--muted)] mb-4">
              Acoustic Sound Architecture
            </h3>
            <div className="space-y-3 text-xs text-[var(--muted)]">
              <div>
                <span className="font-semibold text-[var(--ink)] block">The Signature Spark Chime</span>
                <span>Three-note ascending motif (G, B, D) on a warm wooden xylophone and glockenspiel.</span>
              </div>
              <div className="pt-2 border-t border-[var(--line)]">
                <span className="font-semibold text-[var(--ink)] block">Organic Foley Kit</span>
                <span>Real cardboard flaps, wooden blocks knocking together, paper crinkles, and soft pops.</span>
              </div>
              <div className="pt-2 border-t border-[var(--line)]">
                <span className="font-semibold text-[var(--ink)] block">Musical Timing</span>
                <span>Composed at 120 bpm in G major so every cut, click, and character movement lands on a musical pulse.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
