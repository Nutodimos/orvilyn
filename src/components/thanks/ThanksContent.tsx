"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { CheckCircle2, CalendarClock, MessageCircle, ArrowRight } from "lucide-react";
import { site } from "@/data/site";
import { trackEvent, buildWhatsAppUrl } from "@/lib/track";

const NEXT_STEPS = [
  {
    number: "1",
    title: "We reply.",
    description: "Within 24 hours, from a real person who has reviewed what you sent.",
  },
  {
    number: "2",
    title: "A short call.",
    description: "15 minutes, zero jargon, zero sales pressure. Just finding out what you need.",
  },
  {
    number: "3",
    title: "A fixed-price quote.",
    description: "So you know exactly what it costs and when it lands before we write a line of code.",
  },
];

export function ThanksContent() {
  const hasTracked = useRef(false);

  useEffect(() => {
    if (!hasTracked.current) {
      hasTracked.current = true;
      trackEvent("thanks_view");
    }
  }, []);

  const calUrl =
    process.env.NEXT_PUBLIC_CAL_URL ||
    site.bookingUrl ||
    "https://cal.com";

  return (
    <div className="max-w-[760px] mx-auto px-5 md:px-8 py-12 md:py-20">
      {/* Header card */}
      <div className="bg-[var(--surface)] border border-[var(--line)] rounded-[28px] p-7 md:p-12 shadow-[var(--shadow-card)] text-center flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-[var(--butter)] text-[var(--ink)] flex items-center justify-center mb-6">
          <CheckCircle2 size={36} className="text-[var(--orange)]" aria-hidden="true" />
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold text-[var(--ink)] font-[family-name:var(--font-display)] tracking-tight mb-4">
          Got it. We’re on it.
        </h1>

        <p className="text-[var(--muted)] text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-8">
          We’ll reply within 24 hours. A real person is reviewing what you sent and checking out the best way to help.
        </p>

        {/* Action CTAs */}
        <div className="w-full max-w-md flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={calUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("booking_click", { source: "thanks_page" })}
            className="inline-flex items-center justify-center font-semibold rounded-full px-6 py-4 bg-[var(--orange)] text-[var(--on-orange)] select-none cursor-pointer transition-[background-color,transform,box-shadow] duration-160 hover:bg-[var(--orange-strong)] active:scale-[0.97] shadow-[var(--shadow-button)]"
          >
            <CalendarClock size={18} className="mr-2 shrink-0" />
            <span>Skip the wait: book a call</span>
          </a>

          <a
            href={buildWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("whatsapp_click", { source: "thanks_page" })}
            className="inline-flex items-center justify-center font-semibold rounded-full px-6 py-4 bg-[var(--surface)] border border-[var(--line)] text-[var(--ink)] select-none cursor-pointer transition-[background-color,transform,border-color] duration-160 hover:bg-[var(--bg)] hover:border-[var(--muted)] active:scale-[0.97]"
          >
            <MessageCircle size={18} className="mr-2 text-[var(--orange-strong)] shrink-0" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>

      {/* What happens next */}
      <div className="mt-12 md:mt-16 bg-[var(--surface)] border border-[var(--line)] rounded-[24px] p-6 md:p-8">
        <h2 className="text-xl font-bold text-[var(--ink)] font-[family-name:var(--font-display)] mb-6">
          What happens next
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {NEXT_STEPS.map((s) => (
            <div key={s.number} className="flex flex-col items-start">
              <div className="w-8 h-8 rounded-full bg-[var(--orange)] text-[var(--on-orange)] font-bold text-sm flex items-center justify-center mb-3">
                {s.number}
              </div>
              <h3 className="font-bold text-[var(--ink)] text-base mb-1.5">{s.title}</h3>
              <p className="text-[var(--muted)] text-sm leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--muted)] hover:text-[var(--ink)] transition-colors"
        >
          <span>Back to homepage</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
