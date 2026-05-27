"use client";

import { useEffect, useRef, useState } from "react";

type NodeType = "book" | "page" | "tag" | "phantom";

type GraphNode = {
  id: string;
  type: NodeType;
  x: number;
  y: number;
  r: number;
  label?: string;
  book?: "A" | "B"; // which cluster a page/tag belongs to
};

type EdgeKind = "parent" | "wikilink" | "tag" | "cocite" | "phantom";

type Edge = {
  a: string;
  b: string;
  kind: EdgeKind;
};

// Coordinates pre-laid out for two book clusters in a 520×460 viewBox.
// BOOK_A on the left ("diario"), BOOK_B on the right ("ideas").
// Mirrors the app's BOOK + PAGE + TAG + PHANTOM hierarchy.
// Labels are rendered BELOW each node (middle-anchored).
const NODES: GraphNode[] = [
  // BOOKS — sky-blue hubs (#93C5FD)
  { id: "bA", type: "book", x: 140, y: 230, r: 16, label: "diario" },
  { id: "bB", type: "book", x: 380, y: 250, r: 16, label: "ideas" },

  // PAGES around BOOK_A (cluster left)
  { id: "pA1", type: "page", x:  60, y: 160, r: 6, book: "A", label: "lunes" },
  { id: "pA2", type: "page", x: 110, y:  90, r: 5, book: "A" },
  { id: "pA3", type: "page", x: 200, y: 130, r: 6, book: "A", label: "café" },
  { id: "pA4", type: "page", x:  80, y: 320, r: 6, book: "A", label: "mamá" },
  { id: "pA5", type: "page", x: 180, y: 320, r: 5, book: "A" },
  { id: "pA6", type: "page", x:  40, y: 240, r: 5, book: "A" },

  // PAGES around BOOK_B (cluster right)
  { id: "pB1", type: "page", x: 300, y: 170, r: 6, book: "B" },
  { id: "pB2", type: "page", x: 460, y: 180, r: 6, book: "B", label: "viaje" },
  { id: "pB3", type: "page", x: 480, y: 300, r: 5, book: "B" },
  { id: "pB4", type: "page", x: 380, y: 360, r: 6, book: "B", label: "casa" },
  { id: "pB5", type: "page", x: 300, y: 320, r: 5, book: "B" },

  // TAGS — amber (#FFD27A), floating in safe corners
  { id: "tLove",  type: "tag", x:  50, y:  60, r: 5, label: "amor" },
  { id: "tIdea",  type: "tag", x: 250, y:  50, r: 5, label: "ideas" },
  { id: "tNight", type: "tag", x: 240, y: 400, r: 5, label: "noche" },

  // PHANTOM — broken wikilink, gray (#9CA3AF), hollow
  { id: "ph1", type: "phantom", x: 420, y:  80, r: 5, label: "[[álbum]]" },
];

// NOTE: parent (page→book) edges intentionally NOT drawn — pages already
// cluster visually around their book hub. Drawing them creates noise.
const EDGES: Edge[] = [
  // WIKILINKS — gradient sky-blue (#93C5FD), the backbone
  { a: "pA3", b: "pA4", kind: "wikilink" },
  { a: "pA2", b: "pA3", kind: "wikilink" },
  { a: "pA1", b: "pA6", kind: "wikilink" },
  { a: "pB1", b: "pB2", kind: "wikilink" },
  { a: "pB2", b: "pB4", kind: "wikilink" },
  { a: "pB3", b: "pB4", kind: "wikilink" },
  { a: "pA3", b: "pB1", kind: "wikilink" }, // cross-cluster

  // TAGS — page → tag (amber)
  { a: "pA2", b: "tLove", kind: "tag" },
  { a: "pA3", b: "tIdea", kind: "tag" },
  { a: "pB2", b: "tIdea", kind: "tag" },
  { a: "pB4", b: "tNight", kind: "tag" },

  // CO-CITATION — violet dashed (#C4B5FD), inferred soft edge
  { a: "pA4", b: "pB5", kind: "cocite" },

  // PHANTOM — broken wikilink (gray, dashed)
  { a: "pB2", b: "ph1", kind: "phantom" },
];

