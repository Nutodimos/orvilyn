import React from "react";
import { MessageCircle, CalendarClock, Mail, ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";

export interface DoorItem {
  id: string;
  icon: React.ComponentType<{ size?: number; className?: string; "aria-hidden"?: boolean | "true" | "false" }>;
  title: string;
  text: string;
  href: string;
  external: boolean;
}

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
    });
  }

  // Booking
  if (site.bookingUrl && site.bookingUrl.trim() !== "") {
    doors.push({
      id: "booking",
      icon: CalendarClock,
      title: "Book a 15-minute chat",
      text: "Pick a time that suits you. Slots show in your own time zone.",
      href: site.bookingUrl,
      external: true,
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
  const doors = getDoors();

  if (doors.length === 0) {
    return null;
  }

  return (
    <div className="lg:sticky lg:top-24">
      <h2 className="text-[1.5rem] font-bold text-[var(--ink)] mb-5 font-[family-name:var(--font-display)]">
        Reach us your way.
      </h2>
      <div className="flex flex-col gap-3">
        {doors.map((door, index) => {
          const Icon = door.icon;
          return (
            <Reveal key={door.id} delay={index * 0.08}>
              <a
                href={door.href}
                {...(door.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="group flex items-center gap-4 bg-[var(--surface)] border border-[var(--line)] rounded-[20px] p-5 transition-[transform,box-shadow] duration-250 ease-out [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-0.5 [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[var(--shadow-hover)] active:scale-[0.98]"
              >
                <div className="w-11 h-11 rounded-[12px] bg-[color-mix(in_srgb,var(--ink)_6%,transparent)] flex items-center justify-center text-[var(--ink)] shrink-0">
                  <Icon size={20} aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-[var(--ink)] leading-snug">
                    {door.title}
                  </div>
                  <div className="text-[var(--muted)] text-[0.95rem] leading-snug">
                    {door.text}
                  </div>
                </div>
                <ArrowUpRight
                  size={20}
                  className="text-[var(--ink)] shrink-0 ml-auto transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
