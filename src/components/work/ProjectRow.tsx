import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Check } from "lucide-react";
import type { ProjectItem } from "@/data/projects";
import type { CaseStudy } from "@/data/caseStudies";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

interface ProjectRowProps {
  project: ProjectItem;
  caseStudy?: CaseStudy;
  index: number;
  priority?: boolean;
}

export function ProjectRow({
  project,
  caseStudy,
  index,
  priority,
}: ProjectRowProps) {
  const isOdd = index % 2 === 1;
  const highlights = caseStudy?.highlights || [];

  return (
    <section className="w-full py-10 md:py-16">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-[56px] items-center">
            {/* Visual Image */}
            <div
              className={`col-span-1 lg:col-span-7 order-1 ${
                isOdd ? "lg:order-2" : "lg:order-1"
              }`}
            >
              <Link
                href={`/work/${project.slug}`}
                className="group block relative aspect-[16/10] w-full rounded-[28px] overflow-hidden shadow-[var(--shadow-card)] bg-[var(--surface)] transition-transform duration-160 ease-out active:scale-[0.98]"
              >
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.imageAlt || project.title}
                    fill
                    priority={priority ?? index === 0}
                    sizes="(min-width: 1024px) 700px, 100vw"
                    className="object-cover transition-transform duration-250 ease-out [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-[1.02] motion-reduce:group-hover:scale-100 motion-reduce:transition-none"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[var(--orange-tint)] font-[family-name:var(--font-display)] font-extrabold text-[5rem] text-[var(--ink)]/20 select-none">
                    {project.title.charAt(0)}
                  </div>
                )}
              </Link>
            </div>

            {/* Text Content */}
            <div
              className={`col-span-1 lg:col-span-5 order-2 ${
                isOdd ? "lg:order-1" : "lg:order-2"
              } flex flex-col justify-center`}
            >
              {(project.badge || project.live) && (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--surface)] border border-[var(--line)] shadow-sm text-[var(--ink)] text-[0.75rem] font-semibold select-none w-fit mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--orange)]" />
                  <span>{project.badge || "Live in production"}</span>
                </div>
              )}

              <h2 className="text-[clamp(1.75rem,3.2vw,2.5rem)] font-bold text-[var(--ink)] leading-tight mb-3">
                {project.title}
              </h2>

              <p className="text-[var(--muted)] text-[1.125rem] leading-relaxed mb-6">
                {project.outcome}
              </p>

              {highlights.length > 0 && (
                <ul className="flex flex-col gap-[10px] mb-6">
                  {highlights.slice(0, 3).map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-[var(--ink)] text-base"
                    >
                      <Check
                        size={18}
                        className="text-[var(--ink)] shrink-0 mt-1"
                        strokeWidth={2.5}
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="text-[0.8rem] uppercase tracking-[0.06em] text-[var(--muted)] font-medium mb-6">
                {project.tags.join(" · ")}
              </div>

              <div>
                <Button
                  href={`/work/${project.slug}`}
                  variant="link"
                  className="font-semibold text-base"
                >
                  Read the story
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
