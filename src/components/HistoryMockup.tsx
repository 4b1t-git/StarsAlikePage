import React, { useEffect, useRef, useState } from "react";
import MockupStarfield from "./MockupStarfield";
import { useSyncedAnimationDelay } from "./HomeMockup";

const DESIGN_W = 1280;
const DESIGN_H = 800;

export default function HistoryMockup({ active }: { active: boolean }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const delay = useSyncedAnimationDelay();

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
    <div ref={rootRef} className="absolute inset-0 overflow-hidden bg-cosmos-void font-[family-name:var(--font-sans)] text-mockup-ink">
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
        <div className="absolute left-[120px] top-[80px] z-20">
          <p className="font-[family-name:var(--font-pixel)] text-[12px] tracking-[0.28em] text-star/85">
            REGISTRO • CONSTELACIÓN
          </p>
          <h1 className="mt-4 font-[family-name:var(--font-serif)] text-[56px] font-light leading-[1.1] text-mockup-ink max-w-[400px]">
            Tu historia entre estrellas
          </h1>
          
          <div className="mt-8 flex items-center gap-4">
            <span className="block h-px w-8 bg-mockup-panel" />
            <p className="font-[family-name:var(--font-serif)] text-[18px] italic text-mockup-ink-ghost">
              9 de 11 luces encendidas
            </p>
          </div>
        </div>

        {/* Timeline with Blur and CTA Overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="absolute inset-0 blur-[8px] opacity-40">
            {/* Timeline Container */}
            <div className="absolute top-[480px] left-[100px] right-0 h-0 border-t-[1.5px] border-mockup-hairline flex">
              
              {/* Milestone I */}
              <div className="relative flex flex-col items-center w-[300px] -mt-[140px]">
                <div className="text-center mb-10">
                  <span className="block font-[family-name:var(--font-serif)] text-[22px] italic text-star">I</span>
                  <span className="block h-px w-6 bg-star/50 mx-auto mt-1 mb-4" />
                  <span className="block font-[family-name:var(--font-pixel)] text-[10px] tracking-widest text-star/80">
                    25 • MAY • 2026
                  </span>
                </div>
                
                {/* The Dot */}
                <div className="absolute top-[133px] left-1/2 -translate-x-1/2 h-3 w-3 rounded-full bg-star/20 ring-1 ring-star/50 flex items-center justify-center">
                  <span className="block h-1.5 w-1.5 rounded-full bg-star shadow-[0_0_8px_var(--color-star)]" />
                </div>

                <div className="text-center mt-[45px]">
                  <h3 className="font-[family-name:var(--font-serif)] text-[32px] text-mockup-ink">Abrir la app</h3>
                  <p className="mt-2 font-[family-name:var(--font-serif)] text-[16px] italic text-mockup-ink-ghost max-w-[200px] mx-auto leading-snug">
                    Dando los primeros pasos bajo las estrellas.
                  </p>
                </div>
              </div>

              {/* Milestone II */}
              <div className="relative flex flex-col items-center w-[350px] -mt-[140px] translate-y-[80px]">
                {/* The Dot */}
                <div className="absolute top-[53px] left-1/2 -translate-x-1/2 h-3 w-3 rounded-full bg-star/20 ring-1 ring-star/50 flex items-center justify-center">
                  <span className="block h-1.5 w-1.5 rounded-full bg-star shadow-[0_0_8px_var(--color-star)]" />
                </div>

                <div className="text-center mt-[100px]">
                  <span className="block font-[family-name:var(--font-serif)] text-[22px] italic text-star">II</span>
                  <span className="block h-px w-6 bg-star/50 mx-auto mt-1 mb-4" />
                  <span className="block font-[family-name:var(--font-pixel)] text-[10px] tracking-widest text-star/80">
                    25 • MAY • 2026
                  </span>
                  <h3 className="mt-4 font-[family-name:var(--font-serif)] text-[32px] text-mockup-ink leading-tight">Primer diario<br/>creado</h3>
                  <p className="mt-2 font-[family-name:var(--font-serif)] text-[16px] italic text-mockup-ink-ghost max-w-[200px] mx-auto leading-snug">
                    El lugar seguro para guardar los mejores pensamientos.
                  </p>
                </div>
              </div>

              {/* Milestone III */}
              <div className="relative flex flex-col items-center w-[300px] -mt-[140px] -translate-y-[20px]">
                <div className="text-center mb-10">
                  <span className="block font-[family-name:var(--font-serif)] text-[22px] italic text-star">III</span>
                  <span className="block h-px w-6 bg-star/50 mx-auto mt-1 mb-4" />
                  <span className="block font-[family-name:var(--font-pixel)] text-[10px] tracking-widest text-star/80">
                    25 • MAY • 2026
                  </span>
                  <h3 className="mt-4 font-[family-name:var(--font-serif)] text-[32px] text-mockup-ink leading-tight">Primera página<br/>escrita</h3>
                  <p className="mt-2 font-[family-name:var(--font-serif)] text-[16px] italic text-mockup-ink-ghost max-w-[220px] mx-auto leading-snug">
                    La primera estrella nueva en tu cielo.
                  </p>
                </div>
                
                {/* The Dot */}
                <div className="absolute top-[153px] left-1/2 -translate-x-1/2 h-3 w-3 rounded-full bg-star/20 ring-1 ring-star/50 flex items-center justify-center">
                  <span className="block h-1.5 w-1.5 rounded-full bg-star shadow-[0_0_8px_var(--color-star)]" />
                </div>
              </div>

              {/* Milestone IV (Partial) */}
              <div className="relative flex flex-col items-center w-[250px] -mt-[140px] translate-y-[60px] opacity-40">
                {/* The Dot */}
                <div className="absolute top-[73px] left-1/2 -translate-x-1/2 h-3 w-3 rounded-full bg-star/20 ring-1 ring-star/50 flex items-center justify-center">
                  <span className="block h-1.5 w-1.5 rounded-full bg-star shadow-[0_0_8px_var(--color-star)]" />
                </div>

                <div className="text-center mt-[120px]">
                  <span className="block font-[family-name:var(--font-pixel)] text-[10px] tracking-widest text-star/80">
                    25 • MAY • 2026
                  </span>
                  <h3 className="mt-4 font-[family-name:var(--font-serif)] text-[32px] text-mockup-ink leading-tight">Filtro de<br/>constelación</h3>
                  <p className="mt-2 font-[family-name:var(--font-serif)] text-[16px] italic text-mockup-ink-ghost max-w-[200px] mx-auto leading-snug">
                    Aprendiste a buscar en el firmamento.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Date scroller bottom right */}
            <div className="absolute right-[60px] bottom-[60px] flex items-center gap-4 text-mockup-ink-ghost font-[family-name:var(--font-pixel)] text-[24px]">
              <span>09</span>
              <span className="block w-6 h-px bg-mockup-panel" />
              <span className="text-mockup-ink">11</span>
            </div>
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-auto">
            <div className="flex flex-col items-center rounded-3xl border border-mockup-hairline bg-cosmos-void/60 p-10 shadow-2xl backdrop-blur-xl mt-[160px]">
              <svg className="mb-4 text-star" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <h3 className="font-[family-name:var(--font-serif)] text-[32px] text-mockup-ink">
                Revive tu historia
              </h3>
              <p className="mt-3 max-w-[320px] text-center font-[family-name:var(--font-sans)] text-[16px] text-mockup-ink-soft">
                Instala la aplicación para poder recordar tu historia y ver tus hitos bajo las estrellas.
              </p>
              <button className="mt-8 rounded-full bg-star px-8 py-3.5 font-[family-name:var(--font-sans)] text-[15px] font-semibold text-cosmos-void shadow-[0_0_20px_var(--color-star)] transition-transform hover:scale-105 active:scale-95">
                Descargar aplicación
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
