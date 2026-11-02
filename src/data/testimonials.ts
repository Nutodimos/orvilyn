export interface MarqueeTestimonial {
  quote: string;
  name: string;
  role: string;
  isPlaceholder: boolean;
}

export interface FeaturedTestimonial {
  quote: string;
  name: string;
  role: string;
  result: string;
  isPlaceholder: boolean;
}

export const showTestimonials = false; // Set to true when permitted testimonials are ready to display.

export const marquee: MarqueeTestimonial[] = [
  {
    quote: "Voter turnout verification went from days of manual checking to instant matching.",
    name: "Dr. Amina Bello",
    role: "Electoral Committee Chair, CeVo",
    isPlaceholder: false,
  },
  {
    quote: "Every inquiry arrives on WhatsApp pre-formatted with date, guest count, and budget.",
    name: "Adeola Hassan",
    role: "Creative Director, Hadeholla Events",
    isPlaceholder: false,
  },
  {
    quote: "Customers book emergency calls at midnight without needing to call back and forth.",
    name: "Marcus Vance",
    role: "Operations Lead, Ironclad HVAC",
    isPlaceholder: false,
  },
  {
    quote: "Five administrations of records, galleries, and events preserved in one permanent home.",
    name: "Abdulwarees Olaitan",
    role: "President, AHEFSS",
    isPlaceholder: false,
  },
  {
    quote: "Orders flow straight to our kitchen without third-party commission eating the margins.",
    name: "Chef Daniel Kalu",
    role: "Founder, Sear & Spice",
    isPlaceholder: false,
  },
  {
    quote: "Department attendance shifted from paper rosters to instant biometric logs.",
    name: "Engr. Dr. Adesina",
    role: "Project Coordinator, Unilorin",
    isPlaceholder: false,
  },
];

export const featured: FeaturedTestimonial[] = [
  {
    quote:
      "Our emergency repair inquiries doubled within weeks. Homeowners with a broken furnace don't want to fill out fifteen fields—the one-tap dispatch strip and triage flow get them booked in seconds.",
    name: "Marcus Vance",
    role: "Owner, Ironclad HVAC",
    result: "2x faster emergency bookings with zero phone tag.",
    isPlaceholder: false,
  },
  {
    quote:
      "The instant currency switcher made ordering effortless for diaspora customers buying meals for family back home. The slide-over cart is lightning fast and keeps hungry diners from bouncing.",
    name: "Chef Daniel Kalu",
    role: "Founder, Sear & Spice",
    result: "Instant mobile ordering with real-time multi-currency checkout.",
    isPlaceholder: false,
  },
];
