"use client";

import { useRef, useState } from "react";

type Status = "idle" | "loading" | "ok" | "error";

export default function EmailCapture() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");
  const buttonRef = useRef<HTMLButtonElement>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setMessage(data?.error ?? "Algo falló. Intentá de nuevo.");
        return;
      }
      setStatus("ok");
      setMessage(
        data?.already
          ? "Ya estabas en la lista. Te avisamos cuando salga."
          : "Listo. Te avisamos cuando salga."
      );
      setEmail("");
      const btn = buttonRef.current;
      if (btn && typeof window !== "undefined") {
        const r = btn.getBoundingClientRect();
        window.dispatchEvent(
          new CustomEvent("stars:burst", {
            detail: {
              x: r.left + r.width / 2,
              y: r.top + r.height / 2,
              count: 10,
            },
          }),
        );
      }
    } catch {
      setStatus("error");
      setMessage("Error de red. Probá de nuevo en un momento.");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-xl mx-auto"
      aria-label="Suscripción de lanzamiento"
    >
      <div className="flex flex-col sm:flex-row gap-2 p-2 rounded-2xl bg-cosmos-deep/70 backdrop-blur ring-1 ring-star-soft shadow-[0_0_60px_-20px_var(--color-star-soft)]">
        <input
          type="email"
          required
          inputMode="email"
          autoComplete="email"
          placeholder="tu@correo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading"}
          className="flex-1 bg-transparent px-4 py-3 text-base outline-none placeholder:text-paper-bright/40 text-paper-bright"
        />
        <button
          ref={buttonRef}
          type="submit"
          disabled={status === "loading"}
          className="relative px-5 py-3 rounded-xl bg-star text-cosmos-void font-semibold tracking-wide hover:brightness-110 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "loading" ? "enviando…" : "Avisame"}
          {status === "idle" && (
            <span className="pointer-events-none absolute inset-0 rounded-xl animate-pulse-ring" />
          )}
        </button>
      </div>
      <p
        className={`mt-3 text-sm font-[family-name:var(--font-pixel)] tracking-widest uppercase ${
          status === "ok"
            ? "text-star"
            : status === "error"
            ? "text-tag-love"
            : "text-paper-bright/50"
        }`}
        aria-live="polite"
      >
        {message || "sin spam · un solo correo el día del lanzamiento"}
      </p>
    </form>
  );
}
