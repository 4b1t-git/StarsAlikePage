"use client";

import { useEffect, useRef, useState } from "react";
import MockupStarfield from "./MockupStarfield";
import { useSyncedAnimationDelay } from "./HomeMockup";
import { mockupCover } from "@/lib/assets";

/**
 * Portrait phone mockup of the app, inside a CSS phone bezel. Shows the same
 * HomeScreen.kt / BooksScreen.kt content reflowed for a narrow (phone) width —
 * notably the Diarios grid collapses to a single column (GridCells.Adaptive
 * 320dp), the app's real phone behaviour. Laid out on a fixed 360×760 design
 * canvas scaled to the screen. Accent follows the global --color-star.
 */

const DESIGN_W = 360;
const DESIGN_H = 760;

const WASH = "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.85))";
const COVER_WASH = "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.55))";

const RECENT = [
  { title: "Nuevo diario", meta: "0 PÁG · 26 JUL", cover: null, isNew: true },
  {
    title: "Nota del 26 jul 2026",
    meta: "1 PÁG · 26 JUL",
    cover: mockupCover("cover_arquitectura.png"),
    isNew: false,
  },
];

const BOOKS = [
  { title: "Compras", pages: 3, edited: "EDITADO HACE 1 D", cover: mockupCover("cover_compras.png") },
  { title: "Día de caza", pages: 0, edited: "EDITADO HACE 1 D", cover: mockupCover("cover_caza.png") },
  { title: "Historias", pages: 2, edited: "EDITADO HACE 13 H", cover: mockupCover("cover_historias.png") },
  { title: "Inolvidable", pages: 5, edited: "EDITADO HACE 2 H", cover: mockupCover("cover_inolvidable.png") },
  { title: "Bocetos y código", pages: 44, edited: "EDITADO HACE 5 H", cover: mockupCover("cover_codigo.png") },
  { title: "Diario personal", pages: 83, edited: "EDITADO HACE 1 D", cover: mockupCover("cover_diario.png") },
];

function StatusBar() {
  return (
    <div className="flex h-[28px] items-center justify-between px-[18px] pt-[4px]">
      <span className="text-[11px] font-semibold text-mockup-ink-soft">9:41</span>
      <span className="flex items-center gap-[5px] text-mockup-ink-soft">
        <svg width="15" height="11" viewBox="0 0 18 12" fill="currentColor"><rect x="0" y="7" width="3" height="5" rx="1"/><rect x="5" y="4" width="3" height="8" rx="1"/><rect x="10" y="1" width="3" height="11" rx="1"/></svg>
        <svg width="14" height="11" viewBox="0 0 16 12" fill="currentColor"><path d="M8 11l7-8a10 10 0 0 0-14 0z"/></svg>
        <svg width="20" height="11" viewBox="0 0 24 12" fill="none"><rect x="1" y="1.5" width="19" height="9" rx="2.5" stroke="currentColor" strokeOpacity="0.6"/><rect x="2.5" y="3" width="14" height="6" rx="1.2" fill="currentColor"/><rect x="21" y="4" width="2" height="4" rx="1" fill="currentColor" fillOpacity="0.6"/></svg>
      </span>
    </div>
  );
}

function StatI({ value, label, accent }: { value: string; label: string; accent?: boolean }) {
  return (
    <div className="flex flex-col items-center px-[7px]">
      <span className="font-[family-name:var(--font-serif)] text-[16px] leading-[16px]" style={accent ? { color: "var(--color-star)", fontStyle: "italic" } : { color: "var(--surface-ink)" }}>{value}</span>
      <span className="mt-[2px] font-[family-name:var(--font-pixel)] text-[7px] tracking-[0.14em] text-mockup-ink-ghost">{label}</span>
    </div>
  );
}
const Sep = () => <span className="h-[20px] w-px bg-mockup-panel" />;

function SortBtn({ on, children }: { on?: boolean; children: React.ReactNode }) {
  return <span className={`flex h-[26px] w-[26px] items-center justify-center rounded-[6px] ${on ? "text-star" : "text-mockup-ink-ghost"}`} style={on ? { backgroundColor: "var(--color-star-ghost)" } : undefined}>{children}</span>;
}

function PageSeal({ count }: { count: number }) {
  return (
    <span className="flex min-w-[30px] flex-col items-center rounded-[6px] border-[0.5px] border-paper-ink-soft/30 bg-paper-ink/[0.04] px-[6px] py-[3px]">
      <span className="font-[family-name:var(--font-serif)] text-[13px] font-medium italic leading-[13px] text-paper-ink">{count}</span>
      <span className="font-[family-name:var(--font-pixel)] text-[8px] leading-[9px] tracking-[0.16em] text-paper-ink-soft/40">PÁG</span>
    </span>
  );
}

