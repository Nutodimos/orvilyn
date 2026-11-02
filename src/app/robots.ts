import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/leads"],
    },
    sitemap: "https://orvilyn.com/sitemap.xml",
  };
}
