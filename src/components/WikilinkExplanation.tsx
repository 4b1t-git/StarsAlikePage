"use client";

import { useState } from "react";

export default function WikilinkExplanation({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <span className="relative inline-block">
      <button 
        onClick={(e) => {
          e.preventDefault();
          setOpen(!open);
        }}
        onBlur={() => setOpen(false)}
        className="text-star font-medium hover:underline decoration-star/40 underline-offset-4 transition-all cursor-help"
      >
        {children}
      </button>
      
      {open && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-[280px] p-4 rounded-xl bg-[#0f0f13] border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)] text-left z-50 block font-[family-name:var(--font-sans)]">
          <span className="text-[13px] leading-relaxed text-white/80 block">
            Es la acción de <strong className="text-star font-medium">referenciar</strong> una página desde otra, permitiéndote <strong className="text-white/90 font-medium">moverte fluidamente</strong> entre ellas.
          </span>
          <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#0f0f13] border-b border-r border-white/10 rotate-45 block" />
        </span>
      )}
    </span>
  );
}
