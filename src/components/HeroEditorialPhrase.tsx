"use client";

import { useLayoutEffect, useRef } from "react";

const PHRASE = "Las constelaciones no se escriben solas, tampoco tu día.";

export default function HeroEditorialPhrase() {
  const phraseRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const phrase = phraseRef.current;
    if (!phrase) return;

    const measure = () => {
      const textWidth = phrase.getBoundingClientRect().width;
      phrase.style.setProperty("--mockup-editorial-text-width", `${textWidth}px`);
      phrase.style.setProperty(
        "--mockup-editorial-band-width",
        `${textWidth * 1.2}px`,
      );
    };

    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(phrase);

    let cancelled = false;
    void document.fonts.ready.then(() => {
      if (!cancelled) measure();
    });

    return () => {
      cancelled = true;
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <span className="mockup-editorial-phrase-slot">
      <span ref={phraseRef} className="mockup-editorial-phrase">
        {PHRASE}
      </span>
    </span>
  );
}
