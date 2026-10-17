import React from "react";
import { Globe, AppWindow, Wrench, Smartphone } from "lucide-react";
import { services } from "@/data/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

const iconMap = {
  Globe,
  AppWindow,
  Wrench,
  Smartphone,
};

export function Services() {
  const buildServices = services.filter((s) => s.group === "build");

  return (
    <section id="services" className="w-full bg-[var(--bg)] pt-12 md:pt-16 pb-20 md:pb-28">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <SectionHeading title="What we make" align="left" />

        {/* Group: Build */}
        <div className="mt-12">
          <span className="text-[0.8rem] font-bold uppercase tracking-[0.08em] text-[var(--muted)] block mb-6">
            Build
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {buildServices.map((service, idx) => {
              const Icon = iconMap[service.icon as keyof typeof iconMap];
              return (
                <Reveal key={service.title} delay={idx * 0.08}>
                  <div className="h-full bg-[var(--surface)] border border-[var(--line)] rounded-[20px] p-6 shadow-[var(--shadow-card)] flex flex-col justify-between transition-[transform,box-shadow] duration-250 ease-out hover:-translate-y-1 hover:shadow-[var(--shadow-hover)]">
                    <div>
                      <div className="w-11 h-11 rounded-xl bg-[var(--ink)]/[0.06] flex items-center justify-center mb-6">
                        <Icon
                          size={22}
                          className="text-[var(--ink)]"
                          aria-hidden="true"
                        />
                      </div>
                      <h3 className="text-xl font-bold text-[var(--ink)] mb-3 leading-snug">
                        {service.title}
                      </h3>
                      <p className="text-[var(--muted)] text-[0.95rem] leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                    <div className="mt-8 pt-4 border-t border-[var(--line)]">
                      <span className="text-[0.8rem] text-[var(--muted)] uppercase tracking-[0.06em] font-semibold">
                        {service.tech}
                      </span>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Bottom notes and CTA */}
        <div className="mt-16 text-center flex flex-col items-center gap-4">
          <p className="text-[var(--muted)] text-base md:text-lg">
            Logos, ads, SEO? Not our thing. We’d rather be great at this.
          </p>
          <Button href="/services" variant="link" className="font-semibold">
            See all services
          </Button>
        </div>
      </div>
    </section>
  );
}
