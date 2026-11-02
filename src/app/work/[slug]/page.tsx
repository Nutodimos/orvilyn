import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { caseStudies } from "@/data/caseStudies";
import { CaseHero } from "@/components/work/CaseHero";
import { CaseBody } from "@/components/work/CaseBody";
import { NextProject } from "@/components/work/NextProject";
import { FinalCta } from "@/components/home/FinalCta";

interface CaseStudyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  const caseStudy = caseStudies.find((c) => c.slug === slug);

  if (!project || !caseStudy) {
    return {
      title: "Work | Orvilyn",
    };
  }

  return {
    title: `${project.title} | Orvilyn`,
    description: caseStudy.summary,
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  const caseStudy = caseStudies.find((c) => c.slug === slug);

  if (!project || !caseStudy) {
    notFound();
  }

  return (
    <main>
      <CaseHero project={project} caseStudy={caseStudy} />
      <CaseBody caseStudy={caseStudy} />
      <NextProject currentSlug={slug} />
      <FinalCta />
    </main>
  );
}
