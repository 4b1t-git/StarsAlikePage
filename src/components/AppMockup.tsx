"use client";

import { useEffect, useRef, useState } from "react";
import MockupStarfield from "./MockupStarfield";
import { mockupCover } from "@/lib/assets";

const DESIGN_W = 1280;
const DESIGN_H = 800;

type Book = {
  title: string;
  pages: number;
  edited: string;
  cover: string;
};

const THIS_WEEK: Book[] = [
  { title: "Aplicación", pages: 5, edited: "Hace 5 d", cover: mockupCover("cover_diario.png") },
  { title: "Historias", pages: 3, edited: "Recién", cover: mockupCover("cover_historias.png") },
  { title: "Tecnología", pages: 9, edited: "Hace 2 d", cover: mockupCover("cover_codigo.png") },
];

const REVISIT: Book[] = [
  { title: "Arreglar app", pages: 7, edited: "18 AGO", cover: mockupCover("forest.png") },
  { title: "Compras", pages: 3, edited: "16 AGO", cover: mockupCover("cover_compras.png") },
  { title: "Inolvidable", pages: 5, edited: "8 JUL", cover: mockupCover("cover_inolvidable.png") },
  { title: "Matemáticas", pages: 1, edited: "15 AGO", cover: mockupCover("cover_arquitectura.png") },
];

const COVER_WASH =
  "linear-gradient(to bottom, transparent 38%, rgba(0,0,0,0.78) 100%)";

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <span className="min-w-[64px] text-center">
      <span className="block font-[family-name:var(--font-serif)] text-[24px] leading-[25px] text-mockup-ink">
        {value}
      </span>
      <span className="mt-[5px] block font-[family-name:var(--font-pixel)] text-[9px] tracking-[0.2em] text-mockup-ink-ghost">
        {label}
      </span>
    </span>
  );
}

function SectionTitle({ title, count, suffix }: { title: string; count: number; suffix?: string }) {
  return (
    <div className="flex items-center">
      <span className="font-[family-name:var(--font-pixel)] text-[11px] tracking-[0.27em] text-mockup-ink-ghost">
        {title}
      </span>
      <span className="ml-[8px] font-[family-name:var(--font-pixel)] text-[11px] tracking-[0.12em] text-star">· {count}</span>
      {suffix && <span className="ml-[8px] text-[11px] text-mockup-ink-ghost">{suffix}</span>}
      <span className="ml-[14px] h-px flex-1 bg-mockup-panel" />
    </div>
  );
}

function BookCard({ book }: { book: Book }) {
  return (
    <article className="group relative h-[190px] w-[272px] shrink-0 overflow-hidden rounded-[15px] border border-white/[0.07] bg-cosmos-smoke text-left shadow-[0_12px_30px_rgba(0,0,0,0.3)]">
      <span className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.03]" style={{ background: book.cover }} />
      <span className="absolute inset-0" style={{ background: COVER_WASH }} />
      <span className="absolute left-[14px] top-[12px] font-[family-name:var(--font-pixel)] text-[9px] tracking-[0.2em] text-star">✦ DIARIO</span>
      <span className="absolute right-[10px] top-[10px] flex h-[28px] w-[28px] items-center justify-center rounded-full bg-black/50 text-white/85">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" /></svg>
      </span>
      <span className="absolute inset-x-[14px] bottom-[14px]">
        <span className="block font-[family-name:var(--font-serif)] text-[20px] leading-[22px] text-white">{book.title}</span>
        <span className="mt-[7px] flex items-center gap-[8px] font-[family-name:var(--font-pixel)] text-[9px] tracking-[0.12em] text-white/65">
          <span className="rounded-[5px] bg-white/15 px-[7px] py-[5px] text-white/80">{book.pages} PÁG</span>
          <span>· {book.edited}</span>
        </span>
      </span>
    </article>
  );
}

export function AppMockup({ active = true }: { active?: boolean }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const measure = () => {
      const width = el.clientWidth;
      if (width) setScale(width / DESIGN_W);
    };
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    const io = new IntersectionObserver(measure, { rootMargin: "200px" });
    io.observe(el);
    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <div ref={rootRef} className="absolute inset-0 overflow-hidden bg-cosmos-void font-[family-name:var(--font-sans)] text-mockup-ink">
      <MockupStarfield active={active} className="absolute inset-0 h-full w-full" />

      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{ width: DESIGN_W, height: DESIGN_H, transform: `scale(${scale})`, visibility: scale ? "visible" : "hidden" }}
      >
        <header className="absolute left-[108px] right-[28px] top-[38px] h-[112px]">
          <p className="font-[family-name:var(--font-pixel)] text-[11px] tracking-[0.28em] text-star">BIBLIOTECA · PÁGINAS</p>
          <h1 className="mt-[18px] font-[family-name:var(--font-serif)] text-[45px] font-light italic leading-none text-mockup-ink">Diarios</h1>

          <div className="absolute right-0 top-[42px] flex items-center">
            <Stat value="10" label="DIARIOS" />
            <span className="mx-[12px] h-[30px] w-px bg-mockup-panel" />
            <Stat value="789" label="PALABRAS" />
            <span className="mx-[12px] h-[30px] w-px bg-mockup-panel" />
            <Stat value="41" label="PÁGINAS" />
          </div>

          <span className="absolute right-0 top-0 flex h-[38px] w-[38px] items-center justify-center rounded-full border border-star/30 bg-cosmos-void/70 text-mockup-ink-soft">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden><circle cx="11" cy="11" r="7" /><path d="m20 20-3-3" /></svg>
          </span>
        </header>

        <div className="absolute left-[108px] right-[28px] top-[164px] flex items-center justify-between">
          <div className="flex rounded-full border border-mockup-hairline bg-mockup-panel/65 p-[3px]">
            <span className="rounded-full bg-star/20 px-[17px] py-[9px] font-[family-name:var(--font-pixel)] text-[10px] tracking-[0.14em] text-star">MIS DIARIOS</span>
            <span className="px-[17px] py-[9px] font-[family-name:var(--font-pixel)] text-[10px] tracking-[0.14em] text-mockup-ink-ghost">COMPARTIDOS</span>
          </div>
          <div className="flex items-center gap-[18px] font-[family-name:var(--font-pixel)] text-[10px] tracking-[0.14em]">
            <span className="text-mockup-ink-ghost">Recientes</span>
            <span className="text-star">A-Z</span>
          </div>
        </div>

        <span className="absolute left-[108px] right-[28px] top-[218px] h-px bg-mockup-panel" />

        <div className="absolute left-[108px] right-[28px] top-[239px]">
          <SectionTitle title="ESTA SEMANA" count={3} suffix="editados recientemente" />
          <div className="mt-[16px] flex gap-[16px]">
            {THIS_WEEK.map((book) => <BookCard key={book.title} book={book} />)}
          </div>
        </div>

        <div className="absolute left-[108px] right-[28px] top-[476px]">
          <SectionTitle title="REVISITA" count={7} />
          <div className="mt-[16px] flex gap-[16px]">
            {REVISIT.map((book) => <BookCard key={book.title} book={book} />)}
          </div>
        </div>

        <button className="absolute bottom-[24px] right-[26px] z-20 flex h-[54px] items-center gap-[12px] rounded-full bg-star px-[22px] text-cosmos-void shadow-[0_10px_28px_rgba(0,0,0,0.55)]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden><path d="M12 5v14M5 12h14" /></svg>
          <span className="font-[family-name:var(--font-serif)] text-[17px] font-semibold">Nuevo diario</span>
        </button>
      </div>
    </div>
  );
}
