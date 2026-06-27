import { memo, type ReactNode } from "react";

export type PhoneVariant =
  | "inicio"
  | "biblioteca"
  | "diario"
  | "constelacion"
  | "historia"
  | "vault"
  | "editor";

type Props = {
  variant: PhoneVariant;
  label: string;
  caption: string;
  index: number;
};

const PHONE_W = 280;
const PHONE_H = 580;
const SCREEN_PAD = 14;
const SCREEN_W = PHONE_W - SCREEN_PAD * 2;
const SCREEN_H = PHONE_H - SCREEN_PAD * 2;
const SCREEN_R = 38;

function Frame({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox={`0 0 ${PHONE_W} ${PHONE_H}`}
      width={PHONE_W}
      height={PHONE_H}
      className="block"
    >
      <defs>
        <linearGradient id="bezel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a1a1a" />
          <stop offset="100%" stopColor="#070707" />
        </linearGradient>
        <linearGradient id="screenGlass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.04)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <clipPath id={`screen-${PHONE_W}`}>
          <rect
            x={SCREEN_PAD}
            y={SCREEN_PAD}
            width={SCREEN_W}
            height={SCREEN_H}
            rx={SCREEN_R}
            ry={SCREEN_R}
          />
        </clipPath>
      </defs>

      {/* Outer body */}
      <rect
        x="0"
        y="0"
        width={PHONE_W}
        height={PHONE_H}
        rx={SCREEN_R + 8}
        ry={SCREEN_R + 8}
        fill="url(#bezel)"
      />
      <rect
        x="2"
        y="2"
        width={PHONE_W - 4}
        height={PHONE_H - 4}
        rx={SCREEN_R + 6}
        ry={SCREEN_R + 6}
        fill="none"
        stroke="#2a2a2a"
        strokeWidth="1"
      />

      {/* Side button */}
      <rect
        x={PHONE_W - 1}
        y={140}
        width="2"
        height="64"
        rx="1"
        fill="#1f1f1f"
      />
      <rect x="-1" y="180" width="2" height="44" rx="1" fill="#1f1f1f" />

      {/* Screen base */}
      <rect
        x={SCREEN_PAD}
        y={SCREEN_PAD}
        width={SCREEN_W}
        height={SCREEN_H}
        rx={SCREEN_R}
        ry={SCREEN_R}
        fill="#0A0A0A"
      />

      <g clipPath={`url(#screen-${PHONE_W})`}>{children}</g>

      {/* Hole punch */}
      <circle cx={PHONE_W / 2} cy={SCREEN_PAD + 18} r="5" fill="#000" />
      <circle
        cx={PHONE_W / 2}
        cy={SCREEN_PAD + 18}
        r="5"
        fill="none"
        stroke="#1a1a1a"
        strokeWidth="1"
      />

      {/* Glass reflection */}
      <rect
        x={SCREEN_PAD}
        y={SCREEN_PAD}
        width={SCREEN_W}
        height={SCREEN_H}
        rx={SCREEN_R}
        ry={SCREEN_R}
        fill="url(#screenGlass)"
        pointerEvents="none"
      />
    </svg>
  );
}

function StatusBar({ y = SCREEN_PAD + 6 }: { y?: number }) {
  return (
    <g fontFamily="var(--font-pixel)" fontSize="10" fill="#E8E2CC">
      <text x={SCREEN_PAD + 18} y={y + 12}>
        9:41
      </text>
      <g transform={`translate(${PHONE_W - SCREEN_PAD - 38}, ${y + 4})`}>
        <rect x="0" y="2" width="14" height="8" rx="1.5" fill="none" stroke="#E8E2CC" />
        <rect x="2" y="4" width="9" height="4" fill="#E8E2CC" />
        <rect x="16" y="2" width="2" height="8" fill="#E8E2CC" rx="0.5" />
      </g>
    </g>
  );
}

