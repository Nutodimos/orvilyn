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

  const ogImages = project.image
    ? [
        {
          url: project.image,
          alt: project.imageAlt || project.title,
        },
      ]
    : undefined;

  return {
    title: `${project.title} — Case Study | Orvilyn`,
    description: caseStudy.summary,
    alternates: {
      canonical: `/work/${slug}`,
    },
    openGraph: {
      title: `${project.title} — Case Study | Orvilyn`,
      description: caseStudy.summary,
      url: `/work/${slug}`,
      siteName: "Orvilyn",
      images: ogImages,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Case Study | Orvilyn`,
      description: caseStudy.summary,
      images: project.image ? [project.image] : undefined,
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  const caseStudy = caseStudies.find((c) => c.slug === slug);

  if (!project || !caseStudy) {
    notFound();
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    headline: `${project.title} — Case Study`,
    description: caseStudy.summary,
    url: `https://orvilyn.com/work/${slug}`,
    image: project.image ? `https://orvilyn.com${project.image}` : undefined,
    author: {
      "@type": "Person",
      name: "Somidotun Aina",
    },
    creator: {
      "@type": "Organization",
      name: "Orvilyn",
      url: "https://orvilyn.com",
    },
    keywords: project.tags,
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <CaseHero project={project} caseStudy={caseStudy} />
      <CaseBody caseStudy={caseStudy} />
      <NextProject currentSlug={slug} />
      <FinalCta />
    </main>
  );
}
