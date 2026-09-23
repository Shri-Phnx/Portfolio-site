import React from 'react';
import { motion } from 'framer-motion';
import { display, fadeUp, sans } from './styles';

// Alternating section backgrounds: pure black and a warm near-black.
export const Section: React.FC<{ id?: string; alt?: boolean; children: React.ReactNode }> = ({ id, alt, children }) => (
  <section
    id={id}
    className={`relative w-full overflow-hidden text-[#E8DFD8] px-6 sm:px-12 lg:px-20 py-24 lg:py-28 ${alt ? 'bg-[#0B0907]' : 'bg-black'}`}
  >
    <div className="max-w-7xl mx-auto w-full relative z-10">{children}</div>
  </section>
);

export const Heading: React.FC<{ eyebrow: string; children: React.ReactNode; intro?: string }> = ({ eyebrow, children, intro }) => (
  <motion.div {...fadeUp} className="mb-12">
    <div className="flex items-center space-x-4 mb-6">
      <span className="text-[11px] font-medium tracking-[0.35em] uppercase text-[#D4AF37]" style={sans}>
        {eyebrow}
      </span>
      <div className="w-20 h-[1px] bg-gradient-to-r from-[#D4AF37]/80 via-[#8C6D4F]/40 to-transparent" />
    </div>
    <h2
      className="text-5xl sm:text-6xl md:text-7xl tracking-tight uppercase leading-[0.9] text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#D5CBC0] to-[#8C7B6B]"
      style={display}
    >
      {children}
    </h2>
    {intro && (
      <p className="mt-5 text-sm font-light text-[#A8988B] max-w-xl leading-relaxed" style={sans}>
        {intro}
      </p>
    )}
  </motion.div>
);

// Gold gradient text for the words the brief asks to emphasise.
export const Accent: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#F7E7C4] via-[#C99E5D] to-[#7A5A2E]">{children}</span>
);

export const PrimaryButton: React.FC<{ href: string; children: React.ReactNode; className?: string }> = ({ href, children, className = '' }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`group relative inline-flex items-center justify-center gap-3 px-7 py-4 rounded-full bg-gradient-to-r from-[#E8C987] via-[#D4AF37] to-[#B8893E] text-black text-[11.5px] font-semibold tracking-[0.2em] uppercase shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:shadow-[0_0_45px_rgba(212,175,55,0.55)] hover:-translate-y-0.5 transition-all duration-300 ${className}`}
    style={sans}
  >
    {children}
    <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
  </a>
);

export const Card: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ children, className = '', delay = 0 }) => (
  <motion.div
    {...fadeUp}
    transition={{ ...fadeUp.transition, delay }}
    className={`relative rounded-lg border border-[#8C6D4F]/40 bg-[#100D0B] p-7 sm:p-8 transition-all duration-500 hover:-translate-y-1 hover:border-[#D4AF37]/80 hover:shadow-[0_16px_45px_rgba(212,175,55,0.14)] ${className}`}
  >
    <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#D4AF37]/60" />
    <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#D4AF37]/60" />
    {children}
  </motion.div>
);
