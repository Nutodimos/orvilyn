"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/data/site";
import { credentials, aboutPortrait, aboutPortraitAlt } from "@/data/about";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function AboutHero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="w-full bg-[var(--bg)] pt-20 pb-16 md:pt-28 md:pb-24 overflow-x-clip">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Text (7 of 12 on lg) */}
          <div className="w-full lg:col-span-7 flex flex-col items-start">
            <Reveal delay={0}>
              <h1 className="text-[var(--ink)]">Hi, I’m Somidotun.</h1>
            </Reveal>

            <Reveal delay={0.08} className="mt-5">
              <p className="text-[var(--muted)] text-[1.25rem] leading-relaxed max-w-[34rem]">
                I’m a computer engineer from Lagos. I started Orvilyn to help small
                and medium businesses find their footing online, and to build the
                tools that make their time and money go further.
              </p>
            </Reveal>

            <Reveal delay={0.16} className="mt-7">
              <div className="flex flex-wrap gap-[10px] items-center">
                {credentials.map((item, index) => (
                  <span
                    key={index}
                    className="border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] px-4 py-2 text-[0.9rem] font-semibold rounded-full select-none"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.24} className="mt-8">
              <div className="flex flex-wrap items-center gap-4">
                <MagneticButton>
                  <Button href={site.cta.href} variant="primary" size="lg">
                    {site.cta.label}
                  </Button>
                </MagneticButton>

                <Button
                  href="/work"
                  variant="link"
                  className="text-base font-semibold py-2 px-1"
                >
                  See my work
                </Button>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Portrait (5 of 12 on lg) */}
          <div className="w-full lg:col-span-5 flex justify-center mt-4 lg:mt-0">
            <Reveal delay={0.2} className="w-full max-w-[320px] sm:max-w-[420px] mx-auto">
              <div className="relative w-full">
                {/* Background panel */}
                <div
                  className="absolute inset-[-16px] bg-[var(--orange-tint)] rounded-[36px] rotate-4 pointer-events-none z-0"
                  aria-hidden="true"
                />

                {/* Photo box */}
                <div className="relative aspect-[4/5] w-full rounded-[28px] overflow-hidden shadow-[var(--shadow-card)] z-10 bg-[var(--surface)]">
                  {aboutPortrait ? (
                    <Image
                      src={aboutPortrait}
                      alt={aboutPortraitAlt}
                      fill
                      priority
                      sizes="(min-width: 1024px) 420px, 80vw"
                      className="object-cover"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center bg-[var(--surface)] select-none"
                      aria-hidden="true"
                    >
                      <span className="font-[family-name:var(--font-display)] font-extrabold text-[9rem] text-[var(--ink)] opacity-[0.12] leading-none">
                        S
                      </span>
                    </div>
                  )}
                </div>

                {/* Sticker */}
                {shouldReduceMotion ? (
                  <div className="absolute bottom-6 left-2 sm:-left-3 z-20 -rotate-6 bg-[var(--butter)] text-[var(--ink)] border-2 border-[var(--ink)] rounded-[12px] px-[18px] py-[10px] font-bold text-[1.1rem] leading-tight shadow-sm whitespace-nowrap select-none">
                    I answer the emails.
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                    className="absolute bottom-6 left-2 sm:-left-3 z-20 -rotate-6 bg-[var(--butter)] text-[var(--ink)] border-2 border-[var(--ink)] rounded-[12px] px-[18px] py-[10px] font-bold text-[1.1rem] leading-tight shadow-sm whitespace-nowrap select-none"
                  >
                    I answer the emails.
                  </motion.div>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
