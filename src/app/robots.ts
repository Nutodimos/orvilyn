import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://orvilyn.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/leads"],
      },
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "PerplexityBot",
          "ClaudeBot",
          "anthropic-ai",
          "Applebot-Extended",
          "Google-Extended",
        ],
        allow: "/",
        disallow: ["/leads"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
