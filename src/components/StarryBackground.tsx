"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
  baseAlpha: number;
  twinkleSpeed: number;
};

type Shooter = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  thickness: number;
  path: { x: number; y: number }[];
  ttl: number;
  isSoulPair: boolean;
  // soul-pair helix state
  baseX: number;
  baseY: number;
  baseAngle: number;
  phaseShift: number;
  helixFrequency: number;
  helixAmplitude: number;
  timeAlive: number;
  noiseDriftX: number;
  noiseDriftY: number;
  trail: { x: number; y: number }[];
  opacity: number;
};

type Mode = "hero" | "ambient";

type Props = {
  showBlackHole?: boolean;
  mode?: Mode;
  // When true, skip drawing the black hole visual (a video element renders it
  // instead). Physics still pulls stars toward the same point.
  videoBlackHole?: boolean;
};

// Constants — mirror Android StarryBackground.kt
const G = 2500;
const MIN_DIST = 40;
const DAMPING = 0.97;
const BLACK_HOLE_SCALE = 3;
const HOLE_X_FRAC = 0.3;
const HOLE_Y_FRAC = 0.35;
const ABSORPTION_R = 20 * BLACK_HOLE_SCALE;
const SHOOTER_MAX_SPEED = 25;
const SHOOTER_MAX = 5;

function newStar(w: number, h: number, ambient: boolean): Star {
  const a = Math.random() * 0.6 + 0.2;
  const v = ambient ? 0.3 : 1;
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * v,
    vy: (Math.random() - 0.5) * v,
    r: Math.random() * 2.5 + 1, // 1.0 - 3.5
    alpha: a,
    baseAlpha: a,
    twinkleSpeed: Math.random() * 0.025 + 0.005,
  };
}

