const TENETS = [
  {
    n: "01",
    t: "Sin algoritmo, sin feed. Compartís diarios uno a uno, con quien quieras.",
  },
  {
    n: "02",
    t: "Capas que se desbloquean con uso: temas, layouts, vault, achievements.",
  },
  {
    n: "03",
    t: "Tus wikilinks dibujan el grafo. Vos sólo escribís entre [[corchetes]].",
  },
];

export default function PullQuote() {
  return (
    <section className="cv-auto relative px-6 py-32 sm:py-40">
      <div className="mx-auto max-w-5xl text-center">
        <p className="eyebrow">MANIFIESTO</p>
        <h2 className="mt-6 font-[family-name:var(--font-serif)] font-light leading-[0.95] text-balance text-paper-bright text-[clamp(2.75rem,8vw,6rem)]">
          Algo duradero.
          <br />
          <span className="relative inline-block">
            <span
              aria-hidden
              className="absolute inset-x-0 bottom-2 h-[0.55em] -z-0 paper opacity-90"
              style={{ transform: "translateY(6px) skewX(-3deg)" }}
            />
            <span className="relative editorial-italic text-cosmos-void">
              &nbsp;Algo tuyo.&nbsp;
            </span>
          </span>
        </h2>

        <div className="mt-16 grid gap-8 text-left sm:grid-cols-3">
          {TENETS.map((t) => (
            <div key={t.n} className="border-t border-cosmos-fog pt-4">
              <span className="font-[family-name:var(--font-pixel)] text-xs tracking-[0.3em] text-star">
                {t.n}
              </span>
              <p className="mt-3 font-[family-name:var(--font-serif)] text-xl text-paper-bright/85 leading-snug">
                {t.t}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
