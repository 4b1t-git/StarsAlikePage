const NOISE_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'>
  <filter id='n'>
    <feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/>
    <feColorMatrix values='0 0 0 0 0.95
                            0 0 0 0 0.92
                            0 0 0 0 0.82
                            0 0 0 0.6 0'/>
  </filter>
  <rect width='100%' height='100%' filter='url(#n)'/>
</svg>`;

const ENCODED = `url("data:image/svg+xml;utf8,${encodeURIComponent(NOISE_SVG)}")`;

export default function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage: ENCODED,
        backgroundSize: "220px 220px",
        opacity: "var(--noise-opacity)",
        mixBlendMode: "overlay",
      }}
    />
  );
}
