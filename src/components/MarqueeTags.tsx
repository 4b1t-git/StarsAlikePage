const TAGS = [
  { label: "Amor", color: "var(--color-tag-love)" },
  { label: "Sueños", color: "var(--color-tag-dream)" },
  { label: "Trabajo", color: "var(--color-tag-work)" },
  { label: "Ideas", color: "var(--color-tag-idea)" },
  { label: "Lugar", color: "var(--color-tag-place)" },
  { label: "Noche", color: "var(--color-tag-night)" },
  { label: "Diario", color: "var(--color-tag-diary)" },
];

export default function MarqueeTags() {
  const items = [...TAGS, ...TAGS];
  return (
    <section
      aria-label="Etiquetas de Stars Alike"
      className="relative overflow-hidden border-y border-cosmos-fog/60 bg-cosmos-void/40 py-10 backdrop-blur-[2px]"
    >
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap hover:[animation-play-state:paused]">
        {items.map((t, i) => (
          <div
            key={`${t.label}-${i}`}
            className="flex items-center gap-12 text-5xl sm:text-7xl"
          >
            <span
              className="editorial-italic"
              style={{ color: t.color }}
            >
              {t.label}
            </span>
            <span className="font-[family-name:var(--font-pixel)] text-2xl text-paper-bright/40">
              ✦
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
