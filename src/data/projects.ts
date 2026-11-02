export interface ProjectItem {
  slug: string;
  title: string;
  outcome: string;
  tags: string[];
  live: boolean;
  image: string;
  imageAlt?: string;
  badge?: string;
}

export const projects: ProjectItem[] = [
  {
    slug: "ironclad-hvac",
    title: "Ironclad HVAC",
    outcome: "A heating and cooling website built to turn emergency breakdowns into dispatched service calls.",
    tags: ["Website"],
    live: true,
    badge: "Live site",
    image: "/work/orvane-ironclad-work-card-v2.webp",
    imageAlt: "Ironclad HVAC emergency dispatch bar, booking intake, and service area map",
  },
  {
    slug: "cevo",
    title: "CeVo",
    outcome: "Secure, transparent online elections for organizations, with real-time results.",
    tags: ["Web app", "SaaS"],
    live: false, // TODO: set to true only if CeVo is live in production.
    image: "/work/orvane-cevo-work-card.webp",
    imageAlt: "CeVo election dashboard and landing page",
  },
  {
    slug: "hadeholla",
    title: "Hadeholla",
    outcome: "A mobile-first booking site for a Lagos event planner that sends qualified inquiries straight to WhatsApp.",
    tags: ["Website"],
    live: true,
    badge: "Live site",
    image: "/work/orvane-hadeholla-work-card-v3.webp",
    imageAlt: "Hadeholla event planning showcase and instant WhatsApp consultation booking flow",
  },
  {
    slug: "ahefss-archive",
    title: "AHEFSS Archive",
    outcome: "A multi-session archive for a student association: cabinet, events, and projects across every administration.",
    tags: ["Website", "Admin panel"],
    live: true,
    badge: "Live site",
    image: "/work/orvane-ahefss-work-card.webp",
    imageAlt: "AHEFSS Archive admin control panel and public site header",
  },
  {
    slug: "sear-and-spice",
    title: "Sear & Spice",
    outcome: "A fast-food ordering app with instant currency switching and a one-click checkout modal that doesn’t lose hungry diners.",
    tags: ["Web app"],
    live: true,
    badge: "Live site",
    image: "/work/orvane-searspice-work-card-v1.webp",
    imageAlt: "Sear & Spice menu categories, multi-currency switcher, and ordering modal",
  },
  {
    slug: "nutopass",
    title: "NutoPass",
    outcome: "Fingerprint attendance for university departments, from sensor to cloud dashboard.",
    tags: ["Web app", "Mobile app"],
    live: false,
    image: "/work/orvane-nutopass-work-card.webp",
    imageAlt: "NutoPass admin dashboard and mobile Biometric Hub",
    badge: "Deployed for a university department",
  },
];
