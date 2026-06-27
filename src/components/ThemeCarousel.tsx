"use client";

import { useEffect, useRef, useState } from "react";
import { HomeMockup } from "./HomeMockup";
import { AppMockup } from "./AppMockup";
import TabletFrame from "./TabletFrame";
import PhoneShowcase from "./PhoneShowcase";
import NavRail from "./NavRail";
import ConstellationMockup from "./ConstellationMockup";
import HistoryMockup from "./HistoryMockup";

const THEMES = [
  { id: "cyan", name: "Estelar", color: "#40E0D0" }, // default / brand
  { id: "ice", name: "Ice", color: "#6FA8FF" },
  { id: "coral", name: "Coral", color: "#FF9E6B" },
  { id: "lavender", name: "Lavender", color: "#B392E6" },
  { id: "aurora", name: "Aurora", color: "#4FD89B" },
] as const;

// App screens shown in the carousel. Add more here as they're built.
const SCREENS = [
  { id: "inicio", label: "Inicio", Component: HomeMockup },
  { id: "diarios", label: "Diarios", Component: AppMockup },
  { id: "constelacion", label: "Constelación", Component: ConstellationMockup },
  { id: "historia", label: "Historia", Component: HistoryMockup },
] as const;

/** Push an accent color into the global CSS variables that every `*-star`
 * utility and the custom CSS resolve, retheming the whole page at once. */
function applyAccent(hex: string) {
  const root = document.documentElement;
  root.style.setProperty("--color-star", hex);
  root.style.setProperty("--color-star-dim", `${hex}cc`);
  root.style.setProperty("--color-star-soft", `${hex}55`);
  root.style.setProperty("--color-star-ghost", `${hex}15`);
}

