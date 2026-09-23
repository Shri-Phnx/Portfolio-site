import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from './SectionHeading';
import { awards, certifications } from '../content';

export const CredentialsSection: React.FC = () => (
  <section
    id="credentials"
    className="relative w-full bg-black text-[#E8DFD8] font-sans selection:bg-[#cbb59d] selection:text-black pt-8 pb-24 px-6 sm:px-12 lg:px-20 overflow-hidden"
  >
    <div className="absolute bottom-1/4 left-1/3 w-[30rem] h-[30rem] bg-[#8C6D4F]/5 rounded-full blur-[170px] pointer-events-none" />

    <div className="max-w-7xl mx-auto w-full relative z-10">
      <SectionHeading eyebrow="07 / CREDENTIALS" lineOne="AWARDS &" lineTwo="CERTIFICATIONS." />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Awards & Recognition */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7"
        >
          <span className="text-[9.5px] font-mono tracking-[0.25em] uppercase text-[#8C6D4F] block mb-5">
            // AWARDS & RECOGNITION
          </span>
          <ul className="divide-y divide-[#8C6D4F]/20 border-y border-[#8C6D4F]/20">
            {awards.map((award) => (
              <li key={award.title} className="flex items-start justify-between gap-6 py-5 group">
                <div>
                  <h3
                    className="text-2xl sm:text-[1.7rem] tracking-wide text-white group-hover:text-[#F7E7C4] transition-colors leading-tight"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {award.title}
                  </h3>
                  <span
                    className="block text-[10.5px] font-medium tracking-[0.18em] uppercase text-[#A8988B] mt-1"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {award.detail}
                  </span>
                </div>
                {award.year && (
                  <span className="text-[10px] font-mono tracking-[0.2em] text-[#D4AF37] pt-1.5 shrink-0">
                    {award.year}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="lg:col-span-5"
        >
          <span className="text-[9.5px] font-mono tracking-[0.25em] uppercase text-[#8C6D4F] block mb-5">
            // CERTIFICATIONS
          </span>
          <div className="flex flex-wrap gap-2.5">
            {certifications.map((cert) => (
              <span
                key={cert}
                className="px-3.5 py-2 text-[10.5px] font-medium tracking-[0.14em] uppercase rounded-sm border border-[#8C6D4F]/40 bg-[#16120E] text-[#E8D7C5] hover:border-[#D4AF37]/70 hover:text-white transition-colors"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {cert}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default CredentialsSection;
