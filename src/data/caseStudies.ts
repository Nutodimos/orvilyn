export type CaseStudy = {
  slug: string;
  year: string;
  role: string;
  stack: string[];
  highlights: string[];
  summary: string;
  problem: string;
  built: string[];
  interesting?: { title: string; text: string };
  outcome: string;
  liveUrl: string;
  gallery: { src: string; alt: string; width: number; height: number }[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "cevo",
    year: "2026",
    role: "Design and development",
    stack: [], // TODO: add the real stack; the Stack line is hidden while this is empty
    liveUrl: "", // TODO: add the public URL if CeVo is live
    gallery: [],
    highlights: [
      "Five roles, so everyone sees only what they should",
      "Voter ID checks automated with AI",
      "Votes can’t be traced back to voters",
    ],
    summary:
      "A secure online voting platform for organizations that want elections people can trust.",
    problem:
      "Running a fair election is harder than it looks. Ballots have to stay secret, only eligible people should vote, and the results have to be checkable. Many organizations end up trusting a spreadsheet, or trusting the person running it.", // TODO: rewrite in your own words
    built: [
      "Five roles, from Super Admin to Reviewer, so everyone sees only what they should",
      "Voter ID checks automated with AI, matched against course registration forms",
      "Live ID capture only, with no file uploads, so photos can’t be swapped in",
      "Secure account setup with single-use links that can’t be reused",
      "Live turnout and results for organizers",
    ],
    interesting: {
      title: "The secret ballot is built into the core design",
      text: "Votes carry no link back to the voter. It isn’t a setting someone can switch on or off: the data is structured so that even someone with full access can’t trace a ballot to a person.",
    },
    outcome:
      "Went through a security audit and was delivered with a 26-page platform guide.", // TODO: confirm exactly what “security audit” means before publishing
  },
  {
    slug: "nutopass",
    year: "2026",
    role: "Design, development, and hardware integration",
    stack: [
      "Next.js",
      "TypeScript",
      "Clerk",
      "Tailwind CSS",
      "ESP32",
    ],
    liveUrl: "", // the domain will lapse; do not link
    gallery: [],
    highlights: [
      "A fingerprint scanner paired with a web dashboard",
      "Separate spaces for each department",
      "Handed over with full documentation",
    ],
    summary:
      "A fingerprint attendance system for a university department: a small scanner paired with a web dashboard.",
    problem:
      "Paper attendance sheets are slow, easy to fake, and painful to total up at the end of a semester.", // TODO: rewrite in your own words
    built: [
      "A web app with a separate space for each department",
      "A fingerprint scanner built on an ESP32 with a genuine AS608 sensor, matching prints on the device itself",
      "Installable on a phone like an app",
      "Deployed to production with high uptime",
      "A user manual, a migration guide, and architecture notes for the department team that took it over",
    ],
    interesting: {
      title: "The first sensor was a fake",
      text: "The fingerprint sensor I started with turned out to be counterfeit. Rather than stall, I built a cloud fallback in Python and OpenCV to keep the project moving, then swapped in a genuine sensor and got matching back onto the device.",
    },
    outcome:
      "Defended and submitted as a final-year project, presented as a poster at FETiCON 2026, and handed over to the incoming department team with full documentation.",
  },
  {
    slug: "ahefss-archive",
    year: "2026",
    role: "Design and development",
    stack: ["Next.js", "Tailwind CSS", "Cloudinary", "Vercel"],
    liveUrl: "https://ahefss-two.vercel.app/",
    gallery: [],
    highlights: [
      "Every administration gets its own archive",
      "Photo galleries for every event",
      "Founding records locked against edits",
    ],
    summary:
      "A living archive for a student association: every administration’s cabinet, events, projects, and lecturers in one place.",
    problem:
      "Students didn’t know what their association was doing. The work was happening, but the information was scattered or missing.", // TODO: rewrite in your own words
    built: [
      "A public site with the president’s address, the cabinet, events with photo galleries, projects, and lecturers",
      "Multiple sessions: each administration has its own archive, switchable in one click",
      "An admin control panel for managing content, with a wizard for starting a new session",
      "Photo galleries with a full-screen viewer",
    ],
    interesting: {
      title: "History that can’t be rewritten",
      text: "The founding administration’s records are locked read-only, enforced at the data layer rather than just a greyed-out button.",
    },
    outcome: "Live and publicly viewable.",
  },
  {
    slug: "ironclad-hvac",
    year: "2026",
    role: "Design and development",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Lucide React"],
    liveUrl: "https://iron-cladhvac.vercel.app/",
    // To activate gallery screenshots, add images to public/work/ironclad/ and list them here:
    // gallery: [
    //   { src: "/work/ironclad/calculator.webp", alt: "Ironclad HVAC financing calculator", width: 1200, height: 750 },
    //   { src: "/work/ironclad/booking.webp", alt: "Ironclad HVAC diagnostic booking flow", width: 1200, height: 750 },
    // ],
    gallery: [],
    highlights: [
      "24/7 Emergency dispatch strip with instant on-call status",
      "Three-tap diagnostic booking flow with upfront symptom triage",
      "Interactive monthly financing calculator for system replacements",
    ],
    summary:
      "A commercial and residential heating and cooling platform built to turn emergency breakdowns into booked service calls without the clutter.",
    problem:
      "When a furnace breaks at midnight in January, nobody wants to read corporate puffery or fill out a fifteen-field form. Most contractor websites lose emergency jobs because they bury their dispatch phone number, hide service areas, and make booking feel like filing taxes. If customers can’t verify that a technician is on call within five seconds, they bounce to the next company on Google.",
    built: [
      "A persistent 24/7 emergency dispatch strip on mobile and desktop with one-tap calling",
      "An interactive diagnostic booking intake with upfront symptom picking and triage notes",
      "A real-time monthly payment calculator for high-efficiency system replacements",
      "A service area radius checker so homeowners immediately know if their neighborhood is covered",
      "Tiered annual maintenance care plans (Silver, Gold, Platinum) with transparent pricing and tune-up schedules",
    ],
    interesting: {
      title: "Emergency triage without the phone tag",
      text: "The booking flow immediately captures the breakdown symptom and pre-fills the dispatch ticket. Technicians see whether it’s a frozen coil, electrical outage, or mechanical rattle before they roll the truck, saving fifteen minutes of diagnostic questions on arrival.",
    },
    outcome:
      "Deployed live on Vercel at iron-cladhvac.vercel.app as a high-conversion reference standard for field service operations.",
  },
  {
    slug: "hadeholla",
    year: "2026",
    role: "Design and development",
    stack: ["Next.js", "Tailwind CSS", "TypeScript"],
    liveUrl: "https://hadeolla-events.vercel.app/",
    gallery: [],
    highlights: [
      "Built mobile-first for how Lagos clients actually browse",
      "Sends qualified event inquiries straight into WhatsApp",
      "Curated portfolio grid that loads crisp images on 4G connections",
    ],
    summary:
      "A mobile-first marketing and booking site for a luxury event planner in Lagos that turns social media visits into WhatsApp bookings.",
    problem:
      "In Nigeria, almost nobody books a luxury wedding or corporate gala through an email contact form. Clients discover planners on Instagram and want to talk immediately on WhatsApp, but unstructured direct messages mean planners waste hours answering the same basic questions: guest count, dates, and budget.",
    built: [
      "A clean mobile-first showcase highlighting weddings, corporate galas, and intimate dinners",
      "A one-click inquiry button that formats the client’s date, venue, and guest count directly into a pre-filled WhatsApp message",
      "A single brand configuration file so colors, contact numbers, and service tiers can be updated in seconds",
      "A lightweight image gallery optimized for fast loading over cellular networks",
    ],
    interesting: {
      title: "WhatsApp briefs without messy formatting",
      text: "Formatting WhatsApp deep-links cleanly across iOS, Android, and desktop web: the message payload URL-encodes line breaks and punctuation safely so the planner receives a clean, readable briefing text the instant the chat opens.",
    },
    outcome:
      "Deployed live on Vercel at hadeolla-events.vercel.app as a mobile-first booking funnel for Lagos events.",
  },
  {
    slug: "sear-and-spice",
    year: "2026",
    role: "Design and development",
    stack: ["Next.js", "React", "Motion", "Tailwind CSS"],
    liveUrl: "https://searandspice.vercel.app/",
    gallery: [],
    highlights: [
      "One-tap modal checkout that doesn’t take customers away from the menu",
      "Instant currency switching between Naira, Dollars, and Pounds",
      "Free delivery tracker that updates live as items are added",
    ],
    summary:
      "A quick-service food ordering web app with live currency switching and an instant modal checkout designed for hungry thumbs.",
    problem:
      "Fast food websites are notoriously frustrating on phones: endless page reloads between categories, heavy delivery aggregators taking huge commission cuts, and confusing checkouts that make people abandon their carts when they’re hungry.",
    built: [
      "A snappy menu browser with zero-reload category switching",
      "A slide-over ordering modal so customers can customize spices and sides without leaving the screen",
      "A live currency toggle that recalculates prices instantly for diaspora customers ordering meals for family back home",
      "A sticky free-delivery threshold bar that nudges order sizes upwards in real time",
    ],
    interesting: {
      title: "Instant currency switching without cart desync",
      text: "Managing real-time currency conversions and cart totals using client-side state without desyncing line-item prices when users toggle currencies mid-order.",
    },
    outcome:
      "Deployed live on Vercel at searandspice.vercel.app as a high-conversion direct-ordering showcase for food brands.",
  },
  {
    slug: "tidewell",
    year: "2026",
    role: "Concept, motion system and renders",
    stack: ["Diffusion Studio", "Canvas2D", "Fraunces", "Outfit"],
    liveUrl: "",
    gallery: [],
    highlights: [
      "Ten 1080p pieces across 16:9 brand films and 9:16 vertical loops",
      "Pure procedural Canvas2D water with zero 3D or stock footage",
      "Four core motion principles anchored by a single signature fizz",
    ],
    summary:
      "A motion system for water at its source: ten procedural films, custom easing curves, and a five-flavour identity for a fictional sparkling mineral water.",
    problem:
      "Mineral water identities often lean on stock footage or complex 3D renders that lack a cohesive behavioral logic. Tidewell was built to prove that motion can be treated as water finding its level: fast first, long release, and quiet punctuation.",
    built: [
      "Ten 1080p motion pieces rendered under 20 MB with zero footage or 3D",
      "Three seamless 9:16 social feed loops engineered for continuous flow",
      "Five flavour color fields governed by a shared motion and typography system",
      "Custom easing curves ('waterOut') tailored to fluid dynamics",
    ],
    interesting: {
      title: "Motion as water finding its level",
      text: "Every piece adheres to one physical model: fast rise, overshoot by a hair, long settle, and silence after the fizz.",
    },
    outcome:
      "Delivered as a complete self-initiated motion identity with written system guidelines and ready-to-deploy web video assets.",
  },
];