function Inicio() {
  return (
    <>
      <rect
        x={SCREEN_PAD}
        y={SCREEN_PAD}
        width={SCREEN_W}
        height={SCREEN_H}
        fill="#050505"
      />
      {/* mini starfield */}
      {Array.from({ length: 42 }).map((_, i) => {
        const x = SCREEN_PAD + ((i * 73) % SCREEN_W);
        const y = SCREEN_PAD + ((i * 41) % SCREEN_H);
        const r = ((i * 7) % 5) / 4 + 0.6;
        const op = ((i * 13) % 80) / 100 + 0.2;
        return <circle key={i} cx={x} cy={y} r={r} fill="#fff" opacity={op} />;
      })}
      {/* black hole */}
      <g transform={`translate(${PHONE_W * 0.62}, ${PHONE_H * 0.36})`}>
        <circle r="60" fill="url(#bhGrad)" />
        <circle r="14" fill="#000" />
        <circle r="17" fill="none" stroke="#40E0D0" strokeOpacity="0.6" />
      </g>
      <defs>
        <radialGradient id="bhGrad">
          <stop offset="0" stopColor="#000" />
          <stop offset="0.45" stopColor="rgba(64,224,208,0.22)" />
          <stop offset="1" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
      </defs>
      <StatusBar />
      {/* Logo + cta */}
      <text
        x={PHONE_W / 2}
        y={SCREEN_PAD + 84}
        textAnchor="middle"
        fontFamily="var(--font-serif)"
        fontSize="26"
        fontStyle="italic"
        fontWeight="300"
        fill="#F1ECD9"
      >
        stars alike
      </text>
      <text
        x={PHONE_W / 2}
        y={SCREEN_PAD + 104}
        textAnchor="middle"
        fontFamily="var(--font-pixel)"
        fontSize="9"
        letterSpacing="2"
        fill="#40E0D0"
      >
        BIENVENIDA
      </text>

      {/* email field */}
      <g transform={`translate(${SCREEN_PAD + 24}, ${PHONE_H - 130})`}>
        <rect
          width={SCREEN_W - 48}
          height="38"
          rx="10"
          fill="rgba(64,224,208,0.08)"
          stroke="#40E0D0"
          strokeOpacity="0.4"
        />
        <text
          x="14"
          y="24"
          fontFamily="var(--font-sans)"
          fontSize="11"
          fill="#F1ECD9"
          opacity="0.55"
        >
          tu@correo.com
        </text>
        <rect
          x={SCREEN_W - 48 - 90}
          y="4"
          width="80"
          height="30"
          rx="8"
          fill="#40E0D0"
        />
        <text
          x={SCREEN_W - 48 - 50}
          y="23"
          textAnchor="middle"
          fontFamily="var(--font-sans)"
          fontSize="11"
          fontWeight="600"
          fill="#050505"
        >
          entrar
        </text>
      </g>
    </>
  );
}

function Biblioteca() {
  const books = [
    { title: "Personal", color: "#40E0D0" },
    { title: "Trabajo", color: "#FFD27A" },
    { title: "Ideas", color: "#93C5FD" },
    { title: "Viajes", color: "#F472B6" },
  ];
  return (
    <>
      <rect x={SCREEN_PAD} y={SCREEN_PAD} width={SCREEN_W} height={SCREEN_H} fill="#0A0A0A" />
      <StatusBar />
      <text x={SCREEN_PAD + 20} y={SCREEN_PAD + 64} fontFamily="var(--font-serif)" fontSize="24" fontStyle="italic" fill="#F1ECD9">
        biblioteca
      </text>
      <g transform={`translate(${SCREEN_PAD + 20}, ${SCREEN_PAD + 96})`}>
        {books.map((b, i) => {
          const col = i % 2;
          const row = Math.floor(i / 2);
          const x = col * 114;
          const y = row * 154;
          return (
            <g key={i} transform={`translate(${x}, ${y})`}>
              {/* Unsplash cover simulation (gradient) */}
              <defs>
                <linearGradient id={`grad-${i}`} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor={b.color} stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#111" stopOpacity="0.8" />
                </linearGradient>
              </defs>
              <rect width="98" height="124" rx="8" fill={`url(#grad-${i})`} stroke="rgba(255,255,255,0.1)" />
              <rect width="98" height="124" rx="8" fill="url(#screenGlass)" pointerEvents="none" />
              <text x="8" y="112" fontFamily="var(--font-sans)" fontSize="12" fontWeight="500" fill="#F1ECD9">
                {b.title}
              </text>
            </g>
          );
        })}
      </g>
      {/* Bottom Nav */}
      <g transform={`translate(${SCREEN_PAD}, ${PHONE_H - SCREEN_PAD - 60})`}>
        <rect width={SCREEN_W} height="60" fill="#0A0A0A" fillOpacity="0.9" />
        <rect y="-1" width={SCREEN_W} height="1" fill="rgba(255,255,255,0.05)" />
        {/* Nav items */}
        <circle cx={SCREEN_W / 4} cy="30" r="4" fill="#40E0D0" />
        <circle cx={SCREEN_W * 3 / 4} cy="30" r="16" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
      </g>
    </>
  );
}

