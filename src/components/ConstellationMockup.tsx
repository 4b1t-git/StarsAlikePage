"use client";

import { useEffect, useRef, useState } from "react";
import MockupStarfield from "./MockupStarfield";

const DESIGN_W = 1280;
const DESIGN_H = 800;

type GraphNode = {
  id: string;
  label: string;
  x: number;
  y: number;
  radius: number;
  color: string;
};

const NODES: GraphNode[] = [
  { id: "tech", label: "Tecnología", x: 724, y: 184, radius: 11, color: "#7553df" },
  { id: "history", label: "Historias", x: 616, y: 284, radius: 10, color: "#c9d94d" },
  { id: "city", label: "Viaje a la Ciudad", x: 570, y: 356, radius: 8, color: "#7999ec" },
  { id: "forgotten", label: "Inolvidable", x: 913, y: 309, radius: 10, color: "#70bce9" },
  { id: "mods", label: "mods mine", x: 458, y: 500, radius: 10, color: "#7ed6ce" },
  { id: "app", label: "Aplicación", x: 604, y: 498, radius: 11, color: "#7541d1" },
  { id: "fix", label: "Arreglar app", x: 747, y: 520, radius: 11, color: "#70d2cb" },
  { id: "math", label: "Matemáticas", x: 837, y: 430, radius: 9, color: "#c46b83" },
  { id: "photo", label: "Proyectos de Fotografía", x: 920, y: 500, radius: 8, color: "#df9457" },
  { id: "shop", label: "Compras", x: 618, y: 636, radius: 10, color: "#d796d4" },
];

const LEAVES = [
  [724, 115], [684, 133], [766, 133], [660, 170], [788, 171], [657, 214], [792, 216], [697, 244], [756, 244],
  [585, 310], [650, 314], [665, 265], [665, 359], [554, 394],
  [930, 239], [973, 273], [978, 344], [921, 381], [864, 283],
  [394, 442], [420, 470], [424, 536], [459, 573], [493, 522], [484, 446],
  [565, 455], [575, 541], [642, 550], [665, 479], [668, 425],
  [715, 456], [704, 548], [754, 590], [792, 557], [816, 491],
  [798, 382], [875, 397], [886, 455], [794, 468],
];

const LINKS: Array<[string, string]> = [
  ["history", "city"], ["history", "app"], ["city", "app"], ["app", "fix"],
  ["app", "math"], ["fix", "math"], ["fix", "photo"], ["forgotten", "math"],
  ["history", "math"], ["app", "shop"],
];

function Graph() {
  const nodeById = Object.fromEntries(NODES.map((node) => [node.id, node]));

  return (
    <svg className="absolute inset-0 h-full w-full" viewBox={`0 0 ${DESIGN_W} ${DESIGN_H}`} aria-hidden>
      <defs>
        <filter id="constellation-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      <g stroke="rgba(255,255,255,.15)" strokeWidth="1">
        {LINKS.map(([from, to]) => (
          <line key={`${from}-${to}`} x1={nodeById[from].x} y1={nodeById[from].y} x2={nodeById[to].x} y2={nodeById[to].y} />
        ))}
        {LEAVES.map(([x, y], index) => {
          const parent = NODES[index % 8];
          return <line key={`leaf-link-${index}`} x1={parent.x} y1={parent.y} x2={x} y2={y} />;
        })}
      </g>

      <g>
        {LEAVES.map(([x, y], index) => (
          <g key={`leaf-${index}`}>
            <circle cx={x} cy={y} r="3.2" fill={NODES[index % 8].color} opacity=".95" />
            {index % 3 === 0 && <text x={x} y={y + 11} textAnchor="middle" fill="rgba(255,255,255,.55)" fontSize="6">Página {index % 8 + 1}</text>}
          </g>
        ))}
      </g>

      <g>
        {NODES.map((node) => (
          <g key={node.id}>
            <circle cx={node.x} cy={node.y} r={node.radius + 6} fill={node.color} opacity=".14" filter="url(#constellation-glow)" />
            <circle cx={node.x} cy={node.y} r={node.radius} fill={node.color} />
            <text x={node.x} y={node.y + node.radius + 12} textAnchor="middle" fill="rgba(255,255,255,.78)" fontSize="8">{node.label}</text>
          </g>
        ))}
      </g>
    </svg>
  );
}

