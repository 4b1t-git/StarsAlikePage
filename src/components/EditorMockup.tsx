"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";

type ViewState = "arbol" | "abril";

const CAPTURE = "/mockups/tablet-editor-real-display.webp";

function SidebarOverlay({
  view,
}: {
  view: ViewState;
}) {
  const isArbol = view === "arbol";

  return (
    <div className="pointer-events-none absolute inset-0 z-10 font-[family-name:var(--font-pixel)]">
      {!isArbol ? (
        <div className="absolute left-[11.45%] top-[4.25%] flex h-[3.1%] w-[13.2%] items-center bg-[#050505] text-[0.77cqw] tracking-[0.16em] text-white/60">
          PÁGINA DE&nbsp;<span className="text-[#b392e6]">PERSONAJES</span>
        </div>
      ) : null}

      <span className="absolute left-[20.55%] top-[43.45%] flex h-[3.55%] w-[4.05%] items-center justify-end bg-[#050505] pr-[0.2%] font-[family-name:var(--font-serif)] text-[0.9cqw] text-white/78">
        22 jun
      </span>
      <span className="absolute left-[22.55%] top-[50.25%] flex h-[2.8%] w-[2.05%] items-center justify-end bg-[#050505] pr-[0.2%] font-[family-name:var(--font-serif)] text-[0.9cqw] text-white/78">
        {isArbol ? "127" : "17"}
      </span>
      <span className="absolute left-[22.55%] top-[56.55%] flex h-[2.8%] w-[2.05%] items-center justify-end bg-[#050505] pr-[0.2%] font-[family-name:var(--font-serif)] text-[0.9cqw] text-white/78">
        {isArbol ? "3" : "0"}
      </span>

      <div className="absolute left-[7.55%] top-[67.15%] flex h-[5.75%] w-[16.85%] items-center justify-between rounded-[0.38cqw] border border-white/[0.09] bg-[#111112] px-[0.72%] font-[family-name:var(--font-serif)] text-[0.88cqw] text-white/58">
        <span className="flex items-center gap-[0.48cqw]">
          <span className="h-[0.45cqw] w-[0.45cqw] rounded-full bg-[#78bd9d]" />
          {isArbol ? "#Historia" : "#personajes"}
        </span>
        <svg className="h-[0.72cqw] w-[0.72cqw] text-white/32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
          <path d="m18 6-12 12M6 6l12 12" />
        </svg>
      </div>

      {!isArbol ? (
        <span className="absolute left-[21.8%] top-[10.15%] font-mono text-[0.72cqw] text-[#b392e6]">1</span>
      ) : null}
    </div>
  );
}