export default function ThemeCarousel() {
  const [activeTheme, setActiveTheme] = useState<string>(THEMES[0].id);
  const [index, setIndex] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [dir, setDir] = useState<"down" | "up">("down");
  const touchX = useRef<number | null>(null);

  // Enable smooth accent transitions only after mount (avoids a first-paint
  // color animation). The default theme matches the SSR colors, so no flash.
  useEffect(() => {
    document.documentElement.classList.add("theme-anim");
    return () => document.documentElement.classList.remove("theme-anim");
  }, []);

  // Drop the outgoing slide once its exit animation has finished.
  useEffect(() => {
    if (prev === null) return;
    const t = setTimeout(() => setPrev(null), 400);
    return () => clearTimeout(t);
  }, [prev, index]);

  function pick(id: string, color: string) {
    setActiveTheme(id);
    applyAccent(color);
  }

  // Navigate to a screen, slide direction mirrors the app: a later tab slides
  // down (new from the bottom), an earlier one slides up.
  function goTo(next: number) {
    if (next === index) return;
    setDir(next > index ? "down" : "up");
    setPrev(index);
    setIndex(next);
  }
  const step = (d: number) =>
    goTo((index + d + SCREENS.length) % SCREENS.length);

  function onTouchStart(e: React.TouchEvent) {
    touchX.current = e.touches[0]?.clientX ?? null;
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (touchX.current === null) return;
    const dx = (e.changedTouches[0]?.clientX ?? touchX.current) - touchX.current;
    if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1);
    touchX.current = null;
  }

  return (
    <section className="cv-auto relative border-y border-cosmos-fog/60 bg-cosmos-void/40 px-6 py-28 backdrop-blur-[2px] sm:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">VERSATILIDAD</p>
            <h2 className="mt-3 font-[family-name:var(--font-serif)] font-light text-4xl sm:text-6xl text-paper-bright leading-[1.05] text-balance">
              Hecho especialmente para
              <br />
              <span className="editorial-italic text-star">TABLET Y TELÉFONO MÓVIL.</span>
            </h2>
            <p className="mt-4 max-w-md text-paper-bright/65 leading-relaxed">
              Recorre la app y elige un color: el acento cambia en toda la
              página, no solo en la pantalla. Tu rincón, a tu manera.
            </p>
          </div>

          {/* Theme Toggles */}
          <div className="flex items-center gap-4">
            <span className="font-[family-name:var(--font-pixel)] text-xs tracking-[0.2em] text-paper-bright/60 uppercase">
              TEMAS:
            </span>
            <div className="flex gap-3">
              {THEMES.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => pick(theme.id, theme.color)}
                  aria-label={`Aplicar tema ${theme.name}`}
                  aria-pressed={activeTheme === theme.id}
                  className={`h-8 w-8 rounded-full transition-transform duration-300 hover:scale-110 active:scale-95 ${
                    activeTheme === theme.id
                      ? "ring-2 ring-white/80 ring-offset-2 ring-offset-cosmos-void scale-110"
                      : "ring-1 ring-white/20 opacity-60 hover:opacity-100"
                  }`}
                  style={{ backgroundColor: theme.color }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Tablet + Phone Container */}
        <div className="relative mx-auto w-full max-w-[1200px] mt-10">
          
          {/* Left arrow — absolutely positioned to the left of the tablet */}
          <button
            onClick={() => step(-1)}
            aria-label="Pantalla anterior"
            className="absolute top-1/2 -left-4 sm:-left-16 -translate-y-1/2 z-40 hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/15 bg-black/40 text-paper-bright backdrop-blur-md transition hover:border-star hover:text-star"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          {/* Right arrow — absolutely positioned to the right of the phone */}
          <button
            onClick={() => step(1)}
            aria-label="Pantalla siguiente"
            className="absolute top-1/2 -translate-y-1/2 z-40 hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/15 bg-black/40 text-paper-bright backdrop-blur-md transition hover:border-star hover:text-star sm:-right-[88px] lg:-right-[112px] xl:-right-[160px]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>

          {/* Tablet — carousel */}
          <div className="w-full">
            <TabletFrame>
            <div
              className="relative aspect-[16/10] w-full overflow-hidden rounded-[16px] bg-[#0A0A0A] sm:rounded-[22px]"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              {[index, prev].map((si, slot) => {
                if (si === null) return null;
                const { id, Component } = SCREENS[si];
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
                  <div
                    key={id}
                    aria-hidden={!isCurrent}
                    className={`absolute inset-0 ${anim} ${isCurrent ? "z-20" : "z-10"} ${
                      isCurrent ? "" : "pointer-events-none"
                    }`}
                  >
                    <Component active={isCurrent} />
                  </div>
                );
              })}

              {/* NavRail */}
              <NavRail activeIndex={index} />

              {/* Vignette */}
              <div className="pointer-events-none absolute inset-0 rounded-3xl shadow-[inset_0_0_80px_rgba(0,0,0,0.6)] z-30" />
            </div>
            </TabletFrame>
          </div>



          {/* Phone — absolutely positioned to the right side of the tablet */}
          <div className="hidden sm:block absolute bottom-0 -right-6 lg:-right-12 xl:-right-24 z-30 w-[240px] xl:w-[280px]">
            <PhoneShowcase screen={SCREENS[index].id} className="w-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]" />
          </div>

        </div>

        {/* Phone — mobile fallback (below tablet on small screens) */}
        <div className="mt-12 flex justify-center sm:hidden">
          <PhoneShowcase screen={SCREENS[index].id} className="w-[280px]" />
        </div>

        {/* Dots + active screen label */}
        <div className="mt-6 flex flex-col items-center justify-center gap-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {SCREENS.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => goTo(i)}
                  aria-label={`Ver ${s.label}`}
                  aria-current={i === index}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === index ? "w-6 bg-star" : "w-2 bg-white/25 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
            <span className="font-[family-name:var(--font-pixel)] text-xs tracking-[0.3em] uppercase text-paper-bright/55">
              {SCREENS[index].label} · 0{index + 1} / 0{SCREENS.length}
            </span>
          </div>
          
          <p className="max-w-2xl text-center font-[family-name:var(--font-pixel)] text-[11px] tracking-[0.15em] uppercase leading-relaxed text-paper-bright/35">
            Los mockups mostrados son representaciones interactivas para previsualizar el concepto de la app y no reflejan fielmente la estética final de la aplicación. Si te interesa la idea, visita{" "}
            <a href="#hero" className="text-star/60 underline underline-offset-2 hover:text-star transition-colors">Play Store</a>{" "}
            en el inicio de la página y regístrate para ser de los primeros en probarla.
          </p>
        </div>
      </div>
    </section>
  );
}
