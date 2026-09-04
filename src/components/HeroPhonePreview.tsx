import Image from "next/image";
import type { CSSProperties } from "react";
import { asset } from "@/lib/assets";
import MockupAccentMask from "./MockupAccentMask";
import PhoneEditorialPhrase from "./PhoneEditorialPhrase";

const PHONE_SCREEN = asset("/mockups/phone-inicio-real.webp");

const PHONE_CARDS = [
  { id: "historias", left: 6.7, top: 40.65, width: 44.2, height: 31.4 },
  { id: "proyectos", left: 55, top: 40.65, width: 44.2, height: 31.4 },
] as const;

export default function HeroPhonePreview({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="relative rounded-[2.15rem] border border-white/15 bg-white/[0.055] p-[5px] shadow-[0_38px_90px_rgba(0,0,0,0.82),0_0_56px_var(--color-star-ghost)] backdrop-blur-xl">
        <div
          role="img"
          aria-label="Vista real de Stars Alike en un teléfono Galaxy S24"
          className="relative aspect-[720/1402] overflow-hidden rounded-[1.85rem] bg-[#050505]"
        >
          <Image
            src={PHONE_SCREEN}
            alt=""
            fill
            priority
            unoptimized
            sizes="(max-width: 639px) 210px, (max-width: 1023px) 240px, 270px"
            className="object-cover"
          />
          <MockupAccentMask src="/mockups/phone-inicio-accent-mask.png" />

          <div
            aria-hidden="true"
            className="mockup-comet-clock absolute inset-0"
            style={{ "--mockup-accent": "var(--color-star)" } as CSSProperties}
          >
            {PHONE_CARDS.map((card) => (
              <span
                key={card.id}
                className="mockup-breath-card absolute"
                style={{
                  left: `${card.left}%`,
                  top: `${card.top}%`,
                  width: `${card.width}%`,
                  height: `${card.height}%`,
                  borderRadius: "6.4% / 4.7%",
                }}
              />
            ))}
            <PhoneEditorialPhrase />
            <span
              aria-hidden="true"
              className="absolute aspect-square w-[13%] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                left: "29.35%",
                top: "94.87%",
                background:
                  "radial-gradient(circle, color-mix(in srgb, var(--color-star) 42%, transparent) 0%, color-mix(in srgb, var(--color-star) 16%, transparent) 38%, transparent 72%)",
                filter: "blur(0.45cqw)",
              }}
            />
            <svg
              aria-hidden="true"
              viewBox="0 0 48 48"
              className="absolute w-[5.2%] -translate-x-1/2 -translate-y-1/2 overflow-visible"
              style={{
                left: "29.35%",
                top: "94.87%",
                color: "var(--color-star)",
                filter:
                  "drop-shadow(0 0 0.8cqw color-mix(in srgb, var(--color-star) 72%, transparent))",
              }}
            >
              <path
                d="M24 2c2.2 13.7 8.3 19.8 22 22-13.7 2.2-19.8 8.3-22 22-2.2-13.7-8.3-19.8-22-22 13.7-2.2 19.8-8.3 22-22Z"
                fill="currentColor"
              />
            </svg>
          </div>

          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/[0.055]"
          />
        </div>
      </div>
    </div>
  );
}
