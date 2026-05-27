const ITEMS = [
  "alpha 2026",
  "android",
  "lista de espera",
  "construido despacio",
  "diseñado a mano",
  "sin algoritmo",
  "sin spam",
  "stars alike",
];

export default function VerticalTicker() {
  const loop = [...ITEMS, ...ITEMS];
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-6 top-0 hidden h-full w-[18px] overflow-hidden lg:block"
    >
      <div
        className="animate-ticker flex flex-col gap-12 pt-[20vh] text-[10px] uppercase tracking-[0.4em] text-paper-bright/35"
        style={{
          writingMode: "vertical-rl",
          fontFamily: "var(--font-pixel)",
        }}
      >
        {loop.map((t, i) => (
          <span key={i} className="whitespace-nowrap">
            {t} · ✦
          </span>
        ))}
      </div>
    </div>
  );
}
