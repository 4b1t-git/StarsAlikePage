import Link from "next/link";
import StarryBackground from "@/components/StarryBackground";
import MarqueeTags from "@/components/MarqueeTags";
import ThemeCarousel from "@/components/ThemeCarousel";
import PullQuote from "@/components/PullQuote";
import EditorMockup from "@/components/EditorMockup";
import VerticalTicker from "@/components/VerticalTicker";
import WikilinkExplanation from "@/components/WikilinkExplanation";
import PlayStoreLink from "@/components/PlayStoreLink";
import {
  FaqSection,
  FinalReleaseCta,
  ProductPillars,
  TrustSection,
} from "@/components/ReleaseSections";

const HERO_WORDS = ["Una", "app", "de", "notas"];
const HERO_COZY_LINE = "con tu personalidad.";

export default function HomePage() {
  return (
    <main className="relative isolate flex-1">
      {/* HERO ───────────────────────────────────── */}
      <section id="inicio" className="relative min-h-[100svh] overflow-hidden">
        <div className="absolute inset-0">
          <StarryBackground mode="hero" />
        </div>

        <VerticalTicker />

        <header className="absolute inset-x-0 top-0 z-30 px-6">
          <div className="mx-auto flex h-24 max-w-6xl items-center justify-between border-b border-white/10">
            <a
              href="#inicio"
              aria-label="Volver al inicio"
              className="group flex items-center gap-3 text-paper-bright"
            >
              <span
                aria-hidden="true"
                className="text-xl text-star transition-transform duration-500 group-hover:rotate-45"
              >
                ✦
              </span>
              <span className="font-[family-name:var(--font-serif)] text-xl italic">
                stars alike
              </span>
            </a>

            <nav
              aria-label="Navegación principal"
              className="hidden items-center gap-8 text-sm text-paper-bright/65 md:flex"
            >
              <a className="transition hover:text-star" href="#funciones">
                Funciones
              </a>
              <a className="transition hover:text-star" href="#personalizacion">
                Personalización
              </a>
              <a className="transition hover:text-star" href="#privacidad">
                Privacidad
              </a>
            </nav>

            <PlayStoreLink compact className="min-h-10 rounded-xl" />
          </div>
        </header>

        <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-6xl grid-cols-12 gap-6 px-6 pb-24 pt-32 sm:pt-36">
          {/* Top eyebrow */}
          <div className="col-span-12 flex items-center justify-between">
            <p className="eyebrow">DISPONIBLE EN ANDROID</p>
            <p className="hidden font-[family-name:var(--font-pixel)] text-xs tracking-[0.3em] uppercase text-paper-bright/60 sm:block">
              GOOGLE PLAY · YA DISPONIBLE
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
              <span
                className="cozy-phrase-reveal"
                style={{ animationDelay: "1500ms" }}
              >
                <span className="cozy-hero-wipe editorial-italic">
                  {HERO_COZY_LINE}
                </span>
              </span>
            </h1>

            <p
              className="word-reveal mt-8 ml-auto max-w-2xl text-lg sm:text-xl text-paper-bright/75 leading-relaxed"
            >
              <span style={{ animationDelay: "1500ms" }}>
                Escribe sin distracciones, conecta páginas con wikilinks y
                convierte tus ideas en una constelación. Personaliza cada
                rincón y comparte solo cuando tú quieras.
              </span>
            </p>

            <div className="word-reveal mt-10 ml-auto max-w-2xl">
              <span style={{ animationDelay: "1500ms" }}>
                <span className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-end">
                  <a
                    href="#funciones"
                    className="order-2 inline-flex min-h-12 items-center justify-center gap-2 px-3 text-sm font-semibold text-paper-bright/75 transition hover:text-star sm:order-1"
                  >
                    Conocer la app <span aria-hidden="true">↓</span>
                  </a>
                  <PlayStoreLink className="order-1 sm:order-2" />
                </span>
              </span>
            </div>
          </div>

          {/* Bottom meta */}
          <div className="col-span-12 mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { k: "android", v: "disponible ahora" },
              { k: "✦", v: "sin algoritmo, sin feed" },
              {
                k: "wikilinks",
                v: (
                  <WikilinkExplanation>
                    [[así, entre páginas]]
                  </WikilinkExplanation>
                ),
              },
              { k: "privado", v: "vault + app lock" },
            ].map((it, idx) => (
              <div key={idx} className="border-t border-cosmos-fog pt-3">
                <p className="font-[family-name:var(--font-pixel)] text-xs tracking-[0.3em] uppercase text-star/80">
                  {it.k}
                </p>
                <p className="mt-1 text-sm text-paper-bright/70">{it.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT VALUE ────────────────────────────── */}
      <ProductPillars />

      {/* THEME CAROUSEL ──────────────────────────── */}
      <ThemeCarousel />

      {/* PHONE GALLERY ──────────────────────────── */}
      <section id="capturas" className="cv-auto relative px-6 py-28 sm:py-36">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow">CAPTURAS</p>
              <h2 className="mt-3 font-[family-name:var(--font-serif)] font-light text-4xl sm:text-6xl text-paper-bright leading-[1.05] text-balance">
                Escrituras
                <br />
                <span className="editorial-italic text-star">a tu medida.</span>
              </h2>
            </div>
            <p className="max-w-sm leading-relaxed text-paper-bright/70">
              Un potente editor fluido e intuitivo basado en bloques, pensado
              para que tus ideas tomen forma sin distracciones. Añade textos,
              listas y aplica formatos ricos a tu ritmo. Conecta tus
              pensamientos fácilmente usando{" "}
              <WikilinkExplanation>wikilinks</WikilinkExplanation> entre
              páginas, y observa cómo tus etiquetas cobran vida y enriquecen
              tu constelación mientras escribes.
            </p>
          </div>
        </div>
        <EditorMockup />
      </section>

      {/* MARQUEE ─────────────────────────────────── */}
      <MarqueeTags />

      {/* TRUST ───────────────────────────────────── */}
      <TrustSection />

      {/* PULL QUOTE ──────────────────────────────── */}
      <PullQuote />

      {/* FAQ + RELEASE CTA ───────────────────────── */}
      <FaqSection />
      <FinalReleaseCta />

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
            <Link
              href="/privacidad"
              className="mt-3 inline-block font-[family-name:var(--font-pixel)] text-xs tracking-[0.3em] uppercase text-paper-bright/55 underline-offset-4 hover:text-star hover:underline"
            >
              privacidad
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-x-10 gap-y-2 text-xs font-medium tracking-[0.12em] uppercase text-paper-bright/60 sm:grid-cols-3">
            <a className="transition hover:text-star" href="#inicio">
              inicio
            </a>
            <a className="transition hover:text-star" href="#funciones">
              funciones
            </a>
            <a
              className="transition hover:text-star"
              href="#personalizacion"
            >
              temas
            </a>
            <span>sin algoritmo</span>
            <span>sin feed</span>
            <span>vault + app lock</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
