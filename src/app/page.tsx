import Link from "next/link";
import StarryBackground from "@/components/StarryBackground";
import MarqueeTags from "@/components/MarqueeTags";
import ThemeCarousel from "@/components/ThemeCarousel";
import PullQuote from "@/components/PullQuote";
import EditorMockup from "@/components/EditorMockup";
import WikilinkExplanation from "@/components/WikilinkExplanation";
import PlayStoreLink from "@/components/PlayStoreLink";
import HeroProductPreview from "@/components/HeroProductPreview";
import {
  FaqSection,
  FinalReleaseCta,
  ProductPillars,
  TrustSection,
} from "@/components/ReleaseSections";

export default function HomePage() {
  return (
    <main className="relative isolate flex-1">
      {/* HERO ───────────────────────────────────── */}
      <section
        id="inicio"
        className="relative overflow-hidden border-b border-white/[0.06]"
      >
        <div className="absolute inset-0 opacity-40 sm:opacity-50">
          <StarryBackground mode="hero" />
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 75% 52% at 50% 48%, color-mix(in oklab, var(--color-star), transparent 94%) 0%, transparent 72%), linear-gradient(to bottom, rgba(5,5,5,0.18), #050505 94%)",
          }}
        />

        <header className="absolute inset-x-0 top-0 z-30 px-5 pt-5 sm:px-7">
          <div className="mx-auto flex h-10 max-w-7xl items-center justify-between">
            <a
              href="#inicio"
              aria-label="Volver al inicio"
              className="group flex items-center gap-2.5 text-paper-bright"
            >
              <span
                aria-hidden="true"
                className="text-lg text-star transition-transform duration-500 group-hover:rotate-45"
              >
                ✦
              </span>
              <span className="font-[family-name:var(--font-serif)] text-lg italic sm:text-xl">
                stars alike
              </span>
            </a>

            <nav aria-label="Navegación principal" className="flex items-center gap-5">
              <a
                className="hidden text-sm font-medium text-paper-bright/60 transition hover:text-paper-bright sm:block"
                href="#funciones"
              >
                Funciones
              </a>
              <PlayStoreLink compact />
            </nav>
          </div>
        </header>

        <div className="relative z-10 mx-auto max-w-6xl px-5 pb-10 pt-32 sm:px-6 sm:pb-16 sm:pt-40">
          <div className="mx-auto max-w-5xl text-center">
            <p className="animate-fade-up inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-star/80 sm:text-xs">
              <span aria-hidden="true">✦</span>
              Notas que conectan contigo
            </p>

            <h1 className="mt-6 text-balance text-[clamp(3.15rem,6.6vw,6.4rem)] font-medium leading-[0.94] tracking-[-0.05em] text-paper-bright">
              <span className="animate-fade-up block">
                Tus ideas tienen una forma.
              </span>
              <span
                className="cozy-hero-wipe editorial-italic animate-fade-up mt-2 block tracking-[-0.035em]"
                style={{ animationDelay: "180ms" }}
              >
                Hazla visible.
              </span>
            </h1>

            <p
              className="animate-fade-up mx-auto mt-6 max-w-xl text-base leading-7 text-paper-bright/65 sm:text-lg sm:leading-8"
              style={{ animationDelay: "300ms" }}
            >
              Escribe sin distracciones, conecta tus pensamientos y mira cómo
              tu constelación crece contigo.
            </p>

            <div
              className="animate-fade-up mt-8 flex items-center justify-center"
              style={{ animationDelay: "420ms" }}
            >
              <PlayStoreLink />
            </div>
          </div>

          <HeroProductPreview />
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
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-star/35 bg-star/[0.06] px-4 py-2 font-[family-name:var(--font-pixel)] text-xs uppercase tracking-[0.2em] text-star transition hover:border-star/70 hover:bg-star/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-star focus-visible:ring-offset-2 focus-visible:ring-offset-cosmos-void"
            >
              Política de privacidad
              <span aria-hidden="true">→</span>
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
