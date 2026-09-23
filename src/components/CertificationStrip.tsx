import React from 'react';
import { certificationBadges } from '../content';

// Any image dropped into src/assets/certs/ is picked up by its file name
// (e.g. prince2.png matches logo: 'prince2').
const logoFiles = import.meta.glob<string>('../assets/certs/*.{png,jpg,jpeg,webp,svg}', {
  eager: true,
  import: 'default',
});
const logos: Record<string, string> = Object.fromEntries(
  Object.entries(logoFiles).map(([path, url]) => [path.split('/').pop()!.replace(/\.[^.]+$/, ''), url]),
);

type Badge = (typeof certificationBadges)[number];

const Tile: React.FC<{ badge: Badge }> = ({ badge }) => {
  const src = logos[badge.logo];
  return (
    <div
      title={badge.name}
      className="shrink-0 mx-2.5 w-[150px] h-[120px] sm:w-[190px] sm:h-[150px] rounded-lg border-2 border-[#8C6D4F]/60 bg-white flex items-center justify-center p-2.5 sm:p-3 shadow-[0_10px_30px_rgba(0,0,0,0.6)] transition-colors duration-300 hover:border-[#D4AF37]"
    >
      {src ? (
        <img src={src} alt={badge.name} className="max-w-full max-h-full object-contain" />
      ) : (
        <div className="text-center">
          <span
            className="block text-2xl sm:text-3xl text-[#2A2118] leading-none"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            {badge.short}
          </span>
          <span
            className="block mt-1.5 text-[8.5px] font-medium tracking-[0.14em] uppercase text-[#6B5A48] leading-snug"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {badge.name}
          </span>
        </div>
      )}
    </div>
  );
};

const Row: React.FC<{ items: Badge[]; reverse?: boolean; tilt: string; band: string }> = ({ items, reverse, tilt, band }) => (
  <div className={`marquee-row relative py-3 ${tilt}`}>
    {/* Gold brush band behind the row */}
    <div className={`absolute inset-y-4 -inset-x-10 ${band} blur-[1px] pointer-events-none`} />
    <div className="relative overflow-hidden">
      <div className={`marquee-track ${reverse ? 'reverse' : ''}`}>
        {/* The list is rendered twice so the loop joins seamlessly. */}
        {[...items, ...items].map((badge, i) => (
          <Tile key={`${badge.logo}-${i}`} badge={badge} />
        ))}
      </div>
    </div>
  </div>
);

export const CertificationStrip: React.FC = () => {
  const half = Math.ceil(certificationBadges.length / 2);
  return (
    <section
      id="certifications"
      aria-label="Certifications"
      className="relative w-full bg-black overflow-hidden py-16 sm:py-20"
    >
      <p
        className="text-center text-[11px] font-medium tracking-[0.35em] uppercase text-[#D4AF37] mb-8 px-6"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        Certified in what I deliver
      </p>

      <div className="space-y-2">
        <Row
          items={certificationBadges.slice(0, half)}
          tilt="-rotate-[1.5deg]"
          band="bg-gradient-to-r from-transparent via-[#D4AF37]/25 to-transparent"
        />
        <Row
          items={certificationBadges.slice(half)}
          reverse
          tilt="rotate-[1.5deg]"
          band="bg-gradient-to-r from-transparent via-[#C99E5D]/20 to-transparent"
        />
      </div>

      {/* Soft fade at both edges */}
      <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-black to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-black to-transparent pointer-events-none" />
    </section>
  );
};

export default CertificationStrip;
