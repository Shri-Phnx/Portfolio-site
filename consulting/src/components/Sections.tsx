import React from 'react';
import { motion } from 'framer-motion';
import portrait from '../assets/portrait.webp';
import { about, discovery, insights, method, profile, services, testimonials, work } from '../content';
import { Accent, Card, Heading, PrimaryButton, Section } from './Shared';
import { display, fadeUp, sans } from './styles';

export const About: React.FC = () => (
  <Section alt>
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
      <div className="lg:col-span-7">
        <Heading eyebrow="01 / About">{about.headline}</Heading>
        <motion.p {...fadeUp} className="text-sm sm:text-[15px] font-light text-[#B3A497] leading-[1.9]" style={sans}>
          {about.body}
        </motion.p>
        <motion.div {...fadeUp} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 pt-6 border-t border-[#8C6D4F]/25">
          {about.proof.map((p) => (
            <div key={p.label} className="flex items-baseline gap-4 sm:block">
              <span className="block w-20 sm:w-auto shrink-0 text-4xl text-[#D4AF37]" style={display}>{p.value}</span>
              <span className="block text-[11px] sm:text-[11px] font-medium tracking-[0.18em] uppercase text-[#A8988B] mt-1" style={sans}>
                {p.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
      <motion.div {...fadeUp} className="lg:col-span-5 flex justify-center">
        <div className="relative p-2.5 rounded-2xl border border-[#8C6D4F]/50 bg-[#100D0B] shadow-[0_0_60px_rgba(212,175,55,0.15)]">
          <div className="w-[280px] sm:w-[340px] aspect-[4/5] overflow-hidden rounded-xl">
            <img src={portrait} alt={profile.name} className="w-full h-full object-cover object-[70%_40%]" />
          </div>
        </div>
      </motion.div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
      {about.cards.map((c, i) => (
        <Card key={c.value} delay={i * 0.1}>
          <span className="block text-4xl sm:text-5xl mb-3" style={display}><Accent>{c.value}</Accent></span>
          <p className="text-sm font-light text-[#A8988B] leading-relaxed" style={sans}>{c.label}</p>
        </Card>
      ))}
    </div>
  </Section>
);

export const Services: React.FC = () => (
  <Section id="services">
    <Heading eyebrow="02 / Services" intro={services.note}>{services.headline}</Heading>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {services.items.map((s, i) => (
        <Card key={s.title} delay={i * 0.08}>
          <span className="block text-xs font-mono font-bold text-[#D4AF37] mb-4">0{i + 1} //</span>
          <h3 className="text-3xl sm:text-4xl uppercase text-white leading-none mb-4" style={display}>{s.title}</h3>
          <p className="text-sm font-light text-[#A8988B] leading-[1.8]" style={sans}>{s.text}</p>
        </Card>
      ))}
    </div>
  </Section>
);

export const Work: React.FC = () => (
  <Section id="work" alt>
    <Heading eyebrow="03 / Selected Work" intro="Real engagements, anonymised to protect client confidentiality.">
      {work.headline}
    </Heading>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {work.items.map((w, i) => (
        <Card key={w.client} delay={i * 0.1} className="flex flex-col">
          <span className="text-[11.5px] font-medium tracking-[0.22em] uppercase text-[#C99E5D]" style={sans}>{w.client}</span>
          <h3 className="text-3xl sm:text-[2.1rem] uppercase leading-[0.95] my-4" style={display}><Accent>{w.result}</Accent></h3>
          <p className="text-sm font-light text-[#A8988B] leading-[1.8]" style={sans}>{w.text}</p>
        </Card>
      ))}
    </div>
  </Section>
);

export const Method: React.FC = () => (
  <Section id="method">
    <Heading eyebrow="04 / Method">
      {method.headlineParts[0]}<Accent>{method.headlineParts[1]}</Accent>{method.headlineParts[2]}<Accent>{method.headlineParts[3]}</Accent>
    </Heading>

    <div className="flex flex-col lg:flex-row items-stretch gap-4">
      {method.steps.map((step, i) => (
        <React.Fragment key={step.title}>
          <Card delay={i * 0.12} className="flex-1">
            <span className="block text-xs font-mono font-bold text-[#D4AF37] mb-3">STEP 0{i + 1}</span>
            <h3 className="text-4xl uppercase leading-none mb-4" style={display}><Accent>{step.title}</Accent></h3>
            <p className="text-sm font-light text-[#A8988B] leading-[1.8]" style={sans}>{step.text}</p>
          </Card>
          <div className="flex items-center justify-center text-[#D4AF37] text-2xl flow-arrow" aria-hidden="true">
            <span className="hidden lg:inline">→</span>
            <span className="lg:hidden">↓</span>
          </div>
        </React.Fragment>
      ))}
      <motion.div
        {...fadeUp}
        className="lg:w-56 flex items-center justify-center text-center rounded-lg p-7 bg-gradient-to-br from-[#E8C987] via-[#D4AF37] to-[#8C6D4F] text-black shadow-[0_0_50px_rgba(212,175,55,0.35)]"
      >
        <span className="text-3xl uppercase leading-[0.95]" style={display}>{method.outcome}</span>
      </motion.div>
    </div>
  </Section>
);

export const Insights: React.FC = () => (
  <Section id="insights" alt>
    <Heading eyebrow="05 / Insights">{insights.headline}</Heading>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {insights.items.map((item, i) => (
        <Card key={item.title} delay={i * 0.1} className="border-t-2 border-t-[#D4AF37]">
          <span className="text-[11.5px] font-medium tracking-[0.22em] uppercase text-[#D4AF37]" style={sans}>{item.category}</span>
          <h3 className="text-2xl sm:text-[1.75rem] uppercase text-white leading-[1.05] my-4" style={display}>{item.title}</h3>
          <p className="text-sm font-light text-[#A8988B] leading-[1.8]" style={sans}>{item.text}</p>
        </Card>
      ))}
    </div>
  </Section>
);

// Hidden until real LinkedIn recommendations are added to content.ts.
export const Testimonials: React.FC = () =>
  testimonials.length === 0 ? null : (
    <Section>
      <Heading eyebrow="06 / What Leaders Say" intro="Names withheld for confidentiality.">In Their Words</Heading>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <Card key={t.role + i} delay={i * 0.1}>
            <span className="block text-5xl leading-none text-[#D4AF37] mb-2" style={display}>“</span>
            <p className="text-sm font-light text-[#D5CBC0] leading-[1.85] italic" style={sans}>{t.quote}</p>
            <span className="block mt-5 text-[11.5px] font-medium tracking-[0.2em] uppercase text-[#C99E5D]" style={sans}>{t.role}</span>
          </Card>
        ))}
      </div>
    </Section>
  );

export const Discovery: React.FC = () => (
  <Section id="contact">
    <motion.div {...fadeUp} className="relative text-center max-w-3xl mx-auto rounded-2xl border border-[#8C6D4F]/40 bg-[#0B0907] px-6 sm:px-12 py-16 shadow-[0_0_80px_rgba(212,175,55,0.12)]">
      <h2 className="text-5xl sm:text-6xl md:text-7xl uppercase leading-[0.9]" style={display}><Accent>{discovery.headline}</Accent></h2>
      <p className="mt-6 text-sm sm:text-[15px] font-light text-[#B3A497] leading-[1.85]" style={sans}>{discovery.text}</p>
      <PrimaryButton href={profile.booking} className="mt-10">{discovery.cta}</PrimaryButton>
      <p className="mt-6 text-xs text-[#8C7B6B]" style={sans}>
        Prefer email? <a href={`mailto:${profile.email}`} className="text-[#C99E5D] hover:text-[#E8C987]">{profile.email}</a>
      </p>
    </motion.div>
  </Section>
);

export const Footer: React.FC = () => (
  <footer className="bg-black text-[#E8DFD8] px-6 sm:px-12 lg:px-20 pb-12">
    <div className="max-w-7xl mx-auto border-t border-[#D4AF37]/30 pt-10 flex flex-col md:flex-row gap-6 md:items-end justify-between" style={sans}>
      <div>
        <span className="block text-3xl text-[#D4AF37]" style={display}>{profile.name}</span>
        <span className="block text-xs text-[#A8988B] mt-1">{profile.tagline}</span>
      </div>
      <div className="flex flex-col gap-1.5 text-xs text-[#A8988B] md:text-right">
        <a href={`mailto:${profile.email}`} className="inline-block py-1.5 hover:text-[#E8C987]">{profile.email}</a>
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="inline-block py-1.5 hover:text-[#E8C987]">{profile.linkedinLabel}</a>
        <a href={profile.portfolio} target="_blank" rel="noopener noreferrer" className="inline-block py-1.5 hover:text-[#E8C987]">Career portfolio ↗</a>
        <span className="text-[#6B5A48] mt-2">© {new Date().getFullYear()} {profile.name}. All rights reserved.</span>
      </div>
    </div>
  </footer>
);