function GraphControl({ active, children }: { active?: boolean; children: React.ReactNode }) {
  return (
    <span className={`flex h-[38px] w-[38px] items-center justify-center rounded-[11px] border ${active ? "border-star/60 bg-star/10 text-star" : "border-mockup-hairline bg-mockup-panel text-mockup-ink-soft"}`}>
      {children}
    </span>
  );
}

export default function ConstellationMockup({ active }: { active: boolean }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const measure = () => {
      const width = el.clientWidth;
      if (width) setScale(width / DESIGN_W);
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
    <div ref={rootRef} className="absolute inset-0 overflow-hidden bg-cosmos-void font-[family-name:var(--font-sans)] text-mockup-ink">
      <MockupStarfield active={active} className="absolute inset-0 h-full w-full" />

      <div className="absolute left-0 top-0 origin-top-left" style={{ width: DESIGN_W, height: DESIGN_H, transform: `scale(${scale})`, visibility: scale ? "visible" : "hidden" }}>
        <Graph />

        <header className="absolute left-[96px] top-[45px] z-20 w-[275px]">
          <p className="font-[family-name:var(--font-pixel)] text-[11px] tracking-[0.3em] text-star">NODOS · VÍNCULOS</p>
          <h1 className="mt-[22px] font-[family-name:var(--font-serif)] text-[38px] font-light leading-none text-mockup-ink">
            Tu <span className="italic text-star">constelación</span>
          </h1>
          <p className="mt-[16px] font-[family-name:var(--font-serif)] text-[15px] font-semibold italic text-mockup-ink-ghost">Así se ve una mente conectada.</p>

          <div className="mt-[24px] flex items-center">
            {[["10", "DIARIOS"], ["41", "PÁGINAS"], ["3", "ETIQUETAS"]].map(([value, label], index) => (
              <span key={label} className="flex items-center">
                {index > 0 && <span className="mx-[15px] h-[28px] w-px bg-mockup-panel" />}
                <span className="text-center">
                  <span className="block font-[family-name:var(--font-serif)] text-[23px] leading-[24px] text-mockup-ink">{value}</span>
                  <span className="mt-[5px] block font-[family-name:var(--font-pixel)] text-[8px] tracking-[0.2em] text-mockup-ink-ghost">{label}</span>
                </span>
              </span>
            ))}
          </div>
        </header>

        <div className="absolute right-[30px] top-[47px] z-20">
          <div className="flex h-[38px] w-[292px] items-center gap-[10px] rounded-full border border-mockup-hairline bg-cosmos-void/75 px-[15px] text-[12px] text-mockup-ink-ghost backdrop-blur-md">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><circle cx="11" cy="11" r="7" /><path d="m20 20-3-3" /></svg>
            Buscar nodo, página o etiqueta...
          </div>
          <div className="mt-[9px] flex justify-end gap-[8px]">
            <GraphControl active><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden><path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L2 12V2h10l8.6 8.6a2 2 0 0 1 0 2.8Z" /><circle cx="7" cy="7" r="1" /></svg></GraphControl>
            <GraphControl><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden><circle cx="12" cy="12" r="3" /><circle cx="19" cy="6" r="2" /><circle cx="5" cy="18" r="2" /><path d="m12 9 5-2M7 16l5-2" /></svg></GraphControl>
            <GraphControl><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden><path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5" /><circle cx="12" cy="12" r="3" /></svg></GraphControl>
            <GraphControl><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden><path d="M4 6h16M7 12h10M10 18h4" /></svg></GraphControl>
          </div>
        </div>

        <div className="absolute bottom-[28px] left-1/2 z-20 flex -translate-x-1/2 items-center gap-[22px] rounded-full border border-mockup-hairline bg-cosmos-void/85 px-[22px] py-[11px] backdrop-blur-md">
          {[
            ["bg-gradient-to-br from-[#7d67e8] via-[#7ed6ce] to-[#e59bcf]", "Diario"],
            ["bg-star", "Página"],
            ["bg-[#e4ad59]", "#etiqueta"],
          ].map(([color, label]) => (
            <span key={label} className="flex items-center gap-[7px] text-[11px] text-mockup-ink-soft"><i className={`h-[10px] w-[10px] rounded-full ${color}`} />{label}</span>
          ))}
          <span className="flex items-center gap-[7px] text-[11px] text-mockup-ink-soft"><i className="h-px w-[20px] bg-star/45" />Backlink</span>
          <span className="flex items-center gap-[7px] text-[11px] text-mockup-ink-soft"><i className="w-[20px] border-t border-dotted border-[#9f8de9]" />Enlaces en común</span>
        </div>
      </div>
    </div>
  );
}
