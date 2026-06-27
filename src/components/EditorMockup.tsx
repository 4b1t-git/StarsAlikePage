"use client";

import { useState } from "react";
import TabletFrame from "./TabletFrame";

type ViewState = "arbol" | "abril";

function FloatingToolbar() {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex h-[52px] w-max max-w-full overflow-x-auto no-scrollbar items-center gap-1 rounded-[14px] bg-[#1A1A1A] px-3 shadow-[0_20px_40px_rgba(0,0,0,0.5)] font-[family-name:var(--font-sans)] text-white/70 ring-1 ring-white/10 transition-transform duration-500 hover:scale-[1.02]">
      <button className="h-9 px-3 hover:text-white transition-colors text-[13px]">H1</button>
      <button className="h-9 px-3 hover:text-white transition-colors text-[13px]">H2</button>
      <div className="w-[1px] h-6 bg-white/15 mx-1.5 shrink-0" />
      <button className="h-9 w-9 flex shrink-0 items-center justify-center hover:text-white transition-colors font-serif font-bold text-[15px]">B</button>
      <button className="h-9 w-9 flex shrink-0 items-center justify-center hover:text-white transition-colors font-serif italic text-[15px]">I</button>
      <button className="h-9 w-9 flex shrink-0 items-center justify-center hover:text-white transition-colors font-serif underline text-[15px]">U</button>
      <button className="h-9 w-9 flex shrink-0 items-center justify-center hover:text-white transition-colors font-serif line-through text-[15px]">S</button>
      <div className="w-[1px] h-6 bg-white/15 mx-1.5 shrink-0" />
      <button className="h-9 w-9 flex shrink-0 items-center justify-center hover:text-white transition-colors">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
      </button>
      <button className="h-9 w-9 flex shrink-0 items-center justify-center hover:text-white transition-colors">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><path d="M3 6h2v2H3z"/><path d="M3 12h2v2H3z"/><path d="M3 18h2v2H3z"/></svg>
      </button>
      <button className="h-9 w-9 flex shrink-0 items-center justify-center hover:text-white transition-colors">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
      </button>
      <div className="w-[1px] h-6 bg-white/15 mx-1.5 shrink-0" />
      <button className="h-9 w-9 flex shrink-0 items-center justify-center hover:text-white transition-colors">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="15" y2="12"/><line x1="3" y1="18" x2="18" y2="18"/></svg>
      </button>
      <button className="h-9 w-9 flex shrink-0 items-center justify-center bg-star-dim text-white rounded-[8px]">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="6" y1="12" x2="18" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></svg>
      </button>
      <button className="h-9 w-9 flex shrink-0 items-center justify-center hover:text-white transition-colors">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="9" y1="12" x2="21" y2="12"/><line x1="6" y1="18" x2="21" y2="18"/></svg>
      </button>
      <div className="w-[1px] h-6 bg-white/15 mx-1.5 shrink-0" />
      <button className="h-9 w-9 flex shrink-0 items-center justify-center hover:text-white transition-colors font-serif text-[20px]">”</button>
      <button className="h-9 w-9 flex shrink-0 items-center justify-center hover:text-white transition-colors font-mono text-[14px] font-bold">&lt;&gt;</button>
      <button className="h-9 w-9 flex shrink-0 items-center justify-center hover:text-white transition-colors">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/></svg>
      </button>
      <button className="h-9 w-9 flex shrink-0 items-center justify-center hover:text-white transition-colors">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
      </button>
      <button className="h-9 w-9 flex shrink-0 items-center justify-center hover:text-white transition-colors font-mono font-bold text-[16px]">/</button>
      <div className="w-[1px] h-6 bg-white/15 mx-1.5 shrink-0" />
      <button className="h-9 px-3 flex shrink-0 items-center justify-center hover:text-white transition-colors text-[14px] font-medium">Aa</button>
      <button className="h-9 px-3 flex shrink-0 items-center justify-center hover:text-white transition-colors">
        <span className="text-[15px] font-bold border-b-2 border-white leading-tight pb-[2px]">A</span>
      </button>
    </div>
  );
}