function BreathingBorder({
  w,
  h,
  radius = 16,
  stroke = 2,
}: {
  w: number;
  h: number;
  radius?: number;
  stroke?: number;
}) {
  const i = stroke / 2;
  const rx = Math.max(0, radius - i);
  const rect = {
    x: i,
    y: i,
    width: w - stroke,
    height: h - stroke,
    rx,
    pathLength: 1,
    strokeWidth: stroke,
  };
  const delay = useSyncedAnimationDelay();
  return (
    <svg
      className="breathe-border pointer-events-none absolute inset-0"
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      aria-hidden
    >
      <rect className="breathe-base" {...rect} />
      <rect className="breathe-comet" style={{ animationDelay: delay }} {...rect} />
    </svg>
  );
}

function PhoneInicio() {
  const quoteDelay = useSyncedAnimationDelay();

  return (
    <>
      <StatusBar />

      <div className="absolute left-[24px] right-[20px] top-[54px]">
        <p className="font-[family-name:var(--font-pixel)] text-[10px] tracking-[0.28em] text-mockup-ink-soft">
          MIÉRCOLES <span className="text-star">· 26 DE AGOSTO</span>
        </p>
        <h3 className="mt-[20px] font-[family-name:var(--font-serif)] text-[39px] font-light leading-[40px] tracking-[-0.035em] text-mockup-ink">
          Buenas <span className="italic text-star">tardes</span>
        </h3>
        <p
          className="shimmer-accent mt-[13px] font-[family-name:var(--font-serif)] text-[16px] italic leading-[20px]"
          style={{ animationDelay: quoteDelay }}
        >
          Si no lo escribes, ¿de verdad pasó?
        </p>
      </div>

      <div className="absolute left-[24px] right-[20px] top-[188px] flex items-center justify-between">
        {[
          ["2", "DIARIOS"],
          ["0", "PALABRAS"],
          ["1", "PÁGINAS"],
        ].map(([value, label], index) => (
          <div key={label} className="flex items-center">
            {index > 0 && <span className="mr-[37px] h-[24px] w-px bg-mockup-panel" />}
            <span className="w-[66px] text-center">
              <span className="block font-[family-name:var(--font-serif)] text-[22px] leading-[24px] text-mockup-ink">{value}</span>
              <span className="mt-[5px] block font-[family-name:var(--font-pixel)] text-[8px] tracking-[0.24em] text-mockup-ink-ghost">{label}</span>
            </span>
          </div>
        ))}
      </div>

      <div className="absolute left-[24px] right-[20px] top-[247px] flex items-center">
        <span className="font-[family-name:var(--font-pixel)] text-[10px] tracking-[0.25em] text-mockup-ink-ghost">ÚLTIMOS DIARIOS</span>
        <span className="ml-[12px] h-px flex-1 bg-mockup-panel" />
      </div>

      <div className="absolute left-[7px] top-[283px] flex gap-[14px]">
        {RECENT.map((d) => (
          <div key={d.title} className="relative h-[220px] w-[160px] shrink-0 overflow-hidden rounded-[14px] bg-cosmos-smoke">
            {d.cover && (
              <span
                className="absolute inset-0 grayscale contrast-125"
                style={{ background: d.cover }}
              />
            )}
            {d.isNew && (
              <span className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,color-mix(in_srgb,var(--color-star)_14%,transparent),transparent_35%)]">
                <svg className="absolute left-1/2 top-[43%] -translate-x-1/2 -translate-y-1/2 text-star drop-shadow-[0_0_16px_var(--color-star)]" width="46" height="46" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 1.5c1.2 6.4 4.1 9.3 10.5 10.5-6.4 1.2-9.3 4.1-10.5 10.5C10.8 16.1 7.9 13.2 1.5 12 7.9 10.8 10.8 7.9 12 1.5Z" />
                </svg>
              </span>
            )}
            <span className="absolute inset-x-0 bottom-0 h-[112px]" style={{ background: WASH }} />
            <span className="absolute left-[14px] right-[14px] bottom-[31px] line-clamp-2 font-[family-name:var(--font-serif)] text-[17px] font-light leading-[19px] text-white">{d.title}</span>
            <span className="absolute left-[14px] bottom-[15px] font-[family-name:var(--font-pixel)] text-[8px] tracking-[0.11em] text-white/65">{d.meta}</span>
            <BreathingBorder w={160} h={220} radius={14} stroke={1.5} />
          </div>
        ))}
      </div>

      <div className="absolute left-[24px] right-[24px] top-[537px]">
        <div className="paper-grain h-[151px] rounded-[15px] px-[18px] py-[17px] shadow-[0_14px_30px_rgba(0,0,0,0.45)]">
          <div className="flex items-center gap-[9px]">
            <span className="breathe-dot h-[6px] w-[6px] rounded-full bg-star shadow-[0_0_8px_var(--color-star)]" />
            <span className="font-[family-name:var(--font-pixel)] text-[9px] tracking-[0.22em] text-paper-ink-soft/75">CONTINUAR ESCRIBIENDO</span>
          </div>
          <p className="mt-[17px] text-center font-[family-name:var(--font-serif)] text-[22px] italic leading-[24px] text-paper-ink">Nota rápida</p>
          <div className="mt-[20px] border-t border-dashed border-paper-ink/20" />
          <div className="mt-[13px] flex items-center justify-between">
            <span className="truncate font-[family-name:var(--font-pixel)] text-[8px] uppercase tracking-[0.09em] text-paper-ink-soft/40">NOTA DEL 26 JUL 2026 · 26 JUL</span>
            <span className="ml-[8px] flex shrink-0 items-center gap-[4px] font-[family-name:var(--font-sans)] text-[11px] font-semibold" style={{ color: "var(--color-star)" }}>
              Retomar
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

