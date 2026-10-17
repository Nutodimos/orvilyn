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

export const marquee: MarqueeTestimonial[] = [
  {
    quote: "Placeholder: quick communication and clean delivery.",
    name: "Placeholder Client 1",
    role: "Founder, Retail Co",
    isPlaceholder: true,
  },
  {
    quote: "Placeholder: replaced our clunky spreadsheets in weeks.",
    name: "Placeholder Client 2",
    role: "Director of Ops, Logistics Ltd",
    isPlaceholder: true,
  },
  {
    quote: "Placeholder: smooth process, no tech headaches for us.",
    name: "Placeholder Client 3",
    role: "Owner, Workshop Studio",
    isPlaceholder: true,
  },
  {
    quote: "Placeholder: our new web app cut order mistakes by half.",
    name: "Placeholder Client 4",
    role: "Managing Director, Peak Supplies",
    isPlaceholder: true,
  },
  {
    quote: "Placeholder: polished motion design that stands out.",
    name: "Placeholder Client 5",
    role: "Marketing Lead, Craft Agency",
    isPlaceholder: true,
  },
  {
    quote: "Placeholder: fixed price and delivered right on time.",
    name: "Placeholder Client 6",
    role: "Co-founder, Beacon Partners",
    isPlaceholder: true,
  },
];

export const featured: FeaturedTestimonial[] = [
  {
    quote:
      "Placeholder: Orvane took our manual paper workflow and turned it into an intuitive web app. Our team picked it up immediately without training, and our daily processing time dropped significantly.",
    name: "Placeholder Name 1",
    role: "Operations Director, Service Co",
    result: "Result: placeholder outcome goes here.",
    isPlaceholder: true,
  },
  {
    quote:
      "Placeholder: We needed a modern web platform and subtle motion design that made our service feel premium. The entire build was transparent from start to finish with zero technical confusion.",
    name: "Placeholder Name 2",
    role: "Founder, Independent Brand",
    result: "Result: placeholder outcome goes here.",
    isPlaceholder: true,
  },
];
