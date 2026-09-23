import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
  eyebrow: string;
  lineOne: string;
  lineTwo: string;
  intro?: string;
}

// Eyebrow label + two-tone Bebas headline shared by the newer sections.
export const SectionHeading: React.FC<SectionHeadingProps> = ({ eyebrow, lineOne, lineTwo, intro }) => (
  <>
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="flex items-center space-x-4 mb-7"
    >
      <span
        className="text-[11px] font-medium tracking-[0.35em] uppercase text-[#D4AF37]"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        {eyebrow}
      </span>
      <div className="w-20 h-[1px] bg-gradient-to-r from-[#D4AF37]/80 via-[#8C6D4F]/40 to-transparent" />
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12"
    >
      <h2
        className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight uppercase leading-[0.85] select-none"
        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
      >
        <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#D5CBC0] to-[#605448] drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
          {lineOne}
        </span>
        <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#F7E7C4] via-[#C99E5D] to-[#543B1A] drop-shadow-[0_8px_25px_rgba(201,158,93,0.35)]">
          {lineTwo}
        </span>
      </h2>
      {intro && (
        <p
          className="text-xs sm:text-sm font-light text-[#A8988B] max-w-sm leading-relaxed"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          {intro}
        </p>
      )}
    </motion.div>
  </>
);

export default SectionHeading;
