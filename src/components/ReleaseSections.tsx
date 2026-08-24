import Link from "next/link";
import PlayStoreLink from "@/components/PlayStoreLink";

const PILLARS = [
  {
    n: "01",
    title: "Escribe sin fricción.",
    body: "Un editor por bloques para texto, listas, formato enriquecido, imágenes y dictado. La herramienta aparece cuando la necesitas y se aparta cuando estás escribiendo.",
  },
  {
    n: "02",
    title: "Conecta lo que piensas.",
    body: "Une páginas con wikilinks, descubre backlinks y contempla tus ideas como una constelación que se vuelve más rica con cada nota.",
  },
  {
    n: "03",
    title: "Hazlo verdaderamente tuyo.",
    body: "Elige acentos, superficies y detalles que evolucionan contigo. Stars Alike se siente personal porque no obliga a todos a habitar el mismo espacio.",
  },
] as const;

const TRUST = [
  {
    title: "Protege lo íntimo",
    body: "Usa la bóveda y el bloqueo de la app para añadir una capa extra a las páginas que son solo para ti.",
    mark: "◇",
  },
  {
    title: "Comparte con intención",
    body: "Conecta y comparte cuando tú decidas. No hay un feed público ni un algoritmo decidiendo qué merece tu atención.",
    mark: "◎",
  },
  {
    title: "Tus palabras pueden salir",
    body: "Exporta tus páginas en PDF y elimina tu actividad o tu cuenta desde la propia aplicación cuando lo necesites.",
    mark: "↗",
  },
] as const;

const FAQ = [
  {
    question: "¿Dónde está disponible Stars Alike?",
    answer:
      "En Android, directamente desde Google Play. La experiencia está diseñada para adaptarse tanto a teléfono como a tablet.",
  },
  {
    question: "¿Es una red social?",
    answer:
      "No. Stars Alike es primero tu espacio personal de escritura. Las funciones sociales son opcionales y deliberadas: puedes conectar o compartir sin convertir tus notas en un feed público.",
  },
  {
    question: "¿Puedo proteger o borrar mis notas?",
    answer:
      "Sí. Puedes usar la bóveda y el bloqueo de la app, borrar tu actividad y eliminar permanentemente tu cuenta y sus datos desde Ajustes.",
  },
  {
    question: "¿Puedo exportar lo que escribo?",
    answer:
      "Sí. Puedes exportar páginas en PDF para conservarlas o compartirlas fuera de Stars Alike.",
  },
] as const;

export function ProductPillars() {
  return (
    <section id="funciones" className="cv-auto relative px-6 py-28 sm:py-40">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">SIMPLE POR FUERA · POTENTE POR DENTRO</p>
          <h2 className="mt-5 font-[family-name:var(--font-serif)] text-4xl font-light leading-[1.04] text-balance text-paper-bright sm:text-6xl">
            Todo lo necesario.
            <br />
            <span className="editorial-italic text-star">
              Nada que estorbe.
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-paper-bright/70 sm:text-lg">
            Stars Alike une escritura, conexiones y personalización en una
            experiencia tranquila: suficientemente potente para crecer contigo,
            suficientemente simple para usarla todos los días.
          </p>
        </div>

        <div className="mt-20 grid border-y border-white/10 lg:grid-cols-3 lg:divide-x lg:divide-white/10">
          {PILLARS.map((pillar) => (
            <article
              key={pillar.n}
              className="group relative border-b border-white/10 px-1 py-10 last:border-b-0 lg:border-b-0 lg:px-9 lg:py-14 lg:first:pl-0 lg:last:pr-0"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-star/25 bg-star/[0.055] transition duration-300 group-hover:border-star/50 group-hover:bg-star/10">
                <span className="font-[family-name:var(--font-pixel)] text-xs tracking-[0.16em] text-star">
                  {pillar.n}
                </span>
              </div>
              <h3 className="mt-8 font-[family-name:var(--font-serif)] text-3xl font-light leading-tight text-paper-bright">
                {pillar.title}
              </h3>
              <p className="mt-4 text-[15px] leading-7 text-paper-bright/70">
                {pillar.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TrustSection() {
  return (
    <section id="privacidad" className="cv-auto relative px-6 py-24 sm:py-32">
      <div className="paper-grain mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-paper-edge/60 px-6 py-12 shadow-[0_30px_100px_rgba(0,0,0,0.35)] sm:px-12 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="font-[family-name:var(--font-pixel)] text-sm tracking-[0.2em] text-paper-ink-soft">
              TU ESPACIO · TUS REGLAS
            </p>
            <h2 className="mt-4 font-[family-name:var(--font-serif)] text-4xl font-light leading-[1.04] text-balance text-paper-ink sm:text-6xl">
              Lo personal sigue siendo
              <br />
              <span className="editorial-italic text-paper-ink">personal.</span>
            </h2>
          </div>
          <p className="max-w-md text-base leading-7 text-paper-ink-soft lg:col-span-4">
            La conexión es una posibilidad, nunca el centro de la experiencia.
            Tú decides qué proteger, qué compartir y qué sacar de la app.
          </p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {TRUST.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-paper-ink/10 bg-paper-bright/60 p-6"
            >
              <span
                aria-hidden="true"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-paper-ink/15 font-[family-name:var(--font-serif)] text-xl text-paper-ink"
              >
                {item.mark}
              </span>
              <h3 className="mt-8 font-[family-name:var(--font-serif)] text-2xl font-medium text-paper-ink">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-paper-ink-soft">
                {item.body}
              </p>
            </article>
          ))}
        </div>

        <Link
          href="/privacidad"
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-paper-ink underline decoration-paper-ink/30 underline-offset-4 transition hover:decoration-paper-ink"
        >
          Leer la política de privacidad <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}

export function FaqSection() {
  return (
    <section id="preguntas" className="cv-auto relative px-6 py-28 sm:py-36">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="eyebrow">ANTES DE EMPEZAR</p>
          <h2 className="mt-4 font-[family-name:var(--font-serif)] text-4xl font-light leading-tight text-paper-bright sm:text-5xl">
            Preguntas
            <br />
            <span className="editorial-italic text-star">frecuentes.</span>
          </h2>
        </div>

        <div className="divide-y divide-white/10 border-y border-white/10 lg:col-span-7 lg:col-start-6">
          {FAQ.map((item) => (
            <details key={item.question} className="group py-1">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left text-lg font-medium text-paper-bright focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-star [&::-webkit-details-marker]:hidden">
                <span>{item.question}</span>
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 text-star transition duration-300 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="max-w-2xl pb-7 pr-12 text-[15px] leading-7 text-paper-bright/70">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalReleaseCta() {
  return (
    <section className="cv-auto relative overflow-hidden px-6 py-32 sm:py-40">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-star/15 shadow-[0_0_120px_var(--color-star-ghost)]"
      />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-star/20 animate-orbit"
      />
      <div className="relative mx-auto max-w-3xl text-center">
        <p className="eyebrow">DISPONIBLE EN ANDROID</p>
        <h2 className="mt-5 font-[family-name:var(--font-serif)] text-5xl font-light leading-[1.02] text-balance text-paper-bright sm:text-7xl">
          Tu próxima idea
          <br />
          <span className="editorial-italic text-star">ya tiene un lugar.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-paper-bright/70 sm:text-lg">
          Descarga Stars Alike y empieza a construir una constelación que solo
          podría ser tuya.
        </p>
        <div className="mt-10 flex justify-center">
          <PlayStoreLink />
        </div>
      </div>
    </section>
  );
}