// 4 stations map onto the actual app feature surfaces.
// Each station controls which nodes/edges are lit so the viz teaches the model.
const STATIONS = [
  {
    eyebrow: "feature 01",
    title: "Diarios",
    body:
      "Cada cuaderno es un diario con su portada de Unsplash, su grilla o estante, su orden. Personal o compartido. Tu biblioteca.",
    accent: "Books",
  },
  {
    eyebrow: "feature 02",
    title: "Páginas con bloques",
    body:
      "Editor de bloques tipo Notion. Texto, listas, imágenes, formato fino. Wikilinks [[así]] entre páginas y tags amber que vuelan por arriba.",
    accent: "Pages",
  },
  {
    eyebrow: "feature 03",
    title: "Constelación",
    body:
      "Grafo dirigido por fuerzas (Barnes-Hut). Backlinks azules. Co-citaciones violetas. Foco a N saltos. Tu sistema, dibujado.",
    accent: "Wikilinks",
  },
  {
    eyebrow: "feature 04",
    title: "Tags · phantoms",
    body:
      "Tags ámbar para curar; phantoms grises para los [[wikilinks rotos]] — escribilos antes de que la página exista, después la creás.",
    accent: "Tags + Phantoms",
  },
];

export default function ConstellationShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const stationsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = Number(e.target.getAttribute("data-station"));
            if (!Number.isNaN(i)) setActive(i);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 },
    );
    stationsRef.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="constelacion"
      className="relative px-6 py-32 sm:py-40"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-20 max-w-2xl">
          <p className="eyebrow">CÓMO FUNCIONA</p>
          <h2 className="mt-3 font-[family-name:var(--font-serif)] font-light text-4xl sm:text-6xl text-paper-bright leading-[1.05] text-balance">
            Diarios, páginas
            <br />
            <span className="editorial-italic text-star">y vínculos.</span>
          </h2>
          <p className="mt-5 max-w-xl text-paper-bright/65 leading-relaxed">
            Cada nota es una estrella. Cada diario es un libro. Los{" "}
            <code className="font-[family-name:var(--font-pixel)] text-star">[[wikilinks]]</code>{" "}
            unen páginas en constelaciones que se dibujan solas con tu uso.
          </p>
        </div>

        <div className="grid gap-16 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          <div className="space-y-32 lg:space-y-[60vh]">
            {STATIONS.map((s, i) => (
              <div
                key={s.title}
                ref={(el) => {
                  stationsRef.current[i] = el;
                }}
                data-station={i}
                className={`constellation-station ${active === i ? "is-active" : ""}`}
              >
                <p className="font-[family-name:var(--font-pixel)] text-xs tracking-[0.3em] uppercase text-star/90">
                  {s.eyebrow} · {s.accent}
                </p>
                <h3 className="mt-3 font-[family-name:var(--font-serif)] text-4xl sm:text-5xl text-paper-bright leading-tight">
                  {s.title}
                </h3>
                <p className="mt-5 max-w-md text-paper-bright/70 leading-relaxed text-lg">
                  {s.body}
                </p>
              </div>
            ))}
          </div>

          <div className="relative hidden lg:block">
            <div className="sticky top-[18vh]">
              <ConstellationSVG active={active} />
              <Legend />
            </div>
          </div>
        </div>

        <div className="mt-12 lg:hidden">
          <ConstellationSVG active={active} />
          <Legend />
        </div>
      </div>
    </section>
  );
}

function isEdgeLit(edge: Edge, active: number): boolean {
  if (active === 0) return false; // diarios — books only
  if (active === 1) return edge.kind === "tag"; // pages + their tags
  if (active === 2) return edge.kind === "wikilink" || edge.kind === "cocite";
  if (active === 3) return edge.kind === "tag" || edge.kind === "phantom";
  return false;
}

