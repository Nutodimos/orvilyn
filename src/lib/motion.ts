import type { Transition, Variants } from "framer-motion";

export const EASING: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const TRANSITION_DEFAULT: Transition = {
  duration: 0.25,
  ease: EASING,
};

export const TRANSITION_SCROLL: Transition = {
  duration: 0.5,
  ease: EASING,
};

export const scrollRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: (customDelay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: EASING,
      delay: customDelay,
    },
  }),
};

export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};
