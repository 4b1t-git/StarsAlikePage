import { ImageResponse } from "next/og";

export const alt = "Stars Alike — Una app de notas con personalidad";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const VOID = "#050505";
const STAR = "#40E0D0";
const PAPER = "#F1ECD9";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: `radial-gradient(120% 120% at 18% 12%, #0d1a1a 0%, ${VOID} 55%)`,
          color: PAPER,
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: STAR,
            fontSize: 26,
            letterSpacing: 8,
            textTransform: "uppercase",
            fontFamily: "monospace",
          }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24">
            <path
              d="M12 0 C12 10 14 12 24 12 C14 12 12 14 12 24 C12 14 10 12 0 12 C10 12 12 10 12 0 Z"
              fill={STAR}
            />
          </svg>
          <span>Stars Alike · Alpha 2026</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 92,
              lineHeight: 1.0,
              fontWeight: 300,
              letterSpacing: -2,
            }}
          >
            Una app de notas
          </div>
          <div
            style={{
              fontSize: 92,
              lineHeight: 1.05,
              fontWeight: 300,
              fontStyle: "italic",
              color: STAR,
              letterSpacing: -2,
            }}
          >
            con tu personalidad.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            color: "rgba(241,236,217,0.7)",
            fontSize: 28,
          }}
        >
          <span style={{ maxWidth: 720 }}>
            Diario · Constelación · Tu Historia. Sin algoritmo, sin feed.
          </span>
          <span
            style={{
              fontFamily: "monospace",
              fontSize: 22,
              letterSpacing: 4,
              color: "rgba(241,236,217,0.5)",
            }}
          >
            android
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
