import type { ReactNode } from "react";

/** Landscape tablet bezel wrapping a 16:10 screen. */
export default function TabletFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative rounded-[26px] bg-[#1a1a1c] p-2.5 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.85)] ring-1 ring-white/10 sm:rounded-[34px] sm:p-3.5">
      {/* inner bezel highlight */}
      <div className="pointer-events-none absolute inset-[3px] rounded-[23px] ring-1 ring-white/[0.06] sm:rounded-[31px]" />
      {/* front camera, centred on the top long edge */}
      <div className="pointer-events-none absolute left-1/2 top-[6px] z-10 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#0c0c0e] ring-1 ring-white/15 sm:top-[9px]" />
      {children}
    </div>
  );
}