function PhoneDiarios() {
  return (
    <>
      <StatusBar />

      {/* banner */}
      <div className="relative h-[126px]">
        <span className="absolute left-[14px] top-[8px] flex h-8 w-8 items-center justify-center rounded-full border-[0.5px] border-mockup-hairline bg-mockup-panel text-mockup-ink-soft">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="9.5" /><path d="M12 11v5" /><circle cx="12" cy="7.6" r="0.6" fill="currentColor" stroke="none" /></svg>
        </span>
        <span className="absolute right-[14px] top-[8px] flex h-8 w-8 items-center justify-center rounded-full border-[0.5px] border-mockup-hairline bg-mockup-panel text-mockup-ink-soft">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3-3" /></svg>
        </span>
        <span className="absolute inset-x-0 bottom-0 h-[90px]" style={{ background: "linear-gradient(to bottom, color-mix(in srgb, var(--surface-void) 0%, transparent), var(--surface-void) 90%, var(--surface-void) 100%)" }} />
        <div className="absolute inset-x-0 bottom-[12px] flex flex-col items-center">
          <span className="font-[family-name:var(--font-serif)] text-[26px] font-light italic tracking-[-0.022em] text-star">Diarios</span>
          <div className="mt-[8px] flex items-center rounded-full border-[0.5px] border-mockup-hairline bg-cosmos-void/55 px-[12px] py-[7px]">
            <StatI value="8" label="DIARIOS" /><Sep /><StatI value="72" label="PÁGINAS" /><Sep /><StatI value="3" label="RACHA" accent />
          </div>
        </div>
      </div>

      {/* tabs */}
      <div className="mt-[6px] flex justify-center">
        <div className="inline-flex items-center rounded-full border-[0.5px] border-mockup-hairline bg-cosmos-void/55 p-[3px]">
          <span className="rounded-full bg-star px-[16px] py-[6px] text-[11px] font-semibold text-cosmos-void">Mis diarios</span>
          <span className="rounded-full px-[16px] py-[6px] text-[11px] font-medium text-white/65">Compartidos</span>
        </div>
      </div>

      {/* sort/layout strip */}
      <div className="mt-[14px] flex items-center justify-between px-[16px]">
        <div className="flex rounded-[8px] border-[0.5px] border-mockup-hairline bg-mockup-panel p-[2px]">
          <SortBtn on><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7.5V12l3 1.8" /></svg></SortBtn>
          <SortBtn><span className="text-[8px] font-bold">AZ</span></SortBtn>
          <SortBtn><svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6 4.4 2.3 7.2L12 16.8 5.7 21l2.3-7.2-6-4.4h7.6z" /></svg></SortBtn>
        </div>
        <div className="flex rounded-[8px] border-[0.5px] border-mockup-hairline bg-mockup-panel p-[2px]">
          <SortBtn><svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="8" height="11" rx="1.5"/><rect x="13" y="3" width="8" height="7" rx="1.5"/><rect x="3" y="16" width="8" height="5" rx="1.5"/><rect x="13" y="12" width="8" height="9" rx="1.5"/></svg></SortBtn>
          <SortBtn on><svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg></SortBtn>
          <SortBtn><svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M4 6h16v2.4H4zM4 10.8h16v2.4H4zM4 15.6h16v2.4H4z" /></svg></SortBtn>
        </div>
      </div>

      {/* section label */}
      <div className="mt-[14px] flex items-center px-[16px]">
        <span className="font-[family-name:var(--font-pixel)] text-[11px] tracking-[0.21em] text-mockup-ink-ghost">MIS DIARIOS</span>
        <span className="ml-[8px] font-[family-name:var(--font-pixel)] text-[11px] tracking-[0.08em] text-star/75">8</span>
        <span className="ml-[10px] h-[0.5px] flex-1 bg-mockup-panel" />
      </div>

      {/* 2-column grid of book cards (phone adaptive grid) */}
      <div className="mt-[12px] grid grid-cols-2 gap-[12px] px-[16px]">
        {BOOKS.map((b) => (
          <article key={b.title} className="paper-grain relative overflow-hidden rounded-[14px]">
            <div className="relative aspect-[16/10]">
              <span className="absolute inset-0" style={{ background: b.cover }} />
              <span className="absolute inset-0" style={{ background: COVER_WASH }} />
              <span className="absolute left-[12px] top-[10px] font-[family-name:var(--font-pixel)] text-[9px] tracking-[0.18em] text-star">✦  DIARIO</span>
              <span className="absolute right-[6px] top-[6px] flex h-[22px] w-[22px] items-center justify-center rounded-full bg-black/45">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" /></svg>
              </span>
              <span className="absolute inset-x-[12px] bottom-[10px] line-clamp-2 font-[family-name:var(--font-serif)] text-[16px] font-light leading-[18px] tracking-[-0.018em] text-white">{b.title}</span>
            </div>
            <div className="flex items-center px-[12px] py-[9px]">
              <PageSeal count={b.pages} />
              <span className="mx-[8px] h-[3px] w-[3px] rounded-full bg-paper-ink-soft/40" />
              <span className="truncate font-[family-name:var(--font-pixel)] text-[9px] tracking-[0.1em] text-paper-ink-soft/40">{b.edited}</span>
            </div>
          </article>
        ))}
      </div>

    </>
  );
}

