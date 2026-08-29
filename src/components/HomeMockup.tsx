"use client";

import { useEffect, useId, useRef, useState } from "react";
import MockupStarfield from "./MockupStarfield";
import { mockupCover } from "@/lib/assets";

const DESIGN_W = 1280;
const DESIGN_H = 800;

/**
 * The app's landscape-tablet "Inicio" screen. The UI is laid out on a fixed
 * 1280×800 (16:10) design canvas and scaled to the frame so the proportions
 * match the Android tablet layout at every landing-page size.
 *
 * Accent follows the global --color-star (themeable). Interactive: the cozy
 * line shimmers, diary borders breathe, the "Nota rápida" FAB opens the
 * quick-note sheet, and buttons/cards respond to hover/press.
 */

const TEAL = "#176B62"; // fixed "Retomar" color from the app (not the accent)

const BOTTOM_WASH =
  "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(5,5,5,0.9) 100%)";

type Diary = {
  title: string;
  meta: string;
  cover: string;
  selected?: boolean;
};

const DIARIES: Diary[] = [
  { title: "Historias", meta: "3 PÁG · HOY", cover: mockupCover("cover_historias.png") },
  { title: "Tecnología", meta: "9 PÁG · 23 AGO", cover: mockupCover("cover_codigo.png") },
  { title: "Aplicación", meta: "5 PÁG · 20 AGO", cover: mockupCover("cover_diario.png"), selected: true },
  { title: "mods mine", meta: "6 PÁG · 19 AGO", cover: mockupCover("cover_inolvidable.png") },
  { title: "Arreglar app", meta: "7 PÁG · 18 AGO", cover: mockupCover("forest.png") },
  { title: "Compras", meta: "3 PÁG · 16 AGO", cover: mockupCover("cover_compras.png") },
  { title: "Matemáticas", meta: "1 PÁG · 15 AGO", cover: mockupCover("cover_arquitectura.png") },
];

function StatCell({ value, label, accent }: { value: string; label: string; accent?: boolean }) {
  return (
    <div className="flex flex-col items-center">
      <span
        className="font-[family-name:var(--font-serif)] text-[22px] leading-[24px]"
        style={accent ? { color: "var(--color-star)", fontStyle: "italic" } : { color: "var(--surface-ink)" }}
      >
        {value}
      </span>
      <span className="mt-[5px] font-[family-name:var(--font-pixel)] text-[10px] uppercase leading-[11px] tracking-[0.2em] text-mockup-ink-ghost">
        {label}
      </span>
    </div>
  );
}

const StatDivider = () => <span className="mx-[18px] h-[34px] w-px bg-mockup-panel" />;

