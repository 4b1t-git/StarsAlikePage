import Image from "next/image";
import type { CSSProperties } from "react";
import { asset } from "@/lib/assets";
import HeroEditorialPhrase from "./HeroEditorialPhrase";
import MockupAccentMask from "./MockupAccentMask";
import MockupStarfield, { type StarfieldExclusion } from "./MockupStarfield";

const TABLET_SCREEN = asset("/mockups/tablet-inicio-real.webp");

const CARD_ANIMATIONS = [
  { id: "proyectos", left: 5.464, top: 24.527, width: 12.143, height: 29.508, rx: 8.8, ry: 6.4 },
  { id: "mi-vida", left: 18.821, top: 24.527, width: 12.143, height: 29.508, rx: 8.8, ry: 6.4 },
  { id: "campo", left: 32.179, top: 24.527, width: 12.143, height: 29.508, rx: 8.8, ry: 6.4 },
  { id: "tecnologia", left: 45.536, top: 24.527, width: 12.143, height: 29.508, rx: 8.8, ry: 6.4 },
  { id: "compras", left: 58.893, top: 24.527, width: 12.143, height: 29.508, rx: 8.8, ry: 6.4 },
  { id: "matematicas", left: 72.25, top: 24.527, width: 12.143, height: 29.508, rx: 8.8, ry: 6.4 },
  { id: "ciudad", left: 85.607, top: 24.527, width: 12.143, height: 29.508, rx: 8.8, ry: 6.4 },
] as const;

const HERO_STAR_EXCLUSIONS: readonly StarfieldExclusion[] = [
  { x: 0, y: 0, width: 0.06, height: 1 },
  { x: 0.055, y: 0.01, width: 0.49, height: 0.2 },
  { x: 0.76, y: 0.02, width: 0.24, height: 0.15 },
  { x: 0.05, y: 0.14, width: 0.95, height: 0.1 },
  { x: 0.04, y: 0.24, width: 0.96, height: 0.31 },
  { x: 0.05, y: 0.54, width: 0.95, height: 0.08 },
  { x: 0.075, y: 0.6, width: 0.56, height: 0.37 },
  { x: 0.625, y: 0.59, width: 0.37, height: 0.38 },
];

function HeroSkyBackdrop() {
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1 1"
      preserveAspectRatio="none"
    >
      <defs>
        <mask
          id="hero-sky-mask"
          x="0"
          y="0"
          width="1"
          height="1"
          maskUnits="userSpaceOnUse"
          maskContentUnits="userSpaceOnUse"
        >
          <rect width="1" height="1" fill="white" />
          {HERO_STAR_EXCLUSIONS.map((rect, index) => (
            <rect
              key={index}
              x={rect.x}
              y={rect.y}
              width={rect.width}
              height={rect.height}
              fill="black"
            />
          ))}
        </mask>
      </defs>
      <rect width="1" height="1" fill="#030303" mask="url(#hero-sky-mask)" />
    </svg>
  );
}

function AnimatedCardBorder({
  card,
}: {
  card: (typeof CARD_ANIMATIONS)[number];
}) {
  const backgroundPositionX = (card.left / (100 - card.width)) * 100;
  const backgroundPositionY = (card.top / (100 - card.height)) * 100;

  return (
    <span
      aria-hidden="true"
      className="mockup-card-slot absolute"
      style={{
        left: `${card.left}%`,
        top: `${card.top}%`,
        width: `${card.width}%`,
        height: `${card.height}%`,
        borderRadius: `${card.rx}% / ${card.ry}%`,
      }}
    >
      <span
        className="mockup-breath-card absolute inset-0"
        style={{
          borderRadius: "inherit",
          backgroundImage: `url('${TABLET_SCREEN}')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: `${10000 / card.width}% ${10000 / card.height}%`,
          backgroundPosition: `${backgroundPositionX}% ${backgroundPositionY}%`,
        }}
      />
    </span>
  );
}

export default function HeroProductPreview() {
  return (
    <div className="relative mx-auto mt-14 max-w-5xl pb-1 sm:mt-16">
      <div className="relative z-10 rounded-[1.7rem] border border-white/12 bg-white/[0.045] p-1.5 shadow-[0_45px_140px_rgba(0,0,0,0.75),0_0_80px_var(--color-star-ghost)] backdrop-blur-xl sm:rounded-[2rem] sm:p-2">
        <div className="overflow-hidden rounded-[1.35rem] bg-[#08090b] sm:rounded-[1.55rem]">
          <div
            role="img"
            aria-label="Vista de la pantalla de inicio de Stars Alike"
            className="pointer-events-none relative aspect-[2800/1586] overflow-hidden bg-cosmos-void"
          >
            <div className="absolute inset-0 aspect-[2800/1586] w-full">
              <Image
                src={TABLET_SCREEN}
                alt=""
                width={2800}
                height={1586}
                sizes="(max-width: 1152px) 100vw, 1024px"
                loading="eager"
                unoptimized
                className="h-auto w-full"
              />
              <span
                aria-hidden="true"
                className="absolute right-0 top-[24.35%] h-[30.4%] w-[1.15%] bg-[#030303]"
              />
              <HeroSkyBackdrop />
              <MockupStarfield
                className="absolute inset-0 h-full w-full text-white"
                exclusions={HERO_STAR_EXCLUSIONS}
              />
              <MockupAccentMask src="/mockups/tablet-inicio-accent-mask.png" />
              <div
                aria-hidden="true"
                className="mockup-comet-clock absolute inset-0"
                style={{ "--mockup-accent": "var(--color-star)" } as CSSProperties}
              >
                {CARD_ANIMATIONS.map((card) => (
                  <AnimatedCardBorder key={card.id} card={card} />
                ))}
                <span
                  aria-hidden="true"
                  className="absolute flex items-center overflow-hidden"
                  style={{
                    left: "20.8%",
                    top: "6.05%",
                    width: "13.8%",
                    height: "6.25%",
                    paddingLeft: "0.75cqw",
                    background: "#030303",
                    color: "var(--color-star)",
                    fontFamily: "var(--font-fraunces)",
                    fontSize: "3.48cqw",
                    fontStyle: "italic",
                    fontVariationSettings: '"opsz" 32',
                    fontWeight: 500,
                    lineHeight: 1,
                    letterSpacing: "-0.035em",
                  }}
                >
                  noches
                </span>
                <HeroEditorialPhrase />
                <span className="breathe-dot absolute left-[6.75%] top-[63.4%] h-[0.8%] aspect-square rounded-full bg-star shadow-[0_0_8px_var(--color-star)]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
