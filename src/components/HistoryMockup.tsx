"use client";

import { useEffect, useRef, useState } from "react";
import MockupStarfield from "./MockupStarfield";

const DESIGN_W = 1280;
const DESIGN_H = 800;
const WEEKDAYS = ["L", "M", "X", "J", "V", "S", "D"];
const MARKED_DAYS = new Set([7, 12, 15, 16, 20]);

function Day({ value }: { value?: number }) {
  if (!value) return <span />;
  const selected = value === 26;
  return (
    <span className={`relative flex h-[47px] items-center justify-center rounded-full font-[family-name:var(--font-sans)] text-[14px] ${selected ? "border border-star bg-star/10 font-semibold text-star" : "text-mockup-ink-soft"}`}>
      {value}
      {MARKED_DAYS.has(value) && !selected && <i className="absolute bottom-[5px] h-[3px] w-[3px] rounded-full bg-star" />}
    </span>
  );
}

function TimeSection({ period, active, icon }: { period: string; active?: boolean; icon: React.ReactNode }) {
  return (
    <div className="mt-[24px]">
      <div className="flex items-center gap-[10px]">
        <span className={active ? "text-star" : "text-mockup-ink-ghost"}>{icon}</span>
        <span className={`font-[family-name:var(--font-sans)] text-[13px] font-semibold tracking-[0.05em] ${active ? "text-star" : "text-mockup-ink-ghost"}`}>{period}</span>
        <span className="h-px flex-1 bg-mockup-panel" />
      </div>
      <p className="ml-[21px] mt-[17px] font-[family-name:var(--font-serif)] text-[14px] font-semibold italic text-mockup-ink-ghost">Nada por aquí</p>
    </div>
  );
}

export default function HistoryMockup({ active }: { active: boolean }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const measure = () => {
      const width = el.clientWidth;
      if (width) setScale(width / DESIGN_W);
    };
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    const io = new IntersectionObserver(measure, { rootMargin: "200px" });
    io.observe(el);
    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  const monthCells = [...Array.from({ length: 5 }, () => undefined), ...Array.from({ length: 31 }, (_, index) => index + 1)];

  return (
    <div ref={rootRef} className="absolute inset-0 overflow-hidden bg-cosmos-void font-[family-name:var(--font-sans)] text-mockup-ink">
      <MockupStarfield active={active} className="absolute inset-0 h-full w-full" />

      <div className="absolute left-0 top-0 origin-top-left" style={{ width: DESIGN_W, height: DESIGN_H, transform: `scale(${scale})`, visibility: scale ? "visible" : "hidden" }}>
        <span className="absolute bottom-[34px] left-[508px] top-[34px] w-px bg-mockup-panel" />

        <section className="absolute left-[96px] top-[46px] w-[370px]">
          <p className="font-[family-name:var(--font-pixel)] text-[11px] tracking-[0.3em] text-star">AGENDA · RECORDATORIOS</p>
          <h1 className="mt-[18px] font-[family-name:var(--font-serif)] text-[42px] font-light italic leading-none text-mockup-ink">Calendario</h1>

          <div className="mt-[34px] flex items-center justify-between">
            <h2 className="font-[family-name:var(--font-serif)] text-[23px] italic text-mockup-ink">Agosto 2026</h2>
            <span className="flex items-center gap-[18px] text-mockup-ink-soft">
              <svg width="12" height="18" viewBox="0 0 12 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="m9 2-6 7 6 7" /></svg>
              <svg width="12" height="18" viewBox="0 0 12 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="m3 2 6 7-6 7" /></svg>
            </span>
          </div>

          <div className="mt-[22px] grid grid-cols-7 gap-x-[5px] gap-y-[6px]">
            {WEEKDAYS.map((day) => <span key={day} className="text-center font-[family-name:var(--font-pixel)] text-[9px] text-mockup-ink-ghost">{day}</span>)}
            {monthCells.map((day, index) => <Day key={`${day ?? "empty"}-${index}`} value={day} />)}
          </div>
        </section>

        <section className="absolute left-[548px] right-[38px] top-[54px]">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-[14px]">
              <svg width="10" height="18" viewBox="0 0 12 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-mockup-ink-soft" aria-hidden><path d="m9 2-6 7 6 7" /></svg>
              <h2 className="font-[family-name:var(--font-serif)] text-[21px] italic text-mockup-ink">
                Miércoles, <span className="text-star">26 de agosto</span>
              </h2>
            </span>
            <svg width="10" height="18" viewBox="0 0 12 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-mockup-ink-soft" aria-hidden><path d="m3 2 6 7-6 7" /></svg>
          </div>

          <TimeSection period="MAÑANA" icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden><circle cx="12" cy="12" r="4" /><path d="M12 2v3M12 19v3M4.9 4.9 7 7M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1" /></svg>} />
          <TimeSection active period="TARDE" icon={<svg width="16" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden><path d="M3 18h18M5 18a7 7 0 0 1 14 0M12 4v4M4.9 8.9 7 11M19.1 8.9 17 11" /></svg>} />
          <TimeSection period="NOCHE" icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden><path d="M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z" /></svg>} />
        </section>

        <button className="absolute bottom-[24px] right-[26px] flex h-[54px] items-center gap-[12px] rounded-full bg-star px-[24px] text-cosmos-void shadow-[0_10px_28px_rgba(0,0,0,0.55)]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden><path d="M12 5v14M5 12h14" /></svg>
          <span className="font-[family-name:var(--font-serif)] text-[17px] font-semibold">Crear recordatorio</span>
        </button>
      </div>
    </div>
  );
}
