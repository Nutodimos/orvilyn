import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { caseStudies } from "@/data/caseStudies";
import { showMotionSection } from "@/data/motion";
import { WorkHero } from "@/components/work/WorkHero";
import { ProjectRow } from "@/components/work/ProjectRow";
import { MotionSection } from "@/components/work/MotionSection";
import { FinalCta } from "@/components/home/FinalCta";

export const metadata: Metadata = {
  title: "Work | Orvilyn",
  description:
    "Selected projects from Somidotun and Orvilyn: what was built, the problem it solved, and what happened next.",
  alternates: {
    canonical: "/work",
  },
};

export default function WorkPage() {
  const filteredProjects = projects.filter(
    (project) => !project.title.toLowerCase().includes("placeholder")
  );

  return (
    <main>
      <WorkHero />
      <div className="flex flex-col gap-6 md:gap-10 pb-16 md:pb-24">
        {filteredProjects.map((project, index) => {
          const matchingStudy = caseStudies.find(
            (study) => study.slug === project.slug
          );
          return (
            <ProjectRow
              key={project.slug}
              project={project}
              caseStudy={matchingStudy}
              index={index}
              priority={index === 0}
            />
          );
        })}
      </div>
      {showMotionSection && <MotionSection />}
      <FinalCta className="pt-20 md:pt-32" />
    </main>
  );
}
