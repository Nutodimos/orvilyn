import React from "react";
import { Code2, ShieldCheck, BadgeCheck, Clock } from "lucide-react";

export function ProofStrip() {
  const items = [
    {
      icon: Code2,
      label: "Built by an engineer",
    },
    {
      icon: ShieldCheck,
      label: "Security-minded by default",
    },
    {
      icon: BadgeCheck,
      label: "Fixed-price quotes",
    },
    {
      icon: Clock,
      label: "Replies within 24 hours",
    },
  ];

  return (
    <div className="w-full py-6">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 items-center">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="flex items-center gap-3"
              >
                <Icon
                  size={20}
                  className="text-[var(--ink)] shrink-0"
                  aria-hidden="true"
                />
                <span className="font-semibold text-[0.95rem] text-[var(--ink)] leading-snug">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
