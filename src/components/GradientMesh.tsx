export default function GradientMesh() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage: `
          radial-gradient(ellipse 70% 60% at 20% 30%, var(--mesh-2) 0%, transparent 65%),
          radial-gradient(ellipse 60% 55% at 78% 22%, var(--mesh-1) 0%, transparent 65%),
          radial-gradient(ellipse 65% 50% at 30% 78%, var(--mesh-3) 0%, transparent 65%),
          radial-gradient(ellipse 60% 55% at 82% 70%, var(--mesh-4) 0%, transparent 65%)
        `,
        backgroundSize: "160% 160%, 150% 150%, 170% 160%, 150% 150%",
        backgroundRepeat: "no-repeat",
        animation: "meshDrift 60s ease-in-out infinite",
        mixBlendMode: "screen",
        opacity: 0.45,
        willChange: "background-position",
      }}
    />
  );
}
