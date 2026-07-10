"use client";

import { useEffect, useRef, useState } from "react";
import MockupStarfield from "./MockupStarfield";

/**
 * The app's "Diarios" (Books) library screen — reproduced from BooksScreen.kt:
 * banner (info · title · search · stats pill) → mode tabs → sort/layout strip →
 * section label → 3-column grid of paper book cards (cover + footer seal).
 * Laid out on a fixed 1280×800 design canvas (app dp/sp as px 1:1), scaled to
 * the frame. Accent follows the global --color-star.
 */

const DESIGN_W = 1280;
const DESIGN_H = 800;

const COVER_WASH =
  "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.55) 100%)";

type Book = { title: string; pages: number; edited: string; cover: string };

const BOOKS: Book[] = [
  { title: "Compras", pages: 3, edited: "EDITADO HACE 1 D", cover: "url('/mockups/cover_compras.png') center/cover" },
  { title: "Día de caza", pages: 0, edited: "EDITADO HACE 1 D", cover: "url('/mockups/cover_caza.png') center/cover" },
  { title: "Historias", pages: 2, edited: "EDITADO HACE 13 H", cover: "url('/mockups/cover_historias.png') center/cover" },
  { title: "Inolvidable", pages: 5, edited: "EDITADO HACE 2 H", cover: "url('/mockups/cover_inolvidable.png') center/cover" },
  { title: "Bocetos y código", pages: 44, edited: "EDITADO HACE 5 H", cover: "url('/mockups/cover_codigo.png') center/cover" },
  { title: "Diario personal", pages: 83, edited: "EDITADO HACE 1 D", cover: "url('/mockups/cover_diario.png') center/cover" },
];

function StatItem({ value, label, accent }: { value: string; label: string; accent?: boolean }) {
  return (
    <div className="flex flex-col items-center">
      <span
        className="font-[family-name:var(--font-serif)] text-[18px] leading-[18px]"
        style={accent ? { color: "var(--color-star)", fontStyle: "italic" } : { color: "var(--surface-ink)" }}
      >
        {value}
      </span>
      <span className="mt-[2px] font-[family-name:var(--font-pixel)] text-[10px] tracking-[0.16em] text-mockup-ink-ghost">
        {label}
      </span>
    </div>
  );
}

const StatSep = () => <span className="mx-[12px] h-[22px] w-[0.5px] bg-mockup-panel" />;

function CircleBtn({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex h-9 w-9 items-center justify-center rounded-full border-[0.5px] border-mockup-hairline bg-mockup-panel text-mockup-ink-soft">
      {children}
    </span>
  );
}

/** 28px sort/layout toggle button. */
function SortBtn({ on, children }: { on?: boolean; children: React.ReactNode }) {
  return (
    <span
      className={`flex h-7 w-7 items-center justify-center rounded-[6px] ${
        on ? "bg-star/15 text-star" : "text-mockup-ink-ghost"
      }`}
    >
      {children}
    </span>
  );
}

function PageSeal({ count }: { count: number }) {
  return (
    <span className="flex min-w-[32px] flex-col items-center rounded-[6px] border-[0.5px] border-paper-ink-soft/30 bg-paper-ink/[0.04] px-[6px] py-[3px]">
      <span className="font-[family-name:var(--font-serif)] text-[14px] font-medium italic leading-[14px] text-paper-ink">
        {count}
      </span>
      <span className="font-[family-name:var(--font-pixel)] text-[9px] leading-[9px] tracking-[0.16em] text-paper-ink-soft/40">
        PÁG
      </span>
    </span>
  );
}