function PhoneConstelacion() {
  return (
    <div className="absolute inset-0 font-[family-name:var(--font-sans)] text-mockup-ink">
      {/* Header */}
      <div className="px-[20px] pt-[38px]">
        <div className="flex items-start justify-between">
          <div>
            <p className="flex items-center gap-2 font-[family-name:var(--font-pixel)] text-[10px] tracking-[0.28em] text-star/85">
              ✦ MAPA ESTELAR ✦
            </p>
            <h1 className="mt-1 font-[family-name:var(--font-serif)] text-[28px] font-light leading-tight text-mockup-ink">
              Tu<br /><span className="italic text-star">constelación</span>
            </h1>
          </div>
          <div className="mt-1 flex gap-[6px]">
            <span className="flex h-[34px] w-[34px] items-center justify-center rounded-xl border border-star/30 bg-star/10 text-star">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
            </span>
            <span className="flex h-[34px] w-[34px] items-center justify-center rounded-xl border border-star/30 bg-star/10 text-star">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="3"/><circle cx="19" cy="6" r="2"/><circle cx="5" cy="18" r="2"/><path d="M12 9l5-2"/><path d="M7 16l5-2"/></svg>
            </span>
            <span className="flex h-[34px] w-[34px] items-center justify-center rounded-xl border border-mockup-hairline bg-mockup-panel text-mockup-ink-soft">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 3h18v18H3z"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
            </span>
            <span className="flex h-[34px] w-[34px] items-center justify-center rounded-xl border border-mockup-hairline bg-mockup-panel text-mockup-ink-soft">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/></svg>
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-3 flex items-center gap-[14px] rounded-full border-[0.5px] border-mockup-hairline bg-cosmos-void/55 px-[14px] py-[8px] w-fit">
          <div className="text-center">
            <span className="block font-[family-name:var(--font-serif)] text-[16px] text-mockup-ink">8</span>
            <span className="font-[family-name:var(--font-pixel)] text-[8px] tracking-widest text-mockup-ink-ghost">DIARIOS</span>
          </div>
          <div className="h-[20px] w-px bg-mockup-panel" />
          <div className="text-center">
            <span className="block font-[family-name:var(--font-serif)] text-[16px] text-mockup-ink">88</span>
            <span className="font-[family-name:var(--font-pixel)] text-[8px] tracking-widest text-mockup-ink-ghost">PÁGINAS</span>
          </div>
          <div className="h-[20px] w-px bg-mockup-panel" />
          <div className="text-center">
            <span className="block font-[family-name:var(--font-serif)] text-[16px] text-mockup-ink">4</span>
            <span className="font-[family-name:var(--font-pixel)] text-[8px] tracking-widest text-mockup-ink-ghost">ETIQUETAS</span>
          </div>
        </div>

        {/* Search bar */}
        <div className="mt-3 flex items-center gap-2 rounded-xl border border-mockup-hairline bg-mockup-panel px-3 py-[10px]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-mockup-ink-ghost"><circle cx="11" cy="11" r="7"/><path d="m20 20-3-3"/></svg>
          <span className="text-[12px] text-mockup-ink-ghost">Buscar nodo, página o etiqueta...</span>
        </div>
      </div>

      {/* Blurred graph + CTA */}
      <div className="absolute top-[230px] left-0 right-0 bottom-[84px] pointer-events-none">
        <div className="absolute inset-0 blur-[6px] opacity-35">
          <svg className="h-full w-full" viewBox="0 0 360 400">
            {/* Simplified constellation nodes */}
            <circle cx="80" cy="120" r="18" fill="none" stroke="rgba(96,165,250,0.4)" strokeWidth="1" />
            <circle cx="80" cy="120" r="5" fill="#60a5fa" opacity="0.8" />
            <text x="80" y="148" textAnchor="middle" fill="var(--surface-ink)" fontSize="8" opacity="0.6">Compras</text>
            
            <circle cx="200" cy="80" r="22" fill="none" stroke="rgba(96,165,250,0.4)" strokeWidth="1" />
            <circle cx="200" cy="80" r="6" fill="#60a5fa" opacity="0.8" />
            <text x="200" y="112" textAnchor="middle" fill="var(--surface-ink)" fontSize="8" opacity="0.6">Historias</text>
            
            <circle cx="300" cy="140" r="28" fill="none" stroke="rgba(192,132,252,0.4)" strokeWidth="1" />
            <circle cx="300" cy="140" r="8" fill="#c084fc" opacity="0.8" />
            
            <circle cx="150" cy="250" r="16" fill="none" stroke="rgba(217,119,6,0.4)" strokeWidth="1" />
            <circle cx="150" cy="250" r="4" fill="#d97706" opacity="0.8" />
            
            <circle cx="260" cy="280" r="20" fill="none" stroke="rgba(96,165,250,0.4)" strokeWidth="1" />
            <circle cx="260" cy="280" r="5" fill="#60a5fa" opacity="0.8" />

            <line x1="80" y1="120" x2="200" y2="80" stroke="var(--surface-hairline)" strokeWidth="0.5" />
            <line x1="200" y1="80" x2="300" y2="140" stroke="var(--surface-hairline)" strokeWidth="0.5" />
            <line x1="150" y1="250" x2="260" y2="280" stroke="var(--surface-hairline)" strokeWidth="0.5" />
            <line x1="80" y1="120" x2="150" y2="250" stroke="var(--surface-hairline)" strokeWidth="0.5" />
            <line x1="200" y1="80" x2="260" y2="280" stroke="var(--surface-hairline)" strokeWidth="0.5" />

            {[40, 120, 180, 310, 70].map((x, i) => (
              <circle key={i} cx={x} cy={[320, 50, 350, 300, 200][i]} r="2" fill="var(--surface-ink)" opacity="0.3" />
            ))}
          </svg>
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-auto">
          <div className="flex flex-col items-center rounded-2xl border border-mockup-hairline bg-cosmos-void/60 px-6 py-6 shadow-2xl backdrop-blur-xl mx-6">
            <svg className="mb-3 text-star" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h3 className="font-[family-name:var(--font-serif)] text-[20px] text-mockup-ink">
              Descubre tu universo
            </h3>
            <p className="mt-2 max-w-[240px] text-center font-[family-name:var(--font-sans)] text-[12px] text-mockup-ink-soft leading-snug">
              Instala la aplicación para ver tu propia constelación de diarios, notas y etiquetas interconectadas.
            </p>
            <button className="mt-5 rounded-full bg-star px-6 py-2.5 font-[family-name:var(--font-sans)] text-[12px] font-semibold text-cosmos-void shadow-[0_0_16px_var(--color-star)] transition-transform hover:scale-105 active:scale-95">
              Descargar aplicación
            </button>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-[90px] left-1/2 -translate-x-1/2 z-20 flex flex-wrap items-center justify-center gap-x-[16px] gap-y-[6px] rounded-full border border-mockup-hairline bg-cosmos-void/80 px-[16px] py-[8px] backdrop-blur-md">
        <div className="flex items-center gap-1.5">
          <span className="block h-[8px] w-[8px] rounded-full bg-[#60a5fa]" />
          <span className="font-[family-name:var(--font-pixel)] text-[8px] tracking-wider text-mockup-ink-soft">Diario</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="block h-[6px] w-[6px] rounded-full bg-mockup-ink" />
          <span className="font-[family-name:var(--font-pixel)] text-[8px] tracking-wider text-mockup-ink-soft">Página</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="block h-[8px] w-[8px] rounded-full bg-[#d97706]" />
          <span className="font-[family-name:var(--font-pixel)] text-[8px] tracking-wider text-mockup-ink-soft">Etiqueta</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="block h-[1.5px] w-4 bg-mockup-ink-ghost" />
          <span className="font-[family-name:var(--font-pixel)] text-[8px] tracking-wider text-mockup-ink-soft">Backlink</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="block h-[1.5px] w-4 border-b-[1.5px] border-dotted border-mockup-ink-ghost" />
          <span className="font-[family-name:var(--font-pixel)] text-[8px] tracking-wider text-mockup-ink-soft">Enlaces en común</span>
        </div>
      </div>
    </div>
  );
}

