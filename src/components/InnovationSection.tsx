import React, { useEffect, useRef, useState } from 'react';
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
type Day = { date: string; count: number; level: number };

// GitHub's own dark-theme greens for the five activity levels (0 = none, 4 = busiest).
const levelColours = ['#161B22', '#0E4429', '#006D32', '#26A641', '#39D353'];
const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const thisYear = new Date().getFullYear();
const years = [thisYear, thisYear - 1, thisYear - 2];
const CELL = 11;
const GAP = 3;

// A copy of GitHub's contribution calendar, one calendar year at a time. Falls back
// to the ghchart image if the data service is down, and hides itself if both fail.
const GitHubActivity: React.FC = () => {
  const [year, setYear] = useState(thisYear);
  const [weeks, setWeeks] = useState<(Day | null)[][] | null>(null);
  const [total, setTotal] = useState(0);
  const [mode, setMode] = useState<'loading' | 'grid' | 'image' | 'none'>('loading');
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`${profile.githubData}?y=${year}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data: { total: Record<string, number>; contributions: Day[] }) => {
        const days = data.contributions;
        if (!days?.length) throw new Error('no data');
        // Pad the first week so each column runs Sunday to Saturday.
        const cells: (Day | null)[] = [...Array(new Date(days[0].date).getUTCDay()).fill(null), ...days];
        const cols: (Day | null)[][] = [];
        for (let i = 0; i < cells.length; i += 7) cols.push(cells.slice(i, i + 7));
        setWeeks(cols);
        setTotal(data.total?.[year] ?? days.reduce((sum, d) => sum + d.count, 0));
        setMode('grid');
      })
      .catch(() => setMode((m) => (m === 'grid' ? 'grid' : 'image')));
  }, [year]);

  // On narrow screens, open on the current week (or the year's end for past years).
  useEffect(() => {
    const el = scroller.current;
    if (!el || !weeks) return;
    const today = new Date().toISOString().slice(0, 10);
    const idx = weeks.findIndex((w) => w.some((d) => d?.date === today));
    const col = idx === -1 ? weeks.length : idx + 1;
    el.scrollLeft = 32 + col * (CELL + GAP) - el.clientWidth + 16;
  }, [weeks]);

  // Label a month above the week column that holds its 1st day.
  const monthLabels = (weeks ?? []).map((w) => {
    const first = w.find((d) => d?.date.endsWith('-01'));
    return first ? monthNames[Number(first.date.slice(5, 7)) - 1] : '';
  });

  const showChart = mode === 'grid' || mode === 'image';
  const sans = { fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif" };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="mt-12 p-6 sm:p-8 rounded-sm border border-[#8C6D4F]/35 bg-[#100D0B]/85"
    >
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${showChart ? 'mb-8' : ''}`}>
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

      {mode === 'grid' && weeks && (
        <div className="rounded-md bg-[#0D1117] p-4 sm:p-6 flex flex-col-reverse lg:flex-row gap-5 lg:gap-6" style={sans}>
          <div className="min-w-0 flex-1">
            <h4 className="text-base sm:text-lg text-[#E6EDF3] mb-3">
              {total.toLocaleString('en-GB')} contributions in {year}
            </h4>
            <div className="rounded-md border border-[#30363D] py-3 sm:py-4">
              <div ref={scroller} className="overflow-x-auto px-3 sm:px-4">
                <div className="inline-flex flex-col min-w-max">
                  <div className="flex text-xs text-[#E6EDF3] mb-1.5" style={{ paddingLeft: 32, gap: GAP }}>
                    {monthLabels.map((m, i) => (
                      <span key={i} className="relative" style={{ width: CELL }}>
                        <span className="absolute left-0 top-0 whitespace-nowrap">{m}</span>
                        &nbsp;
                      </span>
                    ))}
                  </div>
                  <div className="flex">
                    <div className="flex flex-col text-xs text-[#E6EDF3]" style={{ width: 32, gap: GAP }}>
                      {['', 'Mon', '', 'Wed', '', 'Fri', ''].map((d, i) => (
                        <span key={i} className="leading-none flex items-center" style={{ height: CELL }}>{d}</span>
                      ))}
                    </div>
                    <div className="flex" style={{ gap: GAP }}>
                      {weeks.map((week, w) => (
                        <div key={w} className="flex flex-col" style={{ gap: GAP }}>
                          {week.map((day, d) => (
                            <span
                              key={d}
                              title={day ? `${day.count} contribution${day.count === 1 ? '' : 's'} on ${day.date}` : undefined}
                              className="block rounded-[2px]"
                              style={{
                                width: CELL,
                                height: CELL,
                                backgroundColor: day ? levelColours[day.level] ?? levelColours[0] : 'transparent',
                                outline: day ? '1px solid rgba(27,31,35,0.06)' : undefined,
                              }}
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between gap-4 px-3 sm:px-4 mt-3 text-xs text-[#8B949E]">
                <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-[#4493F8]">
                  View on GitHub
                </a>
                <span className="flex items-center gap-[3px]">
                  <span className="mr-1">Less</span>
                  {levelColours.map((c) => (
                    <span key={c} className="block rounded-[2px]" style={{ width: CELL, height: CELL, backgroundColor: c }} />
                  ))}
                  <span className="ml-1">More</span>
                </span>
              </div>
            </div>
          </div>
          <div className="flex lg:flex-col gap-2 lg:w-40 lg:pt-10">
            {years.map((y) => (
              <button
                key={y}
                type="button"
                onClick={() => setYear(y)}
                className={`px-4 py-2 lg:py-2.5 rounded-md text-left text-sm transition-colors ${
                  y === year ? 'bg-[#1F6FEB] text-white' : 'text-[#8B949E] hover:bg-[#161B22] hover:text-[#E6EDF3]'
                }`}
              >
                {y}
              </button>
            ))}
          </div>
        </div>
      )}

      {mode === 'image' && (
        <a href={profile.github} target="_blank" rel="noopener noreferrer" className="block rounded-sm bg-white p-3 sm:p-4 overflow-x-auto">
          <img
            src={profile.githubChart}
            alt="GitHub contribution chart for the past year"
            onError={() => setMode('none')}
            className="block min-w-[640px] w-full h-auto"
          />
        </a>
      )}
    </motion.div>
  );
};

export default InnovationSection;
