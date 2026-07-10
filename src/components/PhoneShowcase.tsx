"use client";

import { useEffect, useRef, useState } from "react";
import MockupStarfield from "./MockupStarfield";
import { useSyncedAnimationDelay } from "./HomeMockup";

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
  { title: "Compras", meta: "3 PÁG · HOY", cover: "url('/mockups/cover_compras.png') center/cover" },
  { title: "Viaje a Kioto", meta: "12 PÁG · AYER", cover: "url('/mockups/cover_kioto.png') center/cover" },
  { title: "Historias", meta: "2 PÁG · HOY", cover: "url('/mockups/cover_historias.png') center/cover" },
  { title: "Inolvidable", meta: "5 PÁG · HOY", cover: "url('/mockups/cover_inolvidable.png') center/cover" },
  { title: "Notas de Arquitectura", meta: "1 PÁG · 20 JUN", cover: "url('/mockups/cover_arquitectura.png') center/cover" },
];

const BOOKS = [
  { title: "Compras", pages: 3, edited: "EDITADO HACE 1 D", cover: "url('/mockups/cover_compras.png') center/cover" },
  { title: "Día de caza", pages: 0, edited: "EDITADO HACE 1 D", cover: "url('/mockups/cover_caza.png') center/cover" },
  { title: "Historias", pages: 2, edited: "EDITADO HACE 13 H", cover: "url('/mockups/cover_historias.png') center/cover" },
  { title: "Inolvidable", pages: 5, edited: "EDITADO HACE 2 H", cover: "url('/mockups/cover_inolvidable.png') center/cover" },
  { title: "Bocetos y código", pages: 44, edited: "EDITADO HACE 5 H", cover: "url('/mockups/cover_codigo.png') center/cover" },
  { title: "Diario personal", pages: 83, edited: "EDITADO HACE 1 D", cover: "url('/mockups/cover_diario.png') center/cover" },
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
  return (
    <>
      <StatusBar />
      <span className="absolute left-[16px] top-[34px] z-20 block h-[30px] w-[30px] rounded-full bg-gradient-to-br from-tag-love to-tag-dream ring-1 ring-white/20" />

      <div className="flex flex-col items-center px-[16px] pt-[34px] text-center">
        <p className="font-[family-name:var(--font-pixel)] text-[11px] tracking-[0.26em] text-star/85">✦ STARS ALIKE ✦</p>
        <h3 className="mt-[10px] font-[family-name:var(--font-serif)] text-[26px] font-light leading-[27px] text-mockup-ink">Buenas tardes</h3>
        <p className="shimmer-accent mt-[6px] font-[family-name:var(--font-sans)] text-[13px] italic" style={{ animationDelay: useSyncedAnimationDelay() }}>Pequeño bloque, gran historia.</p>
        <div className="mt-[16px] flex items-center gap-[8px] rounded-full border-[0.5px] border-mockup-hairline bg-cosmos-void/40 px-[10px] py-[8px]">
          <StatI value="8" label="DIARIOS" /><Sep /><StatI value="138" label="PALABRAS" /><Sep /><StatI value="24" label="SEMANA" /><Sep /><StatI value="4" label="RACHA" accent />
        </div>
      </div>

      <div className="mt-[22px] flex items-center px-[16px]">
        <span className="font-[family-name:var(--font-pixel)] text-[11px] tracking-[0.22em] text-mockup-ink-ghost">ÚLTIMOS DIARIOS</span>
        <span className="ml-[10px] h-px flex-1 bg-mockup-panel" />
      </div>

      <div className="mt-[14px] flex gap-[12px] px-[16px]">
        {RECENT.map((d) => (
          <div key={d.title} className="relative h-[206px] w-[150px] shrink-0 overflow-hidden rounded-[13px] bg-cosmos-smoke">
            <span className="absolute inset-0" style={{ background: d.cover }} />
            <span className="absolute inset-x-0 bottom-0 h-[100px]" style={{ background: WASH }} />
            <span className="absolute left-[13px] right-[13px] bottom-[18px] line-clamp-2 font-[family-name:var(--font-serif)] text-[14px] font-light leading-tight text-white">{d.title}</span>
            <span className="absolute left-[13px] bottom-[8px] font-[family-name:var(--font-pixel)] text-[8px] tracking-[0.1em] text-white/65">{d.meta}</span>
            <BreathingBorder w={150} h={206} radius={13} stroke={1.5} />
          </div>
        ))}
      </div>

      <div className="mt-[18px] px-[16px]">
        <div className="paper-grain rounded-[14px] px-[16px] py-[14px] shadow-[0_14px_30px_rgba(0,0,0,0.45)]">
          <div className="flex items-center gap-[8px]">
            <span className="font-[family-name:var(--font-pixel)] text-[10px] tracking-[0.2em] text-paper-ink-soft/80">CONTINUAR ESCRIBIENDO</span>
          </div>
          <p className="mt-[10px] text-center font-[family-name:var(--font-serif)] text-[18px] italic leading-[21px] text-paper-ink">Página 7</p>
          <div className="mt-[12px] border-t border-dashed border-paper-ink/25 pt-[10px]" />
          <div className="flex items-center justify-between">
            <span className="truncate font-[family-name:var(--font-pixel)] text-[9px] uppercase text-paper-ink-soft/45">Animales · hoy · 12:18</span>
            <span className="ml-[8px] flex shrink-0 items-center gap-[2px] font-[family-name:var(--font-sans)] text-[11px] font-semibold" style={{ color: "var(--color-star)" }}>Retomar →</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[100px] left-[16px] z-20 flex h-[44px] w-[106px] items-center gap-[6px] overflow-hidden rounded-full bg-cosmos-smoke px-[16px] shadow-[0_8px_22px_rgba(0,0,0,0.5)]">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-star shrink-0"><circle cx="12" cy="12" r="9" /><path d="M12 7.5V12l3 1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
        <span className="font-[family-name:var(--font-serif)] text-[13px] font-medium text-mockup-ink-soft">Enfoque</span>
        <BreathingBorder w={106} h={44} radius={22} stroke={1.5} />
      </div>
      <div className="absolute bottom-[100px] right-[16px] z-20 flex h-[44px] items-center gap-[6px] rounded-2xl bg-star px-[16px] text-cosmos-void shadow-[0_8px_22px_rgba(0,0,0,0.5)]">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
        <span className="font-[family-name:var(--font-serif)] text-[13px] font-medium">Nota rápida</span>
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

      {/* new-diary FAB */}
      <div className="absolute bottom-[18px] right-[16px] z-20 flex h-[44px] items-center gap-[6px] rounded-2xl bg-star px-[16px] text-cosmos-void shadow-[0_8px_22px_rgba(0,0,0,0.5)]">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
        <span className="font-[family-name:var(--font-serif)] text-[13px] font-medium">Nuevo diario</span>
      </div>
    </>
  );
}

