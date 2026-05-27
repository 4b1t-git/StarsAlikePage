"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Plays the blackhole.webm asset (converted from the Android app's side-by-side
 * mp4). To strip the black background reliably across browsers, an inline SVG
 * filter maps pixel luminance to alpha: bright rings → opaque, black bg →
 * fully transparent. No reliance on the webm's muxed alpha track (which not
 * every browser/decoder honors).
 *
 * Pointer events disabled so the canvas keeps capturing pointermove for the
 * gravity swirl.
 */
export default function BlackHoleVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    setShow(true);
    const v = videoRef.current;
    if (v) v.play().catch(() => {});
  }, []);

  if (!show) return null;

  return (
    <>
      {/* SVG filter: alpha = max(R,G,B). Black pixels become fully transparent;
          white pixels stay fully opaque. Slight bias term lifts the cutoff so
          near-black anti-aliasing pixels also drop out. */}
      <svg
        className="absolute h-0 w-0"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <filter id="blackhole-luma">
            <feColorMatrix
              type="matrix"
              values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0.4 0.4 0.4 0 -0.05
              "
            />
          </filter>
        </defs>
      </svg>

      <video
        ref={videoRef}
        src="/blackhole.webm"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          left: "30%",
          top: "35%",
          transform: "translate(-50%, -50%)",
          width: "clamp(320px, 42vw, 720px)",
          height: "auto",
          filter: "url(#blackhole-luma)",
          zIndex: 1,
        }}
      />
    </>
  );
}
