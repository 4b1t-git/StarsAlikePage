"use client";

import { useEffect, useRef } from "react";

/**
 * Faithful port of the app's `StarfieldBackground.kt` (the shared night-sky
 * backdrop used on the Diarios / Books screen). Pure twinkling — white stars on
 * a transparent canvas — placed over the dark Cosmos background.
 *
 * Star params mirror the Kotlin source 1:1:
 *   radius    = rand()*2  + 0.5
 *   baseAlpha = rand()*0.55 + 0.15
 *   speed     = rand()*0.0253 + 0.0046        (NOT halved — exact app value)
 *   alpha(f)  = clamp(baseAlpha + sin(f*speed)*0.18, 0.05, 1)
 * where f is the ~60fps frame index (Kotlin: frameNanos / 16_666_667).
 *
 * Density follows the app's rule of ~70 stars per 150 units of height, clamped
 * down for this card-sized preview (the app passes a fixed starCount on small
 * surfaces for the same reason).
 */

type Star = {
  rx: number;
  ry: number;
  radius: number;
  baseAlpha: number;
  speed: number;
};

function newStar(): Star {
  return {
    rx: Math.random(),
    ry: Math.random(),
    radius: Math.random() * 2 + 0.5,
    baseAlpha: Math.random() * 0.55 + 0.15,
    speed: Math.random() * 0.0253 + 0.0046,
  };
}

export default function MockupStarfield({
  className,
  active = true,
}: {
  className?: string;
  /** When false (e.g. a carousel slide that isn't showing), the rAF loop idles
   * so off-screen mockups don't burn frames. */
  active?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeRef = useRef(active);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let w = 0;
    let h = 0;
    let stars: Star[] = [];
    let raf = 0;
    let onscreen = true;
    let visible = true;
    const start = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // (screenHeightDp * 70 / 150) in the app; clamped for the small preview.
      const count = Math.min(Math.max(Math.round((h * 70) / 150), 120), 360);
      if (stars.length !== count) {
        stars = Array.from({ length: count }, newStar);
      }
    };

    const draw = (f: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        const alpha = Math.min(
          1,
          Math.max(0.05, s.baseAlpha + Math.sin(f * s.speed) * 0.18)
        );
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.arc(s.rx * w, s.ry * h, s.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const step = () => {
      raf = requestAnimationFrame(step);
      if (!onscreen || !visible || !activeRef.current) return;
      const f = (performance.now() - start) / 16.6667; // ~60fps frame index
      draw(f);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(
      (entries) => {
        onscreen = entries[0]?.isIntersecting ?? true;
      },
      { rootMargin: "120px" }
    );
    io.observe(canvas);
    const onVisibility = () => {
      visible = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibility);

    if (reducedMotion) {
      draw(0);
    } else {
      raf = requestAnimationFrame(step);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
