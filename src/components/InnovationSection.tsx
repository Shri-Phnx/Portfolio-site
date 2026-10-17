import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from './SectionHeading';
import { innovation, profile } from '../content';

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

      <GitHubActivity />
    </div>
  </section>
);

// Live GitHub contribution chart plus a profile link. If the chart service
// is unavailable the image is hidden and the button remains.
const GitHubActivity: React.FC = () => {
  const [chartOk, setChartOk] = useState(true);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="mt-12 p-6 sm:p-8 rounded-sm border border-[#8C6D4F]/35 bg-[#100D0B]/85"
    >
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${chartOk ? 'mb-6' : ''}`}>
        <div>
          <span className="block text-xs font-mono font-bold text-[#D4AF37] mb-2">// GITHUB ACTIVITY</span>
          <h3
            className="text-2xl sm:text-3xl tracking-wide text-white leading-none"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            BUILDING IN PUBLIC
          </h3>
        </div>
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="self-start sm:self-auto inline-flex items-center gap-3 px-6 py-3.5 border border-[#8C6D4F] bg-[#16120E] hover:border-[#D4AF37] hover:bg-[#D4AF37] text-[#EAD8C7] hover:text-black text-[11px] font-medium tracking-[0.24em] uppercase transition-all duration-300"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          <span>VIEW MY GITHUB</span>
          <span className="text-xs">↗</span>
        </a>
      </div>
      {chartOk && (
        <a href={profile.github} target="_blank" rel="noopener noreferrer" className="block rounded-sm bg-white p-3 sm:p-4 overflow-x-auto">
          <img
            src={profile.githubChart}
            alt="GitHub contribution chart for the past year"
            loading="lazy"
            onError={() => setChartOk(false)}
            className="block min-w-[640px] w-full h-auto"
          />
        </a>
      )}
    </motion.div>
  );
};

export default InnovationSection;
