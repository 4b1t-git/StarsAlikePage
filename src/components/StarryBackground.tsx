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

type WarpStar = {
  originX: number;
  originY: number;
  angle: number;
  distance: number;
  speed: number;
  acceleration: number;
  trailScale: number;
  thickness: number;
  alpha: number;
  age: number;
  delay: number;
  maxAge: number;
  accent: boolean;
};

type Mode = "hero" | "ambient";

type Props = {
  mode?: Mode;
};

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
  const starsCanvasRef = useRef<HTMLCanvasElement>(null);
  const shootersCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const starsCanvas = starsCanvasRef.current;
    const shootersCanvas = shootersCanvasRef.current;
    if (!starsCanvas || !shootersCanvas) return;
    const starsCtx = starsCanvas.getContext("2d");
    const shootersCtx = shootersCanvas.getContext("2d");
    if (!starsCtx || !shootersCtx) return;

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
    const SHOOTER_MAX = isMobile ? 10 : 16;
    let shooters: WarpStar[] = [];
    let starsInterval = 0;
    let shooterRaf = 0;
    let shootTimer = 0;
    let shooterFrame = 0;
    let visible = true;
    let onscreen = true;
    let previousShooterFrame = performance.now();
    let lastShooterDraw = 0;
    let accentColor = "#40E0D0";
    const starsStartedAt = performance.now();
    const STAR_FRAME_MS = 1000 / 24;
    const SHOOTER_FRAME_MS = 1000 / 60;

    const refreshAccent = () => {
      const nextAccent = getComputedStyle(shootersCanvas)
        .getPropertyValue("--color-star")
        .trim();
      if (nextAccent) accentColor = nextAccent;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = starsCanvas.clientWidth;
      h = starsCanvas.clientHeight;
      for (const canvas of [starsCanvas, shootersCanvas]) {
        canvas.width = Math.max(1, Math.round(w * dpr));
        canvas.height = Math.max(1, Math.round(h * dpr));
      }
      starsCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      shootersCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      refreshAccent();
      if (stars.length === 0) {
        for (let i = 0; i < STAR_COUNT; i++) stars.push(newStar());
      }
    };

    const makeWarpStar = (
      originX: number,
      originY: number,
      angle: number,
      energetic = false,
    ): WarpStar => {
      const initialSpeed = energetic
        ? Math.random() * 0.16 + 0.2
        : Math.random() * 0.1 + 0.22;

      return {
        originX,
        originY,
        angle,
        distance: energetic ? Math.random() * 72 + 8 : 0,
        speed: initialSpeed,
        acceleration: Math.random() * 0.0002 + (energetic ? 0.00042 : 0.00018),
        trailScale: energetic
          ? Math.random() * 120 + 120
          : Math.random() * 100 + 180,
        thickness: Math.random() * 0.75 + 0.45,
        alpha: energetic
          ? Math.random() * 0.42 + 0.4
          : Math.random() * 0.22 + 0.68,
        age: 0,
        delay: energetic ? Math.random() * 260 : 0,
        maxAge: Math.random() * 600 + (energetic ? 1250 : 1800),
        accent: energetic ? Math.random() < 0.22 : true,
      };
    };

    const spawnEdgeShooter = () => {
      const margin = 120;
      const side = Math.floor(Math.random() * 4);
      let startX = 0;
      let startY = 0;
      let targetX = 0;
      let targetY = 0;

      if (side === 0) {
        startX = Math.random() * w;
        startY = -margin;
        targetX = Math.random() * w;
        targetY = h + margin;
      } else if (side === 1) {
        startX = w + margin;
        startY = Math.random() * h;
        targetX = -margin;
        targetY = Math.random() * h;
      } else if (side === 2) {
        startX = Math.random() * w;
        startY = h + margin;
        targetX = Math.random() * w;
        targetY = -margin;
      } else {
        startX = -margin;
        startY = Math.random() * h;
        targetX = w + margin;
        targetY = Math.random() * h;
      }

      const angle = Math.atan2(targetY - startY, targetX - startX);
      shooters.push(makeWarpStar(startX, startY, angle));
    };

    const spawnWarpShower = (
      originX: number,
      originY: number,
      count: number,
      energetic = false,
    ) => {
      const available = Math.max(0, SHOOTER_MAX - shooters.length);
      const total = Math.min(count, available);
      const rotation = Math.random() * Math.PI * 2;

      for (let i = 0; i < total; i++) {
        const evenAngle = rotation + (i / Math.max(total, 1)) * Math.PI * 2;
        const jitter = (Math.random() - 0.5) * 0.42;
        shooters.push(
          makeWarpStar(originX, originY, evenAngle + jitter, energetic),
        );
      }
    };

    const drawStatic = () => {
      starsCtx.clearRect(0, 0, w, h);
      for (const s of stars) {
        starsCtx.beginPath();
        starsCtx.fillStyle = `rgba(255,255,255,${s.baseAlpha})`;
        starsCtx.arc(s.rx * w, s.ry * h, s.radius, 0, Math.PI * 2);
        starsCtx.fill();
      }
    };

    const drawStars = () => {
      const frame = (performance.now() - starsStartedAt) / 16.6667;
      starsCtx.clearRect(0, 0, w, h);
      for (const s of stars) {
        s.alpha = Math.max(
          0.05,
          Math.min(1, s.baseAlpha + Math.sin(frame * s.speed) * 0.18),
        );

        starsCtx.beginPath();
        starsCtx.fillStyle = `rgba(255,255,255,${s.alpha})`;
        starsCtx.arc(s.rx * w, s.ry * h, s.radius, 0, Math.PI * 2);
        starsCtx.fill();
      }
    };

    const startStars = () => {
      if (reducedMotion || starsInterval || !visible || !onscreen) return;
      drawStars();
      starsInterval = window.setInterval(drawStars, STAR_FRAME_MS);
    };

    const stopStars = () => {
      window.clearInterval(starsInterval);
      starsInterval = 0;
    };

    const stepShooters = (timestamp: number) => {
      shooterRaf = 0;
      if (!visible || !onscreen || shooters.length === 0) return;

      if (timestamp - lastShooterDraw < SHOOTER_FRAME_MS - 1) {
        shooterRaf = requestAnimationFrame(stepShooters);
        return;
      }

      const deltaMs = Math.min(
        Math.max(timestamp - previousShooterFrame, 0),
        34,
      );
      previousShooterFrame = timestamp;
      lastShooterDraw = timestamp;
      shooterFrame += 1;
      if (shooterFrame % 30 === 0) refreshAccent();
      shootersCtx.clearRect(0, 0, w, h);

      const survivors: WarpStar[] = [];
      for (const s of shooters) {
        s.age += deltaMs;
        const activeAge = s.age - s.delay;
        if (activeAge < 0) {
          survivors.push(s);
          continue;
        }

        s.distance += s.speed * deltaMs;
        s.speed += s.acceleration * deltaMs;

        const cos = Math.cos(s.angle);
        const sin = Math.sin(s.angle);
        const trailLength = Math.min(
          isMobile ? 72 : 112,
          Math.max(12, s.speed * s.trailScale),
        );
        const tailDistance = Math.max(0, s.distance - trailLength);
        const headX = s.originX + cos * s.distance;
        const headY = s.originY + sin * s.distance;
        const tailX = s.originX + cos * tailDistance;
        const tailY = s.originY + sin * tailDistance;

        const fadeIn = Math.min(1, activeAge / 180);
        const fadeOut = Math.min(1, (s.maxAge - activeAge) / 360);
        const opacity = s.alpha * fadeIn * Math.max(0, fadeOut);

        if (opacity > 0) {
          const trail = shootersCtx.createLinearGradient(tailX, tailY, headX, headY);
          trail.addColorStop(0, "rgba(255,255,255,0)");
          trail.addColorStop(0.58, s.accent ? accentColor : "rgba(255,255,255,0.45)");
          trail.addColorStop(1, "#ffffff");

          shootersCtx.save();
          shootersCtx.globalCompositeOperation = "lighter";
          shootersCtx.globalAlpha = opacity * 0.34;
          shootersCtx.lineCap = "round";
          shootersCtx.strokeStyle = trail;
          shootersCtx.lineWidth = s.thickness * 4.4;
          shootersCtx.shadowBlur = 10;
          shootersCtx.shadowColor = s.accent ? accentColor : "#ffffff";
          shootersCtx.beginPath();
          shootersCtx.moveTo(tailX, tailY);
          shootersCtx.lineTo(headX, headY);
          shootersCtx.stroke();

          shootersCtx.globalAlpha = opacity;
          shootersCtx.lineWidth = s.thickness;
          shootersCtx.shadowBlur = 2;
          shootersCtx.stroke();

          shootersCtx.fillStyle = "#ffffff";
          shootersCtx.beginPath();
          shootersCtx.arc(
            headX,
            headY,
            Math.max(0.55, s.thickness * 0.72),
            0,
            Math.PI * 2,
          );
          shootersCtx.fill();
          shootersCtx.restore();
        }

        const margin = 140;
        const inside =
          headX > -margin && headX < w + margin &&
          headY > -margin && headY < h + margin;
        if (activeAge < s.maxAge && inside) survivors.push(s);
      }
      shooters = survivors;
      if (shooters.length > 0) {
        shooterRaf = requestAnimationFrame(stepShooters);
      }
    };

    const startShooters = () => {
      if (
        reducedMotion ||
        shooterRaf ||
        shooters.length === 0 ||
        !visible ||
        !onscreen
      ) return;
      previousShooterFrame = performance.now();
      lastShooterDraw = 0;
      refreshAccent();
      shooterRaf = requestAnimationFrame(stepShooters);
    };

    const stopShooters = () => {
      cancelAnimationFrame(shooterRaf);
      shooterRaf = 0;
      shooters = [];
      shootersCtx.clearRect(0, 0, w, h);
    };

    const syncActivity = () => {
      if (reducedMotion) return;
      if (visible && onscreen) {
        startStars();
        startShooters();
      } else {
        stopStars();
        stopShooters();
      }
    };

    const scheduleNext = () => {
      // Preserve the original rhythm while keeping the 60fps shooter layer
      // completely asleep between comets.
      const minD = isHero ? 5000 : 10000;
      const maxD = isHero ? 15000 : 25000;
      const delay = minD + Math.random() * (maxD - minD);
      window.clearTimeout(shootTimer);
      shootTimer = window.setTimeout(() => {
        if (visible && onscreen && shooters.length === 0 && w > 0) {
          spawnEdgeShooter();
          startShooters();
        }
        scheduleNext();
      }, delay);
    };

    const onBurst = (e: Event) => {
      const ce = e as CustomEvent<{ x: number; y: number; count?: number }>;
      if (!ce.detail || !visible || !onscreen) return;
      const rect = shootersCanvas.getBoundingClientRect();
      const localX = ce.detail.x - rect.left;
      const localY = ce.detail.y - rect.top;
      if (localX < -50 || localY < -50 || localX > w + 50 || localY > h + 50) return;
      spawnWarpShower(localX, localY, ce.detail.count ?? 12, true);
      startShooters();
    };

    const onVisibility = () => {
      visible = !document.hidden;
      syncActivity();
    };

    resize();
    const ro = new ResizeObserver(() => {
      resize();
      if (reducedMotion) drawStatic();
      else if (visible && onscreen) drawStars();
    });
    ro.observe(starsCanvas);

    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries[0]?.isIntersecting ?? true;
        onscreen = vis;
        syncActivity();
        if (isHero) {
          window.dispatchEvent(
            new CustomEvent("stars:hero-visible", { detail: vis }),
          );
        }
      },
      { rootMargin: "100px" },
    );
    io.observe(starsCanvas);

    const onHeroVisible = (e: Event) => {
      if (ambient) {
        const ce = e as CustomEvent<boolean>;
        onscreen = !ce.detail;
        syncActivity();
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
      startStars();
      scheduleNext();
    }

    return () => {
      stopStars();
      cancelAnimationFrame(shooterRaf);
      window.clearTimeout(shootTimer);
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
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <canvas
        ref={starsCanvasRef}
        className="absolute inset-0 h-full w-full"
      />
      <canvas
        ref={shootersCanvasRef}
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}