export default function StarryBackground({
  showBlackHole = true,
  mode = "hero",
  videoBlackHole = false,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointer = useRef<{ x: number; y: number } | null>(null);

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
    const heroPull = showBlackHole && !ambient;

    // Mirror Android: 260 in login. Slightly trim on mobile or ambient for perf.
    const STAR_COUNT = ambient
      ? (isMobile ? 100 : 180)
      : (isMobile ? 180 : 260);

    let w = 0;
    let h = 0;
    let stars: Star[] = [];
    let shooters: Shooter[] = [];
    let frame = 0;
    let raf = 0;
    let lastShoot = performance.now();
    let nextDelay = 0;
    let visible = true;
    let onscreen = true;
    let absorbedCount = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (stars.length === 0) {
        for (let i = 0; i < STAR_COUNT; i++) stars.push(newStar(w, h, ambient));
      }
    };

    const onMove = (e: PointerEvent) => {
      if (!heroPull) return;
      const rect = canvas.getBoundingClientRect();
      pointer.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => {
      pointer.current = null;
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
      const speed = Math.random() * 1.5 + 2;
      return {
        x: sx, y: sy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        thickness: Math.random() * 1.5 + 0.5,
        path: [],
        ttl: 600,
        isSoulPair: false,
        baseX: sx, baseY: sy,
        baseAngle: 0, phaseShift: 0,
        helixFrequency: 1, helixAmplitude: 25,
        timeAlive: 0,
        noiseDriftX: 0, noiseDriftY: 0,
        trail: [],
        opacity: 1,
      };
    };

    const makeShooterAt = (x: number, y: number, angle: number, speed: number): Shooter => ({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      thickness: Math.random() * 1 + 1.5,
      path: [],
      ttl: 600,
      isSoulPair: false,
      baseX: x, baseY: y,
      baseAngle: 0, phaseShift: 0,
      helixFrequency: 1, helixAmplitude: 25,
      timeAlive: 0,
      noiseDriftX: 0, noiseDriftY: 0,
      trail: [],
      opacity: 1,
    });

    const makeSoulPair = (x: number, y: number, exitAngle: number, freq: number, amp: number, phase: number): Shooter => ({
      x, y,
      vx: Math.cos(exitAngle) * (Math.random() * 4 + 3),
      vy: Math.sin(exitAngle) * (Math.random() * 4 + 3),
      thickness: 3,
      path: [],
      ttl: 900,
      isSoulPair: true,
      baseX: x, baseY: y,
      baseAngle: exitAngle, phaseShift: phase,
      helixFrequency: freq, helixAmplitude: amp,
      timeAlive: 0,
      noiseDriftX: 0, noiseDriftY: 0,
      trail: [],
      opacity: 1,
    });

    const onBurst = (e: Event) => {
      const ce = e as CustomEvent<{ x: number; y: number; count?: number }>;
      if (!ce.detail) return;
      const rect = canvas.getBoundingClientRect();
      const localX = ce.detail.x - rect.left;
      const localY = ce.detail.y - rect.top;
      // Burst is only meaningful when canvas covers the burst point
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
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      if (heroPull) {
        const holeX = w * HOLE_X_FRAC;
        const holeY = h * HOLE_Y_FRAC;
        ctx.fillStyle = "#000";
        ctx.beginPath();
        ctx.arc(holeX, holeY, 18, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const scheduleNext = () => {
      const minD = heroPull ? 1500 : 10000;
      const maxD = heroPull ? 4000 : 25000;
      nextDelay = minD + Math.random() * (maxD - minD);
      lastShoot = performance.now();
    };
    scheduleNext();

    const step = () => {
      raf = requestAnimationFrame(step);
      if (!visible || !onscreen) return;
      frame++;
      ctx.clearRect(0, 0, w, h);

      const holeX = w * HOLE_X_FRAC;
      const holeY = h * HOLE_Y_FRAC;
      const target = heroPull
        ? (pointer.current ?? { x: holeX, y: holeY })
        : { x: -10000, y: -10000 };

      // ── STARS ──────────────────────────────────────────
      for (const s of stars) {
        s.alpha = Math.max(
          0.05,
          Math.min(1, s.baseAlpha + Math.sin(frame * s.twinkleSpeed) * 0.2),
        );
        if (heroPull) {
          const dx = target.x - s.x;
          const dy = target.y - s.y;
          const dist = Math.max(MIN_DIST, Math.hypot(dx, dy));
          const force = G / (dist * dist);
          const angle = Math.atan2(dy, dx);
          const swirl = 0.5 / dist;
          s.vx += force * Math.cos(angle) - swirl * Math.sin(angle);
          s.vy += force * Math.sin(angle) + swirl * Math.cos(angle);
        } else {
          s.vx += (Math.random() - 0.5) * 0.05;
          s.vy += (Math.random() - 0.5) * 0.05;
          const sp = Math.hypot(s.vx, s.vy);
          const maxDrift = ambient ? 0.4 : 0.7;
          if (sp > maxDrift) {
            const k = maxDrift / sp;
            s.vx *= k;
            s.vy *= k;
          }
        }
        s.vx *= DAMPING;
        s.vy *= DAMPING;
        s.x += s.vx;
        s.y += s.vy;

        if (heroPull) {
          const dToHole = Math.hypot(holeX - s.x, holeY - s.y);
          if (dToHole < ABSORPTION_R) {
            s.x = Math.random() * w;
            s.y = Math.random() * h;
            s.vx = (Math.random() - 0.5) * 2;
            s.vy = (Math.random() - 0.5) * 2;
          }
        }
        if (s.x < -200) s.x = heroPull ? Math.random() * w : w + 200;
        if (s.x > w + 200) s.x = heroPull ? Math.random() * w : -200;
        if (s.y < -200) s.y = heroPull ? Math.random() * h : h + 200;
        if (s.y > h + 200) s.y = heroPull ? Math.random() * h : -200;

        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── BLACK HOLE VISUAL ────────────────────────────
      // Skipped when a video element renders the singularity above the canvas.
      if (heroPull && !videoBlackHole) {
        const grad = ctx.createRadialGradient(holeX, holeY, 4, holeX, holeY, 160);
        grad.addColorStop(0, "rgba(0,0,0,1)");
        grad.addColorStop(0.42, "rgba(64,224,208,0.2)");
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(holeX, holeY, 160, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = "#000";
        ctx.arc(holeX, holeY, 22, 0, Math.PI * 2);
        ctx.fill();
        ctx.lineWidth = 1.6;
        ctx.strokeStyle = "rgba(64,224,208,0.6)";
        ctx.beginPath();
        ctx.arc(holeX, holeY, 28 + Math.sin(frame * 0.04) * 2, 0, Math.PI * 2);
        ctx.stroke();
        ctx.lineWidth = 0.8;
        ctx.strokeStyle = "rgba(64,224,208,0.25)";
        ctx.beginPath();
        ctx.arc(holeX, holeY, 44 + Math.sin(frame * 0.025) * 4, 0, Math.PI * 2);
        ctx.stroke();
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
        s.ttl -= 1;
        if (!s.isSoulPair) {
          if (heroPull) {
            const dx = holeX - s.x;
            const dy = holeY - s.y;
            const dist = Math.hypot(dx, dy);
            s.timeAlive += 1;
            const gravMul = 1 + s.timeAlive * 0.005;
            const pull = ((G * 5) / Math.pow(Math.max(dist, 50), 1.5)) * gravMul;
            s.vx += pull * (dx / dist);
            s.vy += pull * (dy / dist);
            const sp = Math.hypot(s.vx, s.vy);
            if (sp > SHOOTER_MAX_SPEED) {
              const k = SHOOTER_MAX_SPEED / sp;
              s.vx *= k;
              s.vy *= k;
            }
          }
          s.x += s.vx;
          s.y += s.vy;
          s.path.push({ x: s.x, y: s.y });
          if (s.path.length > 25) s.path.shift();

          if (heroPull) {
            const dToHole = Math.hypot(s.x - holeX, s.y - holeY);
            if (dToHole < ABSORPTION_R) {
              absorbedCount++;
              if (absorbedCount % 2 === 0) {
                const exitAngle = Math.random() * Math.PI * 2;
                const freq = Math.random() * 0.5 + 0.8;
                const amp = Math.random() * 10 + 20;
                shooters.push(makeSoulPair(holeX, holeY, exitAngle, freq, amp, 0));
                shooters.push(makeSoulPair(holeX, holeY, exitAngle, freq, amp, Math.PI));
              }
              continue;
            }
          }

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
        } else {
          // SOUL PAIR
          s.helixFrequency = Math.max(
            0.4,
            Math.min(2, s.helixFrequency + (Math.random() - 0.5) * 0.008),
          );
          s.helixAmplitude = Math.max(
            10,
            Math.min(45, s.helixAmplitude + (Math.random() - 0.5) * 0.6),
          );
          s.noiseDriftX += (Math.random() - 0.5) * 0.04;
          s.noiseDriftY += (Math.random() - 0.5) * 0.04;
          s.noiseDriftX *= 0.95;
          s.noiseDriftY *= 0.95;
          s.baseX += s.vx + s.noiseDriftX;
          s.baseY += s.vy + s.noiseDriftY;
          s.timeAlive += 0.12 * s.helixFrequency;
          const wave = Math.sin(s.timeAlive + s.phaseShift) * s.helixAmplitude;
          const perpX = -Math.sin(s.baseAngle + s.noiseDriftX * 2);
          const perpY = Math.cos(s.baseAngle + s.noiseDriftY * 2);
          s.x = s.baseX + perpX * wave;
          s.y = s.baseY + perpY * wave;
          s.trail.push({ x: s.x, y: s.y });
          if (s.trail.length > 20) s.trail.shift();

          const fadeAlpha = Math.min(1, s.timeAlive / 6);

          if (s.trail.length > 1) {
            const t = s.trail;
            ctx.beginPath();
            ctx.moveTo(t[0].x, t[0].y);
            for (let i = 1; i < t.length; i++) ctx.lineTo(t[i].x, t[i].y);
            ctx.lineCap = "round";
            ctx.strokeStyle = `rgba(255,255,255,${0.15 * fadeAlpha})`;
            ctx.lineWidth = s.thickness * 0.5;
            ctx.stroke();
          }
          ctx.beginPath();
          ctx.fillStyle = `rgba(255,255,255,${0.1 * fadeAlpha})`;
          ctx.arc(s.x, s.y, s.thickness * 8, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.fillStyle = `rgba(255,255,255,${0.3 * fadeAlpha})`;
          ctx.arc(s.x, s.y, s.thickness * 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.fillStyle = `rgba(255,255,255,${fadeAlpha})`;
          ctx.arc(s.x, s.y, s.thickness * 1.5, 0, Math.PI * 2);
          ctx.fill();
        }

        if (
          s.ttl > 0 &&
          s.x > -1000 && s.x < w + 1000 &&
          s.y > -1000 && s.y < h + 1000
        ) {
          survivors.push(s);
        }
      }
      shooters = survivors;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Pause rAF when canvas is offscreen. Hero broadcasts its visibility so
    // the ambient substrate (which is position:fixed and always "intersecting")
    // can stop running while hero owns the screen — halves canvas cost.
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries[0]?.isIntersecting ?? true;
        onscreen = vis;
        if (heroPull) {
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
        // ambient pauses while hero owns the screen; resumes once hero leaves
        onscreen = !ce.detail;
      }
    };
    if (ambient) {
      window.addEventListener("stars:hero-visible", onHeroVisible);
    }

    if (heroPull) {
      canvas.addEventListener("pointermove", onMove);
      canvas.addEventListener("pointerleave", onLeave);
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
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("stars:burst", onBurst as EventListener);
      if (ambient) {
        window.removeEventListener("stars:hero-visible", onHeroVisible);
      }
    };
  }, [showBlackHole, mode, videoBlackHole]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
