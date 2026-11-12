"use client";

import React, { useEffect, useState } from "react";
import { MessageCircle, CalendarClock, Mail, ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { trackEvent, buildWhatsAppUrl } from "@/lib/track";

export interface DoorItem {
  id: string;
  icon: React.ComponentType<{ size?: number; className?: string; "aria-hidden"?: boolean | "true" | "false" }>;
  title: string;
  text: string;
  href: string;
  external: boolean;
  trackingEvent?: "whatsapp_click" | "booking_click";
}

const SIDEBAR_NEXT_STEPS = [
  {
    number: "1",
    title: "We reply",
    text: "Within 24 hours from a real person.",
  },
  {
    number: "2",
    title: "A short call",
    text: "Zero jargon, no sales pressure.",
  },
  {
    number: "3",
    title: "Fixed-price quote",
    text: "Know the cost before starting.",
  },
];

export function getDoors(): DoorItem[] {
  const doors: DoorItem[] = [];

  // WhatsApp
  if (site.whatsapp && site.whatsapp.trim() !== "") {
    const digits = site.whatsapp.replace(/\D/g, "");
    doors.push({
      id: "whatsapp",
      icon: MessageCircle,
      title: "Chat on WhatsApp",
      text: "Quick question? Message us directly.",
      href: `https://wa.me/${digits}?text=${encodeURIComponent(site.whatsappMessage)}`,
      external: true,
      trackingEvent: "whatsapp_click",
    });
  }

  // Booking
  const bookingUrl = process.env.NEXT_PUBLIC_CAL_URL || site.bookingUrl;
  if (bookingUrl && bookingUrl.trim() !== "") {
    doors.push({
      id: "booking",
      icon: CalendarClock,
      title: "Book a 15-minute chat",
      text: "Pick a time that suits you in your own time zone.",
      href: bookingUrl,
      external: true,
      trackingEvent: "booking_click",
    });
  }

  // Email
  if (
    site.email &&
    site.email.trim() !== "" &&
    site.email.trim() !== "hello@example.com"
  ) {
    doors.push({
      id: "email",
      icon: Mail,
      title: "Email us",
      text: site.email,
      href: `mailto:${site.email}`,
      external: false,
    });
  }

  return doors;
}

export function ContactDoors() {
  const [whatsappHref, setWhatsappHref] = useState<string>(
    site.whatsapp
      ? `https://wa.me/${site.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(site.whatsappMessage)}`
      : ""
  );

  useEffect(() => {
    // Dynamic source-aware WhatsApp message once mounted
    setWhatsappHref(buildWhatsAppUrl());
  }, []);

  const doors: DoorItem[] = [];

  // WhatsApp
  if (site.whatsapp && site.whatsapp.trim() !== "") {
    doors.push({
      id: "whatsapp",
      icon: MessageCircle,
      title: "Chat on WhatsApp",
      text: "Quick question? Message us directly.",
      href: whatsappHref,
      external: true,
      trackingEvent: "whatsapp_click",
    });
  }

  // Booking
  const bookingUrl = process.env.NEXT_PUBLIC_CAL_URL || site.bookingUrl;
  if (bookingUrl && bookingUrl.trim() !== "") {
    doors.push({
      id: "booking",
      icon: CalendarClock,
      title: "Book a 15-minute chat",
      text: "Pick a time that suits you in your own time zone.",
      href: bookingUrl,
      external: true,
      trackingEvent: "booking_click",
    });
  }

  // Email
  if (
    site.email &&
    site.email.trim() !== "" &&
    site.email.trim() !== "hello@example.com"
  ) {
    doors.push({
      id: "email",
      icon: Mail,
      title: "Email us",
      text: site.email,
      href: `mailto:${site.email}`,
      external: false,
    });
  }

  return (
    <div className="lg:sticky lg:top-24 space-y-8">
      <div>
        <h2 className="text-[1.35rem] font-bold text-[var(--ink)] mb-4 font-[family-name:var(--font-display)]">
          Reach us your way.
        </h2>
        <div className="flex flex-col gap-3">
          {doors.map((door, index) => {
            const Icon = door.icon;
            return (
              <Reveal key={door.id} delay={index * 0.08}>
                <a
                  href={door.href}
                  onClick={() => {
                    if (door.trackingEvent) {
                      trackEvent(door.trackingEvent, { source: "sidebar_door" });
                    }
                  }}
                  {...(door.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="group flex items-center gap-4 bg-[var(--surface)] border border-[var(--line)] rounded-[20px] p-4 sm:p-5 transition-[transform,box-shadow,border-color] duration-160 ease-out [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-0.5 [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[var(--shadow-hover)] active:scale-[0.98]"
                >
                  <div className="w-10 h-10 rounded-[12px] bg-[color-mix(in_srgb,var(--ink)_6%,transparent)] flex items-center justify-center text-[var(--ink)] shrink-0">
                    <Icon size={19} aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-[var(--ink)] leading-snug text-sm sm:text-base">
                      {door.title}
                    </div>
                    <div className="text-[var(--muted)] text-[0.875rem] leading-snug truncate">
                      {door.text}
                    </div>
                  </div>
                  <ArrowUpRight
                    size={18}
                    className="text-[var(--ink)] shrink-0 ml-auto transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* What happens next sidebar card */}
      <div className="bg-[var(--surface)] border border-[var(--line)] rounded-[20px] p-5 sm:p-6 shadow-[var(--shadow-card)]">
        <h3 className="font-bold text-[var(--ink)] text-base font-[family-name:var(--font-display)] mb-4">
          What happens next
        </h3>
        <div className="space-y-4">
          {SIDEBAR_NEXT_STEPS.map((s) => (
            <div key={s.number} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[var(--orange-tint)] text-[var(--orange-strong)] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                {s.number}
              </div>
              <div className="text-xs sm:text-sm">
                <span className="font-bold text-[var(--ink)] block">{s.title}</span>
                <span className="text-[var(--muted)] leading-relaxed">{s.text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
