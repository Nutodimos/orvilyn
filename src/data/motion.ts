export interface MotionPiece {
  title: string;
  kind: string;
  videoSrc: string;
  poster: string;
  href?: string;
  badge?: string;
}

export const showMotionSection = true;

// Honest label: these are personal pieces and self-initiated explorations, not client work.
export const motionPieces: MotionPiece[] = [
  {
    title: "Fernhill Records",
    kind: "Tactile motion identity & vinyl packaging · 5 pieces",
    videoSrc: "/work/fernhill-records/logo-sting.mp4",
    poster: "/work/fernhill-records/posters/label-reel.webp",
    href: "/work/fernhill-records",
    badge: "Self-initiated / fictional brand",
  },
  {
    title: "Tidewell",
    kind: "Motion system and brand films · 10 procedural pieces",
    videoSrc: "/work/tidewell/video/logo-reveal.mp4",
    poster: "/work/tidewell/posters/hero-spot.jpg",
    href: "/work/tidewell",
    badge: "Self-initiated / fictional brand",
  },
  {
    title: "Meridian",
    kind: "Fintech motion system & product films · 5 pieces",
    videoSrc: "/work/meridian/bumper-6s.mp4",
    poster: "/work/meridian/posters/hero-spot.webp",
    href: "/work/meridian",
    badge: "Self-initiated / fictional brand",
  },
  {
    title: "Orbit & Oak",
    kind: "STEM subscription brand & character motion · 5 pieces",
    videoSrc: "/work/orbit-and-oak/orbit-oak-logo-sting.mp4",
    poster: "/work/orbit-and-oak/posters/orbit-oak-brand-spot.webp",
    href: "/work/orbit-and-oak",
    badge: "Self-initiated / fictional brand",
  },
];
