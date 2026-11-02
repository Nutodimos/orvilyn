import React from "react";
import { Sparkles, Compass, HeartHandshake } from "lucide-react";

export function OrbitOakPremise() {
  const pillars = [
    {
      icon: Compass,
      title: "Tactile discovery over screens",
      description:
        "Every project is crafted from real wood, paper, and soil. Designed to pull kids aged 6 to 11 away from tablets and into hands-on exploration.",
    },
    {
      icon: HeartHandshake,
      title: "Nutmeg: A pantomime guide",
      description:
        "Nutmeg, a tiny acorn-astronaut mascot, guides every step without words. Expressive squash-and-stretch and chirps communicate curiosity and triumph.",
    },
    {
      icon: Sparkles,
      title: "The signature marigold spark",
      description:
        "When an experiment works—a rocket clicks together, a seed sprouts—a warm marigold bloom unfurls to reward the child's focus.",
    },
  ];

  return (
    <section className="w-full py-16 md:py-24 border-b border-[var(--line)] bg-[var(--surface)]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <div className="max-w-2xl mb-12">
          <span className="block text-xs uppercase font-mono tracking-widest text-[var(--muted)] mb-3">
            01 · Concept &amp; Premise
          </span>
          <h2 className="text-[clamp(1.75rem,3.2vw,2.5rem)] font-bold text-[var(--ink)] leading-snug tracking-tight mb-4">
            Hands-on discovery for curious minds.
          </h2>
          <p className="text-[var(--muted)] text-base md:text-lg leading-relaxed">
            Most STEM kits either feel like homework or rely heavily on companion apps. Orbit &amp; Oak
            creates an analog sanctuary where wood textures, cardboard unboxings, and character animation
            make science feel like a storybook adventure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="p-6 md:p-8 rounded-2xl bg-[var(--bg)] border border-[var(--line)] shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#2A2F6B]/10 text-[#2A2F6B] flex items-center justify-center mb-5">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--ink)] mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
