import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";
import { Reveal } from "@/components/ui/Reveal";

interface NextProjectProps {
  currentSlug: string;
}

export function NextProject({ currentSlug }: NextProjectProps) {
  // Motion case studies navigation
  const motionProjects = [
    { slug: "fernhill-records", title: "Fernhill Records" },
    { slug: "tidewell", title: "Tidewell" },
    { slug: "meridian", title: "Meridian" },
    { slug: "orbit-and-oak", title: "Orbit & Oak" },
  ];

  const motionIndex = motionProjects.findIndex((p) => p.slug === currentSlug);
  if (motionIndex !== -1) {
    const nextMotion =
      motionProjects[(motionIndex + 1) % motionProjects.length];
    return (
      <section className="w-full py-12 md:py-16 bg-[var(--surface)] border-t border-[var(--line)]">
        <div className="max-w-[1200px] mx-auto px-5 md:px-8">
          <Reveal>
            <span className="block text-[0.8rem] uppercase tracking-[0.08em] font-semibold text-[var(--muted)] mb-3">
              Next motion piece
            </span>
            <div>
              <Link
                href={`/work/${nextMotion.slug}`}
                className="group inline-flex items-center gap-4 text-[var(--ink)] font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,3rem)] font-extrabold leading-tight"
              >
                <span>{nextMotion.title}</span>
                <ArrowRight
                  size={32}
                  className="shrink-0 transition-transform duration-200 group-hover:translate-x-[6px] motion-reduce:group-hover:transform-none"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    );
  }

  const validProjects = projects.filter(
    (p) => !p.title.toLowerCase().includes("placeholder")
  );

  if (validProjects.length === 0) return null;

  const currentIndex = validProjects.findIndex((p) => p.slug === currentSlug);
  const nextIndex =
    currentIndex >= 0 ? (currentIndex + 1) % validProjects.length : 0;
  const nextProject = validProjects[nextIndex];

  if (!nextProject) return null;

  return (
    <section className="w-full py-12 md:py-16 bg-[var(--surface)] border-t border-[var(--line)]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <Reveal>
          <span className="block text-[0.8rem] uppercase tracking-[0.08em] font-semibold text-[var(--muted)] mb-3">
            Next project
          </span>
          <div>
            <Link
              href={`/work/${nextProject.slug}`}
              className="group inline-flex items-center gap-4 text-[var(--ink)] font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,3rem)] font-extrabold leading-tight"
            >
              <span>{nextProject.title}</span>
              <ArrowRight
                size={32}
                className="shrink-0 transition-transform duration-200 group-hover:translate-x-[6px] motion-reduce:group-hover:transform-none"
                aria-hidden="true"
              />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
