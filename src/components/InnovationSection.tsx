import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from './SectionHeading';
import { innovation } from '../content';

export const InnovationSection: React.FC = () => (
  <section
    id="innovation"
    className="relative w-full bg-black text-[#E8DFD8] font-sans selection:bg-[#cbb59d] selection:text-black pt-8 pb-24 px-6 sm:px-12 lg:px-20 overflow-hidden"
  >
    <div className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] bg-[#2FD3C8]/[0.04] rounded-full blur-[170px] pointer-events-none" />

    <div className="max-w-7xl mx-auto w-full relative z-10">
      <SectionHeading
        eyebrow="05 / INNOVATION & EMERGING TECHNOLOGY"
        lineOne="AI IN PRACTICE."
        lineTwo="NOT JUST ON PAPER."
        intro="Where I'm taking IT governance and service management next: AI-driven automation and predictive analytics."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {innovation.map((item, idx) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative p-7 rounded-sm border border-[#8C6D4F]/35 bg-[#100D0B]/85 group transition-colors duration-500 hover:border-[#D4AF37]/80"
          >
            <span className="block text-xs font-mono font-bold text-[#D4AF37] mb-4">
              0{idx + 1} //
            </span>
            <h3
              className="text-2xl sm:text-3xl tracking-wide text-white mb-3 group-hover:text-[#F7E7C4] transition-colors leading-none"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              {item.title}
            </h3>
            <p
              className="text-xs sm:text-[13px] font-light text-[#A8988B] leading-[1.75] group-hover:text-[#D5CBC0] transition-colors"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {item.text}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default InnovationSection;
