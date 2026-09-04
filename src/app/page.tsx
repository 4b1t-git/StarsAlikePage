import Link from "next/link";
import StarryBackground from "@/components/StarryBackground";
import MarqueeTags from "@/components/MarqueeTags";
import ThemeCarousel from "@/components/ThemeCarousel";
import PullQuote from "@/components/PullQuote";
import DeferredEditorMockup from "@/components/DeferredEditorMockup";
import WikilinkExplanation from "@/components/WikilinkExplanation";
import PlayStoreLink from "@/components/PlayStoreLink";
import HeroProductPreview from "@/components/HeroProductPreview";
import HeroPhonePreview from "@/components/HeroPhonePreview";
import {
  FaqSection,
  FinalReleaseCta,
  HowItWorks,
  ProductPillars,
  TrustSection,
} from "@/components/ReleaseSections";

const CONFIDENCE_POINTS = [
  "Android",
  "Sin feed público",
  "Bóveda + bloqueo",
  "Exportación PDF",
] as const;

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

        <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.07] bg-cosmos-void/95 px-5 py-3 sm:px-7">
          <div className="mx-auto flex h-11 max-w-7xl items-center justify-between">
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
              <div className="hidden items-center gap-6 lg:flex">
                <a
                  className="text-sm font-medium text-paper-bright/60 transition hover:text-paper-bright"
                  href="#como-funciona"
                >
                  Cómo funciona
                </a>
                <a
                  className="text-sm font-medium text-paper-bright/60 transition hover:text-paper-bright"
                  href="#capturas"
                >
                  Producto
                </a>
                <a
                  className="text-sm font-medium text-paper-bright/60 transition hover:text-paper-bright"
                  href="#preguntas"
                >
                  Preguntas
                </a>
              </div>
              <PlayStoreLink compact />
            </nav>
          </div>
        </header>

        <div className="relative z-10 mx-auto max-w-6xl px-5 pb-10 pt-32 sm:px-6 sm:pb-16 sm:pt-40">
          <div className="mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-[minmax(0,1fr)_270px] lg:gap-14">
            <div className="text-center lg:text-left">
              <p className="animate-fade-up inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-star/80 sm:text-xs">
                <span aria-hidden="true">✦</span>
                Para quienes piensan mientras escriben
              </p>

              <h1 className="mt-6 text-balance text-[clamp(3.15rem,6vw,5.65rem)] font-medium leading-[0.94] tracking-[-0.05em] text-paper-bright">
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
                className="animate-fade-up mx-auto mt-6 max-w-xl text-base leading-7 text-paper-bright/65 sm:text-lg sm:leading-8 lg:mx-0"
                style={{ animationDelay: "300ms" }}
              >
                Stars Alike es una app de notas para Android: escribe sin
                distracciones, conecta páginas y vuelve a encontrar las ideas que
                importan.
              </p>

              <div
                className="animate-fade-up mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start"
                style={{ animationDelay: "240ms" }}
              >
                <PlayStoreLink />
                <a
                  href="#como-funciona"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/[0.035] px-5 py-3 text-sm font-semibold text-paper-bright/85 transition hover:border-star/45 hover:bg-star/[0.06] hover:text-paper-bright"
                >
                  Descubrir cómo funciona <span aria-hidden="true">↓</span>
                </a>
              </div>
            </div>

            <HeroPhonePreview
              className="pointer-events-none mx-auto w-[210px] sm:w-[240px] lg:w-[270px]"
            />
          </div>

          <HeroProductPreview />
        </div>
      </section>

      <section
        aria-label="Lo esencial de Stars Alike"
        className="relative border-b border-white/[0.06] px-6"
      >
        <ul className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-y divide-white/[0.07] border-x border-white/[0.07] sm:grid-cols-4 sm:divide-y-0">
          {CONFIDENCE_POINTS.map((point) => (
            <li
              key={point}
              className="flex min-h-16 items-center justify-center gap-2 px-3 text-center font-[family-name:var(--font-pixel)] text-[11px] uppercase tracking-[0.16em] text-paper-bright/55 sm:min-h-20 sm:text-xs"
            >
              <span aria-hidden="true" className="text-star">
                ✦
              </span>
              {point}
            </li>
          ))}
        </ul>
      </section>

      {/* PRODUCT VALUE ────────────────────────────── */}
      <ProductPillars />

      {/* EDITOR MOCKUP ───────────────────────────── */}
      <section id="capturas" className="cv-auto relative px-6 pt-12 pb-20 sm:pt-16 sm:pb-32">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow">CAPTURAS</p>
              <h2 className="mt-3 font-[family-name:var(--font-serif)] font-light text-4xl sm:text-6xl text-paper-bright leading-[1.05] text-balance">
                Escribe
                <br />
                <span className="editorial-italic text-star">a tu manera.</span>
              </h2>
            </div>
            <p className="max-w-sm leading-relaxed text-paper-bright/70">
              Un editor por bloques que se adapta a lo que necesitas. Da
              formato, añade imágenes y conecta páginas con{" "}
              <WikilinkExplanation>wikilinks</WikilinkExplanation> sin romper
              el ritmo de lo que estás escribiendo.
            </p>
          </div>
        </div>
        <DeferredEditorMockup />
      </section>

      {/* HOW IT WORKS ────────────────────────────── */}
      <HowItWorks />

      {/* THEME CAROUSEL ──────────────────────────── */}
      <ThemeCarousel />

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
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/privacidad"
                className="inline-flex items-center gap-2 rounded-full border border-star/35 bg-star/[0.06] px-4 py-2 font-[family-name:var(--font-pixel)] text-xs uppercase tracking-[0.2em] text-star transition hover:border-star/70 hover:bg-star/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-star focus-visible:ring-offset-2 focus-visible:ring-offset-cosmos-void"
              >
                Privacidad <span aria-hidden="true">→</span>
              </Link>
              <a
                href="mailto:starsalike.soporte@gmail.com"
                className="inline-flex items-center rounded-full border border-white/15 px-4 py-2 font-[family-name:var(--font-pixel)] text-xs uppercase tracking-[0.2em] text-paper-bright/65 transition hover:border-white/30 hover:text-paper-bright"
              >
                Soporte
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-10 gap-y-2 text-xs font-medium tracking-[0.12em] uppercase text-paper-bright/60 sm:grid-cols-3">
            <a className="transition hover:text-star" href="#inicio">
              inicio
            </a>
            <a className="transition hover:text-star" href="#funciones">
              funciones
            </a>
            <a className="transition hover:text-star" href="#como-funciona">
              cómo funciona
            </a>
            <a className="transition hover:text-star" href="#capturas">
              producto
            </a>
            <a
              className="transition hover:text-star"
              href="#personalizacion"
            >
              temas
            </a>
            <a className="transition hover:text-star" href="#preguntas">
              preguntas
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
