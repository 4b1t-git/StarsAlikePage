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
 * between 150 and 700 for full-screen fields. Small surfaces can pass an exact
 * fixed count (the default diary cover uses 70).
 */

type Star = {
  rx: number;
  ry: number;
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  speed: number;
};

export type StarfieldExclusion = {
  x: number;
  y: number;
  width: number;
  height: number;
};

function newStar(): Star {
  return {
    rx: Math.random(),
    ry: Math.random(),
    x: 0,
    y: 0,
    radius: Math.random() * 2 + 0.5,
    baseAlpha: Math.random() * 0.55 + 0.15,
    speed: Math.random() * 0.0253 + 0.0046,
  };
}

export default function MockupStarfield({
  className,
  active = true,
  starCount,
  exclusions,
}: {
  className?: string;
  /** When false (e.g. a carousel slide that isn't showing), its RAF loop is
   * stopped completely so off-screen mockups don't burn frames. */
  active?: boolean;
  starCount?: number;
  /** Normalized rectangles occupied by foreground UI in the captured hero. */
  exclusions?: readonly StarfieldExclusion[];
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeRef = useRef(active);
  const syncActivityRef = useRef<() => void>(() => undefined);

  useEffect(() => {
    activeRef.current = active;
    syncActivityRef.current();
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
    let visibleStars: Star[] = [];
    let starsInitialized = false;
    let animationFrame = 0;
    let rafParity = 0;
    let frame = 0;
    let running = false;
    let colorFrame = 0;
    let onscreen = false;
    let visible = true;
    let currentColor = "rgb(255 255 255)";
    const updateColor = () => {
      currentColor = getComputedStyle(canvas).color || currentColor;
    };
    
    // Initial color grab; subsequent reads happen only while this canvas draws.
    updateColor();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Generate exactly once. rx/ry keep the same sky stretched on resize.
      if (!starsInitialized && w > 0 && h > 0) {
        const count =
          starCount ?? Math.min(Math.max(Math.round((h * 70) / 150), 150), 700);
        stars = Array.from({ length: count }, newStar);
        visibleStars = exclusions
          ? stars.filter(
              (star) =>
                !exclusions.some(
                  (rect) =>
                    star.rx >= rect.x &&
                    star.rx <= rect.x + rect.width &&
                    star.ry >= rect.y &&
                    star.ry <= rect.y + rect.height,
                ),
            )
          : stars;
        canvas.dataset.starCount = String(count);
        starsInitialized = true;
      }
      for (const star of visibleStars) {
        star.x = star.rx * w;
        star.y = star.ry * h;
      }
    };

    const draw = (f: number) => {
      colorFrame += 1;
      if (colorFrame % 8 === 0) updateColor();
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = currentColor;
      for (const s of visibleStars) {
        const alpha = Math.min(
          1,
          Math.max(0.05, s.baseAlpha + Math.sin(f * s.speed) * 0.18)
        );
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const tick = () => {
      if (!running) return;
      rafParity += 1;
      if (rafParity % 2 === 0) {
        draw(frame);
        frame += 2;
      }
      animationFrame = requestAnimationFrame(tick);
    };

    const startStars = () => {
      if (
        reducedMotion ||
        running ||
        !onscreen ||
        !visible ||
        !activeRef.current
      ) return;
      running = true;
      draw(frame);
      animationFrame = requestAnimationFrame(tick);
    };

    const stopStars = () => {
      running = false;
      cancelAnimationFrame(animationFrame);
      animationFrame = 0;
    };

    const releaseBuffer = () => {
      canvas.width = 1;
      canvas.height = 1;
    };

    const syncActivity = () => {
      if (onscreen && visible && activeRef.current) startStars();
      else stopStars();
    };
    syncActivityRef.current = syncActivity;

    const ro = new ResizeObserver(() => {
      if (!onscreen) return;
      resize();
      if (reducedMotion) draw(0);
      else if (onscreen && visible && activeRef.current) draw(frame);
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(
      (entries) => {
        onscreen = entries[0]?.isIntersecting ?? true;
        if (onscreen) {
          resize();
          if (reducedMotion) draw(0);
        } else {
          stopStars();
          releaseBuffer();
        }
        syncActivity();
      },
      { rootMargin: "120px" }
    );
    io.observe(canvas);
    const onVisibility = () => {
      visible = !document.hidden;
      syncActivity();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stopStars();
      syncActivityRef.current = () => undefined;
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [exclusions, starCount]);

  return (
    <canvas
      ref={canvasRef}
      width={1}
      height={1}
      aria-hidden="true"
      className={className}
    />
  );
}