function ArbolContent({ setView }: { setView: (v: ViewState) => void }) {
  return (
    <div className="relative flex aspect-[16/10] w-full overflow-hidden rounded-[16px] sm:rounded-[22px] bg-[#050508]">
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      
      {/* LEFT SIDEBAR */}
      <div className="relative z-10 flex h-full w-[300px] shrink-0 font-[family-name:var(--font-sans)] text-white/80 bg-[#050508]">
        {/* Nav strip */}
        <div className="flex w-[48px] flex-col items-center py-6 relative">
          <div className="h-7 w-7 shrink-0 overflow-hidden rounded-full ring-1 ring-star/40 bg-[#0f0f13] z-10 mb-8 shadow-[0_0_15px_var(--color-star-soft)]">
            <span className="block h-full w-full bg-gradient-to-br from-star to-star-dim" />
          </div>
          <div className="relative flex flex-1 flex-col items-center justify-between py-10 w-full z-10">
            <div className="absolute top-0 bottom-0 w-[1px] bg-white/5 -z-10" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
            <div className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-star/10 ring-1 ring-star/30">
              <span className="h-1.5 w-1.5 rounded-full bg-star" />
            </div>
            <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
          </div>
        </div>

        {/* Sidebar content */}
        <div className="flex flex-1 flex-col py-8 pr-6 pl-2">
          <div className="flex items-center gap-2 text-[10px] font-[family-name:var(--font-pixel)] tracking-widest text-white/50">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/><path d="M14 3v5h5"/></svg>
            <span className="mt-0.5 whitespace-nowrap">PÁGINA DE <span className="text-star">HISTORIAS</span></span>
          </div>

          <div className="mt-10">
            <span className="mb-4 block text-[9px] font-[family-name:var(--font-pixel)] uppercase tracking-[0.25em] text-white/30">Acciones</span>
            <div className="flex flex-col gap-5 text-[12px] font-medium text-white/70">
              <button className="flex items-center justify-between hover:text-white transition-colors text-left w-full group">
                <span className="flex items-center gap-3">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                  Conexiones
                </span>
              </button>
              <button className="flex items-center gap-3 hover:text-white transition-colors text-left">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                Bóveda
              </button>
              <button className="flex items-center gap-3 hover:text-white transition-colors text-left">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
                Compartir
              </button>
              <button className="flex items-center gap-3 hover:text-white transition-colors text-left">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                Exportar PDF
              </button>
            </div>
          </div>

          <div className="my-8 h-[1px] w-full bg-white/10" />

          <div>
            <span className="mb-4 block text-[9px] font-[family-name:var(--font-pixel)] uppercase tracking-[0.25em] text-white/30">Información</span>
            <div className="flex flex-col gap-3 text-[12px] text-white/40">
              <div className="flex justify-between items-center">
                <span>Creada</span>
                <span className="text-white/80 font-mono text-[11px]">22 jun</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Palabras</span>
                <span className="text-white/80 font-mono text-[11px]">127</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Enlaces</span>
                <span className="text-white/80 font-mono text-[11px]">3</span>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-between mb-3">
              <span className="block text-[9px] font-[family-name:var(--font-pixel)] uppercase tracking-[0.25em] text-white/30">Etiquetas</span>
              <button className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-white/5 text-white/50 hover:bg-white/10 hover:text-white transition-colors">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center justify-between w-full rounded-lg bg-[#0F0F13]/80 backdrop-blur-sm border border-white/5 px-3 py-2 text-[12px] text-white/60">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-star" />
                  #Historia
                </div>
                <button className="text-white/20 hover:text-white/60 transition-colors">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* MAIN EDITOR AREA */}
      <div className="relative z-10 flex-1 p-3 pl-0 h-full">
        <div className="w-full h-full bg-[#F3F1E7] rounded-[18px] p-10 sm:p-14 overflow-hidden relative shadow-[-10px_0_40px_rgba(0,0,0,0.6)] flex flex-col items-center">
          
          <div className="absolute inset-0 pointer-events-none opacity-[0.25]"
            style={{
              backgroundImage: `linear-gradient(to right, #D8D4C7 1px, transparent 1px), linear-gradient(to bottom, #D8D4C7 1px, transparent 1px)`,
              backgroundSize: `12px 12px`
            }}
          />
          
          <div className="relative z-10 w-full max-w-[700px] h-full flex flex-col text-[#38352C] overflow-y-auto no-scrollbar">
            <h1 className="text-center font-[family-name:var(--font-serif)] text-[42px] italic font-light mb-14 text-[#26241C]">
              El árbol
            </h1>
            <div className="font-[family-name:var(--font-serif)] text-[14px] sm:text-[15px] leading-[2.2] flex flex-col gap-12 relative w-full">
              <div className="relative flex gap-4 w-full">
                <span className="text-[12px] text-[#26241C]/30 select-none mt-[6px] font-mono shrink-0">=</span>
                <p className="flex-1 text-justify">
                  Entonces, yo estaba en el bosque leyendo, cuando de pronto <span onClick={(e) => { e.stopPropagation(); setView("abril"); }} className="text-star font-medium cursor-pointer hover:underline underline-offset-4 decoration-star/40 transition-all">abril</span> fue a la banca, en ese árbol donde tantos momentos pasé. Ella estaba tan tranquila, como si lo que yo hubiera vivido no fuera nada. Para ella, claro, no lo era, pero yo me sentía impotente; que una persona pudiera vivir tantas cosas, pasar por tanto y no dejar marca alguna.
                </p>
              </div>
              <div className="relative flex w-full items-start gap-4 pl-[28px]">
                <div className="flex-1 mt-[18px]">
                  <div className="h-[1px] w-full bg-[#26241C]/20" />
                </div>
                <div className="w-[420px] shrink-0">
                  <p className="text-justify">
                    En ese entonces yo era alguien a quien admiraba, alguien que miraba a un futuro, que tenía potencial. Ahora sin más, <span onClick={(e) => { e.stopPropagation(); setView("abril"); }} className="text-star font-medium cursor-pointer hover:underline underline-offset-4 decoration-star/40 transition-all">abril</span> mira en mi dirección y solo ve... «¿Qué es lo que ves en mí, <span onClick={(e) => { e.stopPropagation(); setView("abril"); }} className="text-star font-medium cursor-pointer hover:underline underline-offset-4 decoration-star/40 transition-all">abril</span>?» pregunté. Ella, mientras sostenía una sonrisa que yo no podría mantener ni con todas mis fuerzas, contestó: «¿Qué cosa no podría ver en ti? Eres lo mejor que tengo».
                  </p>
                </div>
              </div>
            </div>
          </div>
          <FloatingToolbar />
        </div>
      </div>
    </div>
  );
}

