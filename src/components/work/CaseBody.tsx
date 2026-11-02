import React from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import type { CaseStudy } from "@/data/caseStudies";
import { Reveal } from "@/components/ui/Reveal";

interface CaseBodyProps {
  caseStudy: CaseStudy;
}

export function CaseBody({ caseStudy }: CaseBodyProps) {
  return (
    <section className="w-full py-10 md:py-16">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <div className="max-w-[44rem] flex flex-col gap-14">
          {/* 1. The problem */}
          <Reveal>
            <div>
              <h2 className="text-[clamp(1.4rem,2.4vw,1.75rem)] font-bold text-[var(--ink)] leading-snug mb-4">
                The problem
              </h2>
              <p className="text-[var(--ink)] text-[1.125rem] leading-[1.7]">
                {caseStudy.problem}
              </p>
            </div>
          </Reveal>

          {/* 2. What I built */}
          <Reveal>
            <div>
              <h2 className="text-[clamp(1.4rem,2.4vw,1.75rem)] font-bold text-[var(--ink)] leading-snug mb-4">
                What I built
              </h2>
              <ul className="flex flex-col gap-3">
                {caseStudy.built.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-[var(--ink)] text-[1.0625rem] leading-relaxed"
                  >
                    <Check
                      size={18}
                      className="text-[var(--ink)] shrink-0 mt-1"
                      strokeWidth={2.5}
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* 3. Optional Gallery */}
          {caseStudy.gallery && caseStudy.gallery.length > 0 && (
            <Reveal>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {caseStudy.gallery.map((img, i) => (
                  <div
                    key={i}
                    className="relative rounded-[20px] overflow-hidden shadow-[var(--shadow-card)] aspect-[16/10]"
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={img.width}
                      height={img.height}
                      sizes="(max-width: 640px) 100vw, 500px"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </Reveal>
          )}

          {/* 4. The interesting bit */}
          {caseStudy.interesting && (
            <Reveal>
              <div className="bg-[var(--orange-tint)] rounded-[20px] p-[28px]">
                <span className="block text-[0.75rem] uppercase tracking-[0.08em] font-semibold text-[var(--muted)] mb-2">
                  The interesting bit
                </span>
                <h3 className="text-[1.25rem] font-bold text-[var(--ink)] leading-snug mb-2">
                  {caseStudy.interesting.title}
                </h3>
                <p className="text-[1.0625rem] text-[var(--ink)] leading-relaxed">
                  {caseStudy.interesting.text}
                </p>
              </div>
            </Reveal>
          )}

          {/* 5. How it turned out */}
          <Reveal>
            <div>
              <h2 className="text-[clamp(1.4rem,2.4vw,1.75rem)] font-bold text-[var(--ink)] leading-snug mb-4">
                How it turned out
              </h2>
              <p className="text-[var(--ink)] text-[1.125rem] leading-[1.7]">
                {caseStudy.outcome}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
