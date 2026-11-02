import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { motionPieces, showMotionSection } from "@/data/motion";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://orvilyn.com";

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/how-we-work`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${baseUrl}/work/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const motionRoutes: MetadataRoute.Sitemap = showMotionSection
    ? motionPieces
        .filter((m) => m.href)
        .map((m) => ({
          url: `${baseUrl}${m.href}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.7,
        }))
    : [];

  return [...staticRoutes, ...projectRoutes, ...motionRoutes];
}
