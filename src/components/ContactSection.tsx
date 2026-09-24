// src/components/ContactSection.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { profile } from '../content';

const channels = [
  {
    label: 'EMAIL',
    value: profile.email,
    href: `mailto:${profile.email}`,
    external: false,
  },
  {
    label: 'WHATSAPP',
    value: profile.whatsappDisplay,
    href: `https://wa.me/${profile.whatsapp}`,
    external: true,
  },
  {
    label: 'LINKEDIN',
    value: 'in/shrinivas-ramaprasad',
    href: profile.linkedin,
    external: true,
  },
];

export const ContactSection: React.FC = () => {
  return (
    <footer
      id="contact"
      className="relative w-full bg-black text-[#E8DFD8] font-sans selection:bg-[#cbb59d] selection:text-black pt-16 pb-16 px-6 sm:px-12 lg:px-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10">

        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left Column (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Eyebrow Header */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex items-center space-x-4 mb-5"
              >
                <span
                  className="text-[11px] font-medium tracking-[0.35em] uppercase text-[#D4AF37]"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  08 / CONTACT
                </span>
                <div className="w-16 h-[1px] bg-gradient-to-r from-[#D4AF37]/80 via-[#8C6D4F]/40 to-transparent" />
              </motion.div>

              {/* Headline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mb-8"
              >
                <h2
                  className="text-5xl sm:text-6xl md:text-7xl tracking-tight uppercase leading-[0.85] select-none"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#D5CBC0] to-[#605448] drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                    LET'S TALK ABOUT
                  </span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#F7E7C4] via-[#C99E5D] to-[#543B1A] drop-shadow-[0_8px_25px_rgba(201,158,93,0.35)]">
                    YOUR NEXT TRANSFORMATION.
                  </span>
                </h2>
              </motion.div>

              <p
                className="text-xs sm:text-[13px] font-light text-[#A8988B] leading-relaxed max-w-md"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Hiring for a Program Manager, Service Delivery or IT Asset Management role in India or the GCC? I'm available to join in 1–2 months. Pick whichever channel suits you.
              </p>
            </div>
          </div>

          {/* Right Column: Direct Channels (7 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 relative w-full rounded-sm border border-[#8C6D4F]/40 bg-[#0A0806] p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden"
          >
            {/* Top Gold Horizon Edge */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent" />

            {/* Precision Corner Crosshairs */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#D4AF37]/60" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#D4AF37]/60" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#D4AF37]/60" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#D4AF37]/60" />

            <div className="space-y-4">
              {channels.map((channel) => (
                <a
                  key={channel.label}
                  href={channel.href}
                  {...(channel.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group flex items-center justify-between gap-4 px-5 sm:px-6 py-5 border border-[#8C6D4F]/35 bg-[#120F0C] hover:border-[#D4AF37] hover:bg-[#1A1510] rounded-sm transition-all duration-300"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  <div className="min-w-0">
                    <span className="block text-[11px] font-mono tracking-[0.25em] uppercase text-[#8C6D4F] mb-1.5">
                      // {channel.label}
                    </span>
                    <span className="block text-[13px] sm:text-base text-[#E8DFD8] group-hover:text-[#F7E7C4] transition-colors break-words">
                      {channel.value}
                    </span>
                  </div>
                  <span className="text-[#D4AF37] text-lg transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                </a>
              ))}

              <a
                href={profile.cvUrl}
                download
                className="flex items-center justify-center w-full py-3.5 border border-[#8C6D4F]/50 bg-[#14100D] hover:border-[#D4AF37] hover:bg-[#D4AF37] text-[#E8DFD8] hover:text-black text-xs font-medium tracking-[0.25em] uppercase transition-all duration-300"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                DOWNLOAD CV ↓
              </a>
            </div>
          </motion.div>

        </div>

        {/* Footer Line */}
        <div className="pt-16 mt-16 border-t border-[#8C6D4F]/15 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-4">
          <span className="text-[11px] font-mono tracking-widest text-[#8C6D4F] uppercase">
            © {new Date().getFullYear()} {profile.name} • {profile.location}
          </span>
          <a
            href="https://github.com/lohithadamisetti123/cinematic-portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block py-2 text-[11px] font-mono text-[#8C6D4F] hover:text-[#D4AF37] transition-colors"
          >
            Design based on cinematic-portfolio by Lohitha Damisetti
          </a>
        </div>

      </div>
    </footer>
  );
};

export default ContactSection;
