import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacidad",
  description:
    "Qué datos guarda Stars Alike de la lista de espera y cómo se usan.",
  robots: { index: true, follow: true },
};

const UPDATED = "25 de junio de 2026";

export default function PrivacidadPage() {
  return (
    <main className="relative isolate flex-1 px-6 py-28 sm:py-36">
      <article className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="font-[family-name:var(--font-pixel)] text-xs tracking-[0.3em] uppercase text-star/80 hover:text-star"
        >
          ← volver
        </Link>

        <h1 className="mt-8 font-[family-name:var(--font-serif)] font-light text-4xl sm:text-5xl text-paper-bright leading-[1.05]">
          Privacidad
        </h1>
        <p className="mt-3 font-[family-name:var(--font-pixel)] text-xs tracking-[0.3em] uppercase text-paper-bright/55">
          Última actualización · {UPDATED}
        </p>

        <div className="mt-10 space-y-8 text-paper-bright/75 leading-relaxed">
          <section>
            <h2 className="text-paper-bright text-xl font-[family-name:var(--font-serif)]">
              Qué guardamos
            </h2>
            <p className="mt-3">
              Si te sumás a la lista de espera, guardamos únicamente tu{" "}
              <strong className="text-paper-bright">correo electrónico</strong> y
              la fecha en que te anotaste. Nada más. No pedimos nombre, ni
              teléfono, ni te rastreamos por la web.
            </p>
          </section>

          <section>
            <h2 className="text-paper-bright text-xl font-[family-name:var(--font-serif)]">
              Para qué lo usamos
            </h2>
            <p className="mt-3">
              Solo para avisarte el día que la app esté disponible. Es un único
              correo de confirmación al anotarte y otro el día del lanzamiento.
              Sin spam, sin newsletters, sin compartir tu correo con terceros
              para publicidad.
            </p>
          </section>

          <section>
            <h2 className="text-paper-bright text-xl font-[family-name:var(--font-serif)]">
              Con qué herramientas
            </h2>
            <p className="mt-3">
              Tu correo se almacena en{" "}
              <strong className="text-paper-bright">Supabase</strong> (base de
              datos) y los avisos se envían con{" "}
              <strong className="text-paper-bright">Resend</strong>. Ambos
              procesan los datos en nuestro nombre como encargados del
              tratamiento.
            </p>
          </section>

          <section>
            <h2 className="text-paper-bright text-xl font-[family-name:var(--font-serif)]">
              Tus derechos
            </h2>
            <p className="mt-3">
              Podés pedir que borremos tu correo de la lista cuando quieras.
              Escribinos a{" "}
              <a
                href="mailto:hola@starsalike.app"
                className="text-star underline-offset-4 hover:underline"
              >
                hola@starsalike.app
              </a>{" "}
              y lo eliminamos sin preguntar nada.
            </p>
          </section>
        </div>

        <p className="mt-16 font-[family-name:var(--font-pixel)] text-xs tracking-[0.3em] uppercase text-paper-bright/40">
          stars alike · hecho con cariño · 2026
        </p>
      </article>
    </main>
  );
}
