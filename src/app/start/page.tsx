import React, { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/site";
import { MultiStepLeadForm } from "@/components/contact/MultiStepLeadForm";
import { ContactDoors } from "@/components/contact/ContactDoors";

export const metadata: Metadata = {
  title: "Get Started | Orvilyn",
  description:
    "Tell us what you need. Receive a fixed-price proposal within 24 hours.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function StartLandingPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] flex flex-col justify-between">
      {/* Minimal Header: Logo only, no navigation distractions */}
      <header className="py-6 px-5 md:px-8 border-b border-[var(--line)]">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 transition-opacity duration-150 hover:opacity-85 select-none"
            aria-label={`${site.name} home`}
          >
            <div className="relative w-8 h-8 rounded-full overflow-hidden bg-[var(--orange)] shrink-0">
              <Image
                src="/orvane logo.png"
                alt="Orvilyn mark"
                width={32}
                height={32}
                priority
                className="object-cover"
              />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-[var(--ink)] font-[family-name:var(--font-display)]">
              {site.name}
            </span>
          </Link>

          <span className="text-xs uppercase tracking-wider font-semibold text-[var(--muted)]">
            24h Turnaround
          </span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 py-10 md:py-16">
        <div className="max-w-[1200px] mx-auto px-5 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
            <h1 className="text-3xl md:text-5xl font-extrabold text-[var(--ink)] font-[family-name:var(--font-display)] tracking-tight mb-4">
              Let&apos;s build something that works.
            </h1>
            <p className="text-[var(--muted)] text-base md:text-lg leading-relaxed">
              Answer 4 quick questions. We&apos;ll review your requirements and send a clear, fixed-price plan within 24 hours.
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14 items-start">
            <div className="lg:col-span-7">
              <Suspense
                fallback={
                  <div className="h-[520px] rounded-[28px] bg-[var(--surface)] border border-[var(--line)] animate-pulse" />
                }
              >
                <MultiStepLeadForm sourceContext="ad_landing_page" />
              </Suspense>
            </div>
            <div className="order-first lg:order-none lg:col-span-5">
              <ContactDoors />
            </div>
          </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="py-6 px-5 text-center text-xs text-[var(--muted)] border-t border-[var(--line)]">
        © 2026 {site.name}. All rights reserved.
      </footer>
    </div>
  );
}