function ArbolPage({ setView }: { setView: (view: ViewState) => void }) {
  const abrilLink = (label: string) => (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        setView("abril");
      }}
      className="font-medium text-[#b392e6] decoration-[#b392e6]/45 underline-offset-[0.35cqw] hover:underline"
    >
      {label}
    </button>
  );

  return (
    <div className="absolute left-[28.05%] right-[3.2%] top-[3.25%] bottom-[14.95%] z-20 overflow-hidden paper-grain">
      <div className="mx-auto h-full w-[86%] overflow-hidden pb-[3cqw] pt-[1.15cqw] text-paper-ink">
        <h1 className="mb-[2.8cqw] text-center font-[family-name:var(--font-serif)] text-[3.45cqw] font-light italic leading-none">
          El árbol
        </h1>
        <div className="flex flex-col gap-[3.25cqw] font-[family-name:var(--font-serif)] text-[1.25cqw] leading-[2.18]">
          <div className="flex gap-[1.1cqw]">
            <span className="mt-[0.4cqw] shrink-0 select-none font-mono text-[0.9cqw] text-paper-ink/28">=</span>
            <p className="flex-1 text-justify">
              Entonces, yo estaba en el bosque leyendo, cuando de pronto {abrilLink("abril")} fue a la banca, en ese árbol donde tantos momentos pasé. Ella estaba tan tranquila, como si lo que yo hubiera vivido no fuera nada. Para ella, claro, no lo era, pero yo me sentía impotente; que una persona pudiera vivir tantas cosas, pasar por tanto y no dejar marca alguna.
            </p>
          </div>
          <div className="flex items-start gap-[1.1cqw] pl-[2.05cqw]">
            <span className="mt-[1.35cqw] h-px flex-1 bg-paper-ink/18" />
            <p className="w-[62%] shrink-0 text-justify">
              En ese entonces yo era alguien a quien admiraba, alguien que miraba a un futuro, que tenía potencial. Ahora sin más, {abrilLink("abril")} mira en mi dirección y solo ve... «¿Qué es lo que ves en mí, {abrilLink("abril")}?» pregunté. Ella, mientras sostenía una sonrisa que yo no podría mantener ni con todas mis fuerzas, contestó: «¿Qué cosa no podría ver en ti? Eres lo mejor que tengo».
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function AbrilPage({ setView }: { setView: (view: ViewState) => void }) {
  return (
    <div className="absolute left-[28.05%] right-[3.2%] top-[3.25%] bottom-[14.95%] z-20 overflow-hidden paper-grain">
      <div className="mx-auto h-full w-[86%] overflow-hidden pb-[3cqw] pt-[1.15cqw] text-paper-ink">
        <h1 className="mb-[2.8cqw] text-center font-[family-name:var(--font-serif)] text-[3.45cqw] font-light italic leading-none">abril</h1>
        <div className="flex gap-[1.1cqw] font-[family-name:var(--font-serif)] text-[1.25cqw] leading-[2.18]">
          <span className="mt-[0.4cqw] shrink-0 select-none font-mono text-[0.9cqw] text-paper-ink/28">=</span>
          <p className="flex-1 text-justify">
            Abril es una chica de pelo rubio cenizo y ojos castaños profundos, poseedora de una intuición casi sobrenatural para ver a través de las personas. A menudo se la encuentra leyendo bajo la sombra del viejo árbol, sumergida en sus pensamientos, creando una barrera invisible pero palpable. A pesar de su actitud tranquila y distante, hay una calidez oculta en ella que reserva solo para aquellos en quienes confía plenamente.
          </p>
        </div>

        <div className="mt-[6cqw] border-t border-paper-ink/10 pt-[1.6cqw]">
          <p className="mb-[1.4cqw] font-[family-name:var(--font-pixel)] text-[0.7cqw] uppercase tracking-[0.22em] text-paper-ink/38">Referencias</p>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setView("arbol");
            }}
            className="flex w-full items-center gap-[1cqw] rounded-[0.8cqw] bg-[#b392e6]/10 p-[1.1cqw] text-left ring-1 ring-[#b392e6]/20 transition-colors hover:bg-[#b392e6]/18"
          >
            <span className="flex h-[2.25cqw] w-[2.25cqw] items-center justify-center rounded-[0.55cqw] bg-[#b392e6]/20 text-[#b392e6]">↗</span>
            <span className="font-[family-name:var(--font-serif)]">
              <span className="block text-[1.25cqw] font-medium">El árbol</span>
              <span className="block text-[0.9cqw] italic text-paper-ink/48">Historias</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

function CapturedEditorScreen({
  view,
  setView,
}: {
  view: ViewState;
  setView: (view: ViewState) => void;
}) {
  return (
    <div
      className="relative aspect-[2800/1586] w-full overflow-hidden rounded-[1.35rem] bg-[#050505] sm:rounded-[1.55rem] [--color-star:#b392e6]"
      style={{ containerType: "inline-size" }}
    >
      <Image
        src={CAPTURE}
        alt=""
        fill
        sizes="(max-width: 1200px) 100vw, 1200px"
        className="pointer-events-none object-cover"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-[31.7%] z-[1] h-[11.1%] w-[0.75%] bg-[#050505]"
      />
      <SidebarOverlay view={view} />
      {view === "arbol" ? <ArbolPage setView={setView} /> : <AbrilPage setView={setView} />}
    </div>
  );
}

export default function EditorMockup() {
  const [view, setView] = useState<ViewState>("arbol");
  const transition = "transform 0.8s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1), filter 0.8s cubic-bezier(0.25, 1, 0.5, 1)";
  const isArbol = view === "arbol";
  const activeStyle: CSSProperties = {
    position: "absolute",
    inset: 0,
    transition,
    transform: "translate3d(0, 0, 0) scale(1)",
    opacity: 1,
    filter: "drop-shadow(0 40px 80px rgba(0,0,0,0.5))",
    zIndex: 10,
  };
  const inactiveStyle: CSSProperties = {
    ...activeStyle,
    transform: "translate3d(40%, 0, -200px) scale(0.85)",
    opacity: 0.7,
    filter: "none",
    zIndex: 0,
  };

  return (
    <div className="mx-auto mt-16 max-w-[1200px] overflow-hidden px-4 pb-24 sm:px-6 xl:overflow-visible">
      <div className="relative aspect-[2800/1586] w-full" style={{ perspective: "2000px", transformStyle: "preserve-3d" }}>
        <div onClick={() => { if (!isArbol) setView("arbol"); }} style={isArbol ? activeStyle : inactiveStyle}>
          <div className="rounded-[1.7rem] border border-white/12 bg-white/[0.045] p-1.5 sm:rounded-[2rem] sm:p-2">
            <CapturedEditorScreen view="arbol" setView={setView} />
          </div>
        </div>
        <div onClick={() => { if (isArbol) setView("abril"); }} style={!isArbol ? activeStyle : inactiveStyle}>
          <div className="rounded-[1.7rem] border border-white/12 bg-white/[0.045] p-1.5 sm:rounded-[2rem] sm:p-2">
            <CapturedEditorScreen view="abril" setView={setView} />
          </div>
        </div>
      </div>
    </div>
  );
}
