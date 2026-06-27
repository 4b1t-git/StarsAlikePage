"use client";

import { useEffect, useRef } from "react";

type Star = {
  rx: number;
  ry: number;
  radius: number;
  baseAlpha: number;
  speed: number;
  alpha: number;
};

type Shooter = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  thickness: number;
  path: { x: number; y: number }[];
  opacity: number;
};

type Mode = "hero" | "ambient";

type Props = {
  mode?: Mode;
};

const SHOOTER_MAX = 5;

function newStar(): Star {
  // Replicating exactly:
  // radius = Random.nextFloat() * 2f + 0.5f
  // baseAlpha = Random.nextFloat() * 0.55f + 0.15f
  // speed = Random.nextFloat() * 0.0253f + 0.0046f
  const baseAlpha = Math.random() * 0.55 + 0.15;
  return {
    rx: Math.random(),
    ry: Math.random(),
    radius: Math.random() * 2 + 0.5,
    baseAlpha: baseAlpha,
    speed: (Math.random() * 0.0253 + 0.0046) * 0.5,
    alpha: baseAlpha,
  };
}

export default function StarryBackground({ mode = "hero" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const ambient = mode === "ambient";
    const isHero = !ambient;

    // Android density logic: (screenHeightDp * 70 / 150).coerceIn(150, 700)
    // Capped harder on mobile, where a full-screen canvas of stars is costly.
    const STAR_CAP = isMobile ? 220 : 700;
    const STAR_COUNT = typeof window !== "undefined"
      ? Math.min(Math.max(Math.floor((window.innerHeight * 70) / 150), 150), STAR_CAP)
      : 250;

    let w = 0;
    let h = 0;
    const stars: Star[] = [];
    let shooters: Shooter[] = [];
    let frame = 0;
    let raf = 0;
    let lastShoot = performance.now();
    let nextDelay = 0;
    let visible = true;
    let onscreen = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (stars.length === 0) {
        for (let i = 0; i < STAR_COUNT; i++) stars.push(newStar());
      }
    };

    const onVisibility = () => {
      visible = !document.hidden;
    };

    const makeShooterFromEdge = (): Shooter => {
      const side = Math.floor(Math.random() * 4);
      let sx = 0, sy = 0, tx = 0, ty = 0;
      if (side === 0) { sx = Math.random() * w; sy = -50; tx = Math.random() * w; ty = h + 50; }
      else if (side === 1) { sx = w + 50; sy = Math.random() * h; tx = -50; ty = Math.random() * h; }
      else if (side === 2) { sx = Math.random() * w; sy = h + 50; tx = Math.random() * w; ty = -50; }
      else { sx = -50; sy = Math.random() * h; tx = w + 50; ty = Math.random() * h; }
      const angle = Math.atan2(ty - sy, tx - sx);
      const speed = Math.random() * 1 + 1;
      return {
        x: sx, y: sy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        thickness: Math.random() * 1.5 + 0.5,
        path: [],
        opacity: 1,
      };
    };

    const makeShooterAt = (x: number, y: number, angle: number, speed: number): Shooter => ({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      thickness: Math.random() * 1 + 1.5,
      path: [],
      opacity: 1,
    });

    const onBurst = (e: Event) => {
      const ce = e as CustomEvent<{ x: number; y: number; count?: number }>;
      if (!ce.detail) return;
      const rect = canvas.getBoundingClientRect();
      const localX = ce.detail.x - rect.left;
      const localY = ce.detail.y - rect.top;
      if (localX < -50 || localY < -50 || localX > w + 50 || localY > h + 50) return;
      const count = ce.detail.count ?? 8;
      for (let i = 0; i < count; i++) {
        const a = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.3;
        const s = Math.random() * 2 + 3.5;
        shooters.push(makeShooterAt(localX, localY, a, s));
      }
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${s.baseAlpha})`;
        ctx.arc(s.rx * w, s.ry * h, s.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const scheduleNext = () => {
      // Super rare: between 15 seconds and 45 seconds
      const minD = isHero ? 15000 : 20000;
      const maxD = isHero ? 45000 : 60000;
      nextDelay = minD + Math.random() * (maxD - minD);
      lastShoot = performance.now();
    };
    scheduleNext();

    const step = () => {
      raf = requestAnimationFrame(step);
      if (!visible || !onscreen) return;
      frame++;
      ctx.clearRect(0, 0, w, h);

      // ── STARS (pure twinkling, no drift, 1:1 Android port) ─────────────
      for (const s of stars) {
        s.alpha = Math.max(
          0.05,
          Math.min(1, s.baseAlpha + Math.sin(frame * s.speed) * 0.18),
        );

        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
        ctx.arc(s.rx * w, s.ry * h, s.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── SHOOTING STARS ──────────────────────────────
      const now = performance.now();
      if (
        now - lastShoot > nextDelay &&
        shooters.length < SHOOTER_MAX &&
        w > 0
      ) {
        shooters.push(makeShooterFromEdge());
        scheduleNext();
      }

      const survivors: Shooter[] = [];
      for (const s of shooters) {
        s.x += s.vx;
        s.y += s.vy;
        s.path.push({ x: s.x, y: s.y });
        if (s.path.length > 25) s.path.shift();

        if (Math.random() < 0.1) {
          s.opacity = Math.random() * 0.5 + 0.5;
        }

        if (s.path.length > 1) {
          const p = s.path;
          ctx.beginPath();
          ctx.moveTo(p[0].x, p[0].y);
          for (let i = 1; i < p.length; i++) ctx.lineTo(p[i].x, p[i].y);
          ctx.lineCap = "round";
          ctx.strokeStyle = `rgba(255,255,255,${0.2 * s.opacity})`;
          ctx.lineWidth = s.thickness * 4;
          ctx.stroke();
          ctx.strokeStyle = `rgba(255,255,255,${s.opacity})`;
          ctx.lineWidth = s.thickness;
          ctx.stroke();
        }

        if (
          s.x > -200 && s.x < w + 200 &&
          s.y > -200 && s.y < h + 200
        ) {
          survivors.push(s);
        }
      }
      shooters = survivors;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries[0]?.isIntersecting ?? true;
        onscreen = vis;
        if (isHero) {
          window.dispatchEvent(
            new CustomEvent("stars:hero-visible", { detail: vis }),
          );
        }
      },
      { rootMargin: "100px" },
    );
    io.observe(canvas);

    const onHeroVisible = (e: Event) => {
      if (ambient) {
        const ce = e as CustomEvent<boolean>;
        onscreen = !ce.detail;
      }
    };
    if (ambient) {
      window.addEventListener("stars:hero-visible", onHeroVisible);
    }

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("stars:burst", onBurst as EventListener);

    if (reducedMotion) {
      drawStatic();
    } else {
      raf = requestAnimationFrame(step);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("stars:burst", onBurst as EventListener);
      if (ambient) {
        window.removeEventListener("stars:hero-visible", onHeroVisible);
      }
    };
  }, [mode]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
