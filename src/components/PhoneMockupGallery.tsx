"use client";

import { useEffect, useRef } from "react";
import PhoneMockup, { type PhoneVariant } from "./PhoneMockup";

type Mockup = {
  variant: PhoneVariant;
  label: string;
  caption: string;
};

const MOCKUPS: Mockup[] = [
  {
    variant: "inicio",
    label: "Login con agujero negro",
    caption:
      "Galaxia interactiva: 260 estrellas con física de gravedad, fugaces que caen al agujero negro y soul pairs en espiral cuando se absorben.",
  },
  {
    variant: "biblioteca",
    label: "Biblioteca de diarios",
    caption:
      "Tu colección personal. Cada diario tiene su propia portada simulada con colores y gradientes. Un compañero hermoso.",
  },
  {
    variant: "diario",
    label: "Página con bloques",
    caption:
      "Editor tipo Notion. Texto, listas, formato fino. Wikilinks [[entre páginas]] y tags ámbar que vuelan por arriba.",
  },
  {
    variant: "constelacion",
    label: "Constelación (grafo)",
    caption:
      "Backlinks azules entre páginas. Co-citaciones violetas. Foco a N saltos. Force-directed con Barnes-Hut.",
  },
  {
    variant: "historia",
    label: "Tu Historia",
    caption:
      "Cúmulo horizontal de estrellas. Cada nota es una luz; las recientes son brillantes, las viejas son tenues.",
  },
  {
    variant: "vault",
    label: "Vault · app lock",
    caption:
      "Bloques privados detrás de un PIN. Achievement al desbloquearlo por primera vez.",
  },
  {
    variant: "editor",
    label: "Editor de bloques",
    caption:
      "Toolbar con bold/italic/lista/tag/star. Bloque rico, tipografía Fraunces, sello pixel. Sin fricción.",
  },
];

export default function PhoneMockupGallery() {
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let rafId = 0;
    let targetX = 0;
    let targetY = 0;

    const onMove = (e: PointerEvent) => {
      const rect = row.getBoundingClientRect();
      targetX = (e.clientX - rect.left) / rect.width - 0.5;
      targetY = (e.clientY - rect.top) / rect.height - 0.5;
      if (!rafId) rafId = requestAnimationFrame(apply);
    };
    const apply = () => {
      rafId = 0;
      const items = row.querySelectorAll<HTMLElement>(".tilt-item");
      items.forEach((el, idx) => {
        const rect = el.getBoundingClientRect();
        const rowRect = row.getBoundingClientRect();
        const elCx = (rect.left + rect.width / 2 - rowRect.left) / rowRect.width - 0.5;
        const local = targetX - elCx;
        el.style.setProperty("--offset-x", String(local * 2));
        el.style.setProperty("--offset-y", String(targetY));
        const stagger = (idx % 2 === 0 ? -1 : 1) * 14;
        el.style.transform = `translateY(${stagger}px) rotateY(${local * -8}deg) rotateX(${targetY * 4}deg)`;
      });
    };
    const onLeave = () => {
      const items = row.querySelectorAll<HTMLElement>(".tilt-item");
      items.forEach((el, idx) => {
        const stagger = (idx % 2 === 0 ? -1 : 1) * 14;
        el.style.transform = `translateY(${stagger}px)`;
      });
    };

    row.addEventListener("pointermove", onMove);
    row.addEventListener("pointerleave", onLeave);
    return () => {
      row.removeEventListener("pointermove", onMove);
      row.removeEventListener("pointerleave", onLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={rowRef}
      className="tilt-row no-scrollbar relative -mx-6 flex snap-x snap-mandatory items-start gap-14 overflow-x-auto px-6 py-16 sm:gap-20 sm:px-[calc(50vw-560px)]"
      style={{ perspective: "1200px" }}
    >
      {MOCKUPS.map((m, i) => (
        <PhoneMockup
          key={m.variant}
          variant={m.variant}
          label={m.label}
          caption={m.caption}
          index={i}
        />
      ))}
    </div>
  );
}
