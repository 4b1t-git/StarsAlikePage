import StarryBackground from "@/components/StarryBackground";
import BlackHoleVideo from "@/components/BlackHoleVideo";
import EmailCapture from "@/components/EmailCapture";
import PhoneMockupGallery from "@/components/PhoneMockupGallery";
import ConstellationShowcase from "@/components/ConstellationShowcase";
import MarqueeTags from "@/components/MarqueeTags";
import PullQuote from "@/components/PullQuote";
import VerticalTicker from "@/components/VerticalTicker";

const HERO_WORDS = ["Una", "app", "de", "notas"];
const HERO_WORDS_TWO = ["con", "personalidad."];

export default function HomePage() {
  return (
    <main className="relative isolate flex-1">
      {/* HERO ───────────────────────────────────── */}
      <section className="relative min-h-[100svh] overflow-hidden">
        <div className="absolute inset-0">
          <StarryBackground mode="hero" showBlackHole videoBlackHole />
        </div>
        <BlackHoleVideo />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-transparent via-cosmos-void/30 to-cosmos-void"
        />

        <VerticalTicker />

        <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-6xl grid-cols-12 gap-6 px-6 pt-28 pb-24 sm:pt-32">
          {/* Top eyebrow */}
          <div className="col-span-12 flex items-center justify-between">
            <p className="eyebrow">STARS ALIKE · ALPHA 2026</p>
            <p className="hidden font-[family-name:var(--font-pixel)] text-xs tracking-[0.3em] uppercase text-paper-bright/45 sm:block">
              waitlist · android · sin spam
            </p>
          </div>

          {/* Headline — right-aligned to clear the upper-left black hole */}
          <div className="col-span-12 mt-auto sm:col-span-10 sm:col-start-3 sm:text-right">
            <p className="font-[family-name:var(--font-pixel)] text-[10px] tracking-[0.4em] uppercase text-star/80">
              LÍNEA 01 — 02
            </p>
            <h1 className="word-reveal mt-3 overflow-hidden font-[family-name:var(--font-serif)] font-light leading-[0.94] tracking-tight text-paper-bright text-[clamp(3rem,9vw,8.5rem)]">
              {HERO_WORDS.map((w, i) => (
                <span
                  key={i}
                  style={{ ["--i" as string]: i }}
                  className="mr-[0.25em]"
                >
                  {w}
                </span>
              ))}
              <br />
              {HERO_WORDS_TWO.map((w, i) => (
                <span
                  key={i}
                  style={{ ["--i" as string]: HERO_WORDS.length + i }}
                  className="editorial-italic mr-[0.18em] text-star"
                >
                  {w}
                </span>
              ))}
            </h1>

            <p
              className="word-reveal mt-8 ml-auto max-w-2xl text-lg sm:text-xl text-paper-bright/75 leading-relaxed"
              style={{ ["--i" as string]: 6 }}
            >
              <span>
                Diarios con bloques. Wikilinks entre páginas. Un grafo que se
                dibuja con tu uso. Sin algoritmo, sin feed — solo lo que
                escribís y a quién querés mostrárselo.
              </span>
            </p>

            <div
              className="word-reveal mt-10 ml-auto max-w-xl"
              style={{ ["--i" as string]: 8 }}
            >
              <span className="block">
                <EmailCapture />
              </span>
            </div>
          </div>

          {/* Bottom meta */}
          <div className="col-span-12 mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { k: "v 0.1", v: "construyendo despacio" },
              { k: "✦", v: "sin algoritmo, sin feed" },
              { k: "wikilinks", v: "[[así, entre páginas]]" },
              { k: "android", v: "ios pronto" },
            ].map((it) => (
              <div key={it.v} className="border-t border-cosmos-fog pt-3">
                <p className="font-[family-name:var(--font-pixel)] text-xs tracking-[0.3em] uppercase text-star/80">
                  {it.k}
                </p>
                <p className="mt-1 text-sm text-paper-bright/70">{it.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MARQUEE ─────────────────────────────────── */}
      <MarqueeTags />

      {/* CONSTELLATION ──────────────────────────── */}
      <ConstellationShowcase />

      {/* PHONE GALLERY ──────────────────────────── */}
      <section id="capturas" className="cv-auto relative px-6 py-28 sm:py-36">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow">CAPTURAS</p>
              <h2 className="mt-3 font-[family-name:var(--font-serif)] font-light text-4xl sm:text-6xl text-paper-bright leading-[1.05] text-balance">
                Una app entera,
                <br />
                <span className="editorial-italic text-star">por dentro.</span>
              </h2>
            </div>
            <p className="max-w-sm text-paper-bright/65 leading-relaxed">
              Bienvenida con agujero negro. Galería de diarios con portadas de
              Unsplash. Editor de bloques. Constelación con backlinks. Tu
              Historia como cúmulo de estrellas. Vault. Deslizá lateralmente.
            </p>
          </div>
        </div>
        <PhoneMockupGallery />
        <div className="mx-auto mt-8 max-w-6xl">
          <p className="font-[family-name:var(--font-pixel)] text-xs tracking-[0.3em] uppercase text-paper-bright/40">
            ← deslizá → · 06 capturas
          </p>
        </div>
      </section>

      {/* PULL QUOTE ──────────────────────────────── */}
      <PullQuote />

      {/* CTA ─────────────────────────────────────── */}
      <section className="cv-auto relative px-6 py-32 sm:py-40">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">CUANDO SALGA</p>
          <h2 className="mt-4 font-[family-name:var(--font-serif)] font-light text-4xl sm:text-6xl text-paper-bright leading-[1.05] text-balance">
            Cuando salga,
            <br />
            <span className="editorial-italic text-star">te llega una estrella.</span>
          </h2>
          <p className="mt-6 text-paper-bright/65">
            Un solo correo, el día del lanzamiento. Nada más.
          </p>

          <div className="relative mt-12">
            {/* Orbit ring */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 -top-10 mx-auto h-[420px] max-w-[420px]"
            >
              <svg viewBox="0 0 420 420" className="h-full w-full animate-orbit">
                <circle
                  cx="210"
                  cy="210"
                  r="190"
                  fill="none"
                  stroke="var(--color-star-soft)"
                  strokeDasharray="2 8"
                />
                {Array.from({ length: 6 }).map((_, i) => {
                  const angle = (i / 6) * Math.PI * 2;
                  const x = 210 + Math.cos(angle) * 190;
                  const y = 210 + Math.sin(angle) * 190;
                  return (
                    <circle
                      key={i}
                      cx={x}
                      cy={y}
                      r="4"
                      fill="var(--color-star)"
                    />
                  );
                })}
              </svg>
            </div>
            <div className="relative">
              <EmailCapture />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER ──────────────────────────────────── */}
      <footer className="relative border-t border-cosmos-fog/60 px-6 py-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-[family-name:var(--font-serif)] italic text-2xl text-paper-bright">
              stars alike
            </p>
            <p className="mt-1 font-[family-name:var(--font-pixel)] text-xs tracking-[0.3em] uppercase text-paper-bright/50">
              hecho con cariño · 2026
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-10 gap-y-2 text-xs font-[family-name:var(--font-pixel)] tracking-[0.25em] uppercase text-paper-bright/55 sm:grid-cols-3">
            <span>android · alpha</span>
            <span>sin algoritmo</span>
            <span>sin feed</span>
            <span>vault + app lock</span>
            <span>capas que crecen</span>
            <span>· ✦ ·</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