function Diario() {
  const lineY = (i: number) => SCREEN_PAD + 96 + i * 24;
  return (
    <>
      {/* paper */}
      <rect
        x={SCREEN_PAD}
        y={SCREEN_PAD}
        width={SCREEN_W}
        height={SCREEN_H}
        fill="#F1ECD9"
      />
      {/* paper rules */}
      {Array.from({ length: 14 }).map((_, i) => (
        <line
          key={i}
          x1={SCREEN_PAD + 20}
          x2={SCREEN_PAD + SCREEN_W - 20}
          y1={lineY(i)}
          y2={lineY(i)}
          stroke="#B8AE8F"
          strokeOpacity="0.35"
        />
      ))}
      {/* date stamp */}
      <text
        x={SCREEN_PAD + 24}
        y={SCREEN_PAD + 44}
        fontFamily="var(--font-pixel)"
        fontSize="11"
        letterSpacing="2"
        fill="#4A4738"
      >
        MAR 14 · 21:38
      </text>
      {/* title */}
      <text
        x={SCREEN_PAD + 24}
        y={SCREEN_PAD + 76}
        fontFamily="var(--font-serif)"
        fontSize="22"
        fontStyle="italic"
        fontWeight="400"
        fill="#26241C"
      >
        carta a mamá
      </text>
      {/* body — first line has a wikilink chip + a tag mention */}
      <text
        x={SCREEN_PAD + 24}
        y={lineY(0) + 16}
        fontFamily="var(--font-serif)"
        fontSize="13"
        fill="#26241C"
      >
        <tspan>hoy hablé con </tspan>
        <tspan fill="#93C5FD" fontStyle="italic">[[mamá]]</tspan>
        <tspan>, le conté del</tspan>
      </text>
      <text
        x={SCREEN_PAD + 24}
        y={lineY(1) + 16}
        fontFamily="var(--font-serif)"
        fontSize="13"
        fill="#26241C"
      >
        café nuevo y del olor.
      </text>
      <text
        x={SCREEN_PAD + 24}
        y={lineY(2) + 16}
        fontFamily="var(--font-serif)"
        fontSize="13"
        fill="#26241C"
      >
        <tspan>el domingo voy a </tspan>
        <tspan fill="#93C5FD" fontStyle="italic">[[casa]]</tspan>
        <tspan>.</tspan>
      </text>
      <text
        x={SCREEN_PAD + 24}
        y={lineY(3) + 16}
        fontFamily="var(--font-pixel)"
        fontSize="10"
        letterSpacing="1.5"
        fill="#4A4738"
      >
        ↳ 2 BACKLINKS
      </text>
      {/* tags */}
      <g transform={`translate(${SCREEN_PAD + 22}, ${PHONE_H - 80})`}>
        {[
          { c: "#D68F94", l: "amor" },
          { c: "#C2A68F", l: "diario" },
        ].map((t, i) => (
          <g key={i} transform={`translate(${i * 76}, 0)`}>
            <rect width="70" height="22" rx="11" fill="#fff" stroke={t.c} strokeWidth="1" />
            <circle cx="11" cy="11" r="4" fill={t.c} />
            <text
              x="22"
              y="15"
              fontFamily="var(--font-pixel)"
              fontSize="10"
              letterSpacing="1.5"
              fill="#4A4738"
            >
              {t.l.toUpperCase()}
            </text>
          </g>
        ))}
      </g>
    </>
  );
}