function PhoneConstelacion() {
  const delay = useSyncedAnimationDelay();
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
      label: "Tu Historia",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
        </svg>
      )
    },
    {
      id: "ajustes",
      label: "Ajustes",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
      )
    },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 h-[84px] flex items-start justify-around px-2 pt-2 z-40 border-t border-mockup-hairline rounded-b-[1.75rem]" style={{ backgroundColor: "var(--surface-void)" }}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeScreen;
        return (
          <button key={tab.id} className="group flex flex-col items-center justify-start gap-1 w-[60px]">
            <div
              className={`flex items-center justify-center w-[40px] h-[32px] rounded-full transition-colors ${isActive ? "text-star" : "text-mockup-ink-ghost group-hover:text-mockup-ink-soft"}`}
                style={isActive ? { backgroundColor: "var(--color-star-ghost)" } : undefined}
              >
              {tab.icon}
            </div>
            <div className="flex flex-col items-center h-[18px]">
              <span
                className={`font-[family-name:var(--font-serif)] text-[10px] tracking-wide transition-colors ${
                  isActive ? "text-star font-bold italic" : "text-mockup-ink-ghost"
                }`}
              >
                {tab.label}
              </span>
              <div
                className={`h-[2.5px] w-1.5 rounded-full bg-star mt-[2px] transition-all duration-300 ${
                  isActive ? "opacity-100 scale-100" : "opacity-0 scale-0"
                }`}
              />
            </div>
          </button>
        );
      })}
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
