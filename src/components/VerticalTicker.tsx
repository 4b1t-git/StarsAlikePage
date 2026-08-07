const ITEMS = [
  "disponible ahora",
  "android",
  "diseñado a mano",
  "escribe y conecta",
  "sin algoritmo",
  "sin feed",
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