function PhoneHistoria() {
  return (
    <div className="absolute inset-0 font-[family-name:var(--font-sans)] text-mockup-ink">
      {/* Header */}
      <div className="px-[20px] pt-[42px]">
        <p className="font-[family-name:var(--font-pixel)] text-[10px] tracking-[0.28em] text-star/85">
          REGISTRO • CONSTELACIÓN
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-serif)] text-[30px] font-light leading-[1.15] text-mockup-ink">
          Tu historia<br />entre estrellas
        </h1>
        <div className="mt-4 flex items-center gap-3">
          <span className="block h-px w-6 bg-mockup-panel" />
          <p className="font-[family-name:var(--font-serif)] text-[13px] italic text-mockup-ink-ghost">
            9 de 11 luces encendidas
          </p>
        </div>
      </div>

      {/* Blurred timeline + CTA */}
      <div className="absolute top-[200px] left-0 right-0 bottom-[84px] pointer-events-none">
        <div className="absolute inset-0 blur-[6px] opacity-35">
          {/* Simplified timeline */}
          <div className="relative h-full pl-[50px]">
            {/* Vertical line */}
            <div className="absolute left-[38px] top-0 bottom-0 w-px bg-mockup-panel" />

            {/* Milestone I */}
            <div className="relative pt-[30px]">
              <div className="absolute left-[-16px] top-[34px] h-[10px] w-[10px] rounded-full bg-star/20 ring-1 ring-star/50 flex items-center justify-center">
                <span className="block h-[4px] w-[4px] rounded-full bg-star" />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-[family-name:var(--font-serif)] text-[16px] italic text-star">I</span>
                <span className="h-px w-4 bg-star/50" />
                <span className="font-[family-name:var(--font-pixel)] text-[8px] tracking-widest text-star/80">25 • MAY • 2026</span>
              </div>
              <h3 className="mt-2 font-[family-name:var(--font-serif)] text-[24px] text-mockup-ink">Abrir la app</h3>
              <p className="mt-1 font-[family-name:var(--font-serif)] text-[12px] italic text-mockup-ink-ghost max-w-[200px]">
                Dando los primeros pasos bajo las estrellas.
              </p>
            </div>

            {/* Milestone II */}
            <div className="relative pt-[40px]">
              <div className="absolute left-[-16px] top-[44px] h-[10px] w-[10px] rounded-full bg-star/20 ring-1 ring-star/50 flex items-center justify-center">
                <span className="block h-[4px] w-[4px] rounded-full bg-star" />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-[family-name:var(--font-serif)] text-[16px] italic text-star">II</span>
                <span className="h-px w-4 bg-star/50" />
                <span className="font-[family-name:var(--font-pixel)] text-[8px] tracking-widest text-star/80">25 • MAY • 2026</span>
              </div>
              <h3 className="mt-2 font-[family-name:var(--font-serif)] text-[24px] text-mockup-ink leading-tight">Primer diario creado</h3>
              <p className="mt-1 font-[family-name:var(--font-serif)] text-[12px] italic text-mockup-ink-ghost max-w-[220px]">
                El lugar seguro para guardar los mejores pensamientos.
              </p>
            </div>

            {/* Milestone III */}
            <div className="relative pt-[40px]">
              <div className="absolute left-[-16px] top-[44px] h-[10px] w-[10px] rounded-full bg-star/20 ring-1 ring-star/50 flex items-center justify-center">
                <span className="block h-[4px] w-[4px] rounded-full bg-star" />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-[family-name:var(--font-serif)] text-[16px] italic text-star">III</span>
                <span className="h-px w-4 bg-star/50" />
                <span className="font-[family-name:var(--font-pixel)] text-[8px] tracking-widest text-star/80">25 • MAY • 2026</span>
              </div>
              <h3 className="mt-2 font-[family-name:var(--font-serif)] text-[24px] text-mockup-ink">Primera página escrita</h3>
              <p className="mt-1 font-[family-name:var(--font-serif)] text-[12px] italic text-mockup-ink-ghost max-w-[200px]">
                La primera estrella nueva en tu cielo.
              </p>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-auto">
          <div className="flex flex-col items-center rounded-2xl border border-mockup-hairline bg-cosmos-void/60 px-6 py-6 shadow-2xl backdrop-blur-xl mx-6">
            <svg className="mb-3 text-star" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h3 className="font-[family-name:var(--font-serif)] text-[20px] text-mockup-ink">
              Revive tu historia
            </h3>
            <p className="mt-2 max-w-[240px] text-center font-[family-name:var(--font-sans)] text-[12px] text-mockup-ink-soft leading-snug">
              Instala la aplicación para poder recordar tu historia y ver tus hitos bajo las estrellas.
            </p>
            <button className="mt-5 rounded-full bg-star px-6 py-2.5 font-[family-name:var(--font-sans)] text-[12px] font-semibold text-cosmos-void shadow-[0_0_16px_var(--color-star)] transition-transform hover:scale-105 active:scale-95">
              Descargar aplicación
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PhoneBottomNav({ activeScreen }: { activeScreen: string }) {
  const tabs = [
    {
      id: "inicio",
      label: "Inicio",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" />
        </svg>
      )
    },
    {
      id: "diarios",
      label: "Diarios",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      )
    },
    {
      id: "constelacion",
      label: "Constelación",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"></circle>
          <circle cx="19" cy="6" r="2"></circle>
          <circle cx="5" cy="18" r="2"></circle>
          <path d="M12 9l5-2"></path>
          <path d="M7 16l5-2"></path>
        </svg>
      )
    },
    {
      id: "historia",
      label: "Calendario",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M16 3v4M8 3v4M3 10h18" />
          <path d="M8 14h2M14 14h2M8 18h2M14 18h2" />
        </svg>
      )
    },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 z-40">
      <span
        aria-label="Ajustes"
        className={`pointer-events-auto absolute left-[14px] top-[650px] h-[52px] w-[52px] overflow-hidden rounded-full border shadow-[0_8px_24px_rgba(0,0,0,0.65)] ${
          activeScreen === "ajustes" ? "border-star" : "border-white/15"
        }`}
        style={{
          background:
            "radial-gradient(circle at 40% 28%, rgba(255,255,255,.95) 0 2px, transparent 3px), radial-gradient(circle at 31% 67%, #f3a4d5 0 5px, transparent 6px), radial-gradient(circle at 61% 58%, #f6b5df 0 4px, transparent 5px), linear-gradient(145deg, #a878ee, #49327e 48%, #141526)",
        }}
      >
        <span className="absolute left-[9px] top-[8px] h-[12px] w-[12px] rounded-full bg-white/75 shadow-[0_0_10px_white]" />
        <span className="absolute bottom-[7px] left-[17px] h-[25px] w-px -rotate-[28deg] bg-white/25" />
      </span>

      <div className="pointer-events-auto absolute left-[76px] top-[648px] flex h-[58px] w-[204px] items-center justify-around rounded-full border border-white/[0.07] bg-[#15151f]/95 px-[8px] shadow-[0_12px_28px_rgba(0,0,0,0.72)] backdrop-blur-md">
        {tabs.map((tab) => {
          const isActive = tab.id === activeScreen;
          return (
            <span
              key={tab.id}
              aria-label={tab.label}
              className={`flex h-[44px] w-[42px] items-center justify-center rounded-full transition-colors ${
                isActive
                  ? "bg-star/[0.09] text-star drop-shadow-[0_0_9px_var(--color-star)]"
                  : "text-white/38"
              }`}
            >
              {tab.icon}
            </span>
          );
        })}
      </div>

      <span className="pointer-events-auto absolute right-[12px] top-[648px] flex h-[58px] w-[58px] items-center justify-center rounded-full bg-star text-[35px] font-light leading-none text-cosmos-void shadow-[0_10px_28px_rgba(0,0,0,0.65)]">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" aria-hidden><path d="M12 4v16M4 12h16" /></svg>
        <svg className="absolute -top-[13px] left-1/2 -translate-x-1/2 text-star" width="15" height="8" viewBox="0 0 15 8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="m2 6 5.5-4L13 6" /></svg>
      </span>

      <div className="absolute inset-x-0 bottom-0 flex h-[43px] items-center justify-around bg-black/85 px-[50px] text-white/85">
        <span className="flex gap-[3px]" aria-hidden>{[0, 1, 2].map((bar) => <i key={bar} className="block h-[14px] w-[2px] rounded-full bg-current" />)}</span>
        <span className="h-[17px] w-[17px] rounded-[6px] border-[1.5px] border-current" aria-hidden />
        <svg width="16" height="21" viewBox="0 0 16 21" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M13.5 2.5 3.5 10.5l10 8" /></svg>
      </div>
    </div>
  );
}

