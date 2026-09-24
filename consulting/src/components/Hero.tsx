import React from 'react';
import { motion } from 'framer-motion';
import { hero, profile } from '../content';
import { Accent, PrimaryButton } from './Shared';
import { display, sans } from './styles';

const nav = [
  { name: 'SERVICES', href: '#services' },
  { name: 'WORK', href: '#work' },
  { name: 'METHOD', href: '#method' },
  { name: 'INSIGHTS', href: '#insights' },
];

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 18, filter: 'blur(6px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] as const },
});

export const Hero: React.FC = () => (
  <section className="relative w-full min-h-[100svh] overflow-hidden bg-black text-[#E8DFD8]">
    <div className="absolute inset-0 pointer-events-none">
      <video autoPlay muted loop playsInline aria-hidden="true" className="absolute inset-0 w-full h-full object-cover object-right opacity-70">
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>
      {/* Faint grid, echoing the "digital" theme */}
      <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(to_right,#D4AF37_1px,transparent_1px),linear-gradient(to_bottom,#D4AF37_1px,transparent_1px)] bg-[size:64px_64px]" />
      <div className="absolute inset-y-0 left-0 w-full md:w-2/3 bg-gradient-to-r from-black via-black/85 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black to-transparent" />
    </div>

    <div className="relative z-10 flex flex-col min-h-[100svh] px-6 sm:px-12 lg:px-16 pt-6 pb-12">
      <header className="flex items-center justify-between">
        <a href="#" className="text-[11px] sm:text-sm font-semibold tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#EAD8C7] mr-3" style={sans}>
          Shrinivas Ramaprasad
        </a>
        <nav className="hidden md:flex items-center gap-9 text-[11px] tracking-[0.28em] font-light text-[#C4B5A5]" style={sans}>
          {nav.map((item) => (
            <a key={item.name} href={item.href} className="relative group py-2.5 hover:text-[#FFF5EB] transition-colors">
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#D4AF37]/60 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>
        <a
          href={profile.booking}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 whitespace-nowrap text-[11px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.24em] font-light uppercase py-2.5 px-3 sm:px-4 border border-[#8C6D4F]/60 hover:border-[#D4AF37] text-[#EAD8C7] transition-colors"
          style={sans}
        >
          Book a call ↗
        </a>
      </header>

      <div className="my-auto max-w-4xl pt-16 pb-8">
        <motion.p {...rise(0.1)} className="text-[11px] tracking-[0.35em] uppercase text-[#D4AF37] mb-6" style={sans}>
          Digital Transformation Consulting
        </motion.p>
        <motion.h1 {...rise(0.25)} className="text-6xl sm:text-7xl lg:text-[6.5rem] uppercase leading-[0.9] tracking-tight" style={display}>
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#D5CBC0] to-[#8C7B6B]">{hero.headlineLead} </span>
          <Accent>{hero.headlineAccent}</Accent>
        </motion.h1>
        <motion.p {...rise(0.45)} className="mt-7 text-sm sm:text-[15px] font-light text-[#B3A497] leading-[1.85] max-w-2xl" style={sans}>
          {hero.subtext}
        </motion.p>
        <motion.div {...rise(0.65)} className="mt-9 flex flex-wrap items-center gap-6">
          <PrimaryButton href={profile.booking}>{hero.cta}</PrimaryButton>
          <a href="#method" className="py-3 text-[11.5px] tracking-[0.2em] uppercase text-[#A8988B] hover:text-[#E8C987] transition-colors" style={sans}>
            {hero.secondary} →
          </a>
        </motion.div>
      </div>
    </div>
  </section>
);

export default Hero;
