"use client";

import { useId, useRef, useState } from "react";

type Status = "idle" | "loading" | "ok" | "error";

export default function EmailCapture() {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // honeypot — must stay empty
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");
  const buttonRef = useRef<HTMLButtonElement>(null);
  const fieldId = useId();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setMessage(data?.error ?? "Algo falló. Intentá de nuevo.");
        return;
      }
      setStatus("ok");
      setMessage("Listo. Te avisamos cuando salga.");
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
      setMessage("Error de red. Intentá de nuevo en un momento.");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-xl mx-auto"
      aria-label="Suscripción de lanzamiento"
    >
      <div className="group relative flex flex-col sm:flex-row gap-2 p-2 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] transition-all duration-500 hover:bg-white/[0.05] hover:border-white/20">
        {/* Subtle inner top highlight */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/5 mask-image-[linear-gradient(to_bottom,white,transparent)]" />

        {/* Honeypot — hidden from real users, catches bots */}
        <div aria-hidden className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
          <label htmlFor={`${fieldId}-website`}>No completar</label>
          <input
            id={`${fieldId}-website`}
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>

        <label htmlFor={`${fieldId}-email`} className="sr-only">
          Tu correo electrónico
        </label>
        <input
          id={`${fieldId}-email`}
          type="email"
          required
          inputMode="email"
          autoComplete="email"
          placeholder="tu@correo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading"}
          className="flex-1 bg-transparent px-5 py-3 text-base outline-none placeholder:text-paper-bright/30 text-paper-bright transition-all"
        />
        <button
          ref={buttonRef}
          type="submit"
          disabled={status === "loading"}
          className="btn-accent relative px-8 py-3 rounded-xl text-cosmos-void font-semibold tracking-wide hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_0_20px_-5px_var(--color-star)] hover:shadow-[0_0_30px_-5px_var(--color-star)] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <span className="relative z-10">
            {status === "loading" ? "enviando…" : "Avísame"}
          </span>
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
