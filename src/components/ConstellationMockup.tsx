import React, { useEffect, useRef, useState } from "react";
import MockupStarfield from "./MockupStarfield";
import { useSyncedAnimationDelay } from "./HomeMockup";

const DESIGN_W = 1280;
const DESIGN_H = 800;

function ConstellationGraph() {
  const delay = useSyncedAnimationDelay();

  // Energy pulse animation definition for the lines
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1000 600"
        className="overflow-visible"
        style={{ filter: "drop-shadow(0 0 10px rgba(120, 100, 200, 0.2))" }}
      >
        <defs>
          {/* Subtle glow for the nodes */}
          <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-star)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="var(--color-star)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* --- Links (Edges) --- */}
        <g stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="none">
          {/* A central hub to a sub-hub */}
          <line x1="500" y1="300" x2="350" y2="400" />
          <line x1="500" y1="300" x2="650" y2="250" />
          <line x1="500" y1="300" x2="400" y2="180" />
          <line x1="500" y1="300" x2="480" y2="450" />
          <line x1="500" y1="300" x2="750" y2="400" />

          {/* Dotted lines for "Enlaces en común" */}
          <line x1="400" y1="180" x2="350" y2="400" strokeDasharray="3 3" />
          <line x1="650" y1="250" x2="750" y2="400" strokeDasharray="3 3" />
        </g>

        {/* --- Animated Pulses along the links --- */}
        <g stroke="var(--color-star)" strokeWidth="1.5" fill="none" className="opacity-70">
          <style>{`
            @keyframes graphPulse {
              0% { stroke-dashoffset: 100; opacity: 1; }
              100% { stroke-dashoffset: -100; opacity: 0; }
            }
            .pulse-line {
              stroke-dasharray: 20 200;
              animation: graphPulse 4s linear infinite;
            }
          `}</style>
          {/* We reuse the same lines but with the pulse class */}
          <line x1="500" y1="300" x2="350" y2="400" className="pulse-line" style={{ animationDelay: delay }} />
          <line x1="500" y1="300" x2="650" y2="250" className="pulse-line" style={{ animationDelay: `calc(${delay} + 1s)` }} />
          <line x1="500" y1="300" x2="400" y2="180" className="pulse-line" style={{ animationDelay: `calc(${delay} + 2s)` }} />
          <line x1="500" y1="300" x2="480" y2="450" className="pulse-line" style={{ animationDelay: `calc(${delay} + 0.5s)` }} />
          <line x1="500" y1="300" x2="750" y2="400" className="pulse-line" style={{ animationDelay: `calc(${delay} + 1.5s)` }} />
        </g>

        {/* --- Nodes --- */}
        {/* Hub: Historias (Center) */}
        <circle cx="500" cy="300" r="10" fill="#4ade80" />
        <text x="500" y="325" fill="white" fontSize="11" textAnchor="middle" className="font-serif opacity-90">Historias</text>

        {/* Animales vistos en el bosque */}
        <circle cx="350" cy="400" r="8" fill="#facc15" />
        <text x="350" y="420" fill="white" fontSize="10" textAnchor="middle" className="font-serif opacity-80">Animales en el bosque</text>
        
        {/* Tecnología */}
        <circle cx="400" cy="180" r="8" fill="#ec4899" />
        <text x="400" y="200" fill="white" fontSize="10" textAnchor="middle" className="font-serif opacity-80">Tecnología</text>

        {/* Compras */}
        <circle cx="480" cy="450" r="8" fill="#38bdf8" />
        <text x="480" y="470" fill="white" fontSize="10" textAnchor="middle" className="font-serif opacity-80">Compras</text>

        {/* Viaje a la Ciudad */}
        <circle cx="650" cy="250" r="8" fill="#a78bfa" />
        <text x="650" y="270" fill="white" fontSize="10" textAnchor="middle" className="font-serif opacity-80">Viaje a la Ciudad</text>

        {/* Proyectos de Fotografía (Large cluster) */}
        <circle cx="750" cy="400" r="12" fill="#a855f7" />
        <text x="750" y="425" fill="white" fontSize="10" textAnchor="middle" className="font-serif opacity-80">Proyectos de Fotografía</text>

        {/* --- Leaf Pages (White dots) --- */}
        {/* Around Animales */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x = 350 + Math.cos(rad) * 45;
          const y = 400 + Math.sin(rad) * 45;
          return (
            <g key={`anim-${i}`}>
              <line x1="350" y1="400" x2={x} y2={y} stroke="rgba(255,255,255,0.1)" />
              <circle cx={x} cy={y} r="2.5" fill="white" className="opacity-80" />
            </g>
          );
        })}
        {/* Around Foto */}
        {[0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const dist = i % 2 === 0 ? 50 : 70;
          const x = 750 + Math.cos(rad) * dist;
          const y = 400 + Math.sin(rad) * dist;
          return (
            <g key={`foto-${i}`}>
              <line x1="750" y1="400" x2={x} y2={y} stroke="rgba(255,255,255,0.1)" />
              <circle cx={x} cy={y} r="2" fill="white" className="opacity-70" />
            </g>
          );
        })}
        {/* Around Tech */}
        {[200, 240, 280, 320, 360, 40].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x = 400 + Math.cos(rad) * 40;
          const y = 180 + Math.sin(rad) * 40;
          return (
            <g key={`tech-${i}`}>
              <line x1="400" y1="180" x2={x} y2={y} stroke="rgba(255,255,255,0.1)" />
              <circle cx={x} cy={y} r="2.5" fill="white" className="opacity-80" />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default function ConstellationMockup({ active }: { active: boolean }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  // Resize to fit width while maintaining design aspect ratio.
  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      const { width } = entries[0].contentRect;
      setScale(width / DESIGN_W);
    });
    if (rootRef.current) observer.observe(rootRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rootRef} className="absolute inset-0 overflow-hidden bg-[#050505] font-[family-name:var(--font-sans)] text-paper-bright">
      <MockupStarfield active={active} className="absolute inset-0 h-full w-full opacity-60" />

      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{
          width: DESIGN_W,
          height: DESIGN_H,
          transform: `scale(${scale})`,
          visibility: scale ? "visible" : "hidden",
        }}
      >
        {/* Top Header */}
        <div className="absolute left-[80px] top-[40px] z-20">
          <p className="flex items-center gap-2 font-[family-name:var(--font-pixel)] text-[12px] tracking-[0.28em] text-star/85">
            ✦ MAPA ESTELAR ✦
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-serif)] text-[48px] font-light text-white">Tu constelación</h1>
          
          <div className="mt-6 flex items-center gap-[24px] rounded-[24px] border-[0.5px] border-white/10 bg-[#050508]/60 px-[32px] py-[12px] backdrop-blur-md w-fit">
            <div className="text-center">
              <span className="block font-[family-name:var(--font-serif)] text-[24px] text-white">8</span>
              <span className="font-[family-name:var(--font-pixel)] text-[10px] tracking-widest text-white/50">DIARIOS</span>
            </div>
            <div className="h-[30px] w-px bg-white/10" />
            <div className="text-center">
              <span className="block font-[family-name:var(--font-serif)] text-[24px] text-white">88</span>
              <span className="font-[family-name:var(--font-pixel)] text-[10px] tracking-widest text-white/50">PÁGINAS</span>
            </div>
            <div className="h-[30px] w-px bg-white/10" />
            <div className="text-center">
              <span className="block font-[family-name:var(--font-serif)] text-[24px] text-white">4</span>
              <span className="font-[family-name:var(--font-pixel)] text-[10px] tracking-widest text-white/50">ETIQUETAS</span>
            </div>
          </div>
        </div>

        {/* Top Right Controls */}
        <div className="absolute right-[40px] top-[40px] z-20 flex items-center gap-4">
          <div className="flex h-[44px] w-[320px] items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 backdrop-blur-md">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <span className="text-[14px] text-white/40">Buscar nodo, página o etiqueta...</span>
          </div>
          
          <div className="flex gap-2">
            <button className="flex h-[44px] w-[44px] items-center justify-center rounded-2xl border border-star/30 bg-star/10 text-star backdrop-blur-md">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
            </button>
            <button className="flex h-[44px] w-[44px] items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-white/70 backdrop-blur-md">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="3"></circle><circle cx="19" cy="6" r="2"></circle><circle cx="5" cy="18" r="2"></circle><path d="M12 9l5-2"></path><path d="M7 16l5-2"></path></svg>
            </button>
            <button className="flex h-[44px] w-[44px] items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-white/70 backdrop-blur-md">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 3h18v18H3z"></path><path d="M3 9h18"></path><path d="M9 21V9"></path></svg>
            </button>
            <button className="flex h-[44px] w-[44px] items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-white/70 backdrop-blur-md">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
            </button>
          </div>
        </div>

        {/* The Graph with Blur and CTA Overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="absolute inset-0 blur-[8px] opacity-40">
            <ConstellationGraph />
          </div>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-auto">
            <div className="flex flex-col items-center rounded-3xl border border-white/10 bg-[#050508]/60 p-10 shadow-2xl backdrop-blur-xl">
              <svg className="mb-4 text-star" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <h3 className="font-[family-name:var(--font-serif)] text-[32px] text-white">
                Descubre tu universo
              </h3>
              <p className="mt-3 max-w-[320px] text-center font-[family-name:var(--font-sans)] text-[16px] text-white/70">
                Instala la aplicación para ver tu propia constelación de diarios, notas y etiquetas interconectadas.
              </p>
              <button className="mt-8 rounded-full bg-star px-8 py-3.5 font-[family-name:var(--font-sans)] text-[15px] font-semibold text-black shadow-[0_0_20px_var(--color-star)] transition-transform hover:scale-105 active:scale-95">
                Descargar aplicación
              </button>
            </div>
          </div>
        </div>

        {/* Legend Bottom */}
        <div className="absolute bottom-[40px] left-1/2 flex -translate-x-1/2 items-center gap-[32px] rounded-full border border-white/10 bg-[#050508]/80 px-[40px] py-[16px] backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="block h-4 w-4 rounded-full bg-[#60a5fa]" />
            <span className="font-[family-name:var(--font-pixel)] text-[11px] tracking-wider text-white/80">Diario</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="block h-3 w-3 rounded-full bg-white" />
            <span className="font-[family-name:var(--font-pixel)] text-[11px] tracking-wider text-white/80">Página</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="block h-4 w-4 rounded-full bg-[#d97706]" />
            <span className="font-[family-name:var(--font-pixel)] text-[11px] tracking-wider text-white/80">Etiqueta</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="block h-[2px] w-6 bg-white/40" />
            <span className="font-[family-name:var(--font-pixel)] text-[11px] tracking-wider text-white/80">Backlink</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="block h-[2px] w-6 border-b-[2px] border-dotted border-white/40" />
            <span className="font-[family-name:var(--font-pixel)] text-[11px] tracking-wider text-white/80">Enlaces en común</span>
          </div>
        </div>
      </div>
    </div>
  );
}
