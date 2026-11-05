import React from "react";
import { Plus } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export interface FaqItem {
  q: string;
  a: string;
}

export const faqItems: FaqItem[] = [
  {
    q: "How much does a project cost?",
    a: "It depends on what you need, so we don’t guess in a brochure. After a short call you get a fixed-price quote, and that’s the price.",
  },
  {
    q: "What if I don’t know what I need?",
    a: "That’s the most common place to start. Tell us what’s annoying you and we’ll work out the rest together.",
  },
  {
    q: "How long does it take?",
    a: "It depends on the project. Your quote comes with a timeline, and we send regular updates while we build.",
  },
  {
    q: "What happens after launch?",
    a: "We stick around. You get support after go-live, so you’re not left holding something you don’t understand.",
  },
];

export function Faq() {
  return (
    <section className="w-full bg-[var(--surface)] py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <div className="max-w-[48rem]">
          <Reveal>
            <h2 className="text-[var(--ink)] mb-8 md:mb-12">Quick questions</h2>
            <div className="border-t border-[var(--line)]">
              {faqItems.map((item, idx) => (
                <details
                  key={idx}
                  className="border-b border-[var(--line)] group"
                >
                  <summary className="flex items-center justify-between py-[20px] cursor-pointer list-none font-[family-name:var(--font-display)] font-bold text-[1.125rem] text-[var(--ink)] select-none">
                    <span>{item.q}</span>
                    <Plus
                      size={20}
                      className="faq-icon text-[var(--ink)] shrink-0 ml-4"
                      aria-hidden="true"
                    />
                  </summary>
                  <div className="pb-[20px] text-[var(--muted)] text-[1.0625rem] leading-relaxed max-w-[40rem]">
                    <p>{item.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
