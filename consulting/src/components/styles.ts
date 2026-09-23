// Shared type styles and the scroll-in animation used across sections.

export const sans = { fontFamily: "'Montserrat', sans-serif" };
export const display = { fontFamily: "'Bebas Neue', sans-serif" };

export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
};
