import type { Metadata } from "next";
import Link from "next/link";
import { PLAY_STORE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description:
    "Cómo Stars Alike trata los datos de la aplicación y de este sitio web.",
  robots: { index: true, follow: true },
};

const UPDATED = "29 de agosto de 2026";

export default function PrivacidadPage() {
  return (
    <main className="relative isolate flex-1 px-6 py-28 sm:py-36">
      <article className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="text-sm font-semibold text-star underline-offset-4 hover:underline"
        >
          ← Volver a Stars Alike
        </Link>

        <p className="eyebrow mt-12">STARS ALIKE · PRIVACIDAD</p>
        <h1 className="mt-4 font-[family-name:var(--font-serif)] text-4xl font-light leading-[1.05] text-paper-bright sm:text-6xl">
          Política de privacidad
        </h1>
        <p className="mt-4 text-sm text-paper-bright/60">
          Última actualización: {UPDATED}
        </p>

        <div className="mt-12 space-y-12 text-base leading-8 text-paper-bright/75">
          <section>
            <h2 className="font-[family-name:var(--font-serif)] text-2xl text-paper-bright">
              Alcance y responsable
            </h2>
            <p className="mt-4">
              Esta política explica el tratamiento de datos en la aplicación
              Android Stars Alike y en este sitio web, publicado en
              4b1t-git.github.io/StarsAlikePage. El responsable del tratamiento
              es Stars Alike. Para consultas de privacidad puedes escribir a{" "}
              <a
                href="mailto:hola@starsalike.app"
                className="text-star underline underline-offset-4"
              >
                hola@starsalike.app
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-serif)] text-2xl text-paper-bright">
              Datos que trata la aplicación
            </h2>
            <ul className="mt-4 list-disc space-y-3 pl-5 marker:text-star">
              <li>
                <strong className="text-paper-bright">Cuenta:</strong> el
                identificador de usuario y los datos básicos proporcionados al
                iniciar sesión, como correo, nombre visible o imagen de perfil.
              </li>
              <li>
                <strong className="text-paper-bright">Contenido:</strong>
                diarios, páginas, bloques, etiquetas, imágenes, preferencias y
                demás contenido que decidas guardar o sincronizar.
              </li>
              <li>
                <strong className="text-paper-bright">Conexiones:</strong>
                solicitudes, diarios compartidos y señales de presencia
                necesarias para las funciones colaborativas que actives.
              </li>
              <li>
                <strong className="text-paper-bright">Compras:</strong> estado
                del producto y datos técnicos de la compra necesarios para
                verificar y restaurar funciones premium. Google Play procesa el
                pago; Stars Alike no recibe los datos completos de tu tarjeta.
              </li>
              <li>
                <strong className="text-paper-bright">Diagnóstico:</strong>
                información técnica sobre fallos, versión de la app y
                dispositivo para detectar errores y mejorar la estabilidad.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-serif)] text-2xl text-paper-bright">
              Permisos y funciones opcionales
            </h2>
            <p className="mt-4">
              El micrófono se solicita únicamente cuando activas el dictado. El
              audio es procesado por el servicio de reconocimiento configurado
              en tu dispositivo, que puede pertenecer a Android o a otro
              proveedor. Stars Alike utiliza el texto resultante y no guarda una
              grabación del dictado. Las notificaciones se usan para recordatorios
              y temporizadores que configuras. Las búsquedas de portadas pueden
              enviar el término de búsqueda a Unsplash.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-serif)] text-2xl text-paper-bright">
              Proveedores
            </h2>
            <p className="mt-4">
              Stars Alike utiliza servicios de Google Firebase para
              autenticación, sincronización, almacenamiento, funciones de
              servidor, protección de la app y diagnóstico; Google Play para
              distribución y compras; Unsplash para la búsqueda opcional de
              imágenes; y GitHub Pages para alojar este sitio.
            </p>
            <p className="mt-4">
              Este sitio es estático y no incorpora analítica, cookies de
              seguimiento ni perfilado. GitHub, como proveedor de alojamiento,
              puede registrar la dirección IP y datos técnicos de la solicitud
              para servir las páginas y proteger el servicio. No vendemos datos
              personales ni los usamos para publicidad dirigida.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-serif)] text-2xl text-paper-bright">
              Conservación y eliminación
            </h2>
            <p className="mt-4">
              Conservamos los datos de tu cuenta mientras esta permanezca activa
              o mientras sean necesarios para prestar el servicio. Desde Ajustes
              puedes borrar tu actividad o eliminar permanentemente la cuenta,
              sus diarios, páginas e imágenes y desvincular sus conexiones.
              También puedes solicitar ayuda mediante el correo de contacto.
            </p>
            <p className="mt-4">
              Algunos proveedores pueden conservar registros técnicos durante
              sus propios plazos legales o de seguridad. Los datos de compras
              también están sujetos a las obligaciones de Google Play.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-serif)] text-2xl text-paper-bright">
              Seguridad y tus decisiones
            </h2>
            <p className="mt-4">
              La aplicación usa acceso autenticado e incorpora Firebase App
              Check como una señal adicional para verificar solicitudes. Ningún
              sistema es completamente infalible, por lo que revisamos y
              actualizamos las medidas de protección junto con la aplicación.
            </p>
            <p className="mt-4">
              Puedes consultar los permisos concedidos desde Android, dejar de
              usar las funciones opcionales, exportar páginas en PDF y ejercer
              tus derechos de acceso, corrección o eliminación escribiendo al
              contacto indicado arriba.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-serif)] text-2xl text-paper-bright">
              Cambios en esta política
            </h2>
            <p className="mt-4">
              Podemos actualizar esta política cuando cambien las funciones o
              los proveedores. Publicaremos aquí la nueva fecha de actualización
              y, cuando corresponda, avisaremos dentro de la aplicación.
            </p>
          </section>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <a
            href={PLAY_STORE_URL}
            className="font-semibold text-star underline decoration-star/35 underline-offset-4 hover:decoration-star"
          >
            Ver Stars Alike en Google Play →
          </a>
          <p className="text-sm text-paper-bright/55">
            stars alike · hecho con cariño · 2026
          </p>
        </div>
      </article>
    </main>
  );
}
