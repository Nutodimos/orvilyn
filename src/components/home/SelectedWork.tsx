import React from "react";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/data/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function SelectedWork() {
  return (
    <section id="work" className="w-full bg-[var(--bg)] py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <SectionHeading
          title="Selected work"
          subtitle="A few things we’ve built and shipped."
          align="left"
        />

        {/* 3 Project Cards Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <Reveal key={project.slug} delay={idx * 0.08}>
              {/* TODO: change to /work/${project.slug} when detail pages exist */}
              <Link
                href="/work"
                className="group flex flex-col h-full bg-[var(--surface)] border border-[var(--line)] rounded-[20px] overflow-hidden shadow-[var(--shadow-card)] transition-[transform,box-shadow] duration-250 ease-out hover:-translate-y-1 hover:shadow-[var(--shadow-hover)]"
              >
                {/* Visual Area 16:10 */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-b from-[var(--orange-tint)] to-[var(--surface)] flex items-center justify-center">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                    />
                  ) : (
                    <span className="font-[var(--font-display)] font-extrabold text-[6rem] text-[var(--orange)]/25 select-none transition-transform duration-300 ease-out group-hover:scale-[1.03]">
                      {project.title.charAt(0)}
                    </span>
                  )}
                  {project.live && (
                    <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--surface)] border border-[var(--line)] shadow-sm text-[var(--ink)] text-[0.75rem] font-semibold select-none">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--orange)]" />
                      <span>Live in production</span>
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-xl font-bold text-[var(--ink)] mb-2">
                      {project.title}
                    </h3>
                    <p className="text-[var(--muted)] text-[0.95rem] leading-relaxed mb-4">
                      {project.outcome}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[var(--line)]">
                    <span className="text-[0.8rem] text-[var(--muted)] font-medium">
                      {project.tags.join(" · ")}
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <Button href="/work" variant="link" className="font-semibold text-base">
            See all work
          </Button>
        </div>
      </div>
    </section>
  );
}
