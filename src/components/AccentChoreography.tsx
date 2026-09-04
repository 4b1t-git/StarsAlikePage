"use client";

import { useEffect } from "react";
import {
  ACCENT_PALETTES,
  ACCENT_SELECTION_MS,
} from "@/lib/accentPalettes";

type Oklab = { l: number; a: number; b: number };

type AccentSelectDetail = {
  id?: string;
  index?: number;
};

type AccentBridge = {
  from: Oklab;
  to: Oklab;
  startedAt: number;
  targetIndex: number;
};

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const smoothstep = (value: number) => value * value * (3 - 2 * value);

function hexToOklab(hex: string): Oklab {
  const value = Number.parseInt(hex.slice(1), 16);
  const srgb = [
    ((value >> 16) & 0xff) / 255,
    ((value >> 8) & 0xff) / 255,
    (value & 0xff) / 255,
  ];
  const linear = srgb.map((channel) =>
    channel <= 0.04045
      ? channel / 12.92
      : ((channel + 0.055) / 1.055) ** 2.4,
  );
  const [r, g, b] = linear;
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);

  return {
    l: 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    a: 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    b: 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  };
}

function mixOklab(from: Oklab, to: Oklab, amount: number): Oklab {
  return {
    l: from.l + (to.l - from.l) * amount,
    a: from.a + (to.a - from.a) * amount,
    b: from.b + (to.b - from.b) * amount,
  };
}

function oklabToCss({ l, a, b }: Oklab): string {
  const lRoot = l + 0.3963377774 * a + 0.2158037573 * b;
  const mRoot = l - 0.1055613458 * a - 0.0638541728 * b;
  const sRoot = l - 0.0894841775 * a - 1.291485548 * b;
  const lLinear = lRoot ** 3;
  const mLinear = mRoot ** 3;
  const sLinear = sRoot ** 3;
  const linear = [
    4.0767416621 * lLinear - 3.3077115913 * mLinear + 0.2309699292 * sLinear,
    -1.2684380046 * lLinear + 2.6097574011 * mLinear - 0.3413193965 * sLinear,
    -0.0041960863 * lLinear - 0.7034186147 * mLinear + 1.707614701 * sLinear,
  ];
  const srgb = linear.map((channel) => {
    const encoded = channel <= 0.0031308
      ? 12.92 * channel
      : 1.055 * channel ** (1 / 2.4) - 0.055;
    return Math.round(clamp01(encoded) * 255);
  });

  return `rgb(${srgb[0]} ${srgb[1]} ${srgb[2]})`;
}

const PALETTE_COLORS = ACCENT_PALETTES.map((palette) =>
  hexToOklab(palette.color),
);

/** Keeps the global accent idle until the visitor chooses a color. A short,
 * frame-capped bridge preserves the soft transition without continuously
 * invalidating styles and repainting the entire page. */
export default function AccentChoreography() {
  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animationFrame = 0;
    let activeIndex = 0;
    let currentColor = PALETTE_COLORS[0];
    let bridge: AccentBridge | null = null;
    let lastFromColor: Oklab | null = null;
    let lastToColor: Oklab | null = null;
    let lastPaintAt = 0;

    const FRAME_MS = 1000 / 30;

    const announcePalette = (index: number) => {
      if (activeIndex === index) return;
      activeIndex = index;
      window.dispatchEvent(
        new CustomEvent("accent:active", {
          detail: { ...ACCENT_PALETTES[index], index },
        }),
      );
    };

    const applyFrame = (
      color: Oklab,
      shimmerProgress: number,
      fromColor: Oklab,
      toColor: Oklab,
    ) => {
      currentColor = color;
      root.style.setProperty("--color-star", oklabToCss(color));

      if (lastFromColor !== fromColor) {
        root.style.setProperty("--color-star-from", oklabToCss(fromColor));
        lastFromColor = fromColor;
      }
      if (lastToColor !== toColor) {
        root.style.setProperty("--color-star-to", oklabToCss(toColor));
        lastToColor = toColor;
      }

      root.style.setProperty(
        "--cozy-shimmer-progress",
        `${clamp01(shimmerProgress) * 100}%`,
      );
    };

    const tick = (now: number) => {
      animationFrame = 0;
      if (!bridge || document.hidden) return;

      if (now - lastPaintAt >= FRAME_MS - 1) {
        lastPaintAt = now;
        const raw = clamp01((now - bridge.startedAt) / ACCENT_SELECTION_MS);
        const eased = smoothstep(raw);
        applyFrame(
          mixOklab(bridge.from, bridge.to, eased),
          eased,
          bridge.from,
          bridge.to,
        );

        if (raw >= 1) {
          currentColor = bridge.to;
          announcePalette(bridge.targetIndex);
          applyFrame(bridge.to, 1, bridge.to, bridge.to);
          bridge = null;
          return;
        }
      }

      animationFrame = window.requestAnimationFrame(tick);
    };

    const stop = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = 0;
    };

    const onSelect = (event: Event) => {
      const detail = (event as CustomEvent<AccentSelectDetail>).detail;
      const requestedIndex = detail?.index ?? ACCENT_PALETTES.findIndex(
        (palette) => palette.id === detail?.id,
      );
      if (requestedIndex < 0 || requestedIndex >= ACCENT_PALETTES.length) return;

      if (reduceMotion.matches || document.hidden) {
        stop();
        bridge = null;
        currentColor = PALETTE_COLORS[requestedIndex];
        activeIndex = -1;
        announcePalette(requestedIndex);
        applyFrame(
          PALETTE_COLORS[requestedIndex],
          1,
          PALETTE_COLORS[requestedIndex],
          PALETTE_COLORS[requestedIndex],
        );
        return;
      }

      bridge = {
        from: currentColor,
        to: PALETTE_COLORS[requestedIndex],
        startedAt: performance.now(),
        targetIndex: requestedIndex,
      };
      lastPaintAt = 0;
      stop();
      animationFrame = window.requestAnimationFrame(tick);
    };

    const onMotionPreference = () => {
      if (!reduceMotion.matches || !bridge) return;
      const targetIndex = bridge.targetIndex;
      stop();
      bridge = null;
      currentColor = PALETTE_COLORS[targetIndex];
      activeIndex = -1;
      announcePalette(targetIndex);
      applyFrame(currentColor, 1, currentColor, currentColor);
    };
    const onVisibility = () => {
      if (!document.hidden || !bridge) return;
      const targetIndex = bridge.targetIndex;
      stop();
      bridge = null;
      currentColor = PALETTE_COLORS[targetIndex];
      activeIndex = -1;
      announcePalette(targetIndex);
      applyFrame(currentColor, 1, currentColor, currentColor);
    };

    window.addEventListener("accent:select", onSelect);
    reduceMotion.addEventListener("change", onMotionPreference);
    document.addEventListener("visibilitychange", onVisibility);
    applyFrame(currentColor, 1, currentColor, currentColor);

    return () => {
      stop();
      window.removeEventListener("accent:select", onSelect);
      reduceMotion.removeEventListener("change", onMotionPreference);
      document.removeEventListener("visibilitychange", onVisibility);
      root.style.removeProperty("--color-star");
      root.style.removeProperty("--color-star-from");
      root.style.removeProperty("--color-star-to");
      root.style.removeProperty("--cozy-shimmer-progress");
    };
  }, []);

  return null;
}
