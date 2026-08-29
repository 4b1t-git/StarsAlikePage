"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useIsPresent,
  useReducedMotion,
} from "motion/react";
import { HomeMockup } from "./HomeMockup";
import { AppMockup } from "./AppMockup";
import TabletFrame from "./TabletFrame";
import PhoneShowcase from "./PhoneShowcase";
import NavRail from "./NavRail";
import ConstellationMockup from "./ConstellationMockup";
import HistoryMockup from "./HistoryMockup";
import { ACCENT_PALETTES } from "@/lib/accentPalettes";

const THEMES = ACCENT_PALETTES;

// App screens shown in the carousel. Add more here as they're built.
const SCREENS = [
  { id: "inicio", label: "Inicio", Component: HomeMockup },
  { id: "diarios", label: "Diarios", Component: AppMockup },
  { id: "constelacion", label: "Constelación", Component: ConstellationMockup },
  { id: "historia", label: "Calendario", Component: HistoryMockup },
] as const;

type CarouselDirection = "down" | "up";
type ScreenTransition = {
  direction: CarouselDirection;
  reducedMotion: boolean;
};

const screenVariants = {
  enter: ({ direction, reducedMotion }: ScreenTransition) => ({
    opacity: 0,
    y: reducedMotion ? 0 : direction === "down" ? "8%" : "-8%",
  }),
  active: { opacity: 1, y: 0 },
  exit: ({ direction, reducedMotion }: ScreenTransition) => ({
    opacity: 0,
    y: reducedMotion ? 0 : direction === "down" ? "-8%" : "8%",
  }),
};

function CarouselScreen({
  screen,
  transition,
}: {
  screen: (typeof SCREENS)[number];
  transition: ScreenTransition;
}) {
  const isPresent = useIsPresent();
  const { Component } = screen;

  return (
    <motion.div
      aria-hidden={!isPresent}
      className={`absolute inset-0 ${
        isPresent ? "z-20" : "pointer-events-none z-10"
      }`}
      variants={screenVariants}
      custom={transition}
      initial="enter"
      animate="active"
      exit="exit"
      transition={
        transition.reducedMotion
          ? { duration: 0.12, ease: "linear" }
          : { duration: 0.38, ease: [0.4, 0, 0.2, 1] }
      }
    >
      <Component active={isPresent} />
    </motion.div>
  );
}

