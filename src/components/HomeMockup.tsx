"use client";

import { useEffect, useRef, useState } from "react";
import MockupStarfield from "./MockupStarfield";

const DESIGN_W = 1280;
const DESIGN_H = 800;

/**
 * The app's "Inicio" (Home) screen — reproduced pixel-for-pixel from
 * HomeScreen.kt. The UI is laid out on a fixed 1280×800 (16:10) design canvas
 * using the app's dp/sp values as px 1:1, then scaled to the frame with
 * container-query units so proportions stay exact at any size.
 *
 * Accent follows the global --color-star (themeable). Interactive: the cozy
 * line shimmers, diary borders breathe, the "Nota rápida" FAB opens the
 * quick-note sheet, and buttons/cards respond to hover/press.
 */

const TEAL = "#176B62"; // fixed "Retomar" color from the app (not the accent)

const BOTTOM_WASH =
  "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(5,5,5,0.9) 100%)";

type Diary = { title: string; meta: string; cover: string };

const DIARIES: Diary[] = [
  { title: "Compras", meta: "3 PÁG · HOY", cover: "url('/mockups/cover_compras.png') center/cover" },
  { title: "Viaje a Kioto", meta: "12 PÁG · AYER", cover: "url('/mockups/cover_kioto.png') center/cover" },
  { title: "Historias", meta: "2 PÁG · HOY", cover: "url('/mockups/cover_historias.png') center/cover" },
  { title: "Inolvidable", meta: "5 PÁG · HOY", cover: "url('/mockups/cover_inolvidable.png') center/cover" },
  { title: "Bocetos y código", meta: "44 PÁG · AYER", cover: "url('/mockups/cover_codigo.png') center/cover" },
  { title: "Diario personal", meta: "83 PÁG · 22 JUN", cover: "url('/mockups/cover_diario.png') center/cover" },
  { title: "Notas de Arquitectura", meta: "1 PÁG · 20 JUN", cover: "url('/mockups/cover_arquitectura.png') center/cover" },
];

function StatCell({ value, label, accent }: { value: string; label: string; accent?: boolean }) {
  return (
    <div className="flex flex-col items-center">
      <span
        className="font-[family-name:var(--font-serif)] text-[20px] leading-[23px]"
        style={accent ? { color: "var(--color-star)", fontStyle: "italic" } : { color: "var(--surface-ink)" }}
      >
        {value}
      </span>
      <span className="mt-[3px] font-[family-name:var(--font-pixel)] text-[10px] uppercase leading-[11px] tracking-[0.16em] text-mockup-ink-ghost">
        {label}
      </span>
    </div>
  );
}

const StatDivider = () => <span className="h-[24px] w-px bg-mockup-panel" />;

export function useSyncedAnimationDelay() {
  const [delay, setDelay] = useState("0s");
  useEffect(() => {
    setDelay(`-${Date.now() % 11000}ms`);
  }, []);
  return delay;
}

/**
 * Comet that travels once around a rounded border then rests — a faithful port
 * of breathingAccentBorder.kt (used by the recent-diary cards AND the Enfoque
 * pill). Drawn as an SVG stroke so it follows the real rounded-rect path; the
 * dash + glow are animated in CSS (see globals.css).
 */