function Constelacion() {
  const nodes = [
    { x: 70, y: 110, r: 4, lit: false, label: "infancia" },
    { x: 140, y: 70, r: 5, lit: true, label: "café" },
    { x: 210, y: 130, r: 4, lit: false },
    { x: 90, y: 200, r: 5, lit: true, label: "mamá" },
    { x: 175, y: 220, r: 4, lit: false },
    { x: 130, y: 290, r: 6, lit: true, label: "viaje" },
    { x: 215, y: 320, r: 3, lit: false },
    { x: 70, y: 340, r: 4, lit: false },
    { x: 180, y: 410, r: 4, lit: true, label: "casa" },
    { x: 90, y: 440, r: 3, lit: false },
  ];
  const edges = [
    [0, 1], [1, 2], [1, 3], [3, 5], [2, 4], [4, 5], [5, 6], [5, 8], [3, 7], [7, 9], [8, 9],
  ] as const;

  return (
    <>
      <rect
        x={SCREEN_PAD}
        y={SCREEN_PAD}
        width={SCREEN_W}
        height={SCREEN_H}
        fill="#050505"
      />
      <StatusBar />
      <text
        x={SCREEN_PAD + 22}
        y={SCREEN_PAD + 52}
        fontFamily="var(--font-serif)"
        fontSize="20"
        fontStyle="italic"
        fontWeight="300"
        fill="#F1ECD9"
      >
        constelación
      </text>
      <text
        x={SCREEN_PAD + 22}
        y={SCREEN_PAD + 70}
        fontFamily="var(--font-pixel)"
        fontSize="9"
        letterSpacing="2"
        fill="#40E0D0"
      >
        47 NOTAS · 112 VÍNCULOS
      </text>

      <g transform={`translate(${SCREEN_PAD}, ${SCREEN_PAD + 20})`}>
        {edges.map(([a, b], i) => {
          const na = nodes[a], nb = nodes[b];
          const lit = na.lit && nb.lit;
          return (
            <line
              key={i}
              x1={na.x}
              y1={na.y}
              x2={nb.x}
              y2={nb.y}
              stroke={lit ? "#40E0D0" : "#40E0D0"}
              strokeOpacity={lit ? 0.9 : 0.2}
              strokeWidth={lit ? 1.2 : 0.7}
            />
          );
        })}
        {nodes.map((n, i) => (
          <g key={i}>
            <circle
              cx={n.x}
              cy={n.y}
              r={n.r}
              fill={n.lit ? "#40E0D0" : "#F1ECD9"}
              opacity={n.lit ? 1 : 0.55}
            />
            {n.lit && (
              <circle
                cx={n.x}
                cy={n.y}
                r={n.r + 4}
                fill="none"
                stroke="#40E0D0"
                strokeOpacity="0.35"
              />
            )}
            {n.label && (
              <text
                x={n.x + 10}
                y={n.y + 4}
                fontFamily="var(--font-serif)"
                fontSize="10"
                fontStyle="italic"
                fill="#F1ECD9"
                opacity={n.lit ? 0.95 : 0.5}
              >
                {n.label}
              </text>
            )}
          </g>
        ))}
      </g>
    </>
  );
}

function Historia() {
  const items = [
    { y: 110, tag: "amor", c: "#D68F94", title: "domingo lento", date: "MAY 12" },
    { y: 180, tag: "ideas", c: "#D6B57A", title: "boceto de app", date: "ABR 28" },
    { y: 250, tag: "trabajo", c: "#7BA890", title: "primer demo", date: "ABR 04" },
    { y: 320, tag: "noche", c: "#6C7AA6", title: "luna llena", date: "MAR 22" },
    { y: 390, tag: "diario", c: "#C2A68F", title: "carta a mamá", date: "MAR 14" },
  ];
  return (
    <>
      <rect
        x={SCREEN_PAD}
        y={SCREEN_PAD}
        width={SCREEN_W}
        height={SCREEN_H}
        fill="#0A0A0A"
      />
      <StatusBar />
      <text
        x={SCREEN_PAD + 22}
        y={SCREEN_PAD + 56}
        fontFamily="var(--font-serif)"
        fontSize="22"
        fontStyle="italic"
        fontWeight="300"
        fill="#F1ECD9"
      >
        tu historia
      </text>
      <text
        x={SCREEN_PAD + 22}
        y={SCREEN_PAD + 74}
        fontFamily="var(--font-pixel)"
        fontSize="9"
        letterSpacing="2"
        fill="#40E0D0"
      >
        2026
      </text>

      {/* vertical line */}
      <line
        x1={SCREEN_PAD + 36}
        x2={SCREEN_PAD + 36}
        y1={SCREEN_PAD + 95}
        y2={PHONE_H - 60}
        stroke="#2A2A2A"
        strokeWidth="1"
      />

      {items.map((it, i) => (
        <g key={i} transform={`translate(${SCREEN_PAD + 36}, ${it.y})`}>
          <circle cx="0" cy="0" r="5" fill={it.c} />
          <text
            x="18"
            y="-4"
            fontFamily="var(--font-pixel)"
            fontSize="9"
            letterSpacing="2"
            fill={it.c}
          >
            {it.date}
          </text>
          <text
            x="18"
            y="14"
            fontFamily="var(--font-serif)"
            fontSize="14"
            fontStyle="italic"
            fill="#F1ECD9"
          >
            {it.title}
          </text>
          <text
            x="18"
            y="28"
            fontFamily="var(--font-sans)"
            fontSize="9"
            fill="#F1ECD9"
            opacity="0.45"
          >
            {it.tag}
          </text>
        </g>
      ))}
    </>
  );
}