export default function ThemeCarousel() {
  const [activeTheme, setActiveTheme] = useState<string>(THEMES[0].id);
  const [surfaceStyle, setSurfaceStyle] = useState<"cosmos" | "cream">("cosmos");
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<CarouselDirection>("down");
  const shouldReduceMotion = useReducedMotion();
  const touchX = useRef<number | null>(null);

  // Follow the palette currently driving the page-wide choreography.
  useEffect(() => {
    const onActive = (event: Event) => {
      const detail = (event as CustomEvent<{ id?: string }>).detail;
      if (detail?.id) setActiveTheme(detail.id);
    };

    window.addEventListener("accent:active", onActive);
    return () => window.removeEventListener("accent:active", onActive);
  }, []);

  function pick(id: string, themeIndex: number) {
    setActiveTheme(id);
    window.dispatchEvent(
      new CustomEvent("accent:select", {
        detail: { id, index: themeIndex },
      }),
    );
  }

  // Navigate to a screen, slide direction mirrors the app: a later tab slides
  // down (new from the bottom), an earlier one slides up.
  function goTo(
    next: number,
    nextDirection: CarouselDirection = next > index ? "down" : "up",
  ) {
    if (next === index) return;
    setDirection(nextDirection);
    setIndex(next);
  }
  const step = (delta: -1 | 1) =>
    goTo(
      (index + delta + SCREENS.length) % SCREENS.length,
      delta > 0 ? "down" : "up",
    );

  function onTouchStart(e: React.TouchEvent) {
    touchX.current = e.touches[0]?.clientX ?? null;
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (touchX.current === null) return;
    const dx = (e.changedTouches[0]?.clientX ?? touchX.current) - touchX.current;
    if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1);
    touchX.current = null;
  }

  const screen = SCREENS[index];
  const screenTransition = {
    direction,
    reducedMotion: Boolean(shouldReduceMotion),
  } satisfies ScreenTransition;

  return (
    <section id="personalizacion" className="cv-auto relative border-y border-cosmos-fog/60 bg-cosmos-void/40 px-6 py-28 backdrop-blur-[2px] sm:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">EN CUALQUIER PANTALLA</p>
            <h2 className="mt-3 font-[family-name:var(--font-serif)] font-light text-4xl sm:text-6xl text-paper-bright leading-[1.05] text-balance">
              Tu espacio, en
              <br />
              <span className="editorial-italic text-star">tablet y teléfono.</span>
            </h2>
            <p className="mt-4 max-w-md text-paper-bright/65 leading-relaxed">
              Recorre sus espacios y elige un color. La interfaz se adapta a
              ti sin esconder la potencia que hay debajo.
            </p>
          </div>

          {/* Theme Toggles */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <span className="font-[family-name:var(--font-pixel)] text-xs tracking-[0.2em] text-paper-bright/60 uppercase w-16">
                ACENTO:
              </span>
              <div className="flex max-w-[19rem] flex-wrap gap-3">
                {THEMES.map((theme, themeIndex) => (
                  <button
                    key={theme.id}
                    onClick={() => pick(theme.id, themeIndex)}
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
            
            {/* Surface Toggles */}
            <div className="flex items-center gap-4">
              <span className="font-[family-name:var(--font-pixel)] text-xs tracking-[0.2em] text-paper-bright/60 uppercase w-16">
                ESTILO:
              </span>
              <div className="flex gap-3 font-[family-name:var(--font-sans)] text-sm">
                <button
                  onClick={() => setSurfaceStyle("cosmos")}
                  className={`px-4 py-1.5 rounded-full border transition-all ${
                    surfaceStyle === "cosmos" 
                      ? "bg-white text-black border-white" 
                      : "bg-transparent text-white/60 border-white/20 hover:text-white"
                  }`}
                >
                  Oscuro
                </button>
                <button
                  onClick={() => setSurfaceStyle("cream")}
                  className={`px-4 py-1.5 rounded-full border transition-all ${
                    surfaceStyle === "cream" 
                      ? "bg-white text-black border-white" 
                      : "bg-transparent text-white/60 border-white/20 hover:text-white"
                  }`}
                >
                  Claro
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tablet + Phone Container */}
        <div className={`mx-auto mt-10 w-full max-w-[1200px] mockup-${surfaceStyle}`}>
          <div className="relative w-full">
            {/* Carousel arrows stay vertically centered on the tablet. */}
            <button
              onClick={() => step(-1)}
              aria-label="Pantalla anterior"
              className="absolute top-1/2 -left-4 z-40 hidden h-12 w-12 -translate-y-1/2 shrink-0 items-center justify-center rounded-full border border-white/15 bg-black/40 text-paper-bright backdrop-blur-md transition hover:border-star hover:text-star sm:-left-16 sm:flex"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>

            <button
              onClick={() => step(1)}
              aria-label="Pantalla siguiente"
              className="absolute top-1/2 -right-4 z-40 hidden h-12 w-12 -translate-y-1/2 shrink-0 items-center justify-center rounded-full border border-white/15 bg-black/40 text-paper-bright backdrop-blur-md transition hover:border-star hover:text-star sm:-right-16 sm:flex"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>

            {/* Tablet — carousel */}
            <TabletFrame>
              <div
                className="relative aspect-[16/10] w-full overflow-hidden rounded-[16px] bg-cosmos-void sm:rounded-[22px]"
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
              >
                <AnimatePresence
                  initial={false}
                  mode="sync"
                  custom={screenTransition}
                >
                  <CarouselScreen
                    key={screen.id}
                    screen={screen}
                    transition={screenTransition}
                  />
                </AnimatePresence>

                {/* NavRail */}
                <NavRail activeIndex={index} />

                {/* Vignette */}
                <div className="pointer-events-none absolute inset-0 z-30 rounded-3xl shadow-[inset_0_0_80px_rgba(0,0,0,0.6)]" />
              </div>
            </TabletFrame>
          </div>

          {/* Phone — centered directly below the tablet on every breakpoint. */}
          <div className="mt-12 flex justify-center sm:mt-16">
            <PhoneShowcase
              screen={SCREENS[index].id}
              className="w-[280px] max-w-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
            />
          </div>
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
                  className="group flex h-4 w-4 items-center justify-center rounded-full"
                >
                  {i === index ? (
                    <motion.span
                      layoutId="active-carousel-screen"
                      className="h-2 w-6 shrink-0 rounded-full bg-star"
                      transition={
                        shouldReduceMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 500, damping: 35 }
                      }
                    />
                  ) : (
                    <span className="h-2 w-2 shrink-0 rounded-full bg-white/25 transition-colors duration-300 group-hover:bg-white/50" />
                  )}
                </button>
              ))}
            </div>
            <span className="font-[family-name:var(--font-pixel)] text-xs tracking-[0.3em] uppercase text-paper-bright/55">
              {SCREENS[index].label} · 0{index + 1} / 0{SCREENS.length}
            </span>
          </div>
          
          <p className="max-w-2xl text-center text-sm leading-6 text-paper-bright/60">
            Explora Inicio, Diarios, Constelación y Calendario. Cada pantalla
            comparte el mismo acento y conserva su propia forma de ayudarte a
            escribir, conectar y recordar.
          </p>
        </div>
      </div>
    </section>
  );
}