export default function PhoneShowcase({
  className = "",
  screen = "inicio",
}: {
  className?: string;
  screen?: "inicio" | "diarios" | "constelacion" | "historia" | string;
}) {
  const screenRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  // Mirror the tablet's section-change transition: track the previous screen +
  // direction so we can slide between them (same easing/keyframes as the tablet).
  const [cur, setCur] = useState(screen);
  const [prev, setPrev] = useState<string | null>(null);
  const [dir, setDir] = useState<"down" | "up">("down");
  
  const SCREEN_ORDER = ["inicio", "diarios", "constelacion", "historia", "ajustes"];
  const screenIdx = (s: string) => { const i = SCREEN_ORDER.indexOf(s); return i >= 0 ? i : 0; };

  if (screen !== cur) {
    setDir(screenIdx(screen) > screenIdx(cur) ? "down" : "up");
    setPrev(cur);
    setCur(screen);
  }
  
  useEffect(() => {
    if (prev === null) return;
    const t = setTimeout(() => setPrev(null), 420);
    return () => clearTimeout(t);
  }, [prev, cur]);

  useEffect(() => {
    const el = screenRef.current;
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
    <div className={className}>
      <div className="relative w-full rounded-[2.1rem] bg-gradient-to-b from-[#202024] to-[#08080a] p-[6px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.85)] ring-1 ring-white/10">
        <div className="pointer-events-none absolute inset-[2px] z-30 rounded-[1.95rem] ring-1 ring-white/[0.06]" />
        <span className="absolute right-[-2px] top-[88px] h-[44px] w-[3px] rounded bg-[#1a1a1c]" />
        <span className="absolute left-[-2px] top-[70px] h-[28px] w-[3px] rounded bg-[#1a1a1c]" />

        <div
          ref={screenRef}
          className="relative overflow-hidden rounded-[1.75rem] bg-cosmos-void font-[family-name:var(--font-sans)] text-mockup-ink isolate [mask-image:linear-gradient(white,white)]"
          style={{ aspectRatio: `${DESIGN_W} / ${DESIGN_H}` }}
        >
          <MockupStarfield className="absolute inset-0 h-full w-full opacity-80" starCount={120} starScale={scale} />
          <span className="absolute left-1/2 top-[9px] z-30 h-[7px] w-[7px] -translate-x-1/2 rounded-full bg-black ring-1 ring-white/10" />

          <div
            className="absolute left-0 top-0 origin-top-left"
            style={{ width: DESIGN_W, height: DESIGN_H, transform: `scale(${scale})`, visibility: scale ? "visible" : "hidden" }}
          >
            {[cur, prev].map((s, slot) => {
              if (s === null) return null;
              const isCurrent = slot === 0;
              const anim = isCurrent
                ? prev === null
                  ? ""
                  : dir === "down"
                  ? "screen-enter-down"
                  : "screen-enter-up"
                : dir === "down"
                ? "screen-exit-up"
                : "screen-exit-down";
              return (
                <div key={s} className={`absolute inset-0 ${anim} ${isCurrent ? "z-10" : "z-0"}`}>
                  {s === "diarios" ? <PhoneDiarios /> : s === "constelacion" ? <PhoneConstelacion /> : s === "historia" ? <PhoneHistoria /> : <PhoneInicio />}
                </div>
              );
            })}
            <PhoneBottomNav activeScreen={cur} />
          </div>

          {/* Vignette — matched to the tablet's edge effect */}
          <div className="pointer-events-none absolute inset-0 z-20 rounded-[1.75rem] shadow-[inset_0_0_80px_rgba(0,0,0,0.6)]" />
        </div>
      </div>
    </div>
  );
}