export function useSyncedAnimationDelay() {
  const id = useId();
  const offset = Array.from(id).reduce(
    (total, character) => total + character.charCodeAt(0),
    0,
  );
  return `-${(offset * 997) % 11000}ms`;
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
  const [focusOpen, setFocusOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  const cozyDelay = useSyncedAnimationDelay();

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
    if (!active) {
      setSheetOpen(false);
      setFocusOpen(false);
    }
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
        {/* Greeting and tablet-wide stats */}
        <header className="absolute left-[108px] right-[32px] top-[38px] h-[124px]">
          <div>
            <p className="font-[family-name:var(--font-pixel)] text-[12px] tracking-[0.28em] text-mockup-ink-soft">
              MIÉRCOLES <span className="text-star">· 26 DE AGOSTO</span>
            </p>
            <h3 className="mt-[14px] font-[family-name:var(--font-serif)] text-[48px] font-light leading-none tracking-[-0.035em] text-mockup-ink">
              Buenas <span className="italic text-star">tardes</span>
            </h3>
            <p
              className="shimmer-accent mt-[16px] font-[family-name:var(--font-serif)] text-[17px] italic"
              style={{ animationDelay: cozyDelay }}
            >
              Si no lo escribes, ¿de verdad pasó?
            </p>
          </div>

          <div className="absolute right-0 top-[42px] flex items-center">
            <StatCell value="10" label="DIARIOS" />
            <StatDivider />
            <StatCell value="789" label="PALABRAS" />
            <StatDivider />
            <StatCell value="41" label="PÁGINAS" />
          </div>
        </header>

        {/* Recent diaries header */}
        <div className="absolute left-[108px] right-[32px] top-[181px] flex items-center">
          <span className="font-[family-name:var(--font-pixel)] text-[12px] tracking-[0.25em] text-mockup-ink-ghost">
            ÚLTIMOS DIARIOS
          </span>
          <span className="ml-[18px] font-[family-name:var(--font-pixel)] text-[12px] tracking-[0.22em] text-star">
            VER TODOS →
          </span>
          <span className="ml-[18px] h-px flex-1 bg-mockup-panel" />
        </div>

        {/* Recent diaries row (overflows, clipped exactly like the tablet app) */}
        <div className="absolute left-[108px] top-[210px] flex gap-[16px]">
          {DIARIES.map((d) => (
            <button
              key={d.title}
              aria-label={`Abrir diario ${d.title}`}
              className={`group relative h-[214px] w-[158px] shrink-0 overflow-hidden rounded-[16px] border bg-cosmos-smoke text-left transition-transform duration-300 hover:-translate-y-1 ${
                d.selected
                  ? "border-star/70 shadow-[0_0_24px_color-mix(in_srgb,var(--color-star)_18%,transparent)]"
                  : "border-star/35"
              }`}
            >
              <span className="absolute inset-0" style={{ background: d.cover }} />
              <span className="absolute inset-x-0 bottom-0 h-[110px]" style={{ background: BOTTOM_WASH }} />
              <span className="absolute inset-x-[14px] bottom-[14px] flex flex-col">
                <span className="line-clamp-2 font-[family-name:var(--font-serif)] text-[17px] font-normal leading-[19px] text-white">
                  {d.title}
                </span>
                <span className="mt-1 font-[family-name:var(--font-pixel)] text-[10px] uppercase tracking-wide text-white/65">
                  {d.meta}
                </span>
              </span>
              {d.selected && <BreathingBorder w={158} h={214} radius={16} />}
            </button>
          ))}
        </div>

        <div className="absolute left-[108px] right-[32px] top-[451px] flex items-center">
          <span className="font-[family-name:var(--font-pixel)] text-[12px] tracking-[0.25em] text-mockup-ink-ghost">
            CONTINUAR ESCRIBIENDO
          </span>
          <span className="ml-[18px] h-px flex-1 bg-mockup-panel" />
        </div>

        {/* Wide tablet dashboard: writing card + two utility cards */}
        <div className="absolute left-[108px] right-[32px] top-[480px] grid grid-cols-[1.65fr_1fr] gap-[20px]">
          <button className="paper-grain group h-[154px] rounded-[18px] px-[18px] py-[18px] text-left shadow-[0_16px_40px_rgba(0,0,0,0.45)]">
            <span className="flex items-center gap-2">
              <span className="breathe-dot h-1.5 w-1.5 rounded-full bg-star shadow-[0_0_8px_var(--color-star)]" />
              <span className="font-[family-name:var(--font-pixel)] text-[10.5px] tracking-[0.22em] text-paper-ink-soft/75">
                CONTINUAR ESCRIBIENDO
              </span>
            </span>
            <span className="mt-[18px] block text-center font-[family-name:var(--font-serif)] text-[22px] italic leading-[24px] text-paper-ink">
              Página sin título
            </span>
            <span className="mt-[16px] block border-t border-dashed border-paper-ink/20" />
            <span className="mt-[13px] flex items-center justify-between">
              <span className="truncate font-[family-name:var(--font-pixel)] text-[10px] uppercase tracking-[0.12em] text-paper-ink-soft/40">
                HISTORIAS · HOY · 12:51
              </span>
              <span
                className="ml-3 flex shrink-0 items-center gap-1 font-[family-name:var(--font-sans)] text-[12px] font-semibold"
                style={{ color: TEAL }}
              >
                Retomar
                <svg className="transition-transform duration-200 group-hover:translate-x-0.5" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </span>
          </button>

          <div className="flex flex-col gap-[16px]">
            <button onClick={() => setFocusOpen(true)} className="group relative h-[108px] overflow-hidden rounded-[18px] bg-cosmos-smoke px-[20px] text-left shadow-[0_14px_34px_rgba(0,0,0,0.34)] transition-transform hover:-translate-y-0.5">
              <span className="font-[family-name:var(--font-pixel)] text-[10px] tracking-[0.22em] text-star">
                MODO ENFOQUE
              </span>
              <span className="mt-[14px] block font-[family-name:var(--font-serif)] text-[22px] leading-none text-mockup-ink">
                Controla tu tiempo
              </span>
              <span className="mt-[11px] block font-[family-name:var(--font-pixel)] text-[9px] tracking-[0.14em] text-mockup-ink-ghost">
                POMODORO · CONTROL Y TRAZABILIDAD DEL TIEMPO
              </span>
              <span className="absolute right-[20px] top-1/2 flex h-[42px] w-[42px] -translate-y-1/2 items-center justify-center rounded-full bg-white/[0.08] text-mockup-ink-soft transition-transform group-hover:scale-105">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="8.5" />
                  <path d="M12 7.5V12l3 1.8" />
                </svg>
              </span>
            </button>

            <button
              onClick={() => setSheetOpen(true)}
              className="group relative h-[112px] overflow-hidden rounded-[18px] bg-star px-[20px] text-left text-cosmos-void shadow-[0_16px_36px_rgba(0,0,0,0.4)] transition-transform hover:-translate-y-0.5 active:scale-[0.99]"
            >
              <span className="font-[family-name:var(--font-pixel)] text-[10px] tracking-[0.22em] opacity-65">
                CAPTURA AL VUELO
              </span>
              <span className="mt-[14px] block font-[family-name:var(--font-serif)] text-[23px] leading-none">
                Nota rápida
              </span>
              <span className="mt-[10px] block font-[family-name:var(--font-serif)] text-[14px] italic opacity-70">
                Una idea, una frase, antes de que se escape.
              </span>
              <span className="absolute right-[20px] top-1/2 flex h-[42px] w-[42px] -translate-y-1/2 items-center justify-center rounded-full bg-black/10 text-[24px] transition-transform group-hover:rotate-90">
                +
              </span>
            </button>
          </div>
        </div>

        {/* Quick-note sheet (opens from the FAB) */}
        {sheetOpen && (
          <div className="absolute inset-0 z-40 flex items-end justify-center pb-[28px]" role="dialog" aria-label="Nota rápida">
            <button
              aria-label="Cerrar"
              onClick={() => setSheetOpen(false)}
              className="absolute inset-0 bg-black/62 backdrop-blur-[2px]"
            />
            <div className="sheet-up relative w-[620px] overflow-hidden rounded-[26px] border border-white/[0.06] bg-[#07070c] px-[24px] pb-[24px] pt-[13px] shadow-[0_24px_80px_rgba(0,0,0,0.72)]">
              <div className="mx-auto h-[4px] w-[40px] rounded-full bg-white/30" />
              <p className="mt-[17px] flex items-center gap-[12px] font-[family-name:var(--font-serif)] text-[21px] font-semibold text-mockup-ink">
                <span className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-star/15 text-star">✦</span>
                Nota rápida
              </p>
              <button
                onClick={() => setSheetOpen(false)}
                className="mt-[18px] flex h-[68px] w-full items-center rounded-[16px] border border-mockup-hairline bg-white/[0.055] px-[15px] text-left transition-transform active:scale-[0.99]"
              >
                <span className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-star text-[25px] text-cosmos-void">+</span>
                <span className="ml-[14px]">
                  <span className="block font-[family-name:var(--font-serif)] text-[17px] font-semibold text-mockup-ink">Crear diario rápido</span>
                  <span className="mt-[3px] block text-[12px] text-mockup-ink-ghost">Una página en blanco, lista para escribir</span>
                </span>
                <span className="ml-auto text-[24px] text-mockup-ink-ghost">›</span>
              </button>
              <p className="mt-[18px] text-[12px] font-medium text-mockup-ink-ghost">
                O en un diario reciente
              </p>
              <div className="no-scrollbar mt-[10px] flex gap-[10px] overflow-x-hidden">
                {DIARIES.slice(0, 6).map((d) => (
                  <div
                    key={d.title}
                    className="relative h-[136px] w-[100px] shrink-0 overflow-hidden rounded-[13px] border border-mockup-hairline"
                  >
                    <span className="absolute inset-0" style={{ background: d.cover }} />
                    <span className="absolute inset-x-0 bottom-0 h-[60px]" style={{ background: "linear-gradient(to bottom, transparent, rgba(5,5,5,0.93))" }} />
                    <span className="absolute right-[7px] top-[7px] flex h-[18px] w-[18px] items-center justify-center rounded-full bg-black/55 text-[13px] text-white">+</span>
                    <span className="absolute inset-x-[9px] bottom-[8px] line-clamp-2 font-[family-name:var(--font-serif)] text-[11px] font-semibold leading-tight text-white">
                      {d.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {focusOpen && (
          <div className="absolute inset-0 z-40 flex items-center justify-center" role="dialog" aria-label="Modo enfoque">
            <button aria-label="Cerrar" onClick={() => setFocusOpen(false)} className="absolute inset-0 bg-black/72 backdrop-blur-[2px]" />
            <div className="sheet-up relative w-[370px] rounded-[24px] border border-star/30 bg-[#090914] px-[24px] pb-[22px] pt-[22px] shadow-[0_24px_80px_rgba(0,0,0,0.78)]">
              <div className="mx-auto flex w-[210px] rounded-[15px] bg-white/[0.055] p-[3px] text-center text-[13px] font-semibold">
                <span className="flex-1 rounded-[12px] bg-star py-[10px] text-cosmos-void">Enfoque</span>
                <span className="flex-1 py-[10px] text-mockup-ink-soft">Descanso</span>
              </div>
              <p className="mt-[20px] text-center font-[family-name:var(--font-pixel)] text-[10px] tracking-[0.18em] text-star">Tiempo por ciclo de enfoque</p>

              <div className="relative mx-auto mt-[8px] h-[280px] w-[280px]">
                <svg className="absolute inset-0" viewBox="0 0 280 280" aria-hidden>
                  <circle cx="140" cy="140" r="98" fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="24" strokeDasharray="460 156" strokeLinecap="round" transform="rotate(134 140 140)" />
                  <circle cx="140" cy="140" r="98" fill="none" stroke="var(--color-star)" strokeWidth="20" strokeDasharray="182 434" strokeLinecap="round" transform="rotate(134 140 140)" className="drop-shadow-[0_0_10px_var(--color-star)]" />
                  <circle cx="85" cy="61" r="13" fill="white" stroke="var(--color-star)" strokeWidth="7" />
                </svg>
                <span className="absolute inset-0 flex flex-col items-center justify-center pt-[18px]">
                  <span className="font-[family-name:var(--font-serif)] text-[78px] font-light leading-none text-white">25</span>
                  <span className="mt-[8px] text-[15px] text-star">min</span>
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span>
                  <span className="block text-[13px] font-semibold text-mockup-ink">Encadenar fases</span>
                  <span className="mt-[5px] block text-[11px] text-mockup-ink-ghost">Inicia la siguiente fase sola</span>
                </span>
                <span className="flex h-[30px] w-[52px] items-center justify-end rounded-full bg-star p-[3px]"><i className="h-[24px] w-[24px] rounded-full bg-[#090914]" /></span>
              </div>
              <button onClick={() => setFocusOpen(false)} className="mt-[22px] h-[49px] w-full rounded-[13px] bg-star font-[family-name:var(--font-serif)] text-[17px] font-semibold text-cosmos-void">Iniciar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
