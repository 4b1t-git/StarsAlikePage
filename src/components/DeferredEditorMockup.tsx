"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const EditorMockup = dynamic(() => import("./EditorMockup"), {
  ssr: false,
});

export default function DeferredEditorMockup() {
  const boundaryRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const boundary = boundaryRef.current;
    if (!boundary || isReady) return;

    if (!("IntersectionObserver" in window)) {
      const timeoutId = globalThis.setTimeout(() => setIsReady(true), 0);
      return () => globalThis.clearTimeout(timeoutId);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsReady(true);
        observer.disconnect();
      },
      { rootMargin: "500px 0px" },
    );

    observer.observe(boundary);
    return () => observer.disconnect();
  }, [isReady]);

  return (
    <div
      ref={boundaryRef}
      data-deferred-editor={isReady ? "ready" : "waiting"}
    >
      {isReady ? (
        <EditorMockup />
      ) : (
        <div
          aria-hidden="true"
          className="mx-auto mt-16 max-w-[1200px] overflow-hidden px-4 pb-24 sm:px-6 xl:overflow-visible"
        >
          <div className="aspect-[2800/1586] w-full" />
        </div>
      )}
    </div>
  );
}
