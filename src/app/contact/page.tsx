import React, { Suspense } from "react";
import type { Metadata } from "next";
import { ContactHero } from "@/components/contact/ContactHero";
import { MultiStepLeadForm } from "@/components/contact/MultiStepLeadForm";
import { ContactDoors } from "@/components/contact/ContactDoors";
import { WhatHappensNext } from "@/components/contact/WhatHappensNext";

export const metadata: Metadata = {
  title: "Contact | Orvilyn",
  description:
    "Tell us what’s annoying you. Get a fixed-price quote or reach Orvilyn via form, WhatsApp, or a quick booked call.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <main>
      <ContactHero />

      <section className="py-8 md:py-12">
        <div className="max-w-[1200px] mx-auto px-5 md:px-8">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <Suspense
                fallback={
                  <div className="h-[520px] rounded-[28px] bg-[var(--surface)] border border-[var(--line)] animate-pulse" />
                }
              >
                <MultiStepLeadForm />
              </Suspense>
            </div>
            <div className="order-first lg:order-none lg:col-span-5">
              <ContactDoors />
            </div>
          </div>
        </div>
      </section>

      <WhatHappensNext />
    </main>
  );
}