function Vault() {
  return (
    <>
      <rect
        x={SCREEN_PAD}
        y={SCREEN_PAD}
        width={SCREEN_W}
        height={SCREEN_H}
        fill="#050505"
      />
      {/* aurora wash */}
      <defs>
        <linearGradient id="vaultWash" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(64,224,208,0.18)" />
          <stop offset="60%" stopColor="rgba(108,122,166,0.05)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </linearGradient>
      </defs>
      <rect
        x={SCREEN_PAD}
        y={SCREEN_PAD}
        width={SCREEN_W}
        height={SCREEN_H}
        fill="url(#vaultWash)"
      />
      <StatusBar />
      <text
        x={PHONE_W / 2}
        y={SCREEN_PAD + 70}
        textAnchor="middle"
        fontFamily="var(--font-pixel)"
        fontSize="9"
        letterSpacing="3"
        fill="#40E0D0"
      >
        VAULT
      </text>
      <text
        x={PHONE_W / 2}
        y={SCREEN_PAD + 96}
        textAnchor="middle"
        fontFamily="var(--font-serif)"
        fontSize="20"
        fontStyle="italic"
        fontWeight="300"
        fill="#F1ECD9"
      >
        lo íntimo queda íntimo.
      </text>

      {/* lock circle */}
      <g transform={`translate(${PHONE_W / 2}, ${PHONE_H / 2 - 20})`}>
        <circle r="74" fill="none" stroke="#40E0D0" strokeOpacity="0.18" />
        <circle r="58" fill="none" stroke="#40E0D0" strokeOpacity="0.35" />
        <circle r="42" fill="#0A0A0A" stroke="#40E0D0" strokeOpacity="0.6" />
        <g transform="translate(0, 0)">
          <rect x="-12" y="-4" width="24" height="22" rx="3" fill="#40E0D0" />
          <path
            d="M -7 -4 L -7 -11 A 7 7 0 0 1 7 -11 L 7 -4"
            stroke="#40E0D0"
            strokeWidth="2.5"
            fill="none"
          />
        </g>
      </g>

      {/* fake numeric pad row */}
      <g transform={`translate(${SCREEN_PAD + 24}, ${PHONE_H - 130})`}>
        {[1, 2, 3, 4, 5, 6].map((n, i) => (
          <g key={n} transform={`translate(${i * 38}, 0)`}>
            <circle cx="12" cy="12" r="11" fill="none" stroke="#40E0D0" strokeOpacity="0.35" />
            <text
              x="12"
              y="16"
              textAnchor="middle"
              fontFamily="var(--font-pixel)"
              fontSize="12"
              fill="#F1ECD9"
            >
              ·
            </text>
          </g>
        ))}
      </g>
    </>
  );
}

