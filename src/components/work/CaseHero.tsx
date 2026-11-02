import React from "react";
import Image from "next/image";
import type { ProjectItem } from "@/data/projects";
import type { CaseStudy } from "@/data/caseStudies";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

interface CaseHeroProps {
  project: ProjectItem;
  caseStudy: CaseStudy;
}

export function CaseHero({ project, caseStudy }: CaseHeroProps) {
  return (
    <section className="w-full pt-12 pb-10 md:pt-20 md:pb-14">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <Reveal>
          {/* Back link */}
          <div className="mb-6">
            <Button
              href="/work"
              variant="link"
              className="font-semibold text-base"
            >
              ← All work
            </Button>
          </div>

          {/* Badge Pill */}
          {(project.badge || project.live) && (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--surface)] border border-[var(--line)] shadow-sm text-[var(--ink)] text-[0.75rem] font-semibold select-none w-fit mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--orange)]" />
              <span>{project.badge || "Live in production"}</span>
            </div>
          )}

          {/* Project Title */}
          <h1 className="text-[var(--ink)]">{project.title}</h1>

          {/* Summary */}
          <p className="text-[var(--muted)] text-[1.25rem] leading-relaxed max-w-[38rem] mt-4">
            {caseStudy.summary}
          </p>

          {/* Facts Row */}
          <div className="flex flex-wrap gap-x-8 gap-y-3 mt-7">
            <div className="flex flex-col">
              <span className="text-[0.75rem] uppercase tracking-[0.08em] text-[var(--muted)] font-medium mb-1">
                Year
              </span>
              <span className="font-semibold text-[var(--ink)] text-base">
                {caseStudy.year}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-[0.75rem] uppercase tracking-[0.08em] text-[var(--muted)] font-medium mb-1">
                Role
              </span>
              <span className="font-semibold text-[var(--ink)] text-base">
                {caseStudy.role}
              </span>
            </div>

            {caseStudy.stack.length > 0 && (
              <div className="flex flex-col">
                <span className="text-[0.75rem] uppercase tracking-[0.08em] text-[var(--muted)] font-medium mb-1">
                  Stack
                </span>
                <span className="font-semibold text-[var(--ink)] text-base">
                  {caseStudy.stack.join(" · ")}
                </span>
              </div>
            )}
          </div>

          {/* Live site button */}
          {caseStudy.liveUrl && (
            <div className="mt-8">
              <Button href={caseStudy.liveUrl} variant="primary">
                Visit the live site
              </Button>
            </div>
          )}

          {/* Project Image */}
          <div className="relative aspect-[16/10] w-full rounded-[28px] overflow-hidden shadow-[var(--shadow-card)] bg-[var(--surface)] mt-10">
            {project.image ? (
              <Image
                src={project.image}
                alt={project.imageAlt || project.title}
                fill
                priority
                sizes="(min-width: 1200px) 1100px, 100vw"
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-[var(--orange-tint)] font-[family-name:var(--font-display)] font-extrabold text-[5rem] text-[var(--ink)]/20 select-none">
                {project.title.charAt(0)}
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
