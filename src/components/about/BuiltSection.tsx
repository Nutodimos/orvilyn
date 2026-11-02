import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function BuiltSection() {
  const filteredProjects = projects.filter(
    (project) => !project.title.toLowerCase().includes("placeholder")
  );

  return (
    <section className="w-full bg-[var(--surface)] py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <Reveal delay={0}>
          <div className="mb-10">
            <h2 className="text-[var(--ink)]">A few things I’ve built</h2>
            <p className="mt-2 text-[var(--muted)] text-lg">
              Click through for the details.
            </p>
          </div>
        </Reveal>

        <div>
          {filteredProjects.map((project, index) => (
            <Reveal key={project.slug} delay={0.08 * (index + 1)}>
              <Link
                href={`/work/${project.slug}`}
                className="group flex flex-col md:flex-row md:items-center justify-between gap-4 py-6 px-4 -mx-4 border-t border-[var(--line)] last:border-b transition-[background-color,transform] duration-160 ease-out [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[var(--bg)] active:scale-[0.99] rounded-lg"
              >
                {/* Left Block */}
                <div className="flex flex-col gap-1 max-w-[38rem]">
                  <h3 className="font-[family-name:var(--font-display)] text-[1.5rem] font-bold text-[var(--ink)] leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-[var(--muted)] text-base leading-relaxed">
                    {project.outcome}
                  </p>
                </div>

                {/* Right Block */}
                <div className="flex items-center md:justify-end gap-3 shrink-0">
                  <span className="text-[0.8rem] uppercase tracking-[0.06em] text-[var(--muted)] font-medium">
                    {project.tags.join(" · ")}
                  </span>
                  <ArrowUpRight
                    size={20}
                    className="text-[var(--ink)] shrink-0 transition-transform duration-160 ease-out [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-0.5 [@media(hover:hover)_and_(pointer:fine)]:group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.08 * (filteredProjects.length + 2)} className="mt-10">
          <Button href="/work" variant="link" className="text-base font-semibold">
            See all work
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