function isNodeLit(node: GraphNode, active: number): boolean {
  if (active === 0) return node.type === "book";
  if (active === 1) return node.type === "page" || node.type === "book";
  if (active === 2) return node.type === "page";
  if (active === 3) return node.type === "tag" || node.type === "phantom";
  return false;
}

function nodeFill(node: GraphNode): string {
  if (node.type === "book") return "#93C5FD";
  if (node.type === "tag") return "#FFD27A";
  if (node.type === "phantom") return "#9CA3AF";
  return "#FFFFFF";
}

function labelOf(n: GraphNode) {
  if (!n.label) return null;
  const isPixel = n.type === "tag" || n.type === "phantom";
  return {
    text: n.label,
    fontFamily: isPixel ? "var(--font-pixel)" : "var(--font-serif)",
    fontStyle: n.type === "page" || n.type === "book" ? "italic" : "normal",
    fontSize: n.type === "book" ? 14 : n.type === "page" ? 11 : 10.5,
    letterSpacing: isPixel ? 1.5 : 0,
    dy: n.r + 14, // always below the node
  };
}

function ConstellationSVG({ active }: { active: number }) {
  return (
    <div className="relative aspect-[10/9] w-full">
      <div
        aria-hidden
        className="absolute inset-0 -z-0 rounded-3xl"
        style={{
          background:
            "radial-gradient(circle at 28% 50%, rgba(147,197,253,0.10) 0%, transparent 55%), radial-gradient(circle at 75% 55%, rgba(64,224,208,0.08) 0%, transparent 60%)",
        }}
      />
      <svg
        viewBox="0 0 520 460"
        className="relative h-full w-full"
        role="img"
        aria-label="Grafo de diarios, páginas, tags y wikilinks"
      >
        <defs>
          {EDGES.filter((e) => e.kind === "wikilink").map((e, i) => {
            const na = NODES.find((n) => n.id === e.a)!;
            const nb = NODES.find((n) => n.id === e.b)!;
            return (
              <linearGradient
                key={i}
                id={`wl-${i}`}
                gradientUnits="userSpaceOnUse"
                x1={na.x}
                y1={na.y}
                x2={nb.x}
                y2={nb.y}
              >
                <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#93C5FD" stopOpacity="0.08" />
              </linearGradient>
            );
          })}
          <radialGradient id="bookGlow">
            <stop offset="0%" stopColor="#FFC857" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#FFC857" stopOpacity="0" />
          </radialGradient>
          {/* Subtle dark backdrop for text legibility */}
          <filter id="textShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#050505" floodOpacity="0.85" />
          </filter>
        </defs>

        {/* EDGES — always rendered, opacity/width fade between stations */}
        <g>
          {EDGES.map((e, i) => {
            const na = NODES.find((n) => n.id === e.a)!;
            const nb = NODES.find((n) => n.id === e.b)!;
            const lit = isEdgeLit(e, active);

            const common = {
              x1: na.x, y1: na.y, x2: nb.x, y2: nb.y,
              className: "graph-el",
            } as const;

            if (e.kind === "wikilink") {
              const wlIdx = EDGES.filter((x) => x.kind === "wikilink").indexOf(e);
              return (
                <line
                  key={i}
                  {...common}
                  stroke={`url(#wl-${wlIdx})`}
                  strokeOpacity={lit ? 1 : 0.18}
                  strokeWidth={lit ? 1.6 : 0.7}
                />
              );
            }
            if (e.kind === "cocite") {
              return (
                <line
                  key={i}
                  {...common}
                  stroke="#C4B5FD"
                  strokeOpacity={lit ? 0.75 : 0.08}
                  strokeWidth={lit ? 1.2 : 0.7}
                  strokeDasharray="5.5 2.5"
                />
              );
            }
            if (e.kind === "tag") {
              return (
                <line
                  key={i}
                  {...common}
                  stroke="#FFD27A"
                  strokeOpacity={lit ? 0.8 : 0.08}
                  strokeWidth={lit ? 1.2 : 0.7}
                />
              );
            }
            return (
              <line
                key={i}
                {...common}
                stroke="#9CA3AF"
                strokeOpacity={lit ? 0.8 : 0.1}
                strokeWidth={lit ? 1.2 : 0.7}
                strokeDasharray="2 3"
              />
            );
          })}
        </g>

        {/* NODES — halos always mounted, opacity fades */}
        <g>
          {NODES.map((n) => {
            const lit = isNodeLit(n, active);
            const fill = nodeFill(n);
            const isPhantom = n.type === "phantom";
            const lbl = labelOf(n);
            return (
              <g key={n.id}>
                {n.type === "book" && (
                  <>
                    <circle
                      className="graph-el"
                      cx={n.x}
                      cy={n.y}
                      r={n.r + 22}
                      fill="url(#bookGlow)"
                      opacity={lit ? 1 : 0}
                    />
                    <circle
                      className="graph-el"
                      cx={n.x}
                      cy={n.y}
                      r={n.r + 11}
                      fill="none"
                      stroke="#FFC857"
                      strokeWidth={1.4}
                      strokeOpacity={lit ? 0.55 : 0}
                    />
                  </>
                )}
                {n.type !== "book" && (
                  <circle
                    className="graph-el"
                    cx={n.x}
                    cy={n.y}
                    r={n.r + 7}
                    fill={fill}
                    fillOpacity={lit ? (isPhantom ? 0.08 : 0.18) : 0}
                  />
                )}
                <circle
                  className="graph-el"
                  cx={n.x}
                  cy={n.y}
                  r={n.r}
                  fill={fill}
                  fillOpacity={
                    isPhantom ? (lit ? 0.4 : 0.12) : lit ? 1 : 0.5
                  }
                />
                <circle
                  className="graph-el"
                  cx={n.x}
                  cy={n.y}
                  r={n.r}
                  fill="none"
                  stroke={fill}
                  strokeOpacity={lit ? 0.95 : 0.45}
                  strokeWidth={lit ? 1.6 : 1}
                  strokeDasharray={isPhantom ? "2 2" : undefined}
                />
                {lbl && (
                  <text
                    className="graph-el"
                    x={n.x}
                    y={n.y + lbl.dy}
                    textAnchor="middle"
                    fontFamily={lbl.fontFamily}
                    fontStyle={lbl.fontStyle}
                    fontSize={lbl.fontSize}
                    letterSpacing={lbl.letterSpacing}
                    fill={fill}
                    fillOpacity={lit ? 1 : 0.55}
                    filter="url(#textShadow)"
                  >
                    {lbl.text}
                  </text>
                )}
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}

function Legend() {
  const items: { c: string; l: string; shape?: "dash" | "dot" }[] = [
    { c: "#93C5FD", l: "diario" },
    { c: "#FFFFFF", l: "página" },
    { c: "#FFD27A", l: "tag" },
    { c: "#9CA3AF", l: "phantom", shape: "dot" },
    { c: "#C4B5FD", l: "co-cita", shape: "dash" },
  ];
  return (
    <div className="mt-6 flex flex-wrap items-center gap-5 text-[10px] tracking-[0.3em] uppercase font-[family-name:var(--font-pixel)] text-paper-bright/55">
      {items.map((it) => (
        <span key={it.l} className="inline-flex items-center gap-2">
          <span
            className="h-2 w-2 rounded-full"
            style={{
              background: it.c,
              outline: it.shape === "dot" ? `1px dashed ${it.c}` : "none",
              outlineOffset: it.shape === "dot" ? 2 : 0,
            }}
          />
          {it.l}
        </span>
      ))}
    </div>
  );
}