export function AppMockup({ active = true }: { active?: boolean }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth;
      if (w) setScale(w / DESIGN_W);
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

  return (
    <div ref={rootRef} className="absolute inset-0 overflow-hidden bg-cosmos-void font-[family-name:var(--font-sans)] text-mockup-ink">
      <MockupStarfield active={active} className="absolute inset-0 h-full w-full opacity-80" />

      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{ width: DESIGN_W, height: DESIGN_H, transform: `scale(${scale})`, visibility: scale ? "visible" : "hidden" }}
      >
        {/* Banner */}
        <div className="relative h-[150px]">
          <span className="absolute left-[74px] top-[14px]">
            <CircleBtn>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="9.5" />
                <path d="M12 11v5" />
                <circle cx="12" cy="7.6" r="0.6" fill="currentColor" stroke="none" />
              </svg>
            </CircleBtn>
          </span>
          <span className="absolute right-[14px] top-[14px]">
            <CircleBtn>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3-3" />
              </svg>
            </CircleBtn>
          </span>

          <span className="absolute inset-x-0 bottom-0 h-[120px]" style={{ background: "linear-gradient(to bottom, color-mix(in srgb, var(--surface-void) 0%, transparent), var(--surface-void) 90%, var(--surface-void) 100%)" }} />

          <div className="absolute inset-x-0 bottom-[14px] flex flex-col items-center">
            <span className="font-[family-name:var(--font-serif)] text-[28px] font-light italic tracking-[-0.022em] text-star">
              Diarios
            </span>
            <div className="mt-[10px] flex items-center rounded-full border-[0.5px] border-mockup-hairline bg-cosmos-void/55 px-[14px] py-[8px]">
              <StatItem value="8" label="DIARIOS" />
              <StatSep />
              <StatItem value="72" label="PÁGINAS" />
              <StatSep />
              <StatItem value="3" label="DÍAS SEGUIDOS" accent />
            </div>
          </div>
        </div>

        {/* Mode tabs */}
        <div className="mt-[8px] flex justify-center">
          <div className="inline-flex items-center rounded-full border-[0.5px] border-mockup-hairline bg-cosmos-void/55 p-[3px]">
            <span className="rounded-full bg-star px-[18px] py-[7px] text-[12px] font-semibold text-cosmos-void">
              Mis diarios
            </span>
            <span className="rounded-full px-[18px] py-[7px] text-[12px] font-medium text-mockup-ink-soft">
              Compartidos
            </span>
          </div>
        </div>

        {/* Sort + layout strip */}
        <div className="mt-[18px] flex items-center justify-between pl-[74px] pr-[20px]">
          <div className="flex rounded-[8px] border-[0.5px] border-mockup-hairline bg-mockup-panel p-[2px]">
            <SortBtn on>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7.5V12l3 1.8" />
              </svg>
            </SortBtn>
            <SortBtn>
              <span className="text-[9px] font-bold tracking-tight">AZ</span>
            </SortBtn>
            <SortBtn>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l2.4 7.4H22l-6 4.4 2.3 7.2L12 16.8 5.7 21l2.3-7.2-6-4.4h7.6z" />
              </svg>
            </SortBtn>
          </div>

          <div className="flex rounded-[8px] border-[0.5px] border-mockup-hairline bg-mockup-panel p-[2px]">
            <SortBtn>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <rect x="3" y="3" width="8" height="11" rx="1.5" />
                <rect x="13" y="3" width="8" height="7" rx="1.5" />
                <rect x="3" y="16" width="8" height="5" rx="1.5" />
                <rect x="13" y="12" width="8" height="9" rx="1.5" />
              </svg>
            </SortBtn>
            <SortBtn on>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <rect x="3" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" />
              </svg>
            </SortBtn>
            <SortBtn>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 6h16v2.4H4zM4 10.8h16v2.4H4zM4 15.6h16v2.4H4z" />
              </svg>
            </SortBtn>
          </div>
        </div>

        {/* Section label */}
        <div className="mt-[16px] flex items-center pl-[74px] pr-[20px]">
          <span className="font-[family-name:var(--font-pixel)] text-[12px] tracking-[0.21em] text-mockup-ink-ghost">
            MIS DIARIOS
          </span>
          <span className="ml-[8px] font-[family-name:var(--font-pixel)] text-[12px] tracking-[0.08em] text-star/75">
            8
          </span>
          <span className="ml-[10px] h-[0.5px] flex-1 bg-mockup-panel" />
        </div>

        {/* Grid */}
        <div className="mt-[14px] grid grid-cols-3 gap-[14px] pl-[74px] pr-[20px]">
          {BOOKS.map((b) => (
            <article key={b.title} className="paper-grain overflow-hidden rounded-[14px]">
              <div className="relative aspect-[16/10]">
                <span className="absolute inset-0" style={{ background: b.cover }} />
                <span className="absolute inset-0" style={{ background: COVER_WASH }} />
                <span className="absolute left-[14px] top-[12px] font-[family-name:var(--font-pixel)] text-[11px] tracking-[0.18em] text-star">
                  ✦  DIARIO
                </span>
                <span className="absolute right-[8px] top-[8px] flex h-[27px] w-[27px] items-center justify-center rounded-full bg-black/45">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                  </svg>
                </span>
                <span className="absolute inset-x-[14px] bottom-[12px] line-clamp-2 font-[family-name:var(--font-serif)] text-[22px] font-light leading-[24px] tracking-[-0.018em] text-white">
                  {b.title}
                </span>
              </div>
              <div className="flex items-center px-[14px] py-[12px]">
                <PageSeal count={b.pages} />
                <span className="mx-[10px] h-[3px] w-[3px] rounded-full bg-paper-ink-soft/40" />
                <span className="font-[family-name:var(--font-pixel)] text-[11px] tracking-[0.13em] text-paper-ink-soft/40">
                  {b.edited}
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* New diary FAB, bottom-right */}
        <button className="absolute bottom-6 right-6 z-20 flex h-14 items-center gap-2 rounded-2xl bg-star px-5 text-cosmos-void shadow-[0_10px_28px_rgba(0,0,0,0.5)] transition-transform hover:scale-105 active:scale-95">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
          <span className="font-[family-name:var(--font-serif)] text-[16px] font-medium">Nuevo diario</span>
        </button>
      </div>
    </div>
  );
}
