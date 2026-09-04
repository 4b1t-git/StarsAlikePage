"use client";

import { useLayoutEffect, useRef, type CSSProperties } from "react";

const PHONE_PHRASE = "La memoria es poco fiable. Las notas no.";

const phraseStyle = {
  "--mockup-editorial-text-width": "0px",
  "--mockup-editorial-band-width": "0px",
  "--mockup-editorial-base": "rgb(241 238 232 / 70%)",
  display: "block",
  width: "100%",
  color: "transparent",
  fontFamily: "var(--font-fraunces)",
  fontSize: "4.05cqw",
  fontStyle: "italic",
  fontVariationSettings: '"opsz" 16',
  fontWeight: 400,
  lineHeight: "6.05cqw",
  whiteSpace: "normal",
  backgroundImage:
    "linear-gradient(90deg, var(--mockup-editorial-base) 0%, var(--mockup-accent) 30%, var(--mockup-accent) 70%, var(--mockup-editorial-base) 100%), linear-gradient(var(--mockup-editorial-base), var(--mockup-editorial-base))",
  backgroundRepeat: "no-repeat",
  backgroundPosition:
    "calc(-1 * var(--mockup-editorial-band-width) + var(--mockup-editorial-progress) * (var(--mockup-editorial-text-width) + var(--mockup-editorial-band-width))) 0, 0 0",
  backgroundSize: "var(--mockup-editorial-band-width) 100%, 100% 100%",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  WebkitTextFillColor: "transparent",
} as CSSProperties;

export default function PhoneEditorialPhrase() {
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
    <span
      data-phone-editorial-phrase
      style={{
        position: "absolute",
        top: "16.35%",
        left: "7.05%",
        display: "block",
        width: "87.2%",
        height: "6.2%",
        background: "#050505",
      }}
    >
      <span ref={phraseRef} style={phraseStyle}>
        {PHONE_PHRASE}
      </span>
    </span>
  );
}