function AbrilContent({ setView }: { setView: (v: ViewState) => void }) {
  return (
    <div className="relative flex aspect-[16/10] w-full overflow-hidden rounded-[16px] sm:rounded-[22px] bg-[#050508]">
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      
      {/* LEFT SIDEBAR */}
      <div className="relative z-10 flex h-full w-[300px] shrink-0 font-[family-name:var(--font-sans)] text-white/80 bg-[#050508]">
        {/* Nav strip */}
        <div className="flex w-[48px] flex-col items-center py-6 relative">
          <div className="h-7 w-7 shrink-0 overflow-hidden rounded-full ring-1 ring-star/40 bg-[#0f0f13] z-10 mb-8 shadow-[0_0_15px_var(--color-star-soft)]">
             <span className="block h-full w-full bg-gradient-to-br from-star to-star-dim" />
          </div>
          <div className="relative flex flex-1 flex-col items-center justify-between py-10 w-full z-10">
            <div className="absolute top-0 bottom-0 w-[1px] bg-white/5 -z-10" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
            <div className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-star/10 ring-1 ring-star/30">
              <span className="h-1.5 w-1.5 rounded-full bg-star" />
            </div>
            <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
          </div>
        </div>

        {/* Sidebar content */}
        <div className="flex flex-1 flex-col py-8 pr-6 pl-2">
          <div className="flex items-center gap-2 text-[10px] font-[family-name:var(--font-pixel)] tracking-widest text-white/50 cursor-pointer hover:text-white transition-colors" onClick={(e) => { e.stopPropagation(); setView("arbol"); }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/><path d="M14 3v5h5"/></svg>
            <span className="mt-0.5 whitespace-nowrap">PÁGINA DE <span className="text-star">PERSONAJES</span></span>
          </div>

          <div className="mt-10">
            <span className="mb-4 block text-[9px] font-[family-name:var(--font-pixel)] uppercase tracking-[0.25em] text-white/30">Acciones</span>
            <div className="flex flex-col gap-5 text-[12px] font-medium text-white/70">
              <button className="flex items-center justify-between hover:text-white transition-colors text-left w-full group">
                <span className="flex items-center gap-3">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                  Conexiones
                </span>
                <span className="text-star font-mono">1</span>
              </button>
              <button className="flex items-center gap-3 hover:text-white transition-colors text-left">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                Bóveda
              </button>
              <button className="flex items-center gap-3 hover:text-white transition-colors text-left">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
                Compartir
              </button>
              <button className="flex items-center gap-3 hover:text-white transition-colors text-left">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                Exportar PDF
              </button>
            </div>
          </div>

          <div className="my-8 h-[1px] w-full bg-white/10" />

          <div>
            <span className="mb-4 block text-[9px] font-[family-name:var(--font-pixel)] uppercase tracking-[0.25em] text-white/30">Información</span>
            <div className="flex flex-col gap-3 text-[12px] text-white/40">
              <div className="flex justify-between items-center">
                <span>Creada</span>
                <span className="text-white/80 font-mono text-[11px]">22 jun</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Palabras</span>
                <span className="text-white/80 font-mono text-[11px]">17</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Enlaces</span>
                <span className="text-white/80 font-mono text-[11px]">0</span>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-between mb-3">
              <span className="block text-[9px] font-[family-name:var(--font-pixel)] uppercase tracking-[0.25em] text-white/30">Etiquetas</span>
              <button className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-white/5 text-white/50 hover:bg-white/10 hover:text-white transition-colors">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center justify-between w-full rounded-lg bg-[#0F0F13]/80 backdrop-blur-sm border border-white/5 px-3 py-2 text-[12px] text-white/60">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-star" />
                  #personajes
                </div>
                <button className="text-white/20 hover:text-white/60 transition-colors">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <span className="mb-3 block text-[9px] font-[family-name:var(--font-pixel)] uppercase tracking-[0.25em] text-white/30">Referencias</span>
            <button onClick={(e) => { e.stopPropagation(); setView("arbol"); }} className="w-full flex items-center gap-2 rounded-lg bg-[#0F0F13]/80 backdrop-blur-sm border border-white/5 px-3 py-2.5 text-[12px] text-white/60 hover:bg-white/5 hover:text-white transition-colors group">
              <svg className="w-3.5 h-3.5 text-star opacity-70 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
              El árbol
            </button>
          </div>

        </div>
      </div>

      {/* MAIN EDITOR AREA */}
      <div className="relative z-10 flex-1 p-3 pl-0 h-full">
        <div className="w-full h-full bg-[#F3F1E7] rounded-[18px] p-10 sm:p-14 overflow-hidden relative shadow-[-10px_0_40px_rgba(0,0,0,0.6)] flex flex-col items-center">
          
          <div className="absolute inset-0 pointer-events-none opacity-[0.25]"
            style={{
              backgroundImage: `linear-gradient(to right, #D8D4C7 1px, transparent 1px), linear-gradient(to bottom, #D8D4C7 1px, transparent 1px)`,
              backgroundSize: `12px 12px`
            }}
          />
          
          <div className="relative z-10 w-full max-w-[700px] h-full flex flex-col text-[#38352C] overflow-y-auto no-scrollbar">
            <h1 className="text-center font-[family-name:var(--font-serif)] text-[42px] italic font-light mb-14 text-[#26241C]">
              abril
            </h1>
            <div className="font-[family-name:var(--font-serif)] text-[14px] sm:text-[15px] leading-[2.2] flex flex-col gap-12 relative w-full">
              <div className="relative flex gap-4 w-full">
                <span className="text-[12px] text-[#26241C]/30 select-none mt-[6px] font-mono shrink-0">=</span>
                <p className="flex-1 text-justify">
                  chica de pelo rubio ojos castaños la cual es muy buena viendo a travez de las personas
                </p>
              </div>
            </div>

            {/* Referencias al final de la página */}
            <div className="mt-24 w-full">
              <div className="text-[10px] tracking-[0.25em] uppercase font-[family-name:var(--font-pixel)] text-[#26241C]/40 mb-6 border-t border-[#26241C]/10 pt-6">Referencias</div>
              <button onClick={(e) => { e.stopPropagation(); setView("arbol"); }} className="flex items-center gap-4 w-full bg-star/10 ring-1 ring-star/20 rounded-xl p-4 hover:bg-star/20 hover:ring-star/40 shadow-sm transition-all text-left group">
                <div className="bg-star/20 p-2 rounded-lg group-hover:scale-110 transition-transform">
                  <svg className="text-star w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                </div>
                <div className="font-[family-name:var(--font-serif)]">
                  <div className="text-[#26241C] text-[16px] font-medium group-hover:text-star transition-colors leading-tight mb-0.5">El árbol</div>
                  <div className="text-[#26241C]/50 text-[12px] italic">Historias</div>
                </div>
              </button>
            </div>
          </div>
          <FloatingToolbar />
        </div>
      </div>
    </div>
  );
}

export default function EditorMockup() {
  const [view, setView] = useState<ViewState>("arbol");
  const isArbol = view === "arbol";

  return (
    <div className="mx-auto max-w-[1200px] px-4 sm:px-6 mt-16 pb-24 overflow-hidden xl:overflow-visible">
      
      <style>{`
        .tablet-3d-container {
          perspective: 2000px;
          transform-style: preserve-3d;
        }
        .tablet-card {
          transition: transform 0.8s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.8s ease, filter 0.8s ease;
          position: absolute;
          inset: 0;
          width: 100%;
          cursor: pointer;
          transform-origin: center left;
        }
        .tablet-active {
          transform: translate3d(0, 0, 0) scale(1);
          opacity: 1;
          filter: drop-shadow(0 40px 80px rgba(0,0,0,0.5));
        }
        .tablet-inactive {
          transform: translate3d(15%, 0, -200px) scale(0.85);
          opacity: 0.7;
          filter: drop-shadow(0 0px 0px rgba(0,0,0,0));
        }
        @media (min-width: 768px) {
          .tablet-inactive { transform: translate3d(35%, 0, -200px) scale(0.85); }
        }
        @media (min-width: 1280px) {
          .tablet-inactive { transform: translate3d(50%, 0, -200px) scale(0.85); }
        }
        .tablet-inactive:hover {
          opacity: 1;
        }
      `}</style>

      {/* Wrapper to maintain aspect ratio and containment */}
      <div className="relative w-full aspect-[16/10] tablet-3d-container">
        
        {/* Tablet: El árbol */}
        <div 
          onClick={() => { if (!isArbol) setView("arbol"); }}
          className={`tablet-card ${isArbol ? 'tablet-active' : 'tablet-inactive'}`}
        >
          <TabletFrame>
            <ArbolContent setView={setView} />
          </TabletFrame>
        </div>

        {/* Tablet: Abril */}
        <div 
          onClick={() => { if (isArbol) setView("abril"); }}
          className={`tablet-card ${!isArbol ? 'tablet-active' : 'tablet-inactive'}`}
        >
          <TabletFrame>
            <AbrilContent setView={setView} />
          </TabletFrame>
        </div>
        
      </div>
    </div>
  );
}