function Editor() {
  return (
    <>
      <rect
        x={SCREEN_PAD}
        y={SCREEN_PAD}
        width={SCREEN_W}
        height={SCREEN_H}
        fill="#F1ECD9"
      />
      {Array.from({ length: 14 }).map((_, i) => (
        <line
          key={i}
          x1={SCREEN_PAD + 18}
          x2={SCREEN_PAD + SCREEN_W - 18}
          y1={SCREEN_PAD + 130 + i * 26}
          y2={SCREEN_PAD + 130 + i * 26}
          stroke="#B8AE8F"
          strokeOpacity="0.35"
        />
      ))}

      {/* top bar */}
      <g transform={`translate(${SCREEN_PAD + 20}, ${SCREEN_PAD + 38})`}>
        <text
          fontFamily="var(--font-pixel)"
          fontSize="10"
          letterSpacing="2"
          fill="#4A4738"
        >
          NUEVA NOTA
        </text>
      </g>
      <line
        x1={SCREEN_PAD + 20}
        x2={SCREEN_PAD + SCREEN_W - 20}
        y1={SCREEN_PAD + 52}
        y2={SCREEN_PAD + 52}
        stroke="#B8AE8F"
        strokeOpacity="0.6"
      />

      {/* title */}
      <text
        x={SCREEN_PAD + 22}
        y={SCREEN_PAD + 98}
        fontFamily="var(--font-serif)"
        fontSize="24"
        fontStyle="italic"
        fontWeight="400"
        fill="#26241C"
      >
        idea — café
      </text>

      {/* body */}
      {[
        "abrir a las 7, cierre 22.",
        "pan de masa madre los",
        "viernes. discos de jazz",
        "en vinilo. nada de wifi.",
      ].map((t, i) => (
        <text
          key={i}
          x={SCREEN_PAD + 22}
          y={SCREEN_PAD + 146 + i * 26}
          fontFamily="var(--font-serif)"
          fontSize="13"
          fill="#26241C"
        >
          {t}
        </text>
      ))}

      {/* blinking cursor */}
      <rect
        x={SCREEN_PAD + 22 + 162}
        y={SCREEN_PAD + 146 + 3 * 26 - 12}
        width="1.5"
        height="16"
        fill="#40E0D0"
      >
        <animate attributeName="opacity" values="1;0;1" dur="1.1s" repeatCount="indefinite" />
      </rect>

      {/* bottom toolbar */}
      <g transform={`translate(${SCREEN_PAD + 18}, ${PHONE_H - 64})`}>
        <rect width={SCREEN_W - 36} height="36" rx="10" fill="#26241C" />
        {["B", "I", "·", "#", "★"].map((g, i) => (
          <text
            key={i}
            x={26 + i * 42}
            y="24"
            textAnchor="middle"
            fontFamily="var(--font-serif)"
            fontSize="14"
            fill="#F1ECD9"
            fontStyle={g === "I" ? "italic" : "normal"}
            fontWeight={g === "B" ? 700 : 400}
          >
            {g}
          </text>
        ))}
        <g transform={`translate(${SCREEN_W - 36 - 60}, 6)`}>
          <rect width="52" height="24" rx="6" fill="#40E0D0" />
          <text
            x="26"
            y="16"
            textAnchor="middle"
            fontFamily="var(--font-sans)"
            fontSize="10"
            fontWeight="700"
            fill="#26241C"
          >
            GUARDAR
          </text>
        </g>
      </g>
    </>
  );
}

const VARIANTS: Record<PhoneVariant, () => ReactNode> = {
  inicio: Inicio,
  biblioteca: Biblioteca,
  diario: Diario,
  constelacion: Constelacion,
  historia: Historia,
  vault: Vault,
  editor: Editor,
};

function PhoneMockupImpl({ variant, label, caption, index }: Props) {
  const render = VARIANTS[variant];
  return (
    <figure
      className="tilt-item phone-glow shrink-0 snap-center"
      style={{
        ["--i" as string]: index,
        transform: `translateY(${(index % 2 === 0 ? -1 : 1) * 14}px)`,
      }}
    >
      <div className="relative">
        <div className="absolute -inset-6 -z-10 rounded-[48px] bg-[radial-gradient(ellipse_at_center,_rgba(64,224,208,0.18)_0%,_transparent_60%)]" />
        <Frame>{render()}</Frame>
      </div>
    </figure>
  );
}

const PhoneMockup = memo(PhoneMockupImpl);
export default PhoneMockup;