function BreathingBorder({
  w,
  h,
  radius,
  stroke = 2,
}: {
  w: number;
  h: number;
  radius: number;
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

export function HomeMockup({ active = true }: { active?: boolean }) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  // Scale the fixed 1280×800 design canvas to the frame width. We measure from
  // observer callbacks (never synchronously in the effect body). The section
  // uses content-visibility:auto, which can suppress the ResizeObserver until
  // it's rendered, so an IntersectionObserver re-measures once it scrolls in.
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

  // Close the sheet whenever this screen leaves the carousel (adjust state
  // during render — React's recommended pattern for reacting to a prop change).
  const [wasActive, setWasActive] = useState(active);
  if (wasActive !== active) {
    setWasActive(active);
    if (!active) setSheetOpen(false);
  }

  return (
    <div
      ref={rootRef}
      className="absolute inset-0 overflow-hidden bg-cosmos-void font-[family-name:var(--font-sans)] text-mockup-ink"
    >
      {/* Twinkling starfield — 1:1 port of StarfieldBackground.kt */}
      <MockupStarfield active={active} className="absolute inset-0 h-full w-full opacity-80" />

      {/* Fixed 1280×800 design canvas, scaled to fill the frame width. */}
      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{
          width: DESIGN_W,
          height: DESIGN_H,
          transform: `scale(${scale})`,
          visibility: scale ? "visible" : "hidden",
        }}
      >
        {/* Avatar removed — now in NavRail */}

        {/* Centered banner */}
        <div className="flex flex-col items-center pl-[60px] pr-6 pt-6 text-center">
          <p className="font-[family-name:var(--font-pixel)] text-[12px] tracking-[0.28em] text-star/85">
            ✦ STARS ALIKE ✦
          </p>
          <h3 className="mt-4 font-[family-name:var(--font-serif)] text-[30px] font-light leading-[31px] text-mockup-ink">
            Buenas tardes
          </h3>
          <p className="shimmer-accent mt-2 max-w-[280px] font-[family-name:var(--font-sans)] text-[14px] italic" style={{ animationDelay: useSyncedAnimationDelay() }}>
            Pequeño bloque, gran historia.
          </p>

          {/* Stats pill */}
          <div className="mt-[22px] flex items-center gap-[14px] rounded-full border-[0.5px] border-mockup-hairline bg-cosmos-void/40 px-[18px] py-[10px] backdrop-blur-sm">
            <StatCell value="8" label="DIARIOS" />
            <StatDivider />
            <StatCell value="138" label="PALABRAS" />
            <StatDivider />
            <StatCell value="24" label="ESTA SEMANA" />
            <StatDivider />
            <StatCell value="4" label="DÍAS SEGUIDOS" accent />
          </div>
        </div>

        {/* Recent diaries header */}
        <div className="mt-[26px] flex items-center pl-[84px] pr-6">
          <span className="font-[family-name:var(--font-pixel)] text-[12px] tracking-[0.25em] text-mockup-ink-ghost">
            ÚLTIMOS DIARIOS
          </span>
          <span className="ml-[10px] h-px flex-1 bg-mockup-panel" />
        </div>

        {/* Recent diaries row (overflows, clipped by the frame like the app) */}
        <div className="mt-5 flex gap-[14px] pl-[84px] pr-6">
          {DIARIES.map((d) => (
            <button
              key={d.title}
              className="group relative h-[220px] w-[160px] shrink-0 overflow-hidden rounded-[14px] bg-cosmos-smoke text-left transition-transform duration-300 hover:-translate-y-1"
            >
              <span className="absolute inset-0" style={{ background: d.cover }} />
              <span className="absolute inset-x-0 bottom-0 h-[110px]" style={{ background: BOTTOM_WASH }} />
              <span className="absolute inset-x-[14px] bottom-[14px] flex flex-col">
                <span className="line-clamp-2 font-[family-name:var(--font-serif)] text-[16px] font-normal leading-[19px] text-white">
                  {d.title}
                </span>
                <span className="mt-1 font-[family-name:var(--font-pixel)] text-[10px] uppercase tracking-wide text-white/65">
                  {d.meta}
                </span>
              </span>
              <BreathingBorder w={160} h={220} radius={14} />
            </button>
          ))}
        </div>

        {/* Continue writing — warm paper card, ~half width (isWide branch) */}
        <div className="mx-auto mt-7 w-[640px] max-w-full px-6">
          <button className="paper-grain group block w-full rounded-[14px] px-4 py-4 text-left shadow-[0_16px_40px_rgba(0,0,0,0.5)]">
            <span className="flex items-center gap-2">
              <span className="breathe-dot h-1.5 w-1.5 rounded-full bg-star shadow-[0_0_8px_var(--color-star)]" />
              <span className="font-[family-name:var(--font-pixel)] text-[10.5px] tracking-[0.2em] text-paper-ink-soft/80">
                CONTINUAR ESCRIBIENDO
              </span>
            </span>
            <span className="mt-[10px] block text-center font-[family-name:var(--font-serif)] text-[20px] italic leading-[23px] text-paper-ink">
              Página 7
            </span>
            <span className="mt-3 block border-t border-dashed border-paper-ink/25 pt-[10px]" />
            <span className="flex items-center justify-between">
              <span className="truncate font-[family-name:var(--font-pixel)] text-[11px] uppercase text-paper-ink-soft/45">
                Animales vistos en el bosque · hoy · 12:18
              </span>
              <span
                className="ml-3 flex shrink-0 items-center gap-0.5 font-[family-name:var(--font-sans)] text-[12px] font-semibold"
                style={{ color: TEAL }}
              >
                Retomar
                <svg className="transition-transform duration-200 group-hover:translate-x-0.5" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </span>
          </button>
        </div>

        {/* Focus pill, bottom-left — StudyTimerCard.kt collapsed entry */}
        <button className="absolute bottom-6 left-[84px] z-20 flex h-[56px] w-[148px] items-center gap-2 overflow-hidden rounded-full bg-cosmos-smoke px-5 shadow-[0_10px_28px_rgba(0,0,0,0.5)] transition-transform active:scale-95">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-star">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7.5V12l3 1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-[family-name:var(--font-serif)] text-[14px] font-medium text-mockup-ink-soft">
            Enfoque
          </span>
          <BreathingBorder w={148} h={56} radius={28} />
        </button>

        {/* Quick note FAB, bottom-right */}
        <button
          onClick={() => setSheetOpen(true)}
          className="absolute bottom-6 right-6 z-20 flex items-center gap-2 rounded-2xl bg-star px-[18px] py-3 text-[14px] font-medium text-cosmos-void shadow-[0_10px_32px_rgba(0,0,0,0.5)] transition-transform hover:scale-[1.03] active:scale-95"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Nota rápida
        </button>

        {/* Quick-note sheet (opens from the FAB) */}
        {sheetOpen && (
          <div className="absolute inset-0 z-40 flex items-end" role="dialog" aria-label="Nota rápida">
            <button
              aria-label="Cerrar"
              onClick={() => setSheetOpen(false)}
              className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
            />
            <div className="sheet-up relative w-full rounded-t-3xl bg-cosmos-fog px-6 pb-10 pt-3 shadow-[0_-20px_60px_rgba(0,0,0,0.6)]">
              <div className="mx-auto h-1 w-10 rounded-full bg-mockup-panel" />
              <p className="mt-5 font-[family-name:var(--font-serif)] text-[18px] font-semibold text-mockup-ink">
                Nota rápida
              </p>
              <button
                onClick={() => setSheetOpen(false)}
                className="mt-5 h-[52px] w-full rounded-xl bg-white text-[15px] font-bold text-black transition-transform active:scale-[0.99]"
              >
                Crear diario rápido
              </button>
              <p className="mt-5 font-[family-name:var(--font-sans)] text-[12px] font-medium text-mockup-ink-ghost">
                Elegir existente
              </p>
              <div className="no-scrollbar mt-[10px] flex gap-[10px] overflow-x-auto">
                {DIARIES.slice(0, 6).map((d) => (
                  <div
                    key={d.title}
                    className="relative h-[130px] w-[100px] shrink-0 overflow-hidden rounded-xl border border-mockup-hairline"
                  >
                    <span className="absolute inset-0" style={{ background: d.cover }} />
                    <span className="absolute inset-x-0 bottom-0 h-[60px]" style={{ background: "linear-gradient(to bottom, transparent, rgba(5,5,5,0.93))" }} />
                    <span className="absolute inset-x-2 bottom-2 line-clamp-2 font-[family-name:var(--font-serif)] text-[11px] font-semibold leading-tight text-white">
                      {d.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
