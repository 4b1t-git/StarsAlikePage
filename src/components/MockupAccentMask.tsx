import type { CSSProperties } from "react";
import { asset } from "@/lib/assets";

export default function MockupAccentMask({ src }: { src: string }) {
  const resolvedSrc = asset(src);
  const style = {
    backgroundColor: "var(--color-star)",
    WebkitMaskImage: `url('${resolvedSrc}')`,
    maskImage: `url('${resolvedSrc}')`,
    WebkitMaskPosition: "center",
    maskPosition: "center",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskSize: "100% 100%",
    maskSize: "100% 100%",
  } as CSSProperties;

  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={style}
    />
  );
}
