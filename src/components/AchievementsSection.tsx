import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from './SectionHeading';
import { keyAchievements } from '../content';

export const AchievementsSection: React.FC = () => (
  <section
    id="achievements"
    className="relative w-full bg-black text-[#E8DFD8] font-sans selection:bg-[#cbb59d] selection:text-black pt-8 pb-24 px-6 sm:px-12 lg:px-20 overflow-hidden"
  >
    <div className="absolute top-1/3 right-1/4 w-[30rem] h-[30rem] bg-[#D4AF37]/5 rounded-full blur-[170px] pointer-events-none" />

    <div className="max-w-7xl mx-auto w-full relative z-10">
      <SectionHeading eyebrow="02 / KEY ACHIEVEMENTS" lineOne="RESULTS," lineTwo="NOT PROMISES." />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {keyAchievements.map((item, idx) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative p-8 sm:p-9 rounded-sm border border-[#8C6D4F]/35 bg-[#100D0B]/85 overflow-hidden group transition-colors duration-500 hover:border-[#D4AF37]/80"
          >
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#D4AF37]/40 group-hover:border-[#D4AF37] transition-colors" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#D4AF37]/40 group-hover:border-[#D4AF37] transition-colors" />

            <div className="flex items-baseline gap-4 mb-4">
              <span
                className="text-5xl sm:text-6xl text-[#D4AF37] leading-none"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {item.value}
              </span>
              <span
                className="text-[11.5px] font-medium tracking-[0.22em] uppercase text-[#C4B5A5]"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {item.label}
              </span>
            </div>
            <p
              className="text-xs sm:text-[13.5px] font-light text-[#A8988B] leading-[1.8] group-hover:text-[#D5CBC0] transition-colors"
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

export default AchievementsSection;
